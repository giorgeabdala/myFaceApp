import {IAppointmentRepository} from "../../src/domain/adapters/IAppointmentRepository";
import AppointmentRepositoryMemory from "../../src/infra/repository/memory/AppointmentRepositoryMemory";
import IClientRepository from "../../src/domain/adapters/IClientRepository";
import ClientRepositoryMemory from "../../src/infra/repository/memory/ClientRepositoryMemory";
import sendWhatsAppNotification, {
    sendWhatsAppNotificationInput
} from "../../src/application/usecase/sendWhatsAppNotification";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import IWhatsAppNotificationService from "../../src/domain/adapters/IWhatsAppNotificationService";
import WhatsAppNotificationServiceOficial from "../../src/infra/service/WhatsAppNotificationServiceOficial";
import ProfessionalRepositoryMemory from "../../src/infra/repository/memory/ProfessionalRepositoryMemory";

let appointmentRepository: IAppointmentRepository;
let clientRepository: IClientRepository;
let professionalRepository: IProfessionalRepository;
let service: IWhatsAppNotificationService;

beforeEach(() => {
    appointmentRepository = new AppointmentRepositoryMemory();
    clientRepository = new ClientRepositoryMemory();
    professionalRepository = new ProfessionalRepositoryMemory();
    service = new WhatsAppNotificationServiceOficial();
} );

describe('Deve testar o envio de notificação via WhatsApp', async () => {
    it('Deve enviar uma notificação de agendamento para o cliente', async () => {
        const useCase = new sendWhatsAppNotification(appointmentRepository,
            professionalRepository, clientRepository, service );
        const input : sendWhatsAppNotificationInput = {
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