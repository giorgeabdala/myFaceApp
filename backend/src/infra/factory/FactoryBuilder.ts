import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import MemoryRepositoryFactory from "./MemoryRepositoryFactory";


export default class FactoryBuilder {


    public static getFactoryRepository(): IRepositoryFactory {
        return  new MemoryRepositoryFactory();
    }


}