import {
  ReadLastVideoCategoryDetailModel,
  ReadVideoCategoryDetailModel,
  ReadVideoCategoryListModel,
  UpdateProgramModel,
} from '../../../Domain/Models/App.Service.Model.js';
import {
  ReadLastVideoCategoryDetailViewModel,
  ReadVideoCategoryDetailViewModel,
  ReadVideoCategoryListViewModel,
  UpdateProgramViewModel,
} from '../../../Domain/ViewModels/App.Service.ViewModel.js';

export interface IAppService {
  ReadVideoCategoryList(
    Param: ReadVideoCategoryListModel,
  ): Promise<ReadVideoCategoryListViewModel[]>;

  ReadVideoCategoryDetail(
    Param: ReadVideoCategoryDetailModel,
  ): Promise<ReadVideoCategoryDetailViewModel>;

  ReadLastVideoCategoryDetail(
    Param: ReadLastVideoCategoryDetailModel,
  ): Promise<ReadLastVideoCategoryDetailViewModel>;

  UpdateProgram(Param: UpdateProgramModel): Promise<UpdateProgramViewModel>;
}
