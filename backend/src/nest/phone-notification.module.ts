import { Module } from '@nestjs/common';
import { PhoneNotificationService } from './phone-notification.service';
import { PhoneNotificationController } from '../controller/phone-notification.controller';

@Module({
  controllers: [PhoneNotificationController],
  providers: [PhoneNotificationService]
})
export class PhoneNotificationModule {}
