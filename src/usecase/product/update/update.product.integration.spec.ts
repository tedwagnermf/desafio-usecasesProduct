import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/entity/product";
import ProductModel from "../../../infraestructure/db/sequelize/model/product.model";
import ProductRepository from "../../../infraestructure/repository/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product(
    "1",
    "Um",
    1,
)

const input = {
    id: product.id,
    name: "Dois",
    price: 2,
};

describe("Unit test for product update use case", () => {
    jest.setTimeout(60 * 1000);

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        await productRepository.create(product);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});