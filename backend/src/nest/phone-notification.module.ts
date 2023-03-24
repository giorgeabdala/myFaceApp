import { Module } from '@nestjs/common';
import { PhoneNotificationController } from '../controller/phone-notification.controller';
import {repositoryFactory, whatsService} from "./global.module";

@Module({
  controllers: [PhoneNotificationController],
  providers: [whatsService, repositoryFactory]
})
export class PhoneNotificationModule {}
