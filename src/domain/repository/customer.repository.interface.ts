import Customer from "../entity/customer";
import RepositoryInterface from "./repositoryinterface";

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}