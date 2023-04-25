import { Ok, Err, Result } from 'ts-results';
import IClientRepository from "../../domain/adapters/IClientRepository";
import FindAllClientsOutput from "../dto/findAllClientsOutput";
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";

export default class FindAllClientsUseCase {
    private clientRepository: IClientRepository;

    constructor(readonly factoryRepository: IRepositoryFactory){
        this.clientRepository = factoryRepository.getClientRepository();
    }

    public async execute(): Promise<Result<FindAllClientsOutput[],string>> {
        const clients = await this.clientRepository.findAll();
        if (!clients) return new Ok([]);
        const clientsOtput: FindAllClientsOutput[] = [];
        clients.forEach(client => {
            clientsOtput.push(new FindAllClientsOutput(
                client.id,
                client.firstName,
                client.lastName,
                client.cellPhone.DDD,
                client.cellPhone.phone,
                client.email));
        } )
        return Ok<FindAllClientsOutput[]>(clientsOtput);
    }
}