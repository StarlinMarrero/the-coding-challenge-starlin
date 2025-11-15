// Single Responsibility: Number formatting utilities
export class NumberFormatter {
    private static readonly CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    private static readonly FALLBACK_VALUE = "—";

    public static formatCurrency(value: number | null): string {
        if (value === null || isNaN(value)) {
            return this.FALLBACK_VALUE;
        }
        return this.CURRENCY_FORMATTER.format(value);
    }

    public static formatNumber(value: number | null, decimals: number = 2): string {
        if (value === null || isNaN(value)) {
            return this.FALLBACK_VALUE;
        }
        return value.toFixed(decimals);
    }

    public static formatPercentage(value: number | null, decimals: number = 2): string {
        if (value === null || isNaN(value)) {
            return this.FALLBACK_VALUE;
        }
        return `${value.toFixed(decimals)}%`;
    }
}
