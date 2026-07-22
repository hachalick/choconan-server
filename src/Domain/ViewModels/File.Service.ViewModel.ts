import {
  BaseDeleteViewModel,
  BaseDownloadViewModel,
  BaseReadViewModel,
  BaseUploadViewModel,
} from './Seed/Base.Service.ViewModel';

export class DownloadFileMenuExcelViewModel extends BaseDownloadViewModel {}

export class DeleteFileImageViewModel extends BaseDeleteViewModel {}

export class UploadFileImageViewModel extends BaseUploadViewModel {}

export class ReadFileImageListViewModel extends BaseReadViewModel {
  Direction: string;
  Url: string;
}
