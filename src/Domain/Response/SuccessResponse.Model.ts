import { BaseResponseModel } from './BaseResponse.model';

export class SuccessResponseModel<T> implements BaseResponseModel<T> {
  Ok: boolean = true;
  Code: number;
  Value: T;
  Message?: string;

  constructor(value: T, code: number = 200) {
    this.Value = value;
    this.Code = code;
  }
}
