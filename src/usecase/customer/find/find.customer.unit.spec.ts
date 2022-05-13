import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import CustomerModel from "../../../infraestructure/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infraestructure/repository/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test find customer use case", () => {
    jest.setTimeout(60 * 1000);

    it("Should find a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

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

        const result = await usecase.execute(input);

        expect(result).toEqual(output);

    });

    it("Should not found a customer", async () => {
        const customerRepository = mockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        });
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123"
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found")
    });
});
