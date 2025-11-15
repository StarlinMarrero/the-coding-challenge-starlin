import { PortfolioRow } from "./Portfolio.interface";

export type SortField = 'symbol' | 'quantity' | 'avgCost' | 'costBasis' | 'livePrice' | 'unrealizedPL' | 'unrealizedPLPct';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  searchTerm: string;
  showOnlyProfitable: boolean;
  showOnlyLosing: boolean;
}

export interface GroupedPosition {
  underlying: string;
  positions: PortfolioRow[];
  totalQuantity: number;
  totalCostBasis: number;
  totalUnrealizedPL: number | null;
  aggregatedPLPct: number | null;
}
