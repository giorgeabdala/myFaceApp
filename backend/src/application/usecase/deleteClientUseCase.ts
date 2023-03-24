import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import {Err, Ok, Result} from "ts-results";


export default class DeleteClientUseCase {
    constructor(readonly factoryRepository: IRepositoryFactory) {}

    async execute(id: string): Promise<Result<boolean, string>> {
        const repository = this.factoryRepository.getClientRepository();
        const client = await repository.findById(id);
        if (!client) return Err('Impossível deletar Cliente. Cliente não encontrado');
        await repository.delete(client);
        return Ok(true);
    }
}