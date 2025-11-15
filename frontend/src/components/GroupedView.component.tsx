import React, { useState } from "react";
import type { GroupedPosition } from "../interfaces/PortfolioFilters.interface";
import { NumberFormatter } from "../utils/NumberFormatter.util";

interface GroupedViewProps {
    groups: GroupedPosition[];
}

export const GroupedView: React.FC<GroupedViewProps> = ({ groups }) => {
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    const toggleGroup = (underlying: string) => {
        const newExpanded = new Set(expandedGroups);
        if (newExpanded.has(underlying)) {
            newExpanded.delete(underlying);
        } else {
            newExpanded.add(underlying);
        }
        setExpandedGroups(newExpanded);
    };

    if (groups.length === 0) {
        return <p className="portfolio-loading">No grouped positions found.</p>;
    }

    return (
        <div className="grouped-view">
            {groups.map((group) => {
                const isExpanded = expandedGroups.has(group.underlying);
                const plClassName = group.totalUnrealizedPL !== null ? (group.totalUnrealizedPL > 0 ? "portfolio-pl-positive" : group.totalUnrealizedPL < 0 ? "portfolio-pl-negative" : "") : "";

                return (
                    <div key={group.underlying} className="group-container">
                        <div className="group-header" onClick={() => toggleGroup(group.underlying)}>
                            <span className="group-toggle">{isExpanded ? "▼" : "▶"}</span>
                            <span className="group-underlying">{group.underlying}</span>
                            <span className="group-count">({group.positions.length} positions)</span>
                            <span className={`group-pl ${plClassName}`}>{NumberFormatter.formatCurrency(group.totalUnrealizedPL)}</span>
                            <span className={`group-pl-pct ${plClassName}`}>{NumberFormatter.formatPercentage(group.aggregatedPLPct)}</span>
                        </div>
                        {isExpanded && (
                            <div className="group-positions">
                                <table className="portfolio-table">
                                    <thead>
                                        <tr>
                                            <th className="portfolio-table-header">Symbol</th>
                                            <th className="portfolio-table-header">Quantity</th>
                                            <th className="portfolio-table-header">Avg Cost</th>
                                            <th className="portfolio-table-header">Cost Basis</th>
                                            <th className="portfolio-table-header">Live Price</th>
                                            <th className="portfolio-table-header">Unrealized P/L</th>
                                            <th className="portfolio-table-header">Unrealized P/L %</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.positions.map((row) => {
                                            const rowPlClassName = row.unrealizedPL !== null ? (row.unrealizedPL > 0 ? "portfolio-pl-positive" : row.unrealizedPL < 0 ? "portfolio-pl-negative" : "") : "";

                                            return (
                                                <tr key={row.symbol}>
                                                    <td className="portfolio-table-cell">{row.symbol}</td>
                                                    <td className="portfolio-table-cell">{row.quantity}</td>
                                                    <td className="portfolio-table-cell">{NumberFormatter.formatCurrency(row.avgCost)}</td>
                                                    <td className="portfolio-table-cell">{NumberFormatter.formatCurrency(row.costBasis)}</td>
                                                    <td className="portfolio-table-cell">{NumberFormatter.formatCurrency(row.livePrice)}</td>
                                                    <td className={`portfolio-table-cell ${rowPlClassName}`}>{NumberFormatter.formatCurrency(row.unrealizedPL)}</td>
                                                    <td className={`portfolio-table-cell ${rowPlClassName}`}>{NumberFormatter.formatPercentage(row.unrealizedPLPct)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
