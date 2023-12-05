import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import { Character, CharacterDocument } from "./schema/character.schema";

@Injectable()
export class DataBaseService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) public user: Model<UserDocument>,
    @InjectModel(Character.name) public character: Model<CharacterDocument>,
  ) { }
}
