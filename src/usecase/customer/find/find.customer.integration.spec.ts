import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import CustomerModel from "../../../infraestructure/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infraestructure/repository/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    jest.setTimeout(60 * 1000);

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "Zip", "City"); 
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                number: 123,
                zip: "Zip",
                city: "City",
            }
        }

        const result = usecase.execute(input);

        expect(result).toEqual(result);

    });
});