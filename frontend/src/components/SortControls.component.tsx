import React from "react";
import type { SortConfig, SortField } from "../interfaces/PortfolioFilters.interface";

interface SortControlsProps {
    currentSort: SortConfig;
    onSortChange: (config: SortConfig) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({ currentSort, onSortChange }) => {
    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange({
            field: e.target.value as SortField,
            direction: currentSort.direction,
        });
    };

    const handleDirectionToggle = () => {
        onSortChange({
            field: currentSort.field,
            direction: currentSort.direction === "asc" ? "desc" : "asc",
        });
    };

    return (
        <div className="sort-controls">
            <label className="sort-label">Sort by:</label>
            <select value={currentSort.field} onChange={handleFieldChange} className="sort-select">
                <option value="symbol">Symbol</option>
                <option value="quantity">Quantity</option>
                <option value="avgCost">Avg Cost</option>
                <option value="costBasis">Cost Basis</option>
                <option value="livePrice">Live Price</option>
                <option value="unrealizedPL">Unrealized P/L</option>
                <option value="unrealizedPLPct">Unrealized P/L %</option>
            </select>
            <button onClick={handleDirectionToggle} className="sort-direction-button" title={currentSort.direction === "asc" ? "Ascending" : "Descending"}>
                {currentSort.direction === "asc" ? "↑" : "↓"}
            </button>
        </div>
    );
};
