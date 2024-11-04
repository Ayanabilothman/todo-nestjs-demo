import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface UserDocument extends Document {
  id: string;
  username: string;
  password: string;
  profilePicture: string;
  email: string;
  accountActivated: boolean;

  checkPassword(inputPassword: string): boolean;
  generateToken(): Promise<string>;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ min: 2, max: 20, required: true, unique: true, cast: false })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: function () {
      return this.provider.name == 'system';
    },
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/,
  })
  password: string;

  @Prop({ default: false })
  accountActivated: boolean;

  @Prop()
  profilePicture: string;

  @Prop(
    raw({
      name: { type: String, enum: ['google', 'system'], default: 'system' },
      id: { type: String },
    }),
  )
  provider: Record<string, any>;
}

export const userSchema = SchemaFactory.createForClass(User);
