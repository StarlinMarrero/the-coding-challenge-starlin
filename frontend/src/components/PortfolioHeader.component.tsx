import React from "react";

interface PortfolioHeaderProps {
    onReloadAll: () => void;
    onRefreshPrices: () => void;
    onToggleAutoRefresh: () => void;
    isAutoRefreshEnabled: boolean;
    isLoading: boolean;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ onReloadAll, onRefreshPrices, onToggleAutoRefresh, isAutoRefreshEnabled, isLoading }) => {
    return (
        <div className="portfolio-header">
            <h2 className="portfolio-title">Portfolio View</h2>
            <div className="portfolio-actions">
                <button onClick={onReloadAll} className="portfolio-button" disabled={isLoading}>
                    Reload All
                </button>
                <button onClick={onRefreshPrices} className="portfolio-button" disabled={isLoading}>
                    Refresh Prices
                </button>
                <button onClick={onToggleAutoRefresh} className="portfolio-button">
                    {isAutoRefreshEnabled ? "Stop Auto-Refresh" : "Start Auto-Refresh"}
                </button>
            </div>
        </div>
    );
};
