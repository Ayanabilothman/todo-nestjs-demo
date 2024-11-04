import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, noteSchema } from './note.schema';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: noteSchema }]),
    UserModule,
    AuthModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
