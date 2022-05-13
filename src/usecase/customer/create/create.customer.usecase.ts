import CustomerRepositoryInterface from "../../../domain/repository/customer.repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { v4 as uuid } from 'uuid';
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/address";

export default class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customerID = uuid();
        const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city);
        const customer = new Customer(customerID, input.name);
        customer.changeAddress(address);

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                city: customer.Address.city,
                zip: customer.Address.zip,
            }
        }
    }
}