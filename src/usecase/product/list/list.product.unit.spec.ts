import Product from "../../../domain/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product(
    "1",
    "Um",
    1,
);

const product2 = new Product(
    "2",
    "Dois",
    2,
);

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    }
}

describe("Unit test for list product use case", () => {
  it("should list a product", async () => {
    const repository = mockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  })
})