import { useState, useMemo } from "react";
import { QuickLinks } from "./components/QuickLinks.component";
import { PortfolioHeader } from "./components/PortfolioHeader.component";
import { PortfolioTable } from "./components/PortfolioTable.component";
import { ErrorMessage } from "./components/ErrorMessage.component";
import { SortControls } from "./components/SortControls.component";
import { FilterControls } from "./components/FilterControls.component";
import { GroupedView } from "./components/GroupedView.component";
import { usePortfolioData } from "./hooks/usePortfolioData.hook";
import { useAutoRefresh } from "./hooks/useAutoRefresh.hook";
import { PortfolioSorter, PortfolioFilter } from "./utils/PortfolioSorter.util";
import { PositionGrouper } from "./utils/PositionGrouper.util";
import { CsvExporter } from "./utils/CsvExporter.util";
import type { SortConfig, FilterConfig } from "./interfaces/PortfolioFilters.interface";

function Index() {
    const { rows, isLoading, error, fetchAllData, refreshPricesOnly } = usePortfolioData();

    const { isEnabled: isAutoRefreshEnabled, toggle: toggleAutoRefresh } = useAutoRefresh(refreshPricesOnly);

    const [sortConfig, setSortConfig] = useState<SortConfig>({
        field: "symbol",
        direction: "asc",
    });

    const [filterConfig, setFilterConfig] = useState<FilterConfig>({
        searchTerm: "",
        showOnlyProfitable: false,
        showOnlyLosing: false,
    });

    const [viewMode, setViewMode] = useState<"table" | "grouped">("table");

    const processedRows = useMemo(() => {
        let processed = PortfolioFilter.filter(rows, filterConfig);
        processed = PortfolioSorter.sort(processed, sortConfig);
        return processed;
    }, [rows, sortConfig, filterConfig]);

    const groupedPositions = useMemo(() => {
        return PositionGrouper.groupByUnderlying(processedRows);
    }, [processedRows]);

    const handleExportCsv = () => {
        const timestamp = new Date().toISOString().split("T")[0];
        CsvExporter.exportToCsv(processedRows, `portfolio-${timestamp}.csv`);
    };

    const toggleViewMode = () => {
        setViewMode((prev) => (prev === "table" ? "grouped" : "table"));
    };

    return (
        <div className="container">
            <QuickLinks />

            <PortfolioHeader onReloadAll={fetchAllData} onRefreshPrices={refreshPricesOnly} onToggleAutoRefresh={toggleAutoRefresh} isAutoRefreshEnabled={isAutoRefreshEnabled} isLoading={isLoading} />

            <ErrorMessage message={error} />

            {/* Bonus Features Controls */}
            <div className="bonus-features-bar">
                <SortControls currentSort={sortConfig} onSortChange={setSortConfig} />
                <FilterControls currentFilter={filterConfig} onFilterChange={setFilterConfig} />
                <div className="view-controls">
                    <button onClick={toggleViewMode} className="portfolio-button view-toggle-button">
                        {viewMode === "table" ? "📊 Group by Underlying" : "📋 Table View"}
                    </button>
                    <button onClick={handleExportCsv} className="portfolio-button export-button" disabled={processedRows.length === 0}>
                        📥 Export CSV
                    </button>
                </div>
            </div>

            {viewMode === "table" ? <PortfolioTable rows={processedRows} isLoading={isLoading} /> : <GroupedView groups={groupedPositions} />}
        </div>
    );
}

export default Index;
