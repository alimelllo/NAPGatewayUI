import { Reducer } from "redux";
import { FileConfigurationRoutesDisplayActionTypes } from "./actionType";
import { IFileConfigurationRoutesDisplayState, KnownAction } from "./model";

const unloadedState: IFileConfigurationRoutesDisplayState = {
    routeList: {
        loading: false,
        data: [],
    },
    alerts: []
};

export const FileConfigurationRoutesDisplayReducer: Reducer<IFileConfigurationRoutesDisplayState, KnownAction> = (state: IFileConfigurationRoutesDisplayState = unloadedState, action: KnownAction) => {
    switch (action.type) {
        case FileConfigurationRoutesDisplayActionTypes.RouteFetch: {
            return {
                ...state,
                routeList: {
                    ...state.routeList,
                    loading: true,
                },
            } as IFileConfigurationRoutesDisplayState;
        }
        case FileConfigurationRoutesDisplayActionTypes.RouteFetchSuccess: {
            return {
                ...state,
                routeList: {
                    ...state.routeList,
                    loading: false,
                    data: action.data
                },
            } as IFileConfigurationRoutesDisplayState;
        }
        case FileConfigurationRoutesDisplayActionTypes.RouteFetchFailed: {
            return {
                ...state,
                routeList: {
                    ...state.routeList,
                    loading: false
                },
            } as IFileConfigurationRoutesDisplayState;
        }

        case FileConfigurationRoutesDisplayActionTypes.PushAlert: {
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            } as IFileConfigurationRoutesDisplayState;
        }
        case FileConfigurationRoutesDisplayActionTypes.ClearAlerts: {
            return {
                ...state,
                alerts: []
            } as IFileConfigurationRoutesDisplayState;
        }
    }
    return state;
};
