import { Module } from '@nestjs/common';
import { AppService } from '../application/app.service';
import { ClientModule } from './client.module';

@Module({
  imports: [ClientModule],
  providers: [AppService],
})
export class AppModule {}
