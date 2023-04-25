import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import {Err, Ok, Result} from "ts-results";
import {Client} from "../../domain/entities/client";


export default class GetClientUseCase {
    constructor(readonly factoryRepository: IRepositoryFactory) {}

    public async execute(id: string): Promise<Result<Client, string>> {
        const client = await this.factoryRepository.getClientRepository().findById(id);
        if (!client) return new Err('Erro ao buscar cliente');
        return Ok<Client>(client);
    }
}