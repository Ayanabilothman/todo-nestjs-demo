import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateNoteDTO } from './DTOs/createnote-dto';
import { NoteService } from './note.service';
import { MongooseObjectIdPipe } from 'src/common/pipes/mongooseObjectId.pipe';
import { AuthGurad } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateNoteDTO } from './DTOs/updatenote-dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('note')
@UseGuards(AuthGurad)
export class NoteController {
  constructor(private readonly _NoteService: NoteService) {}
  // create note
  @Post()
  @ApiOperation({ summary: 'Create Note' })
  async create(@Body() body: CreateNoteDTO, @User('id') id: string) {
    return this._NoteService.create(body, id);
  }

  // update note
  @Patch(':id')
  @ApiOperation({ summary: 'Update Note' })
  async update(
    @Param('id', MongooseObjectIdPipe) id: string,
    @Body() body: UpdateNoteDTO,
  ) {
    return this._NoteService.update(id, body);
  }

  // delete note
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Note' })
  async deleteOne(@Param('id', MongooseObjectIdPipe) id: string) {
    return this._NoteService.deleteOne(id);
  }

  // find single note
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    content: {
      'application/json': {
        example: {
          data: { _id: 1, content: 'lorem', isCompleted: true },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Note not found!',
    content: {
      'application/json': {
        example: {
          message: 'Note not found!',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid note id!',
    content: {
      'application/json': {
        example: {
          message: 'Invalid Id!',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Get single note' })
  async findOne(@Param('id', MongooseObjectIdPipe) id: string) {
    return this._NoteService.findOne(id);
  }

  // find all notes
  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  async findAll() {
    return this._NoteService.findAll();
  }
}
