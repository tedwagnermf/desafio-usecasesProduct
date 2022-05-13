import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests", () => {
    let sequelize: Sequelize;
    jest.setTimeout(60 * 1000);

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close;
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Um");
        const address = new Address("street", 1, "zip", "city");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Um");
        const address = new Address("street", 1, "zip", "city");
        customer.Address = address;
        await customerRepository.create(customer);

        customer.changeName("Dois");

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: "Dois",
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Um");
        const address = new Address("street", 1, "zip", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id)

        expect(customer).toStrictEqual(customerResult);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("456ABC");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        
        const customer1 = new Customer("123", "Customer 1");
        const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer1.Address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();
    
        const customer2 = new Customer("456", "Customer 2");
        const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer2.Address = address2;
        customer2.addRewardPoints(20);
    
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
    
        const customers = await customerRepository.findAll();
    
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
      });
});