import {Professional} from '../../../domain/entities/professional';
import { IProfessionalRepository } from '../../../domain/adapters/IProfessionalRepository';

export default class ProfessionalRepositoryMemory implements IProfessionalRepository {

    private professionals: Professional[] = [];

    constructor() {
        this.professionals = [
            Professional.create('1', 'João', '11', '999999999', 'joao@gmail.com').unwrap(),
            Professional.create('2', 'Maria', '11', '999999999', 'maria@gmail.com').unwrap(),
            Professional.create('3', 'José', '11', '999999999', 'jose@gmail.com').unwrap()];
    }

    async findByEmail(email: string): Promise<Professional> {
        const professional = this.professionals.find(professional => professional.getEmail() === email);
        return Promise.resolve(professional);
    }

    async save(professional: Professional): Promise<void> {
           this.professionals.push(professional);
    }

    findById(id: string): Promise<Professional> | undefined {
        const professional = this.professionals.find(professional => professional.getId() === id);
        return Promise.resolve(professional);
    }
}