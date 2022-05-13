import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service units testes", () => {
    it("should get total of all orders", () => {
        const item1 = new OrderItem("1", "1", "1", 100, 1);
        const item2 = new OrderItem("2", "1", "2", 200, 2);

        const order1 = new Order("1", "1", [item1]);
        const order2 = new Order("2", "2", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });

    it("should place an order", () => {
        const customer = new Customer("1", "Um");
        
        const item1 = new OrderItem("1", "1", "1", 10, 1);
        const item2 = new OrderItem("2", "1", "2", 20, 2);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

});