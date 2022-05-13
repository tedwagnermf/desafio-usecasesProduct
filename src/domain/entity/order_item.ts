export default class OrderItem {
    private _id: string;
    private _orderId: string;
    private _productId: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, orderId: string, productId: string, price: number, quantity: number) {
        this._id = id;
        this._orderId = orderId;
        this._productId = productId;
        this._price = price;
        this._quantity = quantity;
    }

    get id(): string {
        return this._id;
    }

    get orderId(): string {
        return this._orderId;
    }

    get productId(): string {
        return this._productId;
    }

    changeProductId(productId: string) {
        this._productId = productId;
    }

    get price(): number {
        return this._price;
    }

    changePrice(price: number) {
        this._price = price;
    }

    get quantity(): number {
        return this._quantity;
    }

    changeQuantity(quantity: number) {
        this._quantity = quantity;
    }
}