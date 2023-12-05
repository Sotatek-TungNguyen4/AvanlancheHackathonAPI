import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
@Injectable()
export class JwtVerifyRequestGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const accessToken = (req.headers?.authorization || '')
      .replace('Bearer', '')
      .trim();
    if (!accessToken) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    try {
      const decodeToken = jwt.verify(
        accessToken,
        this.configService.get<string>('JWT_KEY', 'hackathonkey'),
      ) as any;
      req.app.set('owner', decodeToken.address.toLowerCase());
    } catch (error) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}