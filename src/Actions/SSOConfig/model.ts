import { Action } from "redux";
import { SSOConfigActionTypes } from "./actionType";

export interface ISSOConfigState {
  userList: {
    loading: boolean;
    data: string[];
  },
  userSync: {
    loading: boolean;
    Visible: boolean;
    id: number
  },
  userCreate: {
    loading: boolean;
    Visible: boolean;
  },
  userDelete: {
    loading: boolean;
    Visible: boolean;
    id: number;
  },

  userRoleList: {
    loading: boolean;
    Visible: boolean;
    userId: number;
    data: string[];
  },
  userRoleCreate: {
    loading: boolean;
  },
  userRoleDelete: {
    loading: boolean;
    Visible: boolean;
    id: number;
    role: string;
  },

  roleSync: {
    loading: boolean;
    Visible: boolean;
    id: number
  },
  roleList: {
    loading: boolean;
    data: string[];
  },
  roleCreate: {
    loading: boolean;
    Visible: boolean;
  },
  roleDelete: {
    loading: boolean;
    Visible: boolean;
    id: number;
  },

  clientList: {
    loading: boolean;
    data: string[];
  },
  clientSync: {
    loading: boolean;
    Visible: boolean;
    id: number;
  },
  clientCreate: {
    loading: boolean;
    Visible: boolean;
  },
  clientDelete: {
    loading: boolean;
    Visible: boolean;
    id: number;
  },

  apiResourceSync: {
    loading: boolean;
    Visible: boolean;
    id: number
  },
  apiResourceList: {
    loading: boolean;
    data: string[];
  },
  apiResourceCreate: {
    loading: boolean;
    Visible: boolean;
  },
  apiResourceDelete: {
    loading: boolean;
    Visible: boolean;
    id: number;
  },

  apiResourceScopeSync: {
    loading: boolean;
    Visible: boolean;
    id: number
  },
  apiResourceScopeList: {
    loading: boolean;
    Visible: boolean;
    apiResourceId: number;
    data: string[];
  },
  apiResourceScopeCreate: {
    loading: boolean;
  },
  apiResourceScopeDelete: {
    loading: boolean;
    Visible: boolean;
    apiResourceid: number;
    id: number;
  },
  
  identityResourceList: {
    loading: boolean;
    data: string[];
  },
  identityResourceCreate: {
    loading: boolean;
    Visible: boolean;
  },
  identityResourceDelete: {
    loading: boolean;
    Visible: boolean;
    id: number;
  },
  alerts: any[]
}

interface IUserFetch extends Action<string> {
  type: SSOConfigActionTypes.UserFetch;
}
interface IUserFetchSuccess extends Action<string> {
  type: SSOConfigActionTypes.UserFetchSuccess;
  data: any
}
interface IUserFetchFailed extends Action<string> {
  type: SSOConfigActionTypes.UserFetchFailed;
}

interface IUserSync extends Action<string> {
  type: SSOConfigActionTypes.UserSync;
}
interface IUserSyncSuccess extends Action<string> {
  type: SSOConfigActionTypes.UserSyncSuccess;
}
interface IUserSyncFailed extends Action<string> {
  type: SSOConfigActionTypes.UserSyncFailed;
}
interface IUserSyncModal extends Action<string> {
  type: SSOConfigActionTypes.UserSyncModal;
  Visible: boolean;
  id: number;
}

interface IUserCreate extends Action<string> {
  type: SSOConfigActionTypes.UserCreate;
}
interface IUserCreateSuccess extends Action<string> {
  type: SSOConfigActionTypes.UserCreateSuccess;
}
interface IUserCreateFailed extends Action<string> {
  type: SSOConfigActionTypes.UserCreateFailed;
}
interface IUserCreateModal extends Action<string> {
  type: SSOConfigActionTypes.UserCreateModal;
  Visible: boolean;
}

interface IUserDelete extends Action<string> {
  type: SSOConfigActionTypes.UserDelete;
}
interface IUserDeleteSuccess extends Action<string> {
  type: SSOConfigActionTypes.UserDeleteSuccess;
}
interface IUserDeleteFailed extends Action<string> {
  type: SSOConfigActionTypes.UserDeleteFailed;
}
interface IUserDeleteModal extends Action<string> {
  type: SSOConfigActionTypes.UserDeleteModal;
  Visible: boolean;
  id: number;
}

