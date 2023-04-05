import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import IClientRepository from "../../domain/adapters/IClientRepository";
import {UpdateClientInput, UpdateClientOutput} from "../dto/updateClientInputDTO";
import {Err, Ok, Result} from "ts-results";
import {Client} from "../../domain/entities/client";


export default class UpdateClientUseCase {
    private clientRepository: IClientRepository;

    constructor(readonly factoryRepository: IRepositoryFactory) {
        this.clientRepository = factoryRepository.getClientRepository();
    }

    public async execute(input: UpdateClientInput): Promise<Result<UpdateClientOutput, string>> {
        const clientOrError = Client.create(input.id, input.firstName, input.lastName, input.DDD, input.phone, input.email);
        if (clientOrError.err) return new Err("Erro ao validar Client"  + clientOrError.val);
        const client = clientOrError.unwrap();
        const updatedClient = await this.clientRepository.update(client);
        if (!updatedClient) return new Err('Erro ao atualizar cliente. Cliente não encontrado');

        const output = new UpdateClientOutput(
            client.id,
            client.firstName,
            client.lastName,
            client.cellPhone.DDD,
            client.cellPhone.phone,
            client.email);

        if (!output) return new Err('Erro ao atualizar cliente. Output não gerado');
        return Ok<UpdateClientOutput>(output);

    }

}