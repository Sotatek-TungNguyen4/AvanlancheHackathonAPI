import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";
import { DataBaseService } from "src/modules/database/database.service";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService, private databaseService: DataBaseService) { }

  async signin({ timestamp, sign, address }: { timestamp: string, sign: string, address: string }) {
    let owner: string;
    try {
      owner = ethers.utils.verifyMessage(
        `${this.configService.get<string>('APP_ID', 'hackathon')}#${timestamp
        }`,
        sign,
      );
    } catch (error) {
      console.log('error at signin', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    if (address.toLowerCase() !== address.toLowerCase()) {
      throw new HttpException('sign.invalid', HttpStatus.BAD_REQUEST);
    }

    const content = jwt.sign(
      { address },
      this.configService.get<string>('JWT_KEY', 'hackathonkey'),
      { expiresIn: this.configService.get<string>('JWT_EXPIRES', '1 day') },
    );

    await this.databaseService.user.findOneAndUpdate({ address },
      { $set: { address }, $addToSet: { tokens: content } },
      { new: true, upsert: true });
    return { token: content };
  }

  async get(address: string) {
    return await this.databaseService.user.findOne({ address }, { tokens: 0 });
  }
}
