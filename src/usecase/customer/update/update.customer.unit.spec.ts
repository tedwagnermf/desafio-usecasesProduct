import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/entity/address";
import CustomerRepository from "../../../infraestructure/repository/customer.repository";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 123, "Zip", "City")
)

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Update",
        city: "City Updated"
    },
};

const mockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    };
};

describe("Unit test for customer update use case", () => {
    it("Should update a customer", async () => {
        const customerRepository = mockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});