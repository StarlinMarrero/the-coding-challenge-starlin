export interface PortfolioRow {
    symbol: string;
    quantity: number;
    avgCost: number;
    costBasis: number;
    livePrice: number | null;
    unrealizedPL: number | null;
    unrealizedPLPct: number | null;
}

export interface PortfolioPosition {
    totalCost: number;
    quantity: number;
}

export interface PortfolioData {
    historical: import("./Order.interface").OrdersResponse | null;
    open: import("./Order.interface").OrdersResponse | null;
    live: import("./LivePrices.interface").LivePricesResponse | null;
}
