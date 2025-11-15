import React from "react";
import type { PortfolioRow } from "../interfaces";
import { NumberFormatter } from "../utils/NumberFormatter.util";

interface PortfolioTableProps {
    rows: PortfolioRow[];
    isLoading: boolean;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ rows, isLoading }) => {
    if (isLoading) {
        return <p className="portfolio-loading">Loading data...</p>;
    }

    return (
        <div className="portfolio-table-container">
            <table className="portfolio-table">
                <thead>
                    <tr>
                        <th className="portfolio-table-header">Asset</th>
                        <th className="portfolio-table-header">Quantity</th>
                        <th className="portfolio-table-header">Avg Cost</th>
                        <th className="portfolio-table-header">Cost Basis</th>
                        <th className="portfolio-table-header">Live Price</th>
                        <th className="portfolio-table-header">Unrealized P/L</th>
                        <th className="portfolio-table-header">Unrealized P/L %</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="portfolio-table-empty">
                                No positions found.
                            </td>
                        </tr>
                    ) : (
                        rows.map((row) => <PortfolioTableRow key={row.symbol} row={row} />)
                    )}
                </tbody>
            </table>
        </div>
    );
};

interface PortfolioTableRowProps {
    row: PortfolioRow;
}

const PortfolioTableRow: React.FC<PortfolioTableRowProps> = ({ row }) => {
    const getPLClassName = (): string => {
        if (row.unrealizedPL === null) {
            return "";
        }
        if (row.unrealizedPL > 0) {
            return "portfolio-pl-positive";
        }
        if (row.unrealizedPL < 0) {
            return "portfolio-pl-negative";
        }
        return "";
    };

    return (
        <tr>
            <td className="portfolio-table-cell">{row.symbol}</td>
            <td className="portfolio-table-cell">{row.quantity}</td>
            <td className="portfolio-table-cell">{NumberFormatter.formatCurrency(row.avgCost)}</td>
            <td className="portfolio-table-cell">{NumberFormatter.formatCurrency(row.costBasis)}</td>
            <td className="portfolio-table-cell">{NumberFormatter.formatCurrency(row.livePrice)}</td>
            <td className={`portfolio-table-cell ${getPLClassName()}`}>{NumberFormatter.formatCurrency(row.unrealizedPL)}</td>
            <td className={`portfolio-table-cell ${getPLClassName()}`}>{NumberFormatter.formatPercentage(row.unrealizedPLPct)}</td>
        </tr>
    );
};
