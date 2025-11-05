import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Order, OrdersResponse, LivePricesResponse } from './types.js';

// Get backend port from environment or use default
const BACKEND_PORT: number = process.env.BACKEND_PORT 
  ? parseInt(process.env.BACKEND_PORT, 10) 
  : 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT: number = BACKEND_PORT;

app.use(cors());
app.use(express.json());

// Historical orders data
const historicalData: OrdersResponse = {
  "Orders": [
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "4",
      "ClosedDateTime": "2025-09-15T14:00:41Z",
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "13.4",
      "GoodTillDate": "2025-12-14T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2026-01-16T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "4",
          "ExecQuantity": "4",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "NVDA 260116P175",
          "Underlying": "NVDA",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "13.4",
          "OptionType": "PUT",
          "StrikePrice": "175"
        }
      ],
      "OrderID": "911249493",
      "OpenedDateTime": "2025-09-15T14:00:31Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "13.5",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "1",
      "ClosedDateTime": "2025-09-12T16:17:17Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "1.97",
      "Legs": [
        {
          "ExpirationDate": "2025-09-12T00:00:00Z",
          "OpenOrClose": "Close",
          "QuantityOrdered": "1",
          "ExecQuantity": "1",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "PLTR 250912C165",
          "Underlying": "PLTR",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "1.97",
          "OptionType": "CALL",
          "StrikePrice": "165"
        }
      ],
      "OrderID": "911128864",
      "OpenedDateTime": "2025-09-12T16:17:17Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "1.85",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "1",
      "ClosedDateTime": "2025-09-10T17:07:07Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "500.47",
      "Legs": [
        {
          "OpenOrClose": "Open",
          "QuantityOrdered": "30",
          "ExecQuantity": "30",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "MSFT",
          "AssetType": "STOCK",
          "ExecutionPrice": "500.47"
        }
      ],
      "OrderID": "910783932",
      "OpenedDateTime": "2025-09-10T17:07:06Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "500.43",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "2",
      "ClosedDateTime": "2025-09-09T17:05:50Z",
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "1.71",
      "GoodTillDate": "2025-09-12T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-09-12T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "1",
          "ExecQuantity": "1",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "GOOG 250912C235",
          "Underlying": "GOOG",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "4.7",
          "OptionType": "CALL",
          "StrikePrice": "235"
        },
        {
          "ExpirationDate": "2025-09-12T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "1",
          "ExecQuantity": "1",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "GOOG 250912C237.5",
          "Underlying": "GOOG",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "2.99",
          "OptionType": "CALL",
          "StrikePrice": "237.5"
        }
      ],
      "OrderID": "910570658",
      "OpenedDateTime": "2025-09-09T17:05:22Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "4.55",
      "Routing": "Intelligent",
      "Spread": "Vertical",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": "2025-09-16T21:58:50Z",
      "Currency": "USD",
      "Duration": "GTC+",
      "FilledPrice": "0",
      "GoodTillDate": "2025-12-15T00:00:00Z",
      "Legs": [
        {
          "QuantityOrdered": "10",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "FICO",
          "AssetType": "STOCK"
        }
      ],
      "OrderID": "911520499",
      "OpenedDateTime": "2025-09-16T21:58:50Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "1553.54",
      "RejectReason": "No market or stop orders with TIF of 'Day+','GTC+','GTD+', or 'Fill-or-Kill'",
      "Routing": "Intelligent",
      "Status": "REJ",
      "StatusDescription": "Rejected",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": "2025-08-15T20:00:00Z",
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-15T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "TSLA 250815C342.5",
          "Underlying": "TSLA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "342.5"
        },
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "TSLA 250815C347.5",
          "Underlying": "TSLA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "347.5"
        }
      ],
      "LimitPrice": "1.54",
      "OrderID": "907385144",
      "OpenedDateTime": "2025-08-14T10:37:29Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "3.54",
      "Routing": "Intelligent",
      "Spread": "Vertical",
      "Status": "EXP",
      "StatusDescription": "Expired",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "1.2",
      "ClosedDateTime": "2025-08-11T13:32:22Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "339.79",
      "Legs": [
        {
          "OpenOrClose": "Close",
          "QuantityOrdered": "120",
          "ExecQuantity": "120",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "TSLA",
          "AssetType": "STOCK",
          "ExecutionPrice": "339.79"
        }
      ],
      "OrderID": "906842861",
      "OpenedDateTime": "2025-08-11T13:32:21Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "339.9701",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "20",
      "ClosedDateTime": "2025-08-07T15:08:30Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "1.7",
      "Legs": [
        {
          "ExpirationDate": "2025-08-08T00:00:00Z",
          "OpenOrClose": "Close",
          "QuantityOrdered": "20",
          "ExecQuantity": "20",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "NVDA 250808C180",
          "Underlying": "NVDA",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "1.7",
          "OptionType": "CALL",
          "StrikePrice": "180"
        }
      ],
      "OrderID": "906538665",
      "OpenedDateTime": "2025-08-07T15:08:30Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "2.69",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "5",
      "ClosedDateTime": "2025-08-26T16:21:33Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "3.8",
      "Legs": [
        {
          "ExpirationDate": "2025-08-29T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "3",
          "ExecQuantity": "1",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "GOOG 250829C207.5",
          "Underlying": "GOOG",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "3.8",
          "OptionType": "CALL",
          "StrikePrice": "207.5"
        }
      ],
      "LimitPrice": "3.8",
      "OrderID": "908868778",
      "OpenedDateTime": "2025-08-26T16:21:03Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "3.8",
      "Routing": "Intelligent",
      "Status": "FLP",
      "StatusDescription": "Partial Fill (UROut)",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": "2025-08-13T15:38:47Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Close",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "TSLA 250815C342.5",
          "Underlying": "TSLA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "342.5"
        }
      ],
      "LimitPrice": "4.85",
      "OrderID": "907270639",
      "OpenedDateTime": "2025-08-13T15:38:47Z",
      "OrderType": "StopLimit",
      "PriceUsedForBuyingPower": "4.89",
      "RejectReason": "Invalid Stop Price - Stop Price must be below current market.",
      "Routing": "Intelligent",
      "Status": "REJ",
      "StatusDescription": "Rejected",
      "StopPrice": "4.9",
      "AdvancedOptions": "STPTRG=SBA;",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    }
  ],
  "NextToken": "eyJvcmRlcklkIjoiOTA3MjcwNjM5IiwiYWNjb3VudElkIjoiU0lNWFhYWFhYTSJ9",
  "Errors": []
};

