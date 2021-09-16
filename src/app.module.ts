import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoveredCallsController } from './covered-calls/covered-calls.controller';
import { CoveredCallsService } from './covered-calls/covered-calls.service';

@Module({
  imports: [],
  controllers: [AppController, CoveredCallsController],
  providers: [AppService, CoveredCallsService],
})
export class AppModule {}