interface IUserRoleFetch extends Action<string> {
  type: SSOConfigActionTypes.UserRoleFetch;
}
interface IUserRoleFetchSuccess extends Action<string> {
  type: SSOConfigActionTypes.UserRoleFetchSuccess;
  data: any
  userId: number;
}
interface IUserRoleFetchFailed extends Action<string> {
  type: SSOConfigActionTypes.UserRoleFetchFailed;
}
interface IUserRoleFetchModal extends Action<string> {
  type: SSOConfigActionTypes.UserRoleFetchModal;
  Visible: boolean;
}

interface IUserRoleCreate extends Action<string> {
  type: SSOConfigActionTypes.UserRoleCreate;
}
interface IUserRoleCreateSuccess extends Action<string> {
  type: SSOConfigActionTypes.UserRoleCreateSuccess;
}
interface IUserRoleCreateFailed extends Action<string> {
  type: SSOConfigActionTypes.UserRoleCreateFailed;
}

interface IUserRoleDelete extends Action<string> {
  type: SSOConfigActionTypes.UserRoleDelete;
}
interface IUserRoleDeleteSuccess extends Action<string> {
  type: SSOConfigActionTypes.UserRoleDeleteSuccess;
}
interface IUserRoleDeleteFailed extends Action<string> {
  type: SSOConfigActionTypes.UserRoleDeleteFailed;
}
interface IUserRoleDeleteModal extends Action<string> {
  type: SSOConfigActionTypes.UserRoleDeleteModal;
  Visible: boolean;
  id: number;
  role: string;
}

interface IRoleFetch extends Action<string> {
  type: SSOConfigActionTypes.RoleFetch;
}
interface IRoleFetchSuccess extends Action<string> {
  type: SSOConfigActionTypes.RoleFetchSuccess;
  data: any
}
interface IRoleFetchFailed extends Action<string> {
  type: SSOConfigActionTypes.RoleFetchFailed;
}

interface IRoleSync extends Action<string> {
  type: SSOConfigActionTypes.RoleSync;
}
interface IRoleSyncSuccess extends Action<string> {
  type: SSOConfigActionTypes.RoleSyncSuccess;
}
interface IRoleSyncFailed extends Action<string> {
  type: SSOConfigActionTypes.RoleSyncFailed;
}
interface IRoleSyncModal extends Action<string> {
  type: SSOConfigActionTypes.RoleSyncModal;
  Visible: boolean;
  id: number;
}

interface IRoleCreate extends Action<string> {
  type: SSOConfigActionTypes.RoleCreate;
}
interface IRoleCreateSuccess extends Action<string> {
  type: SSOConfigActionTypes.RoleCreateSuccess;
}
interface IRoleCreateFailed extends Action<string> {
  type: SSOConfigActionTypes.RoleCreateFailed;
}
interface IRoleCreateModal extends Action<string> {
  type: SSOConfigActionTypes.RoleCreateModal;
  Visible: boolean;
}

interface IRoleDelete extends Action<string> {
  type: SSOConfigActionTypes.RoleDelete;
}
interface IRoleDeleteSuccess extends Action<string> {
  type: SSOConfigActionTypes.RoleDeleteSuccess;
}
interface IRoleDeleteFailed extends Action<string> {
  type: SSOConfigActionTypes.RoleDeleteFailed;
}
interface IRoleDeleteModal extends Action<string> {
  type: SSOConfigActionTypes.RoleDeleteModal;
  Visible: boolean;
  id: number;
}

interface IClientFetch extends Action<string> {
  type: SSOConfigActionTypes.ClientFetch;
}
interface IClientFetchSuccess extends Action<string> {
  type: SSOConfigActionTypes.ClientFetchSuccess;
  data: any
}
interface IClientFetchFailed extends Action<string> {
  type: SSOConfigActionTypes.ClientFetchFailed;
}

interface IClientSync extends Action<string> {
  type: SSOConfigActionTypes.ClientSync;
}
interface IClientSyncSuccess extends Action<string> {
  type: SSOConfigActionTypes.ClientSyncSuccess;
}
interface IClientSyncFailed extends Action<string> {
  type: SSOConfigActionTypes.ClientSyncFailed;
}
interface IClientSyncModal extends Action<string> {
  type: SSOConfigActionTypes.ClientSyncModal;
  Visible: boolean;
  id: number;
}

interface IClientCreate extends Action<string> {
  type: SSOConfigActionTypes.ClientCreate;
}
interface IClientCreateSuccess extends Action<string> {
  type: SSOConfigActionTypes.ClientCreateSuccess;
}
interface IClientCreateFailed extends Action<string> {
  type: SSOConfigActionTypes.ClientCreateFailed;
}
interface IClientCreateModal extends Action<string> {
  type: SSOConfigActionTypes.ClientCreateModal;
  Visible: boolean;
}

interface IClientDelete extends Action<string> {
  type: SSOConfigActionTypes.ClientDelete;
}
interface IClientDeleteSuccess extends Action<string> {
  type: SSOConfigActionTypes.ClientDeleteSuccess;
}
interface IClientDeleteFailed extends Action<string> {
  type: SSOConfigActionTypes.ClientDeleteFailed;
}
interface IClientDeleteModal extends Action<string> {
  type: SSOConfigActionTypes.ClientDeleteModal;
  Visible: boolean;
  id: number;
}

interface IApiResourceFetch extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceFetch;
}
interface IApiResourceFetchSuccess extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceFetchSuccess;
  data: any
}
interface IApiResourceFetchFailed extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceFetchFailed;
}

interface IApiResourceSync extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceSync;
}
interface IApiResourceSyncSuccess extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceSyncSuccess;
}
interface IApiResourceSyncFailed extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceSyncFailed;
}
interface IApiResourceSyncModal extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceSyncModal;
  Visible: boolean;
  id: number;
}

interface IApiResourceCreate extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceCreate;
}
interface IApiResourceCreateSuccess extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceCreateSuccess;
}
interface IApiResourceCreateFailed extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceCreateFailed;
}
interface IApiResourceCreateModal extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceCreateModal;
  Visible: boolean;
}

interface IApiResourceDelete extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceDelete;
}
interface IApiResourceDeleteSuccess extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceDeleteSuccess;
}
interface IApiResourceDeleteFailed extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceDeleteFailed;
}
interface IApiResourceDeleteModal extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceDeleteModal;
  Visible: boolean;
  id: number;
}

interface IApiResourceScopeFetch extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeFetch;
}
interface IApiResourceScopeFetchSuccess extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeFetchSuccess;
  data: any
  apiResourceId: number;
}
interface IApiResourceScopeFetchFailed extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeFetchFailed;
}
interface IApiResourceScopeFetchModal extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeFetchModal;
  Visible: boolean;
}

interface IApiResourceScopeSync extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeSync;
}
interface IApiResourceScopeSyncSuccess extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeSyncSuccess;
}
interface IApiResourceScopeSyncFailed extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeSyncFailed;
}
interface IApiResourceScopeSyncModal extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeSyncModal;
  Visible: boolean;
  id: number;
}

interface IApiResourceScopeCreate extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeCreate;
}
interface IApiResourceScopeCreateSuccess extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeCreateSuccess;
}
interface IApiResourceScopeCreateFailed extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeCreateFailed;
}

interface IApiResourceScopeDelete extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeDelete;
}
interface IApiResourceScopeDeleteSuccess extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeDeleteSuccess;
}
interface IApiResourceScopeDeleteFailed extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeDeleteFailed;
}
interface IApiResourceScopeDeleteModal extends Action<string> {
  type: SSOConfigActionTypes.ApiResourceScopeDeleteModal;
  Visible: boolean;
  apiResourceid: number;
  id: number;
}

interface IIdentityResourceFetch extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceFetch;
}
interface IIdentityResourceFetchSuccess extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceFetchSuccess;
  data: any
}
interface IIdentityResourceFetchFailed extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceFetchFailed;
}