// Open orders data
const openOrdersData: OrdersResponse = {
  "Orders": [
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-29T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-29T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "2",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250829C170",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "170"
        }
      ],
      "LimitPrice": "1.3",
      "OrderID": "908794653",
      "OpenedDateTime": "2025-08-26T13:30:03Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "1.3",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-29T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-29T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "1",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "AMD 250829C165",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "165"
        }
      ],
      "LimitPrice": "5.75",
      "OrderID": "908636891",
      "OpenedDateTime": "2025-08-25T13:30:00Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "5.75",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-29T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-29T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "4",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250829C165",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "165"
        }
      ],
      "LimitPrice": "5.55",
      "OrderID": "908571651",
      "OpenedDateTime": "2025-08-22T17:01:08Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "5.55",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "10",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250815C180",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "180"
        }
      ],
      "LimitPrice": "1",
      "OrderID": "907262315",
      "OpenedDateTime": "2025-08-13T15:21:52Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "1",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250815P182.5",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "PUT",
          "StrikePrice": "182.5"
        }
      ],
      "LimitPrice": "1",
      "OrderID": "907263763",
      "OpenedDateTime": "2025-08-13T15:24:27Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "1",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250815P180",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "PUT",
          "StrikePrice": "180"
        }
      ],
      "LimitPrice": "1.87",
      "OrderID": "907199156",
      "OpenedDateTime": "2025-08-13T13:37:44Z",
      "OrderType": "StopLimit",
      "PriceUsedForBuyingPower": "1.87",
      "RejectReason": "Invalid Stop Price - Stop Price must be above current market.",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "StopPrice": "1.87",
      "AdvancedOptions": "STPTRG=SBA;",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "1",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AAPL 250815C232.5",
          "Underlying": "AAPL",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "232.5"
        }
      ],
      "LimitPrice": "1.32",
      "OrderID": "907191875",
      "OpenedDateTime": "2025-08-13T13:30:01Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "1.32",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "10",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250815C180",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "180"
        }
      ],
      "LimitPrice": "1",
      "OrderID": "907189822",
      "OpenedDateTime": "2025-08-13T13:15:54Z",
      "OrderType": "StopLimit",
      "PriceUsedForBuyingPower": "1",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "StopPrice": "3",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-22T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-22T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "AMD 250822C177.5",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "177.5"
        }
      ],
      "LimitPrice": "2.75",
      "OrderID": "907931406",
      "OpenedDateTime": "2025-08-19T12:57:01Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "2.75",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "1",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-09-12T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-09-12T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "100",
          "ExecQuantity": "0",
          "QuantityRemaining": "100",
          "BuyOrSell": "Buy",
          "Symbol": "AAPL 250912C200",
          "Underlying": "AAPL",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "200"
        }
      ],
      "LimitPrice": "5.50",
      "OrderID": "911999999",
      "OpenedDateTime": "2025-09-17T10:00:00Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "5.50",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "OpenOrClose": "Open",
          "QuantityOrdered": "50",
          "ExecQuantity": "0",
          "QuantityRemaining": "50",
          "BuyOrSell": "Buy",
          "Symbol": "TSLA",
          "AssetType": "STOCK"
        }
      ],
      "LimitPrice": "350.00",
      "OrderID": "912000000",
      "OpenedDateTime": "2025-09-17T11:00:00Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "350.00",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "2",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-09-19T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-09-19T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "2",
          "ExecQuantity": "0",
          "QuantityRemaining": "2",
          "BuyOrSell": "Buy",
          "Symbol": "NVDA 250919C190",
          "Underlying": "NVDA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "190"
        },
        {
          "ExpirationDate": "2025-09-19T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "2",
          "ExecQuantity": "0",
          "QuantityRemaining": "2",
          "BuyOrSell": "Sell",
          "Symbol": "NVDA 250919C195",
          "Underlying": "NVDA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "195"
        }
      ],
      "LimitPrice": "2.50",
      "OrderID": "912000001",
      "OpenedDateTime": "2025-09-17T12:00:00Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "2.50",
      "Routing": "Intelligent",
      "Spread": "Vertical",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    }
  ],
  "NextToken": null,
  "Errors": []
};

