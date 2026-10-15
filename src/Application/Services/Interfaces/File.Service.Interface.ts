import {
  DeleteFileImageModel,
  DownloadFileMenuExcelModel,
  ReadFileImageListModel,
  UploadFileImageModel,
} from '../../../Domain/Models/File.Service.Model.js';
import {
  DeleteFileImageViewModel,
  DownloadFileMenuExcelViewModel,
  ReadFileImageListViewModel,
  UploadFileImageViewModel,
} from '../../../Domain/ViewModels/File.Service.ViewModel.js';

export interface IFileService {
  DownloadFileMenuExcel(
    Param: DownloadFileMenuExcelModel,
  ): Promise<DownloadFileMenuExcelViewModel>;

  ReadFileImageList(
    Param: ReadFileImageListModel,
  ): Promise<ReadFileImageListViewModel[]>;

  UploadFileImage(
    Param: UploadFileImageModel,
  ): Promise<UploadFileImageViewModel>;

  DeleteFileImage(
    Param: DeleteFileImageModel,
  ): Promise<DeleteFileImageViewModel>;
}
