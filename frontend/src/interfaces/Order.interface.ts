export interface OrderLeg {
    ExpirationDate?: string;
    OpenOrClose?: "Open" | "Close";
    QuantityOrdered: string;
    ExecQuantity: string;
    QuantityRemaining: string;
    BuyOrSell: "Buy" | "Sell";
    Symbol: string;
    Underlying?: string;
    AssetType: "STOCK" | "STOCKOPTION";
    ExecutionPrice?: string;
    OptionType?: "CALL" | "PUT";
    StrikePrice?: string;
}

export interface Order {
    AccountID: string;
    CommissionFee: string;
    ClosedDateTime: string | null;
    Currency: string;
    Duration: string;
    FilledPrice: string;
    GoodTillDate?: string;
    Legs: OrderLeg[];
    LimitPrice?: string;
    OrderID: string;
    OpenedDateTime: string;
    OrderType: string;
    PriceUsedForBuyingPower?: string;
    RejectReason?: string;
    Routing: string;
    Spread?: string;
    Status: string;
    StatusDescription: string;
    StopPrice?: string;
    AdvancedOptions?: string;
    ConversionRate: string;
    UnbundledRouteFee: string;
}

export interface OrdersResponse {
    Orders: Order[];
    NextToken: string | null;
    Errors: unknown[];
}
