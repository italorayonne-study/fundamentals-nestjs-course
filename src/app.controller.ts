import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { uid } from 'uid';
import { FileService } from './file/file.service';

@Controller('auth')
export class AppController {
  constructor(private readonly fileService: FileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('doc')
  async upload(@UploadedFile('file') file: Express.Multer.File) {
    const path = join(__dirname, '..', 'storage', 'files', `${uid(16)}.pdf`);

    return this.fileService.upload(file, path);
  }
}
