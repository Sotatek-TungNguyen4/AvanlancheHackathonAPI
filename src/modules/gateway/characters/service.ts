import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Types } from "mongoose";
import { DataBaseService } from "src/modules/database/database.service";

@Injectable()
export class CharacterService {
  constructor(private configService: ConfigService, private databaseService: DataBaseService) { }

  async getAll(owner: string) {
    console.log('owner: ', owner);
    return await this.databaseService.character.find({ status: 0, owner });
  }

  async detail(id: string) {
    return await this.databaseService.character.findOne({ _id: new Types.ObjectId(id) });
  }
}
