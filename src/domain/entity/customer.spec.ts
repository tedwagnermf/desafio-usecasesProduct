import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw erro when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "João");
        }).toThrowError("Id is required");
    });

    it("should throw erro when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("1", "Um");
        customer.changeName("Dois");

        expect(customer.name).toBe("Dois");;
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Um")
        const address = new Address("street", 1, "zip", "city");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(()=> {
            const customer = new Customer("1", "Um");
            customer.activate();
        }).toThrowError("Address is mandotory to activate a customer");
      });
    
    it("should deactivate customer", () => {
        const customer = new Customer("1", "Um");

        customer.deactive();

        expect(customer.isActive()).toBe(false);
    });

    it("should add rewards points", () => {
        const customer = new Customer("1", "Um");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});