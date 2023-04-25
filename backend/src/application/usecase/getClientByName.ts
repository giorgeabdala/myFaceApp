import IClientRepository from "../../domain/adapters/IClientRepository";
import {Err, Ok, Result} from "ts-results";
import {Client} from "../../domain/entities/client";


export default class getClientByNameUseCase {
    private readonly clientRepository: IClientRepository;

    constructor(clientRepository: IClientRepository) {
        this.clientRepository = clientRepository;
    }

    async execute(name: string): Promise<Result<Client[], string>> {
        const client = await this.clientRepository.findByName(name);
        if (client.length === 0) return new Err('Client not found');
        return new Ok(client);
}
}