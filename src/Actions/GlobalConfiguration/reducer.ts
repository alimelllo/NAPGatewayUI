import { Reducer } from "redux";
import { GlobalConfigurationActionTypes } from "./actionType";
import { IGlobalConfigurationState, KnownAction } from "./model";

const unloadedState: IGlobalConfigurationState = {
    globalConfigurationList: {
        loading: false,
        data: [],
    },
    routePushHistoryList: {
        loading: false,
        Visible: false,
        data: [],
    },
    globalConfigurationCreate: {
        loading: false,
        Visible: false
    },
    globalConfigurationUpdate: {
        loading: false,
        Visible: false,
        item: {}
    },
    globalConfigurationRemove: {
        loading: false,
        Visible: false,
        item: {}
    },
    routesPushHistoryAdd: {
        loading: false
    },
    qoSOptionsSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    serviceDiscoveryProviderSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    loadBalancerOptionsSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    rateLimitOptionsSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    httpHandlerOptionsSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    jsonData: {
        loading: false,
        loaded: false,
        url: "",
        token: "",
        data: {},
        fileConfigurationId: 0,
        fileGlobalConfigurationId: 0
    },
    jsonPost: {
        loading: false,
        Visible: false
    },
    test: {
        loading: false
    },
    alerts: []
};

export const GlobalConfigurationReducer: Reducer<IGlobalConfigurationState, KnownAction> = (state: IGlobalConfigurationState = unloadedState, action: KnownAction) => {
    switch (action.type) {
        case GlobalConfigurationActionTypes.GlobalConfigurationFetch: {
            return {
                ...state,
                globalConfigurationList: {
                    ...state.globalConfigurationList,
                    loading: true,
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationFetchSuccess: {
            return {
                ...state,
                globalConfigurationList: {
                    ...state.globalConfigurationList,
                    loading: false,
                    data: action.data
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationFetchFailed: {
            return {
                ...state,
                globalConfigurationList: {
                    ...state.globalConfigurationList,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.GetRoutePushHistory: {
            return {
                ...state,
                routePushHistoryList: {
                    ...state.routePushHistoryList,
                    loading: true,
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GetRoutePushHistorySuccess: {
            return {
                ...state,
                routePushHistoryList: {
                    ...state.routePushHistoryList,
                    loading: false,
                    Visible: true,
                    data: action.data
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GetRoutePushHistoryFailed: {
            return {
                ...state,
                routePushHistoryList: {
                    ...state.routePushHistoryList,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GetRoutePushHistoryModal: {
            return {
                ...state,
                routePushHistoryList: {
                    ...state.routePushHistoryList,
                    Visible: action.Visible
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.GlobalConfigurationCreate: {
            return {
                ...state,
                globalConfigurationCreate: {
                    ...state.globalConfigurationCreate,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationCreateSuccess: {
            return {
                ...state,
                globalConfigurationCreate: {
                    ...state.globalConfigurationCreate,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationCreateFailed: {
            return {
                ...state,
                globalConfigurationCreate: {
                    ...state.globalConfigurationCreate,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationCreateModal: {
            return {
                ...state,
                globalConfigurationCreate: {
                    ...state.globalConfigurationCreate,
                    Visible: action.Visible,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.GlobalConfigurationUpdate: {
            return {
                ...state,
                globalConfigurationUpdate: {
                    ...state.globalConfigurationUpdate,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationUpdateSuccess: {
            return {
                ...state,
                globalConfigurationUpdate: {
                    ...state.globalConfigurationUpdate,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationUpdateFailed: {
            return {
                ...state,
                globalConfigurationUpdate: {
                    ...state.globalConfigurationUpdate,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationUpdateModal: {
            return {
                ...state,
                globalConfigurationUpdate: {
                    ...state.globalConfigurationUpdate,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.GlobalConfigurationRemove: {
            return {
                ...state,
                globalConfigurationRemove: {
                    ...state.globalConfigurationRemove,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationRemoveSuccess: {
            return {
                ...state,
                globalConfigurationRemove: {
                    ...state.globalConfigurationRemove,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationRemoveFailed: {
            return {
                ...state,
                globalConfigurationRemove: {
                    ...state.globalConfigurationRemove,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.GlobalConfigurationRemoveModal: {
            return {
                ...state,
                globalConfigurationRemove: {
                    ...state.globalConfigurationRemove,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.AddRoutesPushHistory: {
            return {
                ...state,
                routesPushHistoryAdd: {
                    ...state.routesPushHistoryAdd,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.AddRoutesPushHistorySuccess: {
            return {
                ...state,
                routesPushHistoryAdd: {
                    ...state.routesPushHistoryAdd,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.AddRoutesPushHistoryFailed: {
            return {
                ...state,
                routesPushHistoryAdd: {
                    ...state.routesPushHistoryAdd,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        
        case GlobalConfigurationActionTypes.SetServiceDiscoveryProvider: {
            return {
                ...state,
                serviceDiscoveryProviderSet: {
                    ...state.serviceDiscoveryProviderSet,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetServiceDiscoveryProviderSuccess: {
            return {
                ...state,
                serviceDiscoveryProviderSet: {
                    ...state.serviceDiscoveryProviderSet,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetServiceDiscoveryProviderFailed: {
            return {
                ...state,
                serviceDiscoveryProviderSet: {
                    ...state.serviceDiscoveryProviderSet,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetServiceDiscoveryProviderModal: {
            return {
                ...state,
                serviceDiscoveryProviderSet: {
                    ...state.serviceDiscoveryProviderSet,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.SetQoSOptions: {
            return {
                ...state,
                qoSOptionsSet: {
                    ...state.qoSOptionsSet,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetQoSOptionsSuccess: {
            return {
                ...state,
                qoSOptionsSet: {
                    ...state.qoSOptionsSet,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetQoSOptionsFailed: {
            return {
                ...state,
                qoSOptionsSet: {
                    ...state.qoSOptionsSet,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetQoSOptionsModal: {
            return {
                ...state,
                qoSOptionsSet: {
                    ...state.qoSOptionsSet,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.SetLoadBalancerOptions: {
            return {
                ...state,
                loadBalancerOptionsSet: {
                    ...state.loadBalancerOptionsSet,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetLoadBalancerOptionsSuccess: {
            return {
                ...state,
                loadBalancerOptionsSet: {
                    ...state.loadBalancerOptionsSet,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetLoadBalancerOptionsFailed: {
            return {
                ...state,
                loadBalancerOptionsSet: {
                    ...state.loadBalancerOptionsSet,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetLoadBalancerOptionsModal: {
            return {
                ...state,
                loadBalancerOptionsSet: {
                    ...state.loadBalancerOptionsSet,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.SetRateLimitOptions: {
            return {
                ...state,
                rateLimitOptionsSet: {
                    ...state.rateLimitOptionsSet,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetRateLimitOptionsSuccess: {
            return {
                ...state,
                rateLimitOptionsSet: {
                    ...state.rateLimitOptionsSet,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetRateLimitOptionsFailed: {
            return {
                ...state,
                rateLimitOptionsSet: {
                    ...state.rateLimitOptionsSet,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetRateLimitOptionsModal: {
            return {
                ...state,
                rateLimitOptionsSet: {
                    ...state.rateLimitOptionsSet,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.SetHttpHandlerOptions: {
            return {
                ...state,
                httpHandlerOptionsSet: {
                    ...state.httpHandlerOptionsSet,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetHttpHandlerOptionsSuccess: {
            return {
                ...state,
                httpHandlerOptionsSet: {
                    ...state.httpHandlerOptionsSet,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetHttpHandlerOptionsFailed: {
            return {
                ...state,
                httpHandlerOptionsSet: {
                    ...state.httpHandlerOptionsSet,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SetHttpHandlerOptionsModal: {
            return {
                ...state,
                httpHandlerOptionsSet: {
                    ...state.httpHandlerOptionsSet,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.JsonDataFetch: {
            return {
                ...state,
                jsonData: {
                    ...state.jsonData,
                    loading: true,
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.JsonDataFetchSuccess: {
            return {
                ...state,
                jsonData: {
                    ...state.jsonData,
                    loading: false,
                    loaded: true,
                    url: action.url,
                    token: action.token,
                    data: action.data,
                    fileConfigurationId: action.fileConfigurationId,
                    fileGlobalConfigurationId: action.fileGlobalConfigurationId
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.JsonDataFetchFailed: {
            return {
                ...state,
                jsonData: {
                    ...state.jsonData,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.PostJson: {
            return {
                ...state,
                jsonPost: {
                    ...state.jsonPost,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.PostJsonSuccess: {
            return {
                ...state,
                jsonPost: {
                    ...state.jsonPost,
                    loading: false,
                    Visible: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.PostJsonFailed: {
            return {
                ...state,
                jsonPost: {
                    ...state.jsonPost,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.PostJsonModal: {
            return {
                ...state,
                jsonPost: {
                    ...state.jsonPost,
                    Visible: action.Visible,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.SendTest: {
            return {
                ...state,
                test: {
                    ...state.test,
                    loading: true
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SendTestSuccess: {
            return {
                ...state,
                test: {
                    ...state.test,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.SendTestFailed: {
            return {
                ...state,
                test: {
                    ...state.test,
                    loading: false
                },
            } as IGlobalConfigurationState;
        }

        case GlobalConfigurationActionTypes.PushAlert: {
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            } as IGlobalConfigurationState;
        }
        case GlobalConfigurationActionTypes.ClearAlerts: {
            return {
                ...state,
                alerts: []
            } as IGlobalConfigurationState;
        }
    }
    return state;
};
