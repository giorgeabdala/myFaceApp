import {professionalFake, professionalFake2, professionalFake3} from "./dateFake";
import IRepositoryFactory from "../../../src/domain/factory/IRepositoryFactory";
import {IProfessionalRepository} from "../../../src/domain/adapters/IProfessionalRepository";
import FactoryBuilder from "../../../src/infra/factory/FactoryBuilder";
import {Professional} from "../../../src/domain/entities/professional";

let factoryRepository: IRepositoryFactory;
let professionalRepository: IProfessionalRepository;

beforeEach(async () => {
    factoryRepository = FactoryBuilder.getMongoRepositoryFactory();
    professionalRepository = factoryRepository.getProfessionalRepository();
} );


describe('ProfessionalRepositoryMongo', () => {

    it('Deve salvar um profissional', async () => {
        await professionalRepository.save(professionalFake);
        const professional = await professionalRepository.findById(professionalFake.id);
        expect(professional).not.toBeNull();
        expect(professional.id).toEqual(professionalFake.id);
        expect(professional.firstName).toEqual(professionalFake.firstName);
        expect(professional.lastName).toEqual(professionalFake.lastName);
        expect(professional.cellPhone.DDD).toEqual(professionalFake.cellPhone.DDD);
        expect(professional.cellPhone.phone).toEqual(professionalFake.cellPhone.phone);
        expect(professional.email).toEqual(professionalFake.email);
        await professionalRepository.delete(professional);
    });

    it('Deve atualizar um profissional', async () => {
        await professionalRepository.save(professionalFake);
        const updatedProfessional = Professional.create(professionalFake.id,
            "updated",
            "updated",
            "33", "111111111",
            "updated@email.com", '3').unwrap();
        await professionalRepository.update(updatedProfessional);
        const professional = await professionalRepository.findById(professionalFake.id);
        expect(professional).not.toBeNull();
        expect(professional.id).toEqual(updatedProfessional.id);
        expect(professional.firstName).toEqual(updatedProfessional.firstName);
        expect(professional.lastName).toEqual(updatedProfessional.lastName);
        expect(professional.cellPhone.DDD).toEqual(updatedProfessional.cellPhone.DDD);
        expect(professional.cellPhone.phone).toEqual(updatedProfessional.cellPhone.phone);
        expect(professional.email).toEqual(updatedProfessional.email);
        await professionalRepository.delete(professional);
    });

    it('Deve deletar um profissional', async () => {
        await professionalRepository.save(professionalFake);
        const professional = await professionalRepository.findById(professionalFake.id);
        expect(professional).not.toBeNull();
        await professionalRepository.delete(professional);
        const professionalDeleted = await professionalRepository.findById(professionalFake.id);
        expect(professionalDeleted).toBeNull();
    });

    it('Deve retornar um profissional pelo id', async () => {
        await professionalRepository.save(professionalFake);
        const professional = await professionalRepository.findById(professionalFake.id);
        expect(professional).not.toBeNull();
        expect(professional.id).toEqual(professionalFake.id);
        expect(professional.firstName).toEqual(professionalFake.firstName);
        expect(professional.lastName).toEqual(professionalFake.lastName);
        expect(professional.cellPhone.DDD).toEqual(professionalFake.cellPhone.DDD);
        expect(professional.cellPhone.phone).toEqual(professionalFake.cellPhone.phone);
        expect(professional.email).toEqual(professionalFake.email);
        await professionalRepository.delete(professional);
    });

    it('Deve retornar um profissional pelo email', async () => {
        await professionalRepository.save(professionalFake);
        const professional = await professionalRepository.findByEmail(professionalFake.email);
        expect(professional).not.toBeNull();
        expect(professional.id).toEqual(professionalFake.id);
        expect(professional.firstName).toEqual(professionalFake.firstName);
        expect(professional.lastName).toEqual(professionalFake.lastName);
        expect(professional.cellPhone.DDD).toEqual(professionalFake.cellPhone.DDD);
        expect(professional.cellPhone.phone).toEqual(professionalFake.cellPhone.phone);
        expect(professional.email).toEqual(professionalFake.email);
        await professionalRepository.delete(professional);
    });

    it('Deve retornar todos os profissionais', async () => {
        await professionalRepository.save(professionalFake);
        await professionalRepository.save(professionalFake2);
        await professionalRepository.save(professionalFake3);
        const professionals = await professionalRepository.findAll();
        expect(professionals).not.toBeNull();
        expect(professionals.length).toEqual(3);
        expect(professionals[0].id).toEqual(professionalFake.id);
        expect(professionals[0].firstName).toEqual(professionalFake.firstName);

        expect(professionals[1].id).toEqual(professionalFake2.id);
        expect(professionals[1].firstName).toEqual(professionalFake2.firstName);

        expect(professionals[2].id).toEqual(professionalFake3.id);
        expect(professionals[2].firstName).toEqual(professionalFake3.firstName);
        await professionalRepository.delete(professionals[0]);
        await professionalRepository.delete(professionals[1]);
        await professionalRepository.delete(professionals[2]);
    });

});

afterEach(async () => {
    await professionalRepository.delete(professionalFake);
    await professionalRepository.delete(professionalFake2);
    await professionalRepository.delete(professionalFake3);
} );