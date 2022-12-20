import { AppAction } from "../../Store/state";
import { SSOConfigActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../GeneralComponents/baseURL";

export const ssoConfigActions = {
  getUserList: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserFetch });
    try {
      const result = await API.get("/NAPGateWay/SSOQuery/GetUsers?FileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: SSOConfigActionTypes.UserFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: SSOConfigActionTypes.UserFetchSuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: SSOConfigActionTypes.UserFetchSuccess,
          data: [],
        });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.UserFetchFailed });
      ssoConfigActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  syncUsers: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = {
      fileConfigurationId : getState().ssoConfig.userSync.id
    };
    dispatch({ type: SSOConfigActionTypes.UserSync });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/SyncUsers", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.UserSyncSuccess });
        ssoConfigActions.getUserList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.UserSyncFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.UserSyncFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSyncUserModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserSyncModal, id, Visible: Visible });
  },

  saveUser: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserCreate });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/CreateUser", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.UserCreateSuccess });
        ssoConfigActions.getUserList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.UserCreateFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.UserCreateFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateUserModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserCreateModal, Visible: Visible });
  },

  deleteUser: (): AppAction<KnownAction> => async (dispatch, getState) => {
    var id = getState().ssoConfig.userDelete.id;
    dispatch({ type: SSOConfigActionTypes.UserDelete });
    try {
      const result = await API.delete("/NAPGateWay/SSOCommand/DeleteUser?id=" + id);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.UserDeleteSuccess });
        const newList: any[] = getState().ssoConfig.userList.data;
        const index = newList.findIndex((x) => x.id == id);
        if (index > - 1) {
          newList.splice(index, 1);
          dispatch({ type: SSOConfigActionTypes.UserFetchSuccess, data: newList });
        }
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.UserDeleteFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.UserDeleteFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteUserModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserDeleteModal, id, Visible: Visible });
  },

  getUserRoleList: (userId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserRoleFetch });
    try {
      const result = await API.get("/NAPGateWay/SSOQuery/GetUserRoles?UserId=" + userId);
      if (result.status == 200) {
        dispatch({
          type: SSOConfigActionTypes.UserRoleFetchSuccess,
          userId,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: SSOConfigActionTypes.UserRoleFetchSuccess,
          userId,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: SSOConfigActionTypes.UserRoleFetchSuccess,
          userId: 0,
          data: [],
        });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.UserRoleFetchFailed });
      ssoConfigActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },
  toggleUserRoleModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserRoleFetchModal, Visible });
  },

  saveUserRole: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserRoleCreate });
    try {
      const result = await API.put("/NAPGateWay/SSOCommand/AddUserRole", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.UserRoleCreateSuccess });
        ssoConfigActions.getUserRoleList(data.id)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.UserRoleCreateFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.UserRoleCreateFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },

  deleteUserRole: (): AppAction<KnownAction> => async (dispatch, getState) => {
    var id = getState().ssoConfig.userRoleDelete.id;
    var role = getState().ssoConfig.userRoleDelete.role;
    dispatch({ type: SSOConfigActionTypes.UserRoleDelete });
    try {
      const result = await API.delete("/NAPGateWay/SSOCommand/RemoveUserRole?id=" + id + "&role=" + role);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.UserRoleDeleteSuccess });
        ssoConfigActions.getUserRoleList(id)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.UserRoleDeleteFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.UserRoleDeleteFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteUserRoleModal: (id: number, role: string, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.UserRoleDeleteModal, id, role, Visible: Visible });
  },

  getRoleList: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.RoleFetch });
    try {
      const result = await API.get("/NAPGateWay/SSOQuery/GetRoles?FileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: SSOConfigActionTypes.RoleFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: SSOConfigActionTypes.RoleFetchSuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: SSOConfigActionTypes.RoleFetchSuccess,
          data: [],
        });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.RoleFetchFailed });
      ssoConfigActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  syncRoles: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = {
      fileConfigurationId : getState().ssoConfig.roleSync.id
    };
    dispatch({ type: SSOConfigActionTypes.RoleSync });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/SyncRoles", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.RoleSyncSuccess });
        ssoConfigActions.getRoleList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.RoleSyncFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.RoleSyncFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSyncRoleModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.RoleSyncModal, id, Visible: Visible });
  },

  saveRole: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.RoleCreate });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/CreateRole", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.RoleCreateSuccess });
        ssoConfigActions.getRoleList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.RoleCreateFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.RoleCreateFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateRoleModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.RoleCreateModal, Visible: Visible });
  },

  deleteRole: (): AppAction<KnownAction> => async (dispatch, getState) => {
    var id = getState().ssoConfig.roleDelete.id;
    dispatch({ type: SSOConfigActionTypes.RoleDelete });
    try {
      const result = await API.delete("/NAPGateWay/SSOCommand/DeleteRole?id=" + id);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.RoleDeleteSuccess });
        const newList: any[] = getState().ssoConfig.roleList.data;
        const index = newList.findIndex((x) => x.id == id);
        if (index > - 1) {
          newList.splice(index, 1);
          dispatch({ type: SSOConfigActionTypes.RoleFetchSuccess, data: newList });
        }
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.RoleDeleteFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.RoleDeleteFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteRoleModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.RoleDeleteModal, id, Visible: Visible });
  },

  getClientList: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ClientFetch });
    try {
      const result = await API.get("/NAPGateWay/SSOQuery/GetClients?FileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: SSOConfigActionTypes.ClientFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: SSOConfigActionTypes.ClientFetchSuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: SSOConfigActionTypes.ClientFetchSuccess,
          data: [],
        });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ClientFetchFailed });
      ssoConfigActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  syncClients: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = {
      fileConfigurationId : getState().ssoConfig.clientSync.id
    };
    dispatch({ type: SSOConfigActionTypes.ClientSync });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/SyncClients", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ClientSyncSuccess });
        ssoConfigActions.getClientList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ClientSyncFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ClientSyncFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSyncClientModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ClientSyncModal, id, Visible: Visible });
  },

  saveClient: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ClientCreate });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/CreateClient", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ClientCreateSuccess });
        ssoConfigActions.getClientList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ClientCreateFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ClientCreateFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateClientModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ClientCreateModal, Visible: Visible });
  },

  deleteClient: (): AppAction<KnownAction> => async (dispatch, getState) => {
    var id = getState().ssoConfig.clientDelete.id;
    dispatch({ type: SSOConfigActionTypes.ClientDelete });
    try {
      const result = await API.delete("/NAPGateWay/SSOCommand/DeleteClient?id=" + id);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ClientDeleteSuccess });
        const newList: any[] = getState().ssoConfig.clientList.data;
        const index = newList.findIndex((x) => x.id == id);
        if (index > - 1) {
          newList.splice(index, 1);
          dispatch({ type: SSOConfigActionTypes.ClientFetchSuccess, data: newList });
        }
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ClientDeleteFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ClientDeleteFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteClientModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ClientDeleteModal, id, Visible: Visible });
  },

  getApiResourceList: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceFetch });
    try {
      const result = await API.get("/NAPGateWay/SSOQuery/GetApiResources?FileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: SSOConfigActionTypes.ApiResourceFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: SSOConfigActionTypes.ApiResourceFetchSuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: SSOConfigActionTypes.ApiResourceFetchSuccess,
          data: [],
        });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ApiResourceFetchFailed });
      ssoConfigActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  syncApiResources: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = {
      fileConfigurationId : getState().ssoConfig.apiResourceSync.id
    };
    dispatch({ type: SSOConfigActionTypes.ApiResourceSync });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/SyncApiResourcesWithScopes", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceSyncSuccess });
        ssoConfigActions.getApiResourceList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceSyncFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ApiResourceSyncFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSyncApiResourceModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceSyncModal, id, Visible: Visible });
  },

  saveApiResource: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceCreate });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/CreateApiResource", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceCreateSuccess });
        ssoConfigActions.getApiResourceList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceCreateFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ApiResourceCreateFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateApiResourceModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceCreateModal, Visible: Visible });
  },

  deleteApiResource: (): AppAction<KnownAction> => async (dispatch, getState) => {
    var id = getState().ssoConfig.apiResourceDelete.id;
    dispatch({ type: SSOConfigActionTypes.ApiResourceDelete });
    try {
      const result = await API.delete("/NAPGateWay/SSOCommand/DeleteApiResource?id=" + id);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceDeleteSuccess });
        const newList: any[] = getState().ssoConfig.apiResourceList.data;
        const index = newList.findIndex((x) => x.id == id);
        if (index > - 1) {
          newList.splice(index, 1);
          dispatch({ type: SSOConfigActionTypes.ApiResourceFetchSuccess, data: newList });
        }
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceDeleteFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ApiResourceDeleteFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteApiResourceModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceDeleteModal, id, Visible: Visible });
  },

  getApiResourceScopeList: (apiResourceId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceScopeFetch });
    try {
      const result = await API.get("/NAPGateWay/SSOQuery/GetApiResourceScopes?ApiResourceId=" + apiResourceId);
      if (result.status == 200) {
        dispatch({
          type: SSOConfigActionTypes.ApiResourceScopeFetchSuccess,
          apiResourceId,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: SSOConfigActionTypes.ApiResourceScopeFetchSuccess,
          apiResourceId,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: SSOConfigActionTypes.ApiResourceScopeFetchSuccess,
          apiResourceId: 0,
          data: [],
        });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ApiResourceScopeFetchFailed });
      ssoConfigActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },
  toggleApiResourceScopeModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceScopeFetchModal, Visible });
  },

  syncApiResourceScopes: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = {
      apiResourceId : getState().ssoConfig.apiResourceScopeSync.id
    };
    dispatch({ type: SSOConfigActionTypes.ApiResourceScopeSync });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/SyncScopes", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceScopeSyncSuccess });
        ssoConfigActions.getApiResourceScopeList(data.apiResourceId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceScopeSyncFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ApiResourceScopeSyncFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSyncApiResourceScopeModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceScopeSyncModal, id, Visible: Visible });
  },
  
  saveApiResourceScope: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceScopeCreate });
    try {
      const result = await API.put("/NAPGateWay/SSOCommand/AddApiResourceScope", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceScopeCreateSuccess });
        ssoConfigActions.getApiResourceScopeList(data.apiResourceId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceScopeCreateFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ApiResourceScopeCreateFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },

  deleteApiResourceScope: (): AppAction<KnownAction> => async (dispatch, getState) => {
    var apiResourceid = getState().ssoConfig.apiResourceScopeDelete.apiResourceid;
    var id = getState().ssoConfig.apiResourceScopeDelete.id;
    dispatch({ type: SSOConfigActionTypes.ApiResourceScopeDelete });
    try {
      const result = await API.delete("/NAPGateWay/SSOCommand/RemoveApiResourceScope?apiResourceId=" + apiResourceid + "&id=" + id);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceScopeDeleteSuccess });
        ssoConfigActions.getApiResourceScopeList(apiResourceid)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.ApiResourceScopeDeleteFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.ApiResourceScopeDeleteFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteApiResourceScopeModal: (apiResourceid: number, id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ApiResourceScopeDeleteModal, apiResourceid, id, Visible: Visible });
  },

  getIdentityResourceList: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.IdentityResourceFetch });
    try {
      const result = await API.get("/NAPGateWay/SSOQuery/GetIdentityResources?FileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: SSOConfigActionTypes.IdentityResourceFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: SSOConfigActionTypes.IdentityResourceFetchSuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: SSOConfigActionTypes.IdentityResourceFetchSuccess,
          data: [],
        });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.IdentityResourceFetchFailed });
      ssoConfigActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  saveIdentityResource: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.IdentityResourceCreate });
    try {
      const result = await API.post("/NAPGateWay/SSOCommand/CreateIdentityResource", data);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.IdentityResourceCreateSuccess });
        ssoConfigActions.getIdentityResourceList(data.fileConfigurationId)(dispatch, getState);
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.IdentityResourceCreateFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.IdentityResourceCreateFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateIdentityResourceModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.IdentityResourceCreateModal, Visible: Visible });
  },

  deleteIdentityResource: (): AppAction<KnownAction> => async (dispatch, getState) => {
    var id = getState().ssoConfig.identityResourceDelete.id;
    dispatch({ type: SSOConfigActionTypes.IdentityResourceDelete });
    try {
      const result = await API.delete("/NAPGateWay/SSOCommand/DeleteIdentityResource?id=" + id);
      if (result.status == 201) {
        dispatch({ type: SSOConfigActionTypes.IdentityResourceDeleteSuccess });
        const newList: any[] = getState().ssoConfig.identityResourceList.data;
        const index = newList.findIndex((x) => x.id == id);
        if (index > - 1) {
          newList.splice(index, 1);
          dispatch({ type: SSOConfigActionTypes.IdentityResourceFetchSuccess, data: newList });
        }
        ssoConfigActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: SSOConfigActionTypes.IdentityResourceDeleteFailed });
        ssoConfigActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: SSOConfigActionTypes.IdentityResourceDeleteFailed });
      ssoConfigActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleDeleteIdentityResourceModal: (id: number, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.IdentityResourceDeleteModal, id, Visible: Visible });
  },

  pushAlert: (
    alert: {
      title: string,
      description: string,
      variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
      dismissTime?: number
    }
  ): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
      type: SSOConfigActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: SSOConfigActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response && error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      ssoConfigActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      ssoConfigActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfulOperation",
          variant: 'danger'
        }
      )(dispatch, getState);
    }
  },
  pushCommonAlert: (type: '200' | '204' | '401' | 'errorFetch'): AppAction<KnownAction> => async (dispatch, getState) => {
    switch (type) {
      case '200':
        ssoConfigActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        ssoConfigActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        ssoConfigActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        ssoConfigActions.pushAlert(
          {
            title: "error",
            description: "UnSuccessfetchData",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
    }
  },
};
