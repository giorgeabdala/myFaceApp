import { Ok, Err, Result } from 'ts-results';
import IClientRepository from "../../domain/adapters/IClientRepository";
import GetClientsOutput from "../dto/getClientsOutput";

export default class GetClients {

    constructor(readonly clientRepository: IClientRepository){}

    public async execute(): Promise<Result<GetClientsOutput[],string>> {
        const clients = await this.clientRepository.findAll();
        if (!clients) return new Err('Erro ao buscar Clientes');
        const clientsOtput: GetClientsOutput[] = [];
        clients.forEach(client => {
            clientsOtput.push(new GetClientsOutput(
                client.id,
                client.name,
                client.lastName,
                client.cellPhone.DDD,
                client.cellPhone.number,
                client.email));
        } )
        return Ok<GetClientsOutput[]>(clientsOtput);
    }
}