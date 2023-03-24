import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import SendWhatsAppNotificationUseCase, {WhatsAppNotificationInput} from "../application/usecase/sendWhatsAppNotificationUseCase";
import IWhatsAppNotificationService from "../domain/adapters/IWhatsAppNotificationService";
import ServiceFactory from "../infra/factory/ServiceFactory";
import {badRequest, HttpResponse, okHttp} from "../utils/helpers/http-helper";
import FactoryBuilder from "../infra/factory/FactoryBuilder";
import IRepositoryFactory from "../domain/factory/IRepositoryFactory";

@Controller('phone-notification')
export class PhoneNotificationController {
  constructor(@Inject('IWhatsAppNotificationService') readonly serviceWhats: IWhatsAppNotificationService,
              @Inject('IRepositoryFactory') readonly factoryRepository: IRepositoryFactory) {}

  @Post()
  async send(@Body() input: WhatsAppNotificationInput) {
    try {
      const usecase  = new SendWhatsAppNotificationUseCase(this.factoryRepository, this.serviceWhats);
        const outputOrError = await usecase.execute(input);
        if(outputOrError.err) return badRequest(outputOrError.val);
        return okHttp(outputOrError.unwrap());
    } catch (err) {
        return badRequest('Internal Error: ' + err);
    }
  }




}
