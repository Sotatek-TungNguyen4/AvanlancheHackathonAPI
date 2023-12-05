import { Global, Injectable, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { DataBaseService } from "./database.service";
import { User, UserSchema } from "./schema/user.schema";
import { Character, CharacterSchema } from "./schema/character.schema";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoOption: any = {};
        if (configService.get<string>('IS_AWS') == '1') {
          mongoOption.tlsCAFile = `global-bundle.pem`;
        } // console.log('buff: ', buffer.toString());
        console.log('url: ', configService.get<string>('DATABASE_URL'));
        return {
          uri: configService.get<string>('DATABASE_URL'),
          ...mongoOption,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
      {
        name: Character.name,
        useFactory: () => {
          return CharacterSchema;
        },
      },
    ]),
  ],
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class DatabaseModule {
}
