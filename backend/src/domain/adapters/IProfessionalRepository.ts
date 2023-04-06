import {Professional} from "../entities/professional";
import {Client} from "../entities/client";

export interface IProfessionalRepository {
    save(professional: Professional): Promise<void>;

    findByEmail(email: string): Promise<Professional> | undefined
    findById(id: string): Promise<Professional> | undefined
    delete(professional: Professional): Promise<void>;
    update(professional: Professional): Promise<void>;
    findAll(): Promise<Professional[]>;
}