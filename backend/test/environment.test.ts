import 'dotenv/config';
import FactoryBuilder from "../src/infra/factory/FactoryBuilder";
import MongoRepositoryFactory from "../src/infra/factory/MongoRepositoryFactory";


describe('Testa chamadas e variaveis de ambiente', () => {

    it.skip('Testa a variavel do mongo', () => {
        expect(process.env.MONGODB_URI).toBe('mongodb://mongo:27017/myface');
    } );

    it ('Testa a variavel do serviço codechat', () => {
        expect(process.env.WHATS_API_URI).toBe('http://127.0.0.1:8083/message/sendText/myface');
    } );

    it ('Testa a instancia defaultFactory', () => {
        const factory = FactoryBuilder.getDefaultFactoryRepository();
        expect(factory).not.toBeNull();
        expect(factory).toBeInstanceOf(MongoRepositoryFactory);
} );
} );
