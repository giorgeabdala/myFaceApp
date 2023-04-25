import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import {Err, Ok, Result} from "ts-results";
import {Professional} from "../../domain/entities/professional";


export default class GetProfessionalUseCase {

    constructor(readonly factoryRepository: IRepositoryFactory) {}

    public async execute(id: string): Promise<Result<Professional, string>> {
        const professional = await this.factoryRepository.getProfessionalRepository().findById(id);
        if (!professional) return new Err('Erro ao buscar profissional');
        return Ok<Professional>(professional);
    }


}