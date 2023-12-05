import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CharacterModule } from "./characters/module";
import { UserModule } from "./users/module";

@Module({
  imports: [ConfigModule.forRoot(), UserModule, CharacterModule],
  controllers: [],
  providers: [],
})
export class GatewayModule { }
