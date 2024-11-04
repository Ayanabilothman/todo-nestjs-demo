import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './note.schema.js';
import { Model, ObjectId } from 'mongoose';
import { CreateNoteDTO } from './DTOs/createnote-dto.js';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private readonly Note: Model<Note>) {}
  // create note
  async create(body: CreateNoteDTO, userId: string) {
    return this.Note.create({ ...body, user: userId });
  }

  // update note
  async update(id: ObjectId | string, data: any) {
    const note = await this.Note.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
    if (!note) throw new NotFoundException('Note not found!');
    return note;
  }

  // delete note
  async deleteOne(id: ObjectId | string) {
    const note = await this.Note.findByIdAndDelete(id);
    if (!note) throw new NotFoundException('Note not found!');
    return note;
  }

  // find single note
  async findOne(id: ObjectId | string) {
    const note = this.Note.findById(id);
    if (!note) throw new NotFoundException('Note not found!');
    return note;
  }

  // find all notes
  async findAll() {
    return this.Note.find();
  }
}
