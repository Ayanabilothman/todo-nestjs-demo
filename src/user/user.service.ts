import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDTO } from 'src/auth/DTOs/register-dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<UserDocument>,
    private readonly _MailService: MailerService,
    private readonly _ConfigService: ConfigService,
  ) {}

  async update(id: string, data: any): Promise<UserDocument | undefined> {
    const user = await this.User.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.User.findOne({ email });
    return user;
  }

  async findById(id: ObjectId | string): Promise<UserDocument | undefined> {
    const user = await this.User.findById(id);
    if (!user) throw new NotFoundException('user not found!');
    return user;
  }

  async create(user: CreateUserDTO): Promise<UserDocument> {
    return this.User.create(user);
  }

  async addPicture({
    path,
    userId,
  }: {
    userId: ObjectId;
    path: string;
  }): Promise<UserDocument> {
    const user = await this.User.findByIdAndUpdate(
      userId,
      {
        profilePicture: path,
      },
      { new: true },
    );
    return user;
  }

  sendEmail({ to, subject, html }) {
    this._MailService.sendMail({
      from: `TODO APP <${this._ConfigService.get<string>('nodemailer.email')}>`,
      to,
      subject,
      html,
    });
  }
}
