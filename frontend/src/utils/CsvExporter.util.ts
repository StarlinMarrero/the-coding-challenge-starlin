import type { PortfolioRow } from '../interfaces/Portfolio.interface';

export class CsvExporter {
  private static readonly HEADERS = [
    'Symbol',
    'Quantity',
    'Average Cost',
    'Cost Basis',
    'Live Price',
    'Unrealized P/L',
    'Unrealized P/L %',
  ];
  
  public static exportToCsv(rows: PortfolioRow[], filename: string = 'portfolio.csv'): void {
    const csvContent = this.generateCsvContent(rows);
    this.downloadCsv(csvContent, filename);
  }
  
  private static generateCsvContent(rows: PortfolioRow[]): string {
    const headerRow = this.HEADERS.join(',');
    
    const dataRows = rows.map(row => {
      return [
        this.escapeCsvField(row.symbol),
        row.quantity,
        this.formatCurrencyForCsv(row.avgCost),
        this.formatCurrencyForCsv(row.costBasis),
        this.formatCurrencyForCsv(row.livePrice),
        this.formatCurrencyForCsv(row.unrealizedPL),
        this.formatPercentageForCsv(row.unrealizedPLPct),
      ].join(',');
    });
    
    return [headerRow, ...dataRows].join('\n');
  }
  
  private static escapeCsvField(field: string): string {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  }
  
  private static formatCurrencyForCsv(value: number | null): string {
    if (value === null || isNaN(value)) {
      return '';
    }
    return value.toFixed(2);
  }
  
  private static formatPercentageForCsv(value: number | null): string {
    if (value === null || isNaN(value)) {
      return '';
    }
    return value.toFixed(2);
  }
  
  private static downloadCsv(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
}
