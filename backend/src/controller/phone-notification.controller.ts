import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import SendWhatsAppNotificationUseCase, {WhatsAppNotificationInput} from "../application/usecase/sendWhatsAppNotificationUseCase";
import IWhatsAppNotificationService from "../domain/adapters/IWhatsAppNotificationService";
import ServiceFactory from "../infra/factory/ServiceFactory";
import {badRequest, HttpResponse, ok} from "../utils/helpers/http-helper";
import FactoryBuilder from "../infra/factory/FactoryBuilder";

@Controller('phone-notification')
export class PhoneNotificationController {
  constructor(private readonly serviceWhats: IWhatsAppNotificationService = ServiceFactory.getWhatsAppNotificationService(),
              readonly factoryRepository = FactoryBuilder.getFactoryRepository()) {}

  @Post()
  async send(@Body() input: WhatsAppNotificationInput) {
    try {
      const usecase  = new SendWhatsAppNotificationUseCase(this.factoryRepository, this.serviceWhats);
        const outputOrError = await usecase.execute(input);
        if(outputOrError.err) return badRequest(outputOrError.val);
        return ok(outputOrError.unwrap());
    } catch (err) {
        return badRequest('Internal Error: ' + err);
    }
  }




}
