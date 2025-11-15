import React from "react";
import type { FilterConfig } from "../interfaces/PortfolioFilters.interface";

interface FilterControlsProps {
    currentFilter: FilterConfig;
    onFilterChange: (config: FilterConfig) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({ currentFilter, onFilterChange }) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({
            ...currentFilter,
            searchTerm: e.target.value,
        });
    };

    const handleProfitableToggle = () => {
        onFilterChange({
            ...currentFilter,
            showOnlyProfitable: !currentFilter.showOnlyProfitable,
            showOnlyLosing: false,
        });
    };

    const handleLosingToggle = () => {
        onFilterChange({
            ...currentFilter,
            showOnlyLosing: !currentFilter.showOnlyLosing,
            showOnlyProfitable: false,
        });
    };

    const handleClearFilters = () => {
        onFilterChange({
            searchTerm: "",
            showOnlyProfitable: false,
            showOnlyLosing: false,
        });
    };

    const hasActiveFilters = currentFilter.searchTerm || currentFilter.showOnlyProfitable || currentFilter.showOnlyLosing;

    return (
        <div className="filter-controls">
            <input type="text" placeholder="Search symbols..." value={currentFilter.searchTerm} onChange={handleSearchChange} className="filter-search-input" />
            <div className="filter-checkboxes">
                <label className="filter-checkbox-label">
                    <input type="checkbox" checked={currentFilter.showOnlyProfitable} onChange={handleProfitableToggle} />
                    Profitable Only
                </label>
                <label className="filter-checkbox-label">
                    <input type="checkbox" checked={currentFilter.showOnlyLosing} onChange={handleLosingToggle} />
                    Losing Only
                </label>
            </div>
            {hasActiveFilters && (
                <button onClick={handleClearFilters} className="filter-clear-button">
                    Clear Filters
                </button>
            )}
        </div>
    );
};
