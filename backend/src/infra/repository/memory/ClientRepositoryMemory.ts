import {Client} from "../../../domain/entities/client";
import IClientRepository from "../../../domain/adapters/IClientRepository";

export default class ClientRepositoryMemory implements IClientRepository {

    private clients: Client[] = [];

    constructor() {
        this.clients = [
            Client.create('1', 'João', '41', '995691111', 'giorgeabdala@gmail.com').unwrap(),
            Client.create('2', 'Maria', '41', '999974122', 'giorgeabdala@gmail.com').unwrap(),
            Client.create('3', "José", '11', '999999999', 'giorgeabdala@gmail.com').unwrap(),
        ];
    }

    async save(client: Client): Promise<void> {
        this.clients.push(client);
    }

    public async findById(id: string): Promise<Client> {
        return Promise.resolve(this.clients.find(client => client.id === id));
    }

    public async findByPhone(DDD: string, number: string): Promise<Client> {
        return Promise.resolve(this.clients.find(client => client.cellPhone.DDD === DDD && client.cellPhone.number === number));
    }

    public async findAll(): Promise<Client[]> {
        return Promise.resolve(this.clients);
    }

}