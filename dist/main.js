"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("./entity/Address"));
const customer_1 = __importDefault(require("./entity/customer"));
const order_1 = __importDefault(require("./entity/order"));
const order_item_1 = __importDefault(require("./entity/order_item"));
let customer = new customer_1.default("123", "Ted Wagner");
const address = new Address_1.default("Rua um", 1, "zip", "city");
customer.Address = address;
customer.activate();
const item1 = new order_item_1.default("1", "Um", 1, 1);
const item2 = new order_item_1.default("2", "Dois", 2, 1);
const orde = new order_1.default("1", "1", [item1, item2]);
