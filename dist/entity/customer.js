"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = false;
        this._id = id;
        this._name = name;
        this.validate();
    }
    get name() {
        return this._name;
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    isActive() {
        return this._active;
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandotory to activate a customer");
        }
        this._active = true;
    }
    deactive() {
        this._active = false;
    }
    set Address(address) {
        this._address = address;
    }
}
exports.default = Customer;
