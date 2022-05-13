import Customer from "../../../domain/entity/customer";
import CustomerRepositoryInterface from "../../../domain/repository/customer.repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map((customer) => ({
               id: customer.id,
               name: customer.name,
               address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
               },
            }))
        }
    }
}

export default class ListCustomerUseCase {
    private CustomerRepository: CustomerRepositoryInterface;

    constructor(CustomerRepository: CustomerRepositoryInterface) {
        this.CustomerRepository = CustomerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.CustomerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}