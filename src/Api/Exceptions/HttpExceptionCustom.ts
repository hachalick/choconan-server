import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpExceptionCustom extends HttpException {
  code: HttpStatus;
  message: string;

  constructor(
    message: string,
    code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super({ Message: message, StatusCode: code, Time: new Date() }, code);
  }
}
