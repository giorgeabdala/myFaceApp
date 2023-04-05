import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import IClientRepository from "../../domain/adapters/IClientRepository";
import MongoDB from "../db/mongo/connection";
import ClientRepositoryMongo from "../repository/mongo/ClientRepositoryMongo";
import ProfessionalRepositoryMongo from "../repository/mongo/ProfessionalRepositoryMongo";


export default class MongoRepositoryFactory implements IRepositoryFactory {

    private readonly connection: MongoDB;

    constructor(connection: MongoDB) {
        this.connection = connection;
    }

    public getAppointmentsRepository(): IAppointmentRepository {
        return undefined;
    }

    public getClientRepository(): IClientRepository {
        return new ClientRepositoryMongo(this.connection);
    }

    public getProfessionalRepository(): IProfessionalRepository {
        return new ProfessionalRepositoryMongo(this.connection);
    }

}