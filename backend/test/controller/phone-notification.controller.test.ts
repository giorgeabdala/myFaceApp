import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNotificationController } from '../../src/controller/phone-notification.controller';
import {WhatsAppNotificationInput} from "../../src/application/usecase/sendWhatsAppNotificationUseCase";


describe('PhoneNotificationController', () => {
  let controller: PhoneNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneNotificationController],
    }).compile();

    controller = module.get<PhoneNotificationController>(PhoneNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve enviar uma mensagem de whatsapp', async () => {
    const input : WhatsAppNotificationInput = {
      appointmentId: '1',
      professionalId: '1',
      clientId: '1'
    }

    const result = await controller.send(input);
    expect(result.statusCode).toBe(200);
    expect(result.success).toBe(true);

  } );

  it('Deve gerar um erro ao enviar uma mensagem de whatsapp', async () => {
    const input : WhatsAppNotificationInput = {
      appointmentId: '99',
      professionalId: '99',
      clientId: '1'
    }

    const result = await controller.send(input);
    expect(result.statusCode).toBe(400);
    expect(result.success).toBe(false);

  } );
});
