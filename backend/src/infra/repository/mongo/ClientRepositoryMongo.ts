import IClientRepository from "../../../domain/adapters/IClientRepository";
import IConnection from "../../../domain/adapters/IConnection";
import {Client} from "../../../domain/entities/client";
import {clientSchema} from "../../db/mongo/clientSchema";


export default class ClientRepositoryMongo implements IClientRepository {
    private readonly connection: IConnection;

    constructor(connection: IConnection) {
        this.connection = connection;
    }


    async save(client: Client): Promise<void> {
        const db = await this.connection.connect();
        const clientModel = db.model('ClientSchema', clientSchema, 'client');
        const clientDocument = new clientModel(client.toObject());
        await clientDocument.save();
    }

    async findById(id: string): Promise<Client> {
        const db = await this.connection.connect();
        const clientModel = await db.model('ClientSchema', clientSchema, 'client');
        const clientDocument = await clientModel.findById(id);
        if (!clientDocument) return null;
        return Client.create(clientDocument.id,
            clientDocument.name.firstName,
            clientDocument.name.lastName,
            clientDocument.cellPhone.DDD,
            clientDocument.cellPhone.phone,
            clientDocument.email).unwrap();
    }f

    async findByPhone(DDD: string, number: string): Promise<Client> {
        const db = await this.connection.connect();
        const clientModel = await db.model('ClientSchema', clientSchema, 'client');
        const clientDocument = await clientModel.findOne({cellPhone: {DDD: DDD, phone: number}});
        if (!clientDocument) return null;
        return Client.create(clientDocument._id,
            clientDocument.name.firstName,
            clientDocument.name.lastName,
            clientDocument.cellPhone.DDD,
            clientDocument.cellPhone.phone,
            clientDocument.email).unwrap();
    }

    async findAll(): Promise<Client[]> {
        const db = await this.connection.connect();
        const clientModel = await db.model('ClientSchema', clientSchema, 'client');
        const clientDocuments = await clientModel.find();
        if (!clientDocuments) return null;
        return clientDocuments.map(clientDocument => Client.create(clientDocument.id,
            clientDocument.name.firstName,
            clientDocument.name.lastName,
            clientDocument.cellPhone.DDD,
            clientDocument.cellPhone.phone,
            clientDocument.email).unwrap());
    }

    async delete(client: Client): Promise<void> {
        const db = await this.connection.connect();
        const clientModel = await db.model('ClientSchema', clientSchema, 'client');
        await clientModel.deleteOne({"_id": client.id});
    }

    async update(client: Client): Promise<Client> {
        const db = await this.connection.connect();
        const clientModel = await db.model('ClientSchema', clientSchema, 'client');
        return clientModel.updateOne({"_id": client.id}, client.toObject());
    }

    async findByEmail(email: string): Promise<Client> {
        const db = await this.connection.connect();
        const clientModel = await db.model('ClientSchema', clientSchema, 'client');
        const clientDocument = await clientModel.findOne({email: email});
        if (!clientDocument) return null;
        return Client.create(clientDocument.id,
            clientDocument.name.firstName,
            clientDocument.name.lastName,
            clientDocument.cellPhone.DDD,
            clientDocument.cellPhone.phone,
            clientDocument.email).unwrap();
    }

}