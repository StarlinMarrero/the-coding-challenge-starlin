import type { PortfolioPosition, PortfolioRow, LivePricesResponse } from "../interfaces";
import { NumberParser } from "../utils/NumberParser.util";

// Single Responsibility: Calculate P/L metrics for portfolio positions
export class ProfitLossCalculator {
    public calculateUnrealizedPL(position: PortfolioPosition, avgCost: number, livePrice: number): number | null {
        if (position.quantity === 0) {
            return null;
        }

        return (livePrice - avgCost) * position.quantity;
    }

    public calculateUnrealizedPLPercentage(unrealizedPL: number, totalCost: number): number | null {
        if (totalCost === 0) {
            return null;
        }

        return (unrealizedPL / Math.abs(totalCost)) * 100;
    }

    public buildPortfolioRow(symbol: string, position: PortfolioPosition, livePrices: LivePricesResponse | null): PortfolioRow {
        const avgCost = position.quantity !== 0 ? position.totalCost / Math.abs(position.quantity) : 0;

        const livePriceStr = livePrices ? livePrices[symbol] : undefined;
        const livePrice = livePriceStr ? NumberParser.parse(livePriceStr) : null;

        let unrealizedPL: number | null = null;
        let unrealizedPLPct: number | null = null;

        if (livePrice !== null && position.quantity !== 0) {
            unrealizedPL = this.calculateUnrealizedPL(position, avgCost, livePrice);

            if (unrealizedPL !== null) {
                unrealizedPLPct = this.calculateUnrealizedPLPercentage(unrealizedPL, position.totalCost);
            }
        }

        return {
            symbol,
            quantity: position.quantity,
            avgCost,
            costBasis: position.totalCost,
            livePrice,
            unrealizedPL,
            unrealizedPLPct,
        };
    }
}
