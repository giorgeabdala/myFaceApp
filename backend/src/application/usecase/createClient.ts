import {Client} from '../../domain/entities/client';
import IClientRepository from "../../domain/adapters/IClientRepository";
import {CreateClientInput, CreateClientOutput} from "../dto/createClientDTO";
import { Ok, Err, Result } from 'ts-results';
import {v4 as uuidv4} from 'uuid';


export default class CreateClient {
    constructor(readonly clientRepository: IClientRepository) {}

    async execute(input: CreateClientInput): Promise<Result<CreateClientOutput,string>> {
        const id = uuidv4();
        const clientOrError = Client.create(id,input.firstName, input.lastName, input.DDD, input.number, input.email);
        if (clientOrError.err) return new Err(clientOrError.val);
        const client = clientOrError.unwrap();
        await this.clientRepository.save(client);
        const output = new CreateClientOutput(
            client.id,
            client.firstName,
            client.lastName,
            client.cellPhone.DDD,
            client.cellPhone.number,
            client.email);
        if (!output) return new Err('Erro ao criar Cliente');

        return Ok<CreateClientOutput>(output);
    }


}