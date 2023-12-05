import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './modules/gateway/module';
import { DatabaseModule } from './modules/database/database.module';
import { CronModule } from './modules/cron/cron.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, GatewayModule, CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
