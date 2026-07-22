import {
  CreateDashboardCapabilityModel,
  CreateDashboardCapabilityUserModel,
  CreateRoleModel,
  CreateRoleUserModel,
  CreateUserModel,
  DeleteDashboardCapabilityUserModel,
  DeleteRoleModel,
  DeleteRoleUserModel,
  DeleteUserModel,
  ReadAccountDetailModel,
  ReadDashboardCapabilityDetailModel,
  ReadDashboardCapabilityListModel,
  ReadRoleDetailModel,
  ReadRoleListModel,
  ReadUserDetailModel,
  ReadUserListModel,
  UpdateRoleModel,
  UpdateUserModel,
  UpdateUserProfileModel,
} from '../../../Domain/Models/User.Service.Model';
import {
  CreateDashboardCapabilityUserViewModel,
  CreateDashboardCapabilityViewModel,
  CreateRoleUserViewModel,
  CreateRoleViewModel,
  CreateUserViewModel,
  DeleteDashboardCapabilityUserViewModel,
  DeleteRoleUserViewModel,
  DeleteRoleViewModel,
  DeleteUserViewModel,
  ReadAccountDetailViewModel,
  ReadDashboardCapabilityDetailViewModel,
  ReadDashboardCapabilityListViewModel,
  ReadRoleDetailViewModel,
  ReadRoleListViewModel,
  ReadUserDetailViewModel,
  ReadUserListViewModel,
  UpdateRoleViewModel,
  UpdateUserProfileViewModel,
  UpdateUserViewModel,
} from '../../../Domain/ViewModels/User.Service.ViewModel';

export interface IUserService {
  //#region User

  ReadAccountDetail(
    Param: ReadAccountDetailModel,
  ): Promise<ReadAccountDetailViewModel>;

  ReadUserDetail(Param: ReadUserDetailModel): Promise<ReadUserDetailViewModel>;

  ReadUserList(Param: ReadUserListModel): Promise<ReadUserListViewModel[]>;

  CreateUser(Param: CreateUserModel): Promise<CreateUserViewModel>;

  UpdateUser(Param: UpdateUserModel): Promise<UpdateUserViewModel>;

  UpdateUserProfile(
    Param: UpdateUserProfileModel,
  ): Promise<UpdateUserProfileViewModel>;

  DeleteUser(Param: DeleteUserModel): Promise<DeleteUserViewModel>;

  //#endregion

  //#region

  ReadDashboardCapabilityDetail(
    Param: ReadDashboardCapabilityDetailModel,
  ): Promise<ReadDashboardCapabilityDetailViewModel>;

  ReadDashboardCapabilityList(
    Param: ReadDashboardCapabilityListModel,
  ): Promise<ReadDashboardCapabilityListViewModel[]>;

  CreateDashboardCapability(
    Param: CreateDashboardCapabilityModel,
  ): Promise<CreateDashboardCapabilityViewModel>;

  //#endregion

  //#region

  CreateDashboardCapabilityUser(
    Param: CreateDashboardCapabilityUserModel,
  ): Promise<CreateDashboardCapabilityUserViewModel>;

  DeleteDashboardCapabilityUser(
    Param: DeleteDashboardCapabilityUserModel,
  ): Promise<DeleteDashboardCapabilityUserViewModel>;

  //#endregion

  //#region Role

  ReadRoleList(Param: ReadRoleListModel): Promise<ReadRoleListViewModel[]>;

  ReadRoleDetail(Param: ReadRoleDetailModel): Promise<ReadRoleDetailViewModel>;

  CreateRole(Param: CreateRoleModel): Promise<CreateRoleViewModel>;

  UpdateRole(Param: UpdateRoleModel): Promise<UpdateRoleViewModel>;

  DeleteRole(Param: DeleteRoleModel): Promise<DeleteRoleViewModel>;

  //#endregion

  //#region Role User

  CreateRoleUser(Param: CreateRoleUserModel): Promise<CreateRoleUserViewModel>;

  DeleteRoleUser(Param: DeleteRoleUserModel): Promise<DeleteRoleUserViewModel>;

  //#endregion
}
