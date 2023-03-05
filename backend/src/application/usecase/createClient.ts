import {Client} from '../../domain/entities/client';
import IClientRepository from "../../domain/adapters/IClientRepository";
import {CreateClientInput, CreateClientOutput} from "../dto/createClientDTO";
import {Result} from "../../utils/result";
import {v4 as uuidv4} from 'uuid';


export default class CreateClientUseCase {
    constructor(readonly clientRepository: IClientRepository) {}

    async execute(input: CreateClientInput): Promise<Result<CreateClientOutput>> {
        const id = uuidv4();
        const clientOrError = Client.create(id,input.name, input.DDD, input.number, input.email);
        if (clientOrError.isFailure) return Result.fail(clientOrError.error);
        const client = clientOrError.getValue();
        await this.clientRepository.save(client);
        const output = new CreateClientOutput(client.id, client.name, client.cellPhone.DDD, client.cellPhone.number, client.Email);
        if (!output) return Result.fail('Erro ao criar Cliente');

        return Result.ok<CreateClientOutput>(output);
    }


}