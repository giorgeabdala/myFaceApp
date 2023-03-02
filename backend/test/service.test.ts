import jest from 'jest';
import { Service } from '../src/entities/service';

describe('Deve testar a criação de técnicas', () => {
    it('Deve criar uma técnica válida', () => {
        const technique = Service.create('VolumeRusso', 'VolumeRussoVolumeRusso').getValue();
        expect(technique.name).toBe('VolumeRusso');
        expect(technique.description).toBe('VolumeRussoVolumeRusso');
    } );
    it('Deve lançar um erro ao criar uma técnica com nome inválido', () => {
        expect(() => Service.create('V', 'VolumeRussoVolumeRusso').isFailure);
    } );
    it('Deve lançar um erro ao criar uma técnica com descrição inválida', () => {
        const serviceName = "A".repeat(101);
        expect(() =>  Service.create('VolumeRusso', serviceName).isFailure);
    } );
} );