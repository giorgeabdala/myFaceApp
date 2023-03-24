import {Professional} from "../entities/professional";

export interface IProfessionalRepository {
    save(professional: Professional): Promise<void>;

    findByEmail(email: string): Promise<Professional> | undefined
    findById(id: string): Promise<Professional> | undefined
    delete(professional: Professional): Promise<void>;
}