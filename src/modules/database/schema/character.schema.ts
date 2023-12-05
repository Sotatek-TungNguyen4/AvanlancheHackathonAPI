import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { dbOptionDefault } from "src/modules/base/schema.base";

export type CharacterDocument = HydratedDocument<Character>;

@Schema(dbOptionDefault)
export class Character {
  @Prop({ trim: true, lowercase: true })
  owner: string;

  @Prop()
  nftId: number;

  @Prop({ required: true, lowercase: true })
  chain: string;

  @Prop({ required: true, lowercase: true })
  address: string;

  @Prop({ required: true, lowercase: true })
  gameId: string;

  @Prop({ type: Number, default: 0 })
  status: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