interface IIdentityResourceCreate extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceCreate;
}
interface IIdentityResourceCreateSuccess extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceCreateSuccess;
}
interface IIdentityResourceCreateFailed extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceCreateFailed;
}
interface IIdentityResourceCreateModal extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceCreateModal;
  Visible: boolean;
}

interface IIdentityResourceDelete extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceDelete;
}
interface IIdentityResourceDeleteSuccess extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceDeleteSuccess;
}
interface IIdentityResourceDeleteFailed extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceDeleteFailed;
}
interface IIdentityResourceDeleteModal extends Action<string> {
  type: SSOConfigActionTypes.IdentityResourceDeleteModal;
  Visible: boolean;
  id: number;
}

interface IPushAlert extends Action<string> {
  type: SSOConfigActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: SSOConfigActionTypes.ClearAlerts;
}

export type KnownAction =
  | IUserFetch
  | IUserFetchSuccess
  | IUserFetchFailed
  | IUserSync
  | IUserSyncSuccess
  | IUserSyncFailed
  | IUserSyncModal
  | IUserCreate
  | IUserCreateSuccess
  | IUserCreateFailed
  | IUserCreateModal
  | IUserDelete
  | IUserDeleteSuccess
  | IUserDeleteFailed
  | IUserDeleteModal

  | IUserRoleFetch
  | IUserRoleFetchSuccess
  | IUserRoleFetchFailed
  | IUserRoleFetchModal
  | IUserRoleCreate
  | IUserRoleCreateSuccess
  | IUserRoleCreateFailed
  | IUserRoleDelete
  | IUserRoleDeleteSuccess
  | IUserRoleDeleteFailed
  | IUserRoleDeleteModal

  | IRoleFetch
  | IRoleFetchSuccess
  | IRoleFetchFailed
  | IRoleSync
  | IRoleSyncSuccess
  | IRoleSyncFailed
  | IRoleSyncModal
  | IRoleCreate
  | IRoleCreateSuccess
  | IRoleCreateFailed
  | IRoleCreateModal
  | IRoleDelete
  | IRoleDeleteSuccess
  | IRoleDeleteFailed
  | IRoleDeleteModal

  | IClientFetch
  | IClientFetchSuccess
  | IClientFetchFailed
  | IClientSync
  | IClientSyncSuccess
  | IClientSyncFailed
  | IClientSyncModal
  | IClientCreate
  | IClientCreateSuccess
  | IClientCreateFailed
  | IClientCreateModal
  | IClientDelete
  | IClientDeleteSuccess
  | IClientDeleteFailed
  | IClientDeleteModal

  | IApiResourceFetch
  | IApiResourceFetchSuccess
  | IApiResourceFetchFailed
  | IApiResourceSync
  | IApiResourceSyncSuccess
  | IApiResourceSyncFailed
  | IApiResourceSyncModal
  | IApiResourceCreate
  | IApiResourceCreateSuccess
  | IApiResourceCreateFailed
  | IApiResourceCreateModal
  | IApiResourceDelete
  | IApiResourceDeleteSuccess
  | IApiResourceDeleteFailed
  | IApiResourceDeleteModal

  | IApiResourceScopeFetch
  | IApiResourceScopeFetchSuccess
  | IApiResourceScopeFetchFailed
  | IApiResourceScopeFetchModal
  | IApiResourceScopeSync
  | IApiResourceScopeSyncSuccess
  | IApiResourceScopeSyncFailed
  | IApiResourceScopeSyncModal
  | IApiResourceScopeCreate
  | IApiResourceScopeCreateSuccess
  | IApiResourceScopeCreateFailed
  | IApiResourceScopeDelete
  | IApiResourceScopeDeleteSuccess
  | IApiResourceScopeDeleteFailed
  | IApiResourceScopeDeleteModal

  | IIdentityResourceFetch
  | IIdentityResourceFetchSuccess
  | IIdentityResourceFetchFailed
  | IIdentityResourceCreate
  | IIdentityResourceCreateSuccess
  | IIdentityResourceCreateFailed
  | IIdentityResourceCreateModal
  | IIdentityResourceDelete
  | IIdentityResourceDeleteSuccess
  | IIdentityResourceDeleteFailed
  | IIdentityResourceDeleteModal

  | IPushAlert
  | IClearAlerts;