// Helper function to extract all symbols and their base prices from orders
function extractSymbolPrices(): Map<string, number> {
  const symbolPrices = new Map<string, number>();
  
  // Process historical orders - extract all symbols and their execution prices
  historicalData.Orders.forEach((order: Order) => {
    order.Legs.forEach((leg) => {
      // Track option symbols with execution prices
      if (leg.Symbol && leg.ExecutionPrice && parseFloat(leg.ExecutionPrice) > 0) {
        symbolPrices.set(leg.Symbol, parseFloat(leg.ExecutionPrice));
      }
      // Track stock symbols with execution prices
      if (leg.AssetType === 'STOCK' && leg.Symbol && leg.ExecutionPrice && parseFloat(leg.ExecutionPrice) > 0) {
        symbolPrices.set(leg.Symbol, parseFloat(leg.ExecutionPrice));
      }
      // Track underlying stocks from options (use strike price as approximate base)
      if (leg.Underlying && leg.AssetType === 'STOCKOPTION' && leg.StrikePrice) {
        if (!symbolPrices.has(leg.Underlying)) {
          symbolPrices.set(leg.Underlying, parseFloat(leg.StrikePrice));
        }
      }
    });
    // Use PriceUsedForBuyingPower for stocks when ExecutionPrice not available
    order.Legs.forEach((leg) => {
      if (leg.AssetType === 'STOCK' && leg.Symbol && order.PriceUsedForBuyingPower) {
        if (!symbolPrices.has(leg.Symbol)) {
          symbolPrices.set(leg.Symbol, parseFloat(order.PriceUsedForBuyingPower));
        }
      }
    });
  });
  
  // Process open orders - extract symbols and limit prices
  openOrdersData.Orders.forEach((order: Order) => {
    order.Legs.forEach((leg) => {
      // Track option symbols with limit prices
      if (leg.Symbol && order.LimitPrice && parseFloat(order.LimitPrice) > 0) {
        const currentPrice = symbolPrices.get(leg.Symbol) || 0;
        if (!symbolPrices.has(leg.Symbol) || parseFloat(order.LimitPrice) > currentPrice) {
          symbolPrices.set(leg.Symbol, parseFloat(order.LimitPrice));
        }
      }
      // Track stock symbols with limit prices
      if (leg.AssetType === 'STOCK' && leg.Symbol && order.LimitPrice && parseFloat(order.LimitPrice) > 0) {
        symbolPrices.set(leg.Symbol, parseFloat(order.LimitPrice));
      }
      // Track underlying stocks from options
      if (leg.Underlying && leg.AssetType === 'STOCKOPTION' && leg.StrikePrice) {
        if (!symbolPrices.has(leg.Underlying)) {
          symbolPrices.set(leg.Underlying, parseFloat(leg.StrikePrice));
        }
      }
    });
  });
  
  // Override with specific known prices from historical data
  symbolPrices.set('MSFT', 500.47);
  symbolPrices.set('TSLA', 350.00); // Use open order limit price
  symbolPrices.set('FICO', 1553.54);
  
  // Set reasonable defaults for underlying stocks based on strike prices seen
  // These are approximate based on the strike prices in the data
  if (!symbolPrices.has('AAPL')) symbolPrices.set('AAPL', 200.0);
  if (!symbolPrices.has('GOOG')) symbolPrices.set('GOOG', 235.0);
  if (!symbolPrices.has('NVDA')) symbolPrices.set('NVDA', 175.0);
  if (!symbolPrices.has('PLTR')) symbolPrices.set('PLTR', 165.0);
  if (!symbolPrices.has('AMD')) symbolPrices.set('AMD', 170.0);
  
  return symbolPrices;
}

