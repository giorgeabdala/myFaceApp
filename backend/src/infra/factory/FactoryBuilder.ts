import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import MemoryRepositoryFactory from "./MemoryRepositoryFactory";
import AppointmentRepositoryMemory from "../repository/memory/AppointmentRepositoryMemory";


export default class FactoryBuilder {
    private static memoryRepository: IRepositoryFactory;


    public static getFactoryRepository(): IRepositoryFactory {
        return this.getMemoryFactoryRepository();
        //return this.getMongoFactoryRepository();
    }

    private static getMemoryFactoryRepository(): IRepositoryFactory {
        return new MemoryRepositoryFactory();
    }

    private static getMongoFactoryRepository(): IRepositoryFactory {
        return null;
    }


}