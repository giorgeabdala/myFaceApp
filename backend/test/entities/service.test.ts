import jest from 'jest';
import { Service } from '../src/domain/entities/service';

describe('Deve testar a criação de técnicas', () => {
    it('Deve criar uma técnica válida', () => {
        const technique = Service.create('2','VolumeRusso', 'VolumeRussoVolumeRusso').getValue();
        expect(technique.id).toBe('2');
        expect(technique.name).toBe('VolumeRusso');
        expect(technique.description).toBe('VolumeRussoVolumeRusso');
    } );
    it('Deve lançar um erro ao criar uma técnica com nome inválido', () => {
        expect(() => Service.create('1', 'V', 'VolumeRussoVolumeRusso').isFailure);
    } );
    it('Deve lançar um erro ao criar uma técnica com descrição inválida', () => {
        const serviceName = "A".repeat(101);
        expect(() =>  Service.create('1', 'VolumeRusso', serviceName).isFailure);
    } );
} );