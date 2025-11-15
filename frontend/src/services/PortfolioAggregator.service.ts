import type { PortfolioData, PortfolioRow, PortfolioPosition } from '../interfaces';
import { PositionProcessor } from './PositionProcessor.service';
import { ProfitLossCalculator } from './ProfitLossCalculator.service';

// Single Responsibility: Aggregate portfolio data and build portfolio rows
export class PortfolioAggregator {
  private readonly positionProcessor: PositionProcessor;
  private readonly profitLossCalculator: ProfitLossCalculator;

  constructor() {
    this.positionProcessor = new PositionProcessor();
    this.profitLossCalculator = new ProfitLossCalculator();
  }

  public buildPortfolio(data: PortfolioData): PortfolioRow[] {
    const positions: Record<string, PortfolioPosition> = {};

    this.processOrders(data, positions);

    return this.buildPortfolioRows(positions, data.live);
  }

  private processOrders(
    data: PortfolioData,
    positions: Record<string, PortfolioPosition>
  ): void {
    data.historical?.Orders.forEach(order => {
      order.Legs.forEach(leg => {
        this.positionProcessor.processLeg(order, leg, positions);
      });
    });

    data.open?.Orders.forEach(order => {
      order.Legs.forEach(leg => {
        this.positionProcessor.processLeg(order, leg, positions);
      });
    });
  }

  private buildPortfolioRows(
    positions: Record<string, PortfolioPosition>,
    livePrices: PortfolioData['live']
  ): PortfolioRow[] {
    return Object.entries(positions)
      .filter(([, position]) => position.quantity !== 0)
      .map(([symbol, position]) =>
        this.profitLossCalculator.buildPortfolioRow(symbol, position, livePrices)
      )
      .sort((a, b) => a.symbol.localeCompare(b.symbol));
  }
}
