import type { OrdersResponse, LivePricesResponse } from '../interfaces';
import { ApiException } from '../interfaces/ApiError.interface';

// Single Responsibility: Handles HTTP requests
class HttpClient {
  private async request<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new ApiException(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }
      
      return await response.json() as T;
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        error instanceof Error ? error.message : 'Network request failed'
      );
    }
  }

  public get<T>(url: string): Promise<T> {
    return this.request<T>(url);
  }
}

// Single Responsibility: Defines API endpoints
class ApiEndpoints {
  public static readonly HISTORICAL_ORDERS = '/api/historical-orders';
  public static readonly OPEN_ORDERS = '/api/open-orders';
  public static readonly LIVE_PRICES = '/api/live-prices';
}

// Single Responsibility: Provides portfolio-specific API operations
export class PortfolioApiService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  public async fetchHistoricalOrders(): Promise<OrdersResponse> {
    return this.httpClient.get<OrdersResponse>(ApiEndpoints.HISTORICAL_ORDERS);
  }

  public async fetchOpenOrders(): Promise<OrdersResponse> {
    return this.httpClient.get<OrdersResponse>(ApiEndpoints.OPEN_ORDERS);
  }

  public async fetchLivePrices(): Promise<LivePricesResponse> {
    return this.httpClient.get<LivePricesResponse>(ApiEndpoints.LIVE_PRICES);
  }

  public async fetchAllPortfolioData(): Promise<{
    historical: OrdersResponse;
    open: OrdersResponse;
    live: LivePricesResponse;
  }> {
    const [historical, open, live] = await Promise.all([
      this.fetchHistoricalOrders(),
      this.fetchOpenOrders(),
      this.fetchLivePrices(),
    ]);

    return { historical, open, live };
  }
}
