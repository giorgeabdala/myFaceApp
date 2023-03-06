import {Professional} from "../../domain/entities/professional";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import {Result} from "../../utils/result";
import { v4 as uuidv4 } from 'uuid';
import {CreateProfessionalInput, CreateProfessionalOutput} from "../dto/createProfessionalDTO";

export class CreateProfessional {

    constructor(private professionalRepository: IProfessionalRepository) {
    }

    public async execute(input: CreateProfessionalInput): Promise<Result<CreateProfessionalOutput>> {
        const id = uuidv4();
        if (!id) return Result.fail('Erro ao criar ID de funcionário');
        const professionalOrError = Professional.create(id, input.name, input.DDD, input.number, input.email);
        if (professionalOrError.isFailure) return Result.fail(professionalOrError.error);
        this.professionalRepository.save(professionalOrError.getValue());
        const output = new CreateProfessionalOutput(id, input.name, input.DDD, input.number, input.email);
        if (!output) return Result.fail('Error creating professional');
        return Result.ok<CreateProfessionalOutput>(output);
    }

}

