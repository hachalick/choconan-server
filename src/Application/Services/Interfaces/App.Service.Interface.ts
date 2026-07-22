import {
  ReadLastVideoCategoryDetailModel,
  ReadVideoCategoryDetailModel,
  ReadVideoCategoryListModel,
  UpdateProgramModel,
} from 'src/Domain/Models/App.Service.Model';
import {
  ReadLastVideoCategoryDetailViewModel,
  ReadVideoCategoryDetailViewModel,
  ReadVideoCategoryListViewModel,
  UpdateProgramViewModel,
} from 'src/Domain/ViewModels/App.Service.ViewModel';

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
