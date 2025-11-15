import type { Order, OrderLeg } from '../interfaces';
import { NumberParser } from '../utils/NumberParser.util';

// Single Responsibility: Calculate execution price for an order leg
export class PriceCalculator {
  public static getExecutionPrice(leg: OrderLeg, order: Order): number | null {
    return (
      NumberParser.parse(leg.ExecutionPrice) ??
      NumberParser.parse(order.FilledPrice) ??
      NumberParser.parse(order.PriceUsedForBuyingPower) ??
      NumberParser.parse(order.LimitPrice) ??
      null
    );
  }
}
