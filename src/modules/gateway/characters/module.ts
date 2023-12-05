import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CharacterController } from "./controller";
import { CharacterService } from "./service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CharacterController],
  providers: [
    CharacterService,
  ],
})
export class CharacterModule { }
