import {IAppointmentRepository} from "../../src/domain/adapters/IAppointmentRepository";
import IClientRepository from "../../src/domain/adapters/IClientRepository";
import SendWhatsAppNotificationUseCase, {WhatsAppNotificationInput} from "../../src/application/usecase/sendWhatsAppNotificationUseCase";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import IWhatsAppNotificationService from "../../src/domain/adapters/IWhatsAppNotificationService";
import WhatsAppNotificationServiceOficial from "../../src/infra/service/WhatsAppNotificationServiceOficial";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let appointmentRepository: IAppointmentRepository;
let clientRepository: IClientRepository;
let professionalRepository: IProfessionalRepository;
let service: IWhatsAppNotificationService;
const factoryRepository = FactoryBuilder.getFactoryRepository();

beforeEach(() => {
    appointmentRepository = factoryRepository.getAppointmentsRepository();
    clientRepository = factoryRepository.getClientRepository();
    professionalRepository = factoryRepository.getProfessionalRepository();
    service = new WhatsAppNotificationServiceOficial();
} );

describe('Deve testar o envio de notificação via WhatsApp', () => {
    it('Deve enviar uma notificação de agendamento para o cliente', async () => {
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
} );