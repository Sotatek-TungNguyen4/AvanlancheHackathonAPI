import { UserService } from "./service";
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/signin')
  signin(@Body() body: { timestamp: string, sign: string, address: string }): Promise<any> {
    return this.userService.signin(body);
  }
}
