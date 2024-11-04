import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Note {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  content: string;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const noteSchema = SchemaFactory.createForClass(Note);
