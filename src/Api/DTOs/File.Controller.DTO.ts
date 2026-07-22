import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'فایل تصویر (jpg, jpeg, png, webp)',
  })
  file: Express.Multer.File;
}
