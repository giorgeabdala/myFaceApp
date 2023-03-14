import { Module } from '@nestjs/common';
import { ProfessionalController } from '../controller/professional.controller';

@Module({
  controllers: [ProfessionalController],
})
export class ProfessionalModule {}
