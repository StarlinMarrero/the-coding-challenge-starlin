import type { PortfolioRow } from '../interfaces/Portfolio.interface';
import type { GroupedPosition } from '../interfaces/PortfolioFilters.interface';

export class PositionGrouper {
  public static groupByUnderlying(rows: PortfolioRow[]): GroupedPosition[] {
    const groups = new Map<string, PortfolioRow[]>();
    
    rows.forEach(row => {
      // Extract underlying symbol from option symbols (e.g., "AAPL 250815C232.5" -> "AAPL")
      const underlying = this.extractUnderlying(row.symbol);
      
      if (!groups.has(underlying)) {
        groups.set(underlying, []);
      }
      groups.get(underlying)!.push(row);
    });
    
    return Array.from(groups.entries()).map(([underlying, positions]) => 
      this.aggregateGroup(underlying, positions)
    ).sort((a, b) => a.underlying.localeCompare(b.underlying));
  }
  
  private static extractUnderlying(symbol: string): string {
    // If it's an option symbol (contains space), extract underlying
    const spaceIndex = symbol.indexOf(' ');
    if (spaceIndex > 0) {
      return symbol.substring(0, spaceIndex);
    }
    // Otherwise it's a stock symbol
    return symbol;
  }
  
  private static aggregateGroup(underlying: string, positions: PortfolioRow[]): GroupedPosition {
    const totalQuantity = positions.reduce((sum, p) => sum + p.quantity, 0);
    const totalCostBasis = positions.reduce((sum, p) => sum + p.costBasis, 0);
    
    const totalUnrealizedPL = positions.reduce((sum, p) => {
      if (p.unrealizedPL === null) return sum;
      return sum + p.unrealizedPL;
    }, 0);
    
    const hasAllPL = positions.every(p => p.unrealizedPL !== null);
    const aggregatedPLPct = hasAllPL && totalCostBasis !== 0
      ? (totalUnrealizedPL / Math.abs(totalCostBasis)) * 100
      : null;
    
    return {
      underlying,
      positions,
      totalQuantity,
      totalCostBasis,
      totalUnrealizedPL: hasAllPL ? totalUnrealizedPL : null,
      aggregatedPLPct,
    };
  }
}
