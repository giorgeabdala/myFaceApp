import SendWhatsAppNotificationUseCase, {WhatsAppNotificationInput} from "../../src/application/usecase/sendWhatsAppNotificationUseCase";
import IWhatsAppNotificationService from "../../src/domain/adapters/IWhatsAppNotificationService";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import ServiceFactory from "../../src/infra/factory/ServiceFactory";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import {Ok, Result} from "ts-results";

let service: IWhatsAppNotificationService;
let factoryRepository: IRepositoryFactory;


const mensagemEsperada = `Oi Lu
Tudo bem?
Passando para lembrar que *Amanhã, 13/14/2023 as 19:24hrs* você tem um horário agendado para extensão de cílios.
Rua Rio Xingu, 625 - Sobrado 8 Bairro Alto.
            
Por gentileza, confirme sua presença.`



beforeEach(() => {
    factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();
    service = new ServiceFactory().getWhatsAppNotificationService();

    service = <IWhatsAppNotificationService>{send: async (DDD: string, number: string, message: string)
            : Promise<Result<Response, Response>> => {return Ok(new Response(''))},};
});


describe('Deve testar o envio de notificação via WhatsApp', () => {
    it('Deve enviar uma notificação de agendamento para o cliente', async () => {
        //mock de SendWhatsAppNotificationUseCase
        const useCase = new SendWhatsAppNotificationUseCase(factoryRepository, service );
        const input : WhatsAppNotificationInput = {
            appointmentId: '1',
            professionalId: '1',
            clientId: '1'
        }
        const outputOrError = await useCase.execute(input);
        expect(outputOrError.ok).toBeTruthy();
        const output = outputOrError.unwrap();
        expect(output.result).toBeTruthy();
        expect(output.msg).toBe('Notificação enviada com sucesso');

    });


    it("Deve testar a construção da mensagem para envio", () => {
        const useCase = new SendWhatsAppNotificationUseCase(factoryRepository, service );
        const message = useCase.buildMessage('Lu', '13/14/2023', '19:24');

        console.log(message);
        console.log(mensagemEsperada);
        expect(message).toBe(mensagemEsperada);
    } );

});