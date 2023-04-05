import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import MemoryRepositoryFactory from "./MemoryRepositoryFactory";
import AppointmentRepositoryMemory from "../repository/memory/AppointmentRepositoryMemory";
import MongoRepositoryFactory from "./MongoRepositoryFactory";
import MongoDB from "../db/mongo/connection";


export default class FactoryBuilder {
    private static memoryRepository: IRepositoryFactory;


    public static getDefaultFactoryRepository(): IRepositoryFactory {
        return this.getMemoryRepositoryFactory();
        //return this.getMongoFactoryRepository();
    }

    public static getMemoryRepositoryFactory(): IRepositoryFactory {
        return new MemoryRepositoryFactory();
    }

    public static getMongoRepositoryFactory(): IRepositoryFactory {
        return new MongoRepositoryFactory(MongoDB.getInstance());
    }
}