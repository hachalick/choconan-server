import {
  BaseReadViewModel,
  BaseUpdateViewModel,
} from './Seed/Base.Service.ViewModel';

export class ReadVideoCategoryListViewModel extends BaseReadViewModel {
  Category: string;
  Videos: {
    Id: string;
    Name: string;
    IFram: string;
  }[];
}

export class ReadVideoCategoryDetailViewModel extends BaseReadViewModel {
  Category: string;
  Videos: {
    Id: string;
    Name: string;
    IFram: string;
  }[];
}

export class ReadLastVideoCategoryDetailViewModel extends BaseReadViewModel {
  Name: string;
  IFram: string;
}

export class UpdateProgramViewModel extends BaseUpdateViewModel {
  Result: any;
}
