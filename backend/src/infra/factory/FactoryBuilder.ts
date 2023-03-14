import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import MemoryRepositoryFactory from "./MemoryRepositoryFactory";


export default class FactoryBuilder {


    public static createFactoryRepository(): IRepositoryFactory {
        return  new MemoryRepositoryFactory();
    }


}