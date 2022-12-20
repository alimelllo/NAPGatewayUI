import { Reducer } from "redux";
import { SSOConfigActionTypes } from "./actionType";
import { ISSOConfigState, KnownAction } from "./model";

const unloadedState: ISSOConfigState = {
    userList: {
        loading: false,
        data: [],
    },
    userSync: {
        loading: false,
        Visible: false,
        id: 0
    },
    userCreate: {
        loading: false,
        Visible: false
    },
    userDelete: {
        loading: false,
        Visible: false,
        id: 0
    },

    userRoleList: {
        loading: false,
        Visible: false,
        userId: 0,
        data: [],
    },
    userRoleCreate: {
        loading: false
    },
    userRoleDelete: {
        loading: false,
        Visible: false,
        id: 0,
        role: ''
    },

    roleList: {
        loading: false,
        data: [],
    },
    roleSync: {
        loading: false,
        Visible: false,
        id: 0
    },
    roleCreate: {
        loading: false,
        Visible: false
    },
    roleDelete: {
        loading: false,
        Visible: false,
        id: 0
    },

    clientList: {
        loading: false,
        data: [],
    },
    clientSync: {
        loading: false,
        Visible: false,
        id: 0
    },
    clientCreate: {
        loading: false,
        Visible: false
    },
    clientDelete: {
        loading: false,
        Visible: false,
        id: 0
    },

    apiResourceList: {
        loading: false,
        data: [],
    },
    apiResourceSync: {
        loading: false,
        Visible: false,
        id: 0
    },
    apiResourceCreate: {
        loading: false,
        Visible: false
    },
    apiResourceDelete: {
        loading: false,
        Visible: false,
        id: 0
    },

    apiResourceScopeList: {
        loading: false,
        Visible: false,
        apiResourceId: 0,
        data: [],
    },
    apiResourceScopeSync: {
        loading: false,
        Visible: false,
        id: 0
    },
    apiResourceScopeCreate: {
        loading: false
    },
    apiResourceScopeDelete: {
        loading: false,
        Visible: false,
        apiResourceid: 0,
        id: 0
    },

    identityResourceList: {
        loading: false,
        data: [],
    },
    identityResourceCreate: {
        loading: false,
        Visible: false
    },
    identityResourceDelete: {
        loading: false,
        Visible: false,
        id: 0
    },
    alerts: []
};

