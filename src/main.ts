import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "Ted Wagner");
const address = new Address("Rua um", 1, "zip", "city");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "1", "Um", 1, 1);
const item2 = new OrderItem("2", "1", "Dois", 2, 1);
const orde = new Order("1", "1", [item1, item2]);


