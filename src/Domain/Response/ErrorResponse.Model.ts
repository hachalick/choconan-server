import { BaseResponseModel } from './BaseResponse.model';

export class ErrorResponseModel<T> implements BaseResponseModel<T> {
  Ok: boolean = false;
  Code: number;
  Value: T;
  Message: string;
  Timestamp?: string;
  Path?: string;
  Details?: any;

  constructor(
    message: string,
    code: number = 500,
    details?: any,
    path?: string,
  ) {
    this.Message = message;
    this.Code = code;
    this.Value = null;
    this.Details = details;
    this.Timestamp = new Date().toISOString();
    this.Path = path;
  }
}
