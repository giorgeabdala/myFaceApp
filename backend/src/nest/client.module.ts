import { Module } from '@nestjs/common';
import { ClientController } from '../controller/client.controller';

@Module({
  controllers: [ClientController],
})
export class ClientModule {}
