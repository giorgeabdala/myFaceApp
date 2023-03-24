import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import {Err, Ok, Result} from "ts-results";


export default class DeleteProfessionalUseCase {
    constructor(readonly factoryRepository: IRepositoryFactory) {}

    async execute(id: string): Promise<Result<boolean, string>> {
        const repository = this.factoryRepository.getProfessionalRepository();
        const professional = await repository.findById(id);
        if (!professional) return Err('Impossível deletar Profissional. Profissional não encontrado');
        await repository.delete(professional);
        return Ok(true);
    }
}