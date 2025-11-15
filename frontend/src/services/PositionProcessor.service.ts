import type { Order, OrderLeg, PortfolioPosition } from "../interfaces";
import { NumberParser } from "../utils/NumberParser.util";
import { PriceCalculator } from "../utils/PriceCalculator.util";

// Single Responsibility: Process individual order legs and update positions
export class PositionProcessor {
    public processLeg(order: Order, leg: OrderLeg, positions: Record<string, PortfolioPosition>): void {
        const execQty = NumberParser.parse(leg.ExecQuantity) ?? 0;

        if (execQty <= 0) {
            return; // Ignore non-filled legs
        }

        const price = PriceCalculator.getExecutionPrice(leg, order);

        if (price === null) {
            return; // Skip if no price reference
        }

        const symbol = leg.Symbol;

        if (!symbol) {
            return;
        }

        if (!positions[symbol]) {
            positions[symbol] = { totalCost: 0, quantity: 0 };
        }

        const position = positions[symbol];

        if (leg.OpenOrClose === "Open") {
            this.processOpenPosition(leg, position, execQty, price);
        } else if (leg.OpenOrClose === "Close") {
            this.processClosePosition(leg, position, execQty);
        }
    }

    private processOpenPosition(leg: OrderLeg, position: PortfolioPosition, execQty: number, price: number): void {
        if (leg.BuyOrSell === "Buy") {
            // Long open
            position.totalCost += execQty * price;
            position.quantity += execQty;
        } else if (leg.BuyOrSell === "Sell") {
            // Short open / credit
            position.totalCost += execQty * price;
            position.quantity -= execQty;
        }
    }

    private processClosePosition(leg: OrderLeg, position: PortfolioPosition, execQty: number): void {
        if (position.quantity === 0) {
            return;
        }

        const avgCost = position.totalCost / Math.abs(position.quantity);

        if (leg.BuyOrSell === "Sell") {
            // Closing long (reduce positive quantity)
            position.quantity -= execQty;
            position.totalCost -= avgCost * execQty;
        } else if (leg.BuyOrSell === "Buy") {
            // Closing short (reduce negative quantity toward zero)
            position.quantity += execQty;
            position.totalCost -= avgCost * execQty;
        }
    }
}
