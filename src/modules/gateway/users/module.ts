import { Module } from "@nestjs/common";
import { UserController } from "./controller";
import { ConfigModule } from "@nestjs/config";
import { UserService } from "./service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [
    UserService,
  ],
})
export class UserModule { }
