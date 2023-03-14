import { PartialType } from '@nestjs/mapped-types';
import { CreatePhoneNotificationDto } from './create-phone-notification.dto';

export class UpdatePhoneNotificationDto extends PartialType(CreatePhoneNotificationDto) {}
