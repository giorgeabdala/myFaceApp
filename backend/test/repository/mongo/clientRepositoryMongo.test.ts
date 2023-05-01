import 'dotenv/config';
import FactoryBuilder from "../../../src/infra/factory/FactoryBuilder";
import IClientRepository from "../../../src/domain/adapters/IClientRepository";
import IRepositoryFactory from "../../../src/domain/factory/IRepositoryFactory";
import {Client} from "../../../src/domain/entities/client";
import {clientFake, clientFake2, clientFake3} from "test/dataFake/dateFake";


let factoryRepository: IRepositoryFactory;
let clientRepository: IClientRepository;


beforeEach(async () => {
    factoryRepository = FactoryBuilder.getMongoRepositoryFactory();
    clientRepository = factoryRepository.getClientRepository();

} );

describe('Testa o repository MongoDb de Client', async () => {

    it('Deve salvar um cliente', async () => {
        await clientRepository.save(clientFake);
        const client = await clientRepository.findByPhone(clientFake.cellPhone.DDD, clientFake.cellPhone.phone);
        expect(client).not.toBeNull();
        expect(client.id).toEqual(clientFake.id);
        expect(client.firstName).toEqual(clientFake.firstName);
        expect(client.lastName).toEqual(clientFake.lastName);
        expect(client.cellPhone.DDD).toEqual(clientFake.cellPhone.DDD);
        expect(client.cellPhone.phone).toEqual(clientFake.cellPhone.phone);
        expect(client.email).toEqual(clientFake.email);
        await clientRepository.delete(client);

    } );

    it('Deve atualizar um cliente', async () => {
        await clientRepository.save(clientFake);
        const updatedClient = Client.create(clientFake.id, "updated", "updated", "11", "111111111", "updated@email.com").unwrap();
        await clientRepository.update(updatedClient);

        const client = await clientRepository.findById(clientFake.id);
        expect(client).not.toBeNull();
        expect(client.id).toEqual(updatedClient.id);
        expect(client.firstName).toEqual(updatedClient.firstName);
        expect(client.lastName).toEqual(updatedClient.lastName);
        expect(client.cellPhone.DDD).toEqual(updatedClient.cellPhone.DDD);
        expect(client.cellPhone.phone).toEqual(updatedClient.cellPhone.phone);
        expect(client.email).toEqual(updatedClient.email);
        await clientRepository.delete(client);
 } );

    it('Deve deletar um cliente', async () => {
        await clientRepository.save(clientFake);
        const client = await clientRepository.findByPhone(clientFake.cellPhone.DDD, clientFake.cellPhone.phone);
        expect(client).not.toBeNull();
        await clientRepository.delete(client);
        const clientDeleted = await clientRepository.findByPhone(clientFake.cellPhone.DDD, clientFake.cellPhone.phone);
        expect(clientDeleted).toBeNull();

    } );

    it('Deve retornar um cliente pelo id', async () => {
        await clientRepository.save(clientFake);
        const client = await clientRepository.findById(clientFake.id);
        expect(client).not.toBeNull();
        expect(client.id).toEqual(clientFake.id);
        expect(client.firstName).toEqual(clientFake.firstName);
        expect(client.lastName).toEqual(clientFake.lastName);
        expect(client.cellPhone.DDD).toEqual(clientFake.cellPhone.DDD);
        expect(client.cellPhone.phone).toEqual(clientFake.cellPhone.phone);
        expect(client.email).toEqual(clientFake.email);
        await clientRepository.delete(client);
    } );

    it('Deve retornar um cliente pelo telefone', async () => {
        await clientRepository.save(clientFake);
        const client = await clientRepository.findByPhone(clientFake.cellPhone.DDD, clientFake.cellPhone.phone);
        expect(client).not.toBeNull();
        expect(client.id).toEqual(clientFake.id);
        expect(client.firstName).toEqual(clientFake.firstName);
        expect(client.lastName).toEqual(clientFake.lastName);
        expect(client.cellPhone.DDD).toEqual(clientFake.cellPhone.DDD);
        expect(client.cellPhone.phone).toEqual(clientFake.cellPhone.phone);
        expect(client.email).toEqual(clientFake.email);
        await clientRepository.delete(client);
    } );

    it('Deve retornar um cliente pelo email', async () => {
        await clientRepository.save(clientFake);
        const client = await clientRepository.findByEmail(clientFake.email);
        expect(client).not.toBeNull();
        expect(client.id).toEqual(clientFake.id);
        expect(client.firstName).toEqual(clientFake.firstName);
        expect(client.lastName).toEqual(clientFake.lastName);
        expect(client.cellPhone.DDD).toEqual(clientFake.cellPhone.DDD);
        expect(client.cellPhone.phone).toEqual(clientFake.cellPhone.phone);
        expect(client.email).toEqual(clientFake.email);
        await clientRepository.delete(client);
    } );

    it('Deve retornar todos os clientes', async () => {

        await clientRepository.save(clientFake);
        await clientRepository.save(clientFake2);
        const clients = await clientRepository.findAll();
        expect(clients).not.toBeNull();
        expect(clients.length).toBeGreaterThanOrEqual(2);

        const client = clients.find(client => client.id === clientFake.id);
        const client2 = clients.find(client => client.id === clientFake2.id);

        expect(client.id).toEqual(clientFake.id);
        expect(client.firstName).toEqual(clientFake.firstName);

        expect(client2.id).toEqual(clientFake2.id);
        expect(client2.firstName).toEqual(clientFake2.firstName);

        await clientRepository.delete(clientFake);
        await clientRepository.delete(clientFake2);

    } );

    it('Deve buscar clientes por nome', async () => {
            await clientRepository.save(clientFake);
            const clients = await clientRepository.findByName(clientFake.firstName);
            expect(clients).not.toBeNull();
            expect(clients.length).toBeGreaterThanOrEqual(1);

            expect(clients[0].id).toEqual(clientFake.id);
            expect(clients[0].firstName).toEqual(clientFake.firstName);

            await clientRepository.delete(clientFake);

    } );

    afterEach(async () => {
        await clientRepository.delete(clientFake);
        await clientRepository.delete(clientFake2);
        await clientRepository.delete(clientFake3);
    } );





} );