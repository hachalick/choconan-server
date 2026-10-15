import { ApiProperty } from '@nestjs/swagger';
import {
  BaseReadViewModel,
  BaseUpdateViewModel,
} from './Seed/Base.Service.ViewModel.js';

export class ReadVideoCategoryListViewModel extends BaseReadViewModel {
  @ApiProperty()
  Category: string;

  @ApiProperty()
  Videos: {
    Id: string;
    Name: string;
    IFram: string;
  }[];
}

export class ReadVideoCategoryDetailViewModel extends BaseReadViewModel {
  @ApiProperty()
  Category: string;

  @ApiProperty()
  Videos: {
    Id: string;
    Name: string;
    IFram: string;
  }[];
}

export class ReadLastVideoCategoryDetailViewModel extends BaseReadViewModel {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  IFram: string;
}

export class UpdateProgramViewModel extends BaseUpdateViewModel {
  @ApiProperty()
  Result: any;
}
