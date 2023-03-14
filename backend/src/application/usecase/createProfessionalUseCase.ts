import {Professional} from "../../domain/entities/professional";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import { Ok, Err, Result } from 'ts-results';
import { v4 as uuidv4 } from 'uuid';
import {CreateProfessionalInput, CreateProfessionalOutput} from "../dto/createProfessionalDTO";
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";

export class CreateProfessionalUseCase {
    private professionalRepository: IProfessionalRepository;


    constructor(readonly factoryRepository: IRepositoryFactory) {
        this.professionalRepository = factoryRepository.getProfessionalRepository();
    }

    public async execute(input: CreateProfessionalInput): Promise<Result<CreateProfessionalOutput, string>> {
        const id = uuidv4();
        if (!id) return new Err('Erro ao criar ID de funcionário');
        const professionalOrError = Professional.create(id, input.firstName, input.lastName, input.DDD, input.number, input.email);
        if (professionalOrError.err) return new Err(professionalOrError.val);
        await this.professionalRepository.save(professionalOrError.unwrap());
        const output = new CreateProfessionalOutput(id, input.firstName, input.lastName, input.DDD, input.number, input.email);
        if (!output) return new Err('Error creating professional');
        return Ok<CreateProfessionalOutput>(output);
    }

}

