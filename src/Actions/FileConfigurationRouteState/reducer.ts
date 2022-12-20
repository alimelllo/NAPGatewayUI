import { Reducer } from "redux";
import { FileConfigurationRouteStateActionTypes } from "./actionType";
import { IFileConfigurationRouteStateState, KnownAction } from "./model";

const unloadedState: IFileConfigurationRouteStateState = {
    fileConfigurationList: {
        loading: false,
        data: [],
    },
    routeStateList: {
        loading: false,
        data: [],
    },
    routeManagerAcceptedSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    routeAcceptedSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    routeIgnoredSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    routeToLastStateSet: {
        loading: false,
        Visible: false,
        item: {}
    },
    routeBA: {
        loading: false,
        Visible: false,
        managerAccept: false,
        routeState: 0,
        item: {},
        data: {}
    },
    alerts: []
};

export const FileConfigurationRouteStateReducer: Reducer<IFileConfigurationRouteStateState, KnownAction> = (state: IFileConfigurationRouteStateState = unloadedState, action: KnownAction) => {
    switch (action.type) {
        case FileConfigurationRouteStateActionTypes.FileConfigurationFetch: {
            return {
                ...state,
                fileConfigurationList: {
                    ...state.fileConfigurationList,
                    loading: true,
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.FileConfigurationFetchSuccess: {
            return {
                ...state,
                fileConfigurationList: {
                    ...state.fileConfigurationList,
                    loading: false,
                    data: action.data
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.FileConfigurationFetchFailed: {
            return {
                ...state,
                fileConfigurationList: {
                    ...state.fileConfigurationList,
                    loading: false
                },
            } as IFileConfigurationRouteStateState;
        }

        case FileConfigurationRouteStateActionTypes.RouteStateFetch: {
            return {
                ...state,
                routeStateList: {
                    ...state.routeStateList,
                    loading: true,
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.RouteStateFetchSuccess: {
            return {
                ...state,
                routeStateList: {
                    ...state.routeStateList,
                    loading: false,
                    data: action.data
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.RouteStateFetchFailed: {
            return {
                ...state,
                routeStateList: {
                    ...state.routeStateList,
                    loading: false
                },
            } as IFileConfigurationRouteStateState;
        }

        case FileConfigurationRouteStateActionTypes.SetRouteManagerAccepted: {
            return {
                ...state,
                routeManagerAcceptedSet: {
                    ...state.routeManagerAcceptedSet,
                    loading: true
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedSuccess: {
            return {
                ...state,
                routeManagerAcceptedSet: {
                    ...state.routeManagerAcceptedSet,
                    loading: false,
                    Visible: false
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedFailed: {
            return {
                ...state,
                routeManagerAcceptedSet: {
                    ...state.routeManagerAcceptedSet,
                    loading: false
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedModal: {
            return {
                ...state,
                routeManagerAcceptedSet: {
                    ...state.routeManagerAcceptedSet,
                    Visible: action.Visible,
                    loading: false,
                    item: action.item
                },
            } as IFileConfigurationRouteStateState;
        }

        case FileConfigurationRouteStateActionTypes.SetRouteAccepted: {
            return {
                ...state,
                routeAcceptedSet: {
                    ...state.routeAcceptedSet,
                    loading: true
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteAcceptedSuccess: {
            return {
                ...state,
                routeAcceptedSet: {
                    ...state.routeAcceptedSet,
                    loading: false,
                    Visible: false
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteAcceptedFailed: {
            return {
                ...state,
                routeAcceptedSet: {
                    ...state.routeAcceptedSet,
                    loading: false
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteAcceptedModal: {
            return {
                ...state,
                routeAcceptedSet: {
                    ...state.routeAcceptedSet,
                    Visible: action.Visible,
                    loading: false,
                    item: action.item
                },
            } as IFileConfigurationRouteStateState;
        }

        case FileConfigurationRouteStateActionTypes.SetRouteIgnored: {
            return {
                ...state,
                routeIgnoredSet: {
                    ...state.routeIgnoredSet,
                    loading: true
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteIgnoredSuccess: {
            return {
                ...state,
                routeIgnoredSet: {
                    ...state.routeIgnoredSet,
                    loading: false,
                    Visible: false
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteIgnoredFailed: {
            return {
                ...state,
                routeIgnoredSet: {
                    ...state.routeIgnoredSet,
                    loading: false
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteIgnoredModal: {
            return {
                ...state,
                routeIgnoredSet: {
                    ...state.routeIgnoredSet,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IFileConfigurationRouteStateState;
        }

        case FileConfigurationRouteStateActionTypes.SetRouteToLastState: {
            return {
                ...state,
                routeToLastStateSet: {
                    ...state.routeToLastStateSet,
                    loading: true
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteToLastStateSuccess: {
            return {
                ...state,
                routeToLastStateSet: {
                    ...state.routeToLastStateSet,
                    loading: false,
                    Visible: false
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteToLastStateFailed: {
            return {
                ...state,
                routeToLastStateSet: {
                    ...state.routeToLastStateSet,
                    loading: false
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.SetRouteToLastStateModal: {
            return {
                ...state,
                routeToLastStateSet: {
                    ...state.routeToLastStateSet,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IFileConfigurationRouteStateState;
        }

        case FileConfigurationRouteStateActionTypes.GetRouteBA: {
            return {
                ...state,
                routeBA: {
                    ...state.routeBA,
                    loading: true,
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.GetRouteBASuccess: {
            return {
                ...state,
                routeBA: {
                    ...state.routeBA,
                    loading: false,
                    Visible: true,
                    managerAccept: action.managerAccept,
                    routeState: action.routeState,
                    item: action.item,
                    data: action.data
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.GetRouteBAFailed: {
            return {
                ...state,
                routeBA: {
                    ...state.routeBA,
                    loading: false,
                    Visible: false,
                    managerAccept: false,
                    routeState: 0,
                    item: {},
                    data: {}
                },
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.GetRouteBAModal: {
            return {
                ...state,
                routeBA: {
                    ...state.routeBA,
                    managerAccept: false,
                    routeState: 0,
                    item: {},
                    Visible: action.Visible
                },
            } as IFileConfigurationRouteStateState;
        }

        case FileConfigurationRouteStateActionTypes.PushAlert: {
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            } as IFileConfigurationRouteStateState;
        }
        case FileConfigurationRouteStateActionTypes.ClearAlerts: {
            return {
                ...state,
                alerts: []
            } as IFileConfigurationRouteStateState;
        }
    }
    return state;
};
