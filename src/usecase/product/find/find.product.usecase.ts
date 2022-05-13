import ProductRepositoryInterface from "../../../domain/repository/product.repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    private productRespository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRespository = productRepository;
    }
    
    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRespository.find(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}