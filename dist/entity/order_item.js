"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, productId, price, quantity) {
        this._id = id;
        this._productId = productId;
        this._price = price;
        this._quantity = quantity;
    }
    get price() {
        return this._price;
    }
    get quantity() {
        return this._quantity;
    }
}
exports.default = OrderItem;
