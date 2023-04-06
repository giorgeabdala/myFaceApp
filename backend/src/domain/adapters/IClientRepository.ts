import {Client} from "../entities/client";

export default interface IClientRepository {
    save(client: Client): Promise<void>;
    findById(id: string): Promise<Client>;
    findByPhone(DDD: string, number: string): Promise<Client>;
    findAll(): Promise<Client[]>;
    delete(client: Client): Promise<void>;
    update(client: Client): Promise<void>;
    findByEmail(email: string): Promise<Client>;
}