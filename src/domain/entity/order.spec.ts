import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "1", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when item is empty", () => {
        expect(() => {
            let order = new Order("1", "1", []);
        }).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "1", "1", 1, 1);
        const order1 = new Order("1", "1", [item1]);

        const total1 = order1.total();

        expect(total1).toBe(1);

        const item2 = new OrderItem("2", "1", "2", 2, 2);
        const order2 = new Order("2", "2", [item1, item2]);

        const total2 = order2.total();

        expect(total2).toBe(5);
    });

    it("should throw error if the item qtd is less or equal than 0", () => {
        expect(() => {
            const item = new OrderItem("1", "1", "1", 1, 0);
            const order = new Order("1", "1", [item]);
        }).toThrowError("Quantity must be greater than 0");
    });

});