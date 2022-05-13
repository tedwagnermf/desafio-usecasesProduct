"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new product_1.default("", "Um", 1);
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new product_1.default("1", "", 1);
        }).toThrowError("Name is required");
    });
    it("should throw error when price is less then 0", () => {
        expect(() => {
            const product = new product_1.default("1", "Um", -1);
        }).toThrowError("Price must be greater than 0");
    });
    it("should change name", () => {
        const product = new product_1.default("1", "Um", 1);
        product.changeName("Dois");
        expect(product.name).toBe("Dois");
    });
    it("should change price", () => {
        const product = new product_1.default("1", "Um", 1);
        product.changePrice(2);
        expect(product.price).toBe(2);
    });
});
