import type { PortfolioRow } from '../interfaces/Portfolio.interface';
import type { SortConfig, FilterConfig } from '../interfaces/PortfolioFilters.interface';

export class PortfolioSorter {
  public static sort(rows: PortfolioRow[], config: SortConfig): PortfolioRow[] {
    const sorted = [...rows];
    
    sorted.sort((a, b) => {
      let aValue: number | string | null = a[config.field];
      let bValue: number | string | null = b[config.field];
      
      // Handle null values - push to end
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      // Compare values
      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        comparison = (aValue as number) - (bValue as number);
      }
      
      return config.direction === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }
}

export class PortfolioFilter {
  public static filter(rows: PortfolioRow[], config: FilterConfig): PortfolioRow[] {
    let filtered = [...rows];
    
    // Search term filter
    if (config.searchTerm.trim()) {
      const term = config.searchTerm.toLowerCase();
      filtered = filtered.filter(row => 
        row.symbol.toLowerCase().includes(term)
      );
    }
    
    // Profitability filters
    if (config.showOnlyProfitable && !config.showOnlyLosing) {
      filtered = filtered.filter(row => 
        row.unrealizedPL !== null && row.unrealizedPL > 0
      );
    } else if (config.showOnlyLosing && !config.showOnlyProfitable) {
      filtered = filtered.filter(row => 
        row.unrealizedPL !== null && row.unrealizedPL < 0
      );
    }
    
    return filtered;
  }
}