export const SSOConfigReducer: Reducer<ISSOConfigState, KnownAction> = (state: ISSOConfigState = unloadedState, action: KnownAction) => {
    switch (action.type) {
        case SSOConfigActionTypes.UserFetch: {
            return {
                ...state,
                userList: {
                    ...state.userList,
                    loading: true,
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserFetchSuccess: {
            return {
                ...state,
                userList: {
                    ...state.userList,
                    loading: false,
                    data: action.data
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserFetchFailed: {
            return {
                ...state,
                userList: {
                    ...state.userList,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.UserSync: {
            return {
                ...state,
                userSync: {
                    ...state.userSync,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserSyncSuccess: {
            return {
                ...state,
                userSync: {
                    ...state.userSync,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserSyncFailed: {
            return {
                ...state,
                userSync: {
                    ...state.userSync,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserSyncModal: {
            return {
                ...state,
                userSync: {
                    ...state.userSync,
                    Visible: action.Visible,
                    loading: false,
                    id: action.id
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.UserCreate: {
            return {
                ...state,
                userCreate: {
                    ...state.userCreate,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserCreateSuccess: {
            return {
                ...state,
                userCreate: {
                    ...state.userCreate,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserCreateFailed: {
            return {
                ...state,
                userCreate: {
                    ...state.userCreate,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserCreateModal: {
            return {
                ...state,
                userCreate: {
                    ...state.userCreate,
                    Visible: action.Visible,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.UserDelete: {
            return {
                ...state,
                userDelete: {
                    ...state.userDelete,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserDeleteSuccess: {
            return {
                ...state,
                userDelete: {
                    ...state.userDelete,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserDeleteFailed: {
            return {
                ...state,
                userDelete: {
                    ...state.userDelete,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserDeleteModal: {
            return {
                ...state,
                userDelete: {
                    ...state.userDelete,
                    Visible: action.Visible,
                    id: action.id,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.UserRoleFetch: {
            return {
                ...state,
                userRoleList: {
                    ...state.userRoleList,
                    loading: true,
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserRoleFetchSuccess: {
            return {
                ...state,
                userRoleList: {
                    ...state.userRoleList,
                    loading: false,
                    Visible: true,
                    userId: action.userId,
                    data: action.data
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserRoleFetchFailed: {
            return {
                ...state,
                userRoleList: {
                    ...state.userRoleList,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserRoleFetchModal: {
            return {
                ...state,
                userRoleList: {
                    ...state.userRoleList,
                    Visible: action.Visible
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.UserRoleCreate: {
            return {
                ...state,
                userRoleCreate: {
                    ...state.userRoleCreate,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserRoleCreateSuccess: {
            return {
                ...state,
                userRoleCreate: {
                    ...state.userRoleCreate,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserRoleCreateFailed: {
            return {
                ...state,
                userRoleCreate: {
                    ...state.userRoleCreate,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.UserRoleDelete: {
            return {
                ...state,
                userRoleDelete: {
                    ...state.userRoleDelete,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserRoleDeleteSuccess: {
            return {
                ...state,
                userRoleDelete: {
                    ...state.userRoleDelete,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserRoleDeleteFailed: {
            return {
                ...state,
                userRoleDelete: {
                    ...state.userRoleDelete,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.UserRoleDeleteModal: {
            return {
                ...state,
                userRoleDelete: {
                    ...state.userRoleDelete,
                    Visible: action.Visible,
                    id: action.id,
                    role: action.role,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.RoleFetch: {
            return {
                ...state,
                roleList: {
                    ...state.roleList,
                    loading: true,
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleFetchSuccess: {
            return {
                ...state,
                roleList: {
                    ...state.roleList,
                    loading: false,
                    data: action.data
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleFetchFailed: {
            return {
                ...state,
                roleList: {
                    ...state.roleList,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.RoleSync: {
            return {
                ...state,
                roleSync: {
                    ...state.roleSync,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleSyncSuccess: {
            return {
                ...state,
                roleSync: {
                    ...state.roleSync,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleSyncFailed: {
            return {
                ...state,
                roleSync: {
                    ...state.roleSync,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleSyncModal: {
            return {
                ...state,
                roleSync: {
                    ...state.roleSync,
                    Visible: action.Visible,
                    loading: false,
                    id: action.id
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.RoleCreate: {
            return {
                ...state,
                roleCreate: {
                    ...state.roleCreate,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleCreateSuccess: {
            return {
                ...state,
                roleCreate: {
                    ...state.roleCreate,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleCreateFailed: {
            return {
                ...state,
                roleCreate: {
                    ...state.roleCreate,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleCreateModal: {
            return {
                ...state,
                roleCreate: {
                    ...state.roleCreate,
                    Visible: action.Visible,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.RoleDelete: {
            return {
                ...state,
                roleDelete: {
                    ...state.roleDelete,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleDeleteSuccess: {
            return {
                ...state,
                roleDelete: {
                    ...state.roleDelete,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleDeleteFailed: {
            return {
                ...state,
                roleDelete: {
                    ...state.roleDelete,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.RoleDeleteModal: {
            return {
                ...state,
                roleDelete: {
                    ...state.roleDelete,
                    Visible: action.Visible,
                    id: action.id,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ClientFetch: {
            return {
                ...state,
                clientList: {
                    ...state.clientList,
                    loading: true,
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientFetchSuccess: {
            return {
                ...state,
                clientList: {
                    ...state.clientList,
                    loading: false,
                    data: action.data
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientFetchFailed: {
            return {
                ...state,
                clientList: {
                    ...state.clientList,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ClientSync: {
            return {
                ...state,
                clientSync: {
                    ...state.clientSync,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientSyncSuccess: {
            return {
                ...state,
                clientSync: {
                    ...state.clientSync,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientSyncFailed: {
            return {
                ...state,
                clientSync: {
                    ...state.clientSync,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientSyncModal: {
            return {
                ...state,
                clientSync: {
                    ...state.clientSync,
                    Visible: action.Visible,
                    id: action.id,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ClientCreate: {
            return {
                ...state,
                clientCreate: {
                    ...state.clientCreate,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientCreateSuccess: {
            return {
                ...state,
                clientCreate: {
                    ...state.clientCreate,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientCreateFailed: {
            return {
                ...state,
                clientCreate: {
                    ...state.clientCreate,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientCreateModal: {
            return {
                ...state,
                clientCreate: {
                    ...state.clientCreate,
                    Visible: action.Visible,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ClientDelete: {
            return {
                ...state,
                clientDelete: {
                    ...state.clientDelete,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientDeleteSuccess: {
            return {
                ...state,
                clientDelete: {
                    ...state.clientDelete,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientDeleteFailed: {
            return {
                ...state,
                clientDelete: {
                    ...state.clientDelete,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClientDeleteModal: {
            return {
                ...state,
                clientDelete: {
                    ...state.clientDelete,
                    Visible: action.Visible,
                    id: action.id,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ApiResourceFetch: {
            return {
                ...state,
                apiResourceList: {
                    ...state.apiResourceList,
                    loading: true,
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceFetchSuccess: {
            return {
                ...state,
                apiResourceList: {
                    ...state.apiResourceList,
                    loading: false,
                    data: action.data
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceFetchFailed: {
            return {
                ...state,
                apiResourceList: {
                    ...state.apiResourceList,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ApiResourceSync: {
            return {
                ...state,
                apiResourceSync: {
                    ...state.apiResourceSync,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceSyncSuccess: {
            return {
                ...state,
                apiResourceSync: {
                    ...state.apiResourceSync,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceSyncFailed: {
            return {
                ...state,
                apiResourceSync: {
                    ...state.apiResourceSync,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceSyncModal: {
            return {
                ...state,
                apiResourceSync: {
                    ...state.apiResourceSync,
                    Visible: action.Visible,
                    loading: false,
                    id: action.id
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ApiResourceCreate: {
            return {
                ...state,
                apiResourceCreate: {
                    ...state.apiResourceCreate,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceCreateSuccess: {
            return {
                ...state,
                apiResourceCreate: {
                    ...state.apiResourceCreate,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceCreateFailed: {
            return {
                ...state,
                apiResourceCreate: {
                    ...state.apiResourceCreate,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceCreateModal: {
            return {
                ...state,
                apiResourceCreate: {
                    ...state.apiResourceCreate,
                    Visible: action.Visible,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ApiResourceDelete: {
            return {
                ...state,
                apiResourceDelete: {
                    ...state.apiResourceDelete,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceDeleteSuccess: {
            return {
                ...state,
                apiResourceDelete: {
                    ...state.apiResourceDelete,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceDeleteFailed: {
            return {
                ...state,
                apiResourceDelete: {
                    ...state.apiResourceDelete,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceDeleteModal: {
            return {
                ...state,
                apiResourceDelete: {
                    ...state.apiResourceDelete,
                    Visible: action.Visible,
                    id: action.id,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ApiResourceScopeFetch: {
            return {
                ...state,
                apiResourceScopeList: {
                    ...state.apiResourceScopeList,
                    loading: true,
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeFetchSuccess: {
            return {
                ...state,
                apiResourceScopeList: {
                    ...state.apiResourceScopeList,
                    loading: false,
                    Visible: true,
                    apiResourceId: action.apiResourceId,
                    data: action.data
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeFetchFailed: {
            return {
                ...state,
                apiResourceScopeList: {
                    ...state.apiResourceScopeList,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeFetchModal: {
            return {
                ...state,
                apiResourceScopeList: {
                    ...state.apiResourceScopeList,
                    Visible: action.Visible
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ApiResourceScopeSync: {
            return {
                ...state,
                apiResourceScopeSync: {
                    ...state.apiResourceScopeSync,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeSyncSuccess: {
            return {
                ...state,
                apiResourceScopeSync: {
                    ...state.apiResourceScopeSync,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeSyncFailed: {
            return {
                ...state,
                apiResourceScopeSync: {
                    ...state.apiResourceScopeSync,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeSyncModal: {
            return {
                ...state,
                apiResourceScopeSync: {
                    ...state.apiResourceScopeSync,
                    Visible: action.Visible,
                    id: action.id,
                    loading: false
                },
            } as ISSOConfigState;
        }
        
        case SSOConfigActionTypes.ApiResourceScopeCreate: {
            return {
                ...state,
                apiResourceScopeCreate: {
                    ...state.apiResourceScopeCreate,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeCreateSuccess: {
            return {
                ...state,
                apiResourceScopeCreate: {
                    ...state.apiResourceScopeCreate,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeCreateFailed: {
            return {
                ...state,
                apiResourceScopeCreate: {
                    ...state.apiResourceScopeCreate,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.ApiResourceScopeDelete: {
            return {
                ...state,
                apiResourceScopeDelete: {
                    ...state.apiResourceScopeDelete,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeDeleteSuccess: {
            return {
                ...state,
                apiResourceScopeDelete: {
                    ...state.apiResourceScopeDelete,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeDeleteFailed: {
            return {
                ...state,
                apiResourceScopeDelete: {
                    ...state.apiResourceScopeDelete,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ApiResourceScopeDeleteModal: {
            return {
                ...state,
                apiResourceScopeDelete: {
                    ...state.apiResourceScopeDelete,
                    Visible: action.Visible,
                    apiResourceid: action.apiResourceid,
                    id: action.id,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.IdentityResourceFetch: {
            return {
                ...state,
                identityResourceList: {
                    ...state.identityResourceList,
                    loading: true,
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.IdentityResourceFetchSuccess: {
            return {
                ...state,
                identityResourceList: {
                    ...state.identityResourceList,
                    loading: false,
                    data: action.data
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.IdentityResourceFetchFailed: {
            return {
                ...state,
                identityResourceList: {
                    ...state.identityResourceList,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.IdentityResourceCreate: {
            return {
                ...state,
                identityResourceCreate: {
                    ...state.identityResourceCreate,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.IdentityResourceCreateSuccess: {
            return {
                ...state,
                identityResourceCreate: {
                    ...state.identityResourceCreate,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.IdentityResourceCreateFailed: {
            return {
                ...state,
                identityResourceCreate: {
                    ...state.identityResourceCreate,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.IdentityResourceCreateModal: {
            return {
                ...state,
                identityResourceCreate: {
                    ...state.identityResourceCreate,
                    Visible: action.Visible,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.IdentityResourceDelete: {
            return {
                ...state,
                identityResourceDelete: {
                    ...state.identityResourceDelete,
                    loading: true
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.IdentityResourceDeleteSuccess: {
            return {
                ...state,
                identityResourceDelete: {
                    ...state.identityResourceDelete,
                    loading: false,
                    Visible: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.IdentityResourceDeleteFailed: {
            return {
                ...state,
                identityResourceDelete: {
                    ...state.identityResourceDelete,
                    loading: false
                },
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.IdentityResourceDeleteModal: {
            return {
                ...state,
                identityResourceDelete: {
                    ...state.identityResourceDelete,
                    Visible: action.Visible,
                    id: action.id,
                    loading: false
                },
            } as ISSOConfigState;
        }

        case SSOConfigActionTypes.PushAlert: {
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            } as ISSOConfigState;
        }
        case SSOConfigActionTypes.ClearAlerts: {
            return {
                ...state,
                alerts: []
            } as ISSOConfigState;
        }
    }
    return state;
};
