import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/entity/product";
import ProductModel from "../../../infraestructure/db/sequelize/model/product.model";
import ProductRepository from "../../../infraestructure/repository/product.repository";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("id", "name", 1);

describe("Test find product use case", () => {
    jest.setTimeout(60 * 1000);

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

    it("Should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = new Product("1", "Um", 1);
        await productRepository.create(product);

        const input = {
            id: "1"
        }

        const output = {
            id: "1",
            name: "Um",
            price: 1,
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("Should not found a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1"
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found")
    });
});