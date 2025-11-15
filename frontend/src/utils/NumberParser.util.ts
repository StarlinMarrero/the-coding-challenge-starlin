// Single Responsibility: String to number parsing
export class NumberParser {
    public static parse(value: string | undefined | null): number | null {
        if (!value) {
            return null;
        }

        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    }

    public static parseOrDefault(value: string | undefined | null, defaultValue: number): number {
        const parsed = this.parse(value);
        return parsed ?? defaultValue;
    }
}
