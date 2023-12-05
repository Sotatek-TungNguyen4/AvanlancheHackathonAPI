import { CharacterService } from "./service";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { UseJWTAuth } from "src/modules/decorators/use.jwt.auth";
@Controller('characters')
export class CharacterController {
  constructor(private characterService: CharacterService) { }

  @Get('/')
  @UseJWTAuth()
  @ApiBearerAuth()
  async getAll(@Req() req: Request) {
    return await this.characterService.getAll(req.app.get('owner'));
  }

  @Get('/:id')
  async detail(@Param('id') id: string) {
    return await this.characterService.detail(id);
  }
}
