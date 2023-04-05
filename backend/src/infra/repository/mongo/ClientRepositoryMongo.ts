import IClientRepository from "../../../domain/adapters/IClientRepository";
import IConnection from "../../../domain/adapters/IConnection";
import {Client} from "../../../domain/entities/client";
import ClientSchema from "../../db/mongo/clientSchema";


export default class ClientRepositoryMongo implements IClientRepository {
    private readonly connection: IConnection;

    constructor(connection: IConnection) {
        this.connection = connection;
    }


    private async getClientModel(): Promise<any> {
        const db = await this.connection.connect();
        const clientSchema = new ClientSchema();
        return db.model('ClientSchema', clientSchema.getSchema(), 'client');
    }

    private async getClientDocument(client: Client): Promise<any> {
        const clientModel = await this.getClientModel();
        return new clientModel(new ClientSchema().getClientObject(client));
    }


    async save(client: Client): Promise<void> {
        const clientDocument = await this.getClientDocument(client);
        await clientDocument.save();
    }

    async findById(id: string): Promise<Client> {
        const clientModel = await this.getClientModel();
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
        const clientModel = await this.getClientModel();
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
        const clientModel = await this.getClientModel();
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
        const clientModel = await this.getClientModel();
        await clientModel.deleteOne({"_id": client.id});
    }

    async update(client: Client): Promise<Client> {
        const clientModel = await this.getClientModel();
        return clientModel.updateOne({"_id": client.id}, new ClientSchema().getClientObject(client));
    }

    async findByEmail(email: string): Promise<Client> {
        const clientModel = await this.getClientModel();
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