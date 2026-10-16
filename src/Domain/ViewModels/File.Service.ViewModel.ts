import { ApiProperty } from '@nestjs/swagger';
import {
  BaseDeleteViewModel,
  BaseDownloadViewModel,
  BaseReadViewModel,
  BaseUploadViewModel,
} from './Seed/Base.Service.ViewModel.js';

export class DownloadFileBackupExcelViewModel extends BaseDownloadViewModel {}

export class DownloadFileMenuExcelViewModel extends BaseDownloadViewModel {}

export class DeleteFileImageViewModel extends BaseDeleteViewModel {}

export class UploadFileImageViewModel extends BaseUploadViewModel {}

export class ReadFileImageListViewModel extends BaseReadViewModel {
  @ApiProperty()
  Direction: string;

  @ApiProperty()
  Url: string;
}
