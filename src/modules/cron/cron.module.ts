import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CrawlerArbService } from "./job/crawler.Arb";
import { CronService } from "./cron.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [],
  providers: [
    CrawlerArbService,
    CronService,
  ],
})
export class CronModule { }
