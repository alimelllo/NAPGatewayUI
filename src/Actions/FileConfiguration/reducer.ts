import { Reducer } from "redux";
import { FileConfigurationActionTypes } from "./actionType";
import { IFileConfigurationState, KnownAction } from "./model";

const unloadedState: IFileConfigurationState = {
    fileConfigurationList: {
        loading: false,
        data: [],
    },
    fileConfigurationCreate: {
        loading: false,
        Visible: false
    },
    fileConfigurationUpdate: {
        loading: false,
        Visible: false,
        item: {}
    },
    options: {
        loading: false,
        loaded: false,
        data: {}
    },
    alerts: []
};

export const FileConfigurationReducer: Reducer<IFileConfigurationState, KnownAction> = (state: IFileConfigurationState = unloadedState, action: KnownAction) => {
    switch (action.type) {
        case FileConfigurationActionTypes.FileConfigurationFetch: {
            return {
                ...state,
                fileConfigurationList: {
                    ...state.fileConfigurationList,
                    loading: true,
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.FileConfigurationFetchSuccess: {
            return {
                ...state,
                fileConfigurationList: {
                    ...state.fileConfigurationList,
                    loading: false,
                    data: action.data
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.FileConfigurationFetchFailed: {
            return {
                ...state,
                fileConfigurationList: {
                    ...state.fileConfigurationList,
                    loading: false
                },
            } as IFileConfigurationState;
        }

        case FileConfigurationActionTypes.FileConfigurationCreate: {
            return {
                ...state,
                fileConfigurationCreate: {
                    ...state.fileConfigurationCreate,
                    loading: true
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.FileConfigurationCreateSuccess: {
            return {
                ...state,
                fileConfigurationCreate: {
                    ...state.fileConfigurationCreate,
                    loading: false,
                    Visible: false
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.FileConfigurationCreateFailed: {
            return {
                ...state,
                fileConfigurationCreate: {
                    ...state.fileConfigurationCreate,
                    loading: false
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.FileConfigurationCreateModal: {
            return {
                ...state,
                fileConfigurationCreate: {
                    ...state.fileConfigurationCreate,
                    Visible: action.Visible,
                    loading: false
                },
            } as IFileConfigurationState;
        }

        case FileConfigurationActionTypes.FileConfigurationUpdate: {
            return {
                ...state,
                fileConfigurationUpdate: {
                    ...state.fileConfigurationUpdate,
                    loading: true
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.FileConfigurationUpdateSuccess: {
            return {
                ...state,
                fileConfigurationUpdate: {
                    ...state.fileConfigurationUpdate,
                    loading: false,
                    Visible: false
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.FileConfigurationUpdateFailed: {
            return {
                ...state,
                fileConfigurationUpdate: {
                    ...state.fileConfigurationUpdate,
                    loading: false
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.FileConfigurationUpdateModal: {
            return {
                ...state,
                fileConfigurationUpdate: {
                    ...state.fileConfigurationUpdate,
                    Visible: action.Visible,
                    item: action.item,
                    loading: false
                },
            } as IFileConfigurationState;
        }

        case FileConfigurationActionTypes.OptionsFetch: {
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: true,
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.OptionsFetchSuccess: {
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: false,
                    loaded: true,
                    data: action.data
                },
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.OptionsFetchFailed: {
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: false
                },
            } as IFileConfigurationState;
        }

        case FileConfigurationActionTypes.PushAlert: {
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            } as IFileConfigurationState;
        }
        case FileConfigurationActionTypes.ClearAlerts: {
            return {
                ...state,
                alerts: []
            } as IFileConfigurationState;
        }
    }
    return state;
};
