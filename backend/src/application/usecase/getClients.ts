import {Result} from "../../utils/result";
import IClientRepository from "../../domain/adapters/IClientRepository";
import GetClientsOutput from "../dto/getClientsOutput";

export default class GetClientsUseCase {

    constructor(readonly clientRepository: IClientRepository){}

    public async execute(): Promise<Result<GetClientsOutput[]>> {
        const clients = await this.clientRepository.findAll();
        if (!clients) return Result.fail('Erro ao buscar Clientes');
        const clientsOtput: GetClientsOutput[] = [];
        clients.forEach(client => {
            clientsOtput.push(new GetClientsOutput(client.id, client.name, client.cellPhone.DDD, client.cellPhone.number, client.Email));
        } )
        return Result.ok<GetClientsOutput[]>(clientsOtput);
    }
}