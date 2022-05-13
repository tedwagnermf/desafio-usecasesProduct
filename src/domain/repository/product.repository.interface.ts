import Product from "../entity/product";
import RepositoryInterface from "./repositoryinterface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {}