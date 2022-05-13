"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("./Address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("should throw erro when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "Jo�o");
        }).toThrowError("Id is required");
    });
    it("should throw erro when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("1", "");
        }).toThrowError("Name is required");
    });
    it("should change name", () => {
        const customer = new customer_1.default("1", "Um");
        customer.changeName("Dois");
        expect(customer.name).toBe("Dois");
        ;
    });
    it("should activate customer", () => {
        const customer = new customer_1.default("1", "Um");
        const address = new Address_1.default("street", 1, "zip", "city");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new customer_1.default("1", "Um");
            customer.activate();
        }).toThrowError("Address is mandotory to activate a customer");
    });
    it("should deactivate customer", () => {
        const customer = new customer_1.default("1", "Um");
        customer.deactive();
        expect(customer.isActive()).toBe(false);
    });
});
