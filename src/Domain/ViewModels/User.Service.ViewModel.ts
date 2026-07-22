import {
  BaseCreateViewModel,
  BaseDeleteViewModel,
  BaseReadViewModel,
  BaseUpdateViewModel,
} from 'src/Domain/ViewModels/Seed/Base.Service.ViewModel';

//#region User

export class ReadAccountDetailViewModel extends BaseReadViewModel {
  Name: string;
  Family: string;
  Profile: string;
  Role: string[];
  Access: string[];
}

export class ReadUserDetailViewModel extends BaseReadViewModel {
  Name: string;
  Family: string;
  Phone: string;
  NationalCode: string;
  Profile: string;
  Role: string[];
  Access: string[];
}

export class ReadUserListViewModel extends BaseReadViewModel {
  Name: string;
  Family: string;
  Phone: string;
  NationalCode: string;
  Profile: string;
  Role: string[];
  Access: string[];
}

export class CreateUserViewModel extends BaseCreateViewModel {}

export class UpdateUserViewModel extends BaseUpdateViewModel {}

export class UpdateUserProfileViewModel extends BaseUpdateViewModel {}

export class DeleteUserViewModel extends BaseDeleteViewModel {}

//#endregion

//#region Dashboard Capability

export class ReadDashboardCapabilityDetailViewModel extends BaseReadViewModel {
  DashboardCapability: string;
}

export class ReadDashboardCapabilityListViewModel extends BaseReadViewModel {
  DashboardCapability: string;
}

export class CreateDashboardCapabilityViewModel extends BaseCreateViewModel {}

//#endregion

//#region Dashboard Capability User

export class CreateDashboardCapabilityUserViewModel extends BaseCreateViewModel {}

export class DeleteDashboardCapabilityUserViewModel extends BaseDeleteViewModel {}

//#endregion

//#region Role

export class ReadRoleListViewModel extends BaseReadViewModel {
  Name: string;
}

export class ReadRoleDetailViewModel extends BaseReadViewModel {
  Name: string;
}

export class CreateRoleViewModel extends BaseCreateViewModel {}

export class UpdateRoleViewModel extends BaseUpdateViewModel {}

export class DeleteRoleViewModel extends BaseDeleteViewModel {}

//#endregion

//#region Role User

export class CreateRoleUserViewModel extends BaseCreateViewModel {}

export class DeleteRoleUserViewModel extends BaseDeleteViewModel {}

//#endregion
