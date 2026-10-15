import { SendSmsOtpModel } from '../../../Domain/Models/Service.Service.Model.js';
import {
  ReadMenuSnapFoodViewModel,
  ReadMenuTapsiFoodViewModel,
} from '../../../Domain/ViewModels/Service.Service.ViewModel.js';

export interface IServiceService {
  SendSmsOtp(Param: SendSmsOtpModel): Promise<void>;

  ReadMenuSnapFood(): Promise<ReadMenuSnapFoodViewModel>;

  ReadMenuTapsiFood(): Promise<ReadMenuTapsiFoodViewModel>;
}
