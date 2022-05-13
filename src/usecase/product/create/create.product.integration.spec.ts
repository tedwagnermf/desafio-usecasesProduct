import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infraestructure/db/sequelize/model/product.model";
import ProductRepository from "../../../infraestructure/repository/product.repository";
import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "name",
    price: 1,
}

describe("Unit test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("Should throw an error when name is missing", async() => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = ""

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        )
    });

    it("Should throw an error when price is less than zero", async() => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "name"
        input.price = -1

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than 0"
        )
    });

});