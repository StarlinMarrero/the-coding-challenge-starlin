import { useState, useEffect, useCallback } from "react";
import type { PortfolioRow, OrdersResponse, LivePricesResponse } from "../interfaces";
import { PortfolioApiService } from "../services/PortfolioApi.service";
import { PortfolioAggregator } from "../services/PortfolioAggregator.service";
import { ApiException } from "../interfaces/ApiError.interface";

interface UsePortfolioDataResult {
    rows: PortfolioRow[];
    isLoading: boolean;
    error: string | null;
    fetchAllData: () => Promise<void>;
    refreshPricesOnly: () => Promise<void>;
}

export const usePortfolioData = (): UsePortfolioDataResult => {
    const [historical, setHistorical] = useState<OrdersResponse | null>(null);
    const [openOrders, setOpenOrders] = useState<OrdersResponse | null>(null);
    const [, setLivePrices] = useState<LivePricesResponse | null>(null);
    const [rows, setRows] = useState<PortfolioRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiService = new PortfolioApiService();
    const aggregator = new PortfolioAggregator();

    const fetchAllData = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await apiService.fetchAllPortfolioData();

            setHistorical(data.historical);
            setOpenOrders(data.open);
            setLivePrices(data.live);

            const portfolioRows = aggregator.buildPortfolio({
                historical: data.historical,
                open: data.open,
                live: data.live,
            });

            setRows(portfolioRows);
        } catch (err) {
            const errorMessage = err instanceof ApiException ? err.message : "Failed fetching portfolio data";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshPricesOnly = useCallback(async (): Promise<void> => {
        try {
            const live = await apiService.fetchLivePrices();
            setLivePrices(live);

            const portfolioRows = aggregator.buildPortfolio({
                historical,
                open: openOrders,
                live,
            });

            setRows(portfolioRows);
        } catch (err) {
            const errorMessage = err instanceof ApiException ? err.message : "Failed refreshing prices";
            setError(errorMessage);
        }
    }, [historical, openOrders]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return {
        rows,
        isLoading,
        error,
        fetchAllData,
        refreshPricesOnly,
    };
};
