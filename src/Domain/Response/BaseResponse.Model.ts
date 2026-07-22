export abstract class BaseResponseModel<T> {
  Ok: boolean;
  Code: number;
  Value: T;
  Message?: string;
}
