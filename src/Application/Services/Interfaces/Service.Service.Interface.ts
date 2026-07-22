import { SendSmsOtpModel } from '../../../Domain/Models/Service.Service.Model';
import {
  ReadMenuSnapFoodViewModel,
  ReadMenuTapsiFoodViewModel,
} from '../../../Domain/ViewModels/Service.Service.ViewModel';

export interface IServiceService {
  SendSmsOtp(Param: SendSmsOtpModel): Promise<void>;

  ReadMenuSnapFood(): Promise<ReadMenuSnapFoodViewModel>;

  ReadMenuTapsiFood(): Promise<ReadMenuTapsiFoodViewModel>;
}
