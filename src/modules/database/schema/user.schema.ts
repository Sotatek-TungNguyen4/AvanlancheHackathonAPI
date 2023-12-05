import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { dbOptionDefault } from "src/modules/base/schema.base";

export type UserDocument = HydratedDocument<User>;

@Schema(dbOptionDefault)
export class User {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  address: string;

  @Prop({ type: String })
  tokens: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);