// 1. Historical Data Endpoint
app.get('/api/historical-orders', (req: Request, res: Response) => {
  console.log('GET /api/historical-orders hit');
  res.json(historicalData);
});

// 2. Open Orders Endpoint
app.get('/api/open-orders', (req: Request, res: Response) => {
  console.log('GET /api/open-orders hit');
  res.json(openOrdersData);
});

// 3. Live Prices Endpoint
app.get('/api/live-prices', (req: Request, res: Response<LivePricesResponse>) => {
  console.log('GET /api/live-prices hit');
  const symbolPrices = extractSymbolPrices();
  const livePrices: LivePricesResponse = {};
  
  // Generate prices with up to 20% variation
  symbolPrices.forEach((basePrice: number, symbol: string) => {
    if (basePrice > 0) {
      // Random variation between -20% and +20%
      const variation = (Math.random() * 0.4 - 0.2); // -0.2 to +0.2
      const newPrice = basePrice * (1 + variation);
      livePrices[symbol] = newPrice.toFixed(2);
    }
  });
  
  const sortedLivePrices: LivePricesResponse = Object.keys(livePrices)
    .sort()
    .reduce((obj: LivePricesResponse, key: string) => {
      obj[key] = livePrices[key];
      return obj;
    }, {});

  res.json(sortedLivePrices);
});

// 4. README Endpoint - Serve root README.md
app.get('/api/readme', (req: Request, res: Response) => {
  console.log('GET /api/readme hit');
  try {
    // __dirname is backend/dist/, so go up two levels to reach root
    const readmePath = path.join(__dirname, '..', '..', 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(readmeContent);
  } catch (error) {
    console.error('Error reading README.md:', error);
    res.status(500).json({ error: 'Failed to load README' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

