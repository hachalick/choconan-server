//#region User

export class ReadAccountDetailModel {
  Token: string;
}

export class ReadUserDetailModel {
  Id: string;
}

export class ReadUserListModel {}

export class CreateUserModel {
  Name?: string;
  Family?: string;
  Phone: string;
  NationalCode: string;
  Password: string;
}

export class UpdateUserModel {
  Id: string;
  Name: string;
  Family: string;
  Phone: string;
  NationalCode: string;
  Profile: string;
}

export class UpdateUserProfileModel {
  Token: string;
  Name: string;
  Family: string;
}

export class DeleteUserModel {
  Id: string;
}

//#endregion

//#region Dashboard Capability

export class ReadDashboardCapabilityDetailModel {
  Id: string;
}

export class ReadDashboardCapabilityListModel {}

export class CreateDashboardCapabilityModel {
  Name: string;
}

//#endregion

//#region Dashboard Capability

export class CreateDashboardCapabilityUserModel {
  DashboardCapabilityId: string;
  UserId: string;
}

export class DeleteDashboardCapabilityUserModel {
  DashboardCapabilityId: string;
  UserId: string;
}

//#endregion

//#region Role

export class ReadRoleListModel {}

export class ReadRoleDetailModel {
  Id: string;
}

export class CreateRoleModel {
  Name: string;
}

export class UpdateRoleModel {
  Id: string;
  Name: string;
}

export class DeleteRoleModel {
  Id: string;
}

//#endregion

//#region Role User

export class CreateRoleUserModel {
  RoleId: string;
  UserId: string;
}

export class DeleteRoleUserModel {
  RoleId: string;
  UserId: string;
}

//#endregion
