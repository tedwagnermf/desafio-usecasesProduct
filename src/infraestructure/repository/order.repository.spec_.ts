import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      "1",
      product.id,
      product.price,
      2,
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          order_id: "123",
          product_id: "123",
          price: ordemItem.price,
          quantity: ordemItem.quantity,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    
    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zip 1", "City 1");
    customer1.changeAddress(address1);
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();

    const product1 = new Product("1", "Product 1", 1);
    await productRepository.create(product1);

    const ordemItem1 = new OrderItem(
      "1",
      "1",
      product1.id,
      product1.price,
      1,
    );

    let order = new Order("1", "1", [ordemItem1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zip 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product2 = new Product("2", "Product 2", 2);
    
    await productRepository.create(product2);

  /*
    const ordemItem2 = new OrderItem(
      "2",
      "1",
      product2.id,
      product2.price,
      2,
    );
*/
  order = new Order("1", "2", [ordemItem1]);

  //order.changeCustomerId(customer2.id);

    //order.changeItems([ordemItem2]);
    // ordemItem1.changeProductId("2");
    //ordemItem1.changePrice(2);
   // ordemItem1.changeQuantity(2);
    //order.items[0].changePrice(2);
    //order.items[0].changeQuantity(2);
    
    //order.changeItems([ordemItem1]);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "2",
      total: order.total(),
      // items: [
      //   {
      //     id: "1",
      //     order_id: "1",
      //     product_id: "1",
      //     price: 2,
      //     quantity: 2,
      //   },
      // ],
    });

    // expect(orderModel.toJSON()).toStrictEqual({
    //   id: "1",
    //   customer_id: "2",
    //   total: order.total(),
    //   items: [
    //     {
    //       id: "2",
    //       order_id: "1",
    //       product_id: "2",
    //       price: 2,
    //       quantity: 2,
    //     },
    //   ],
    // });
  });
});