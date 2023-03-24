import {Professional} from '../../../domain/entities/professional';
import { IProfessionalRepository } from '../../../domain/adapters/IProfessionalRepository';

export default class ProfessionalRepositoryMemory implements IProfessionalRepository {

    private professionals: Professional[] = [];

    constructor() {
        this.professionals = [
            Professional.create('1', 'Mara','last', '11', '999999999', 'joao@gmail.com', 'j2ialadmckmcdne2i7bmfvsovs@group.calendar.google.com').unwrap(),
            Professional.create('2', 'Maria', 'last','11', '999999999', 'maria@gmail.com').unwrap(),
            Professional.create('3', 'José', 'last', '11', '999999999', 'jose@gmail.com').unwrap()];
    }

    async findByEmail(email: string): Promise<Professional> {
        const professional = this.professionals.find(professional => professional.email === email);
        return Promise.resolve(professional);
    }

    async save(professional: Professional): Promise<void> {
           this.professionals.push(professional);
    }

    async findById(id: string): Promise<Professional> | undefined {
        const professional = this.professionals.find(professional => professional.id === id);
        return Promise.resolve(professional);
    }

    async delete(professional: Professional): Promise<void> {
        const index = this.professionals.indexOf(professional);
        this.professionals.splice(index, 1);
    }

    async update(professional: Professional): Promise<Professional> {
        const index = this.professionals.findIndex(p => p.id === professional.id);
        this.professionals[index] = professional;
        return Promise.resolve(professional);
    }


}