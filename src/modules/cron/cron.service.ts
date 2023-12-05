import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { CrawlerArbService } from "./job/crawler.Arb";

@Injectable()
export class CronService {
  private running: any = {};
  constructor(private crawlerAbr: CrawlerArbService) {

  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async crawlerArb() {
    console.log('crawler')
    const key = 'crawler_arb';
    if (this.running[key]) {
      console.log(`${key} running`);
      return;
    }
    this.running[key] = true;
    await this.crawlerAbr.loadBlock();
    this.running[key] = false;
  }
}