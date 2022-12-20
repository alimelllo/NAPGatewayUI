import { Reducer } from "redux";
import { ClientTracingActionTypes } from "./actionType";
import { IClientTracingState, KnownAction } from "./model";

const unloadedState: IClientTracingState = {
    baseUrl: {
        loading: false,
        baseUrl: '',
    },
    serviceList: {
        loading: false,
        data: [],
    },
    clientList: {
        loading: false,
        data: [],
    },
    currentClient: {
        clientId: "",
        index: -1
    },
    serviceTraceList: {
        loading: false,
        data: [],
        serviceName: 'AllServices',
        clientId: '',
        limit: 10,
        tags: "",
        timeType: 0,
        startTimestamp: "",
        finishTimestamp: "",
    },
    serviceTraceHistogramList: {
        loading: false,
        data: [],
        count: 0
    },
    traceDetail: {
        loading: false
    },
    spanDetail: {
        loading: false,
        Visible: false,
        data: {}
    },
    alerts: []
};

export const ClientTracingReducer: Reducer<IClientTracingState, KnownAction> = (state: IClientTracingState = unloadedState, action: KnownAction) => {
    switch (action.type) {
        case ClientTracingActionTypes.BaseUrlFetch: {
            return {
                ...state,
                baseUrl: {
                    ...state.baseUrl,
                    loading: true,
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.BaseUrlFetchSuccess: {
            return {
                ...state,
                baseUrl: {
                    ...state.baseUrl,
                    loading: false,
                    baseUrl: action.baseUrl
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.BaseUrlFetchFailed: {
            return {
                ...state,
                baseUrl: {
                    ...state.baseUrl,
                    loading: false
                },
            } as IClientTracingState;
        }

        case ClientTracingActionTypes.ServiceListFetch: {
            return {
                ...state,
                serviceList: {
                    ...state.serviceList,
                    loading: true,
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ServiceListFetchSuccess: {
            return {
                ...state,
                serviceList: {
                    ...state.serviceList,
                    loading: false,
                    data: action.data
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ServiceListFetchFailed: {
            return {
                ...state,
                serviceList: {
                    ...state.serviceList,
                    loading: false
                },
            } as IClientTracingState;
        }

        case ClientTracingActionTypes.ClientListFetch: {
            return {
                ...state,
                clientList: {
                    ...state.clientList,
                    loading: true,
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ClientListFetchSuccess: {
            return {
                ...state,
                clientList: {
                    ...state.clientList,
                    loading: false,
                    data: action.data
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ClientListFetchFailed: {
            return {
                ...state,
                clientList: {
                    ...state.clientList,
                    loading: false
                },
            } as IClientTracingState;
        }
        
        case ClientTracingActionTypes.SetCurrentClient: {
            return {
                ...state,
                currentClient: {
                    ...state.currentClient,
                    clientId: action.clientId,
                    index: action.index
                },
            } as IClientTracingState;
        }

        case ClientTracingActionTypes.ServiceTraceFetch: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: true
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ServiceTraceFetchSuccess: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    data: action.data
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ServiceTraceFetchFailed: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false
                },
            } as IClientTracingState;
        }

        case ClientTracingActionTypes.SetClientId: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    clientId: action.clientId
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SetServiceName: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    serviceName: action.serviceName
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SetLimit: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    limit: action.limit
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SetTags: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    tags: action.tags
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SetTimeType: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    timeType: action.timeType
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SetStartTimestamp: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    startTimestamp: action.startTimestamp
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SetFinishTimestamp: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    finishTimestamp: action.finishTimestamp
                },
            } as IClientTracingState;
        }

        case ClientTracingActionTypes.ServiceTraceHistogramFetch: {
            return {
                ...state,
                serviceTraceHistogramList: {
                    ...state.serviceTraceHistogramList,
                    loading: true,
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ServiceTraceHistogramFetchSuccess: {
            return {
                ...state,
                serviceTraceHistogramList: {
                    ...state.serviceTraceHistogramList,
                    loading: false,
                    data: action.data,
                    count: action.count
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ServiceTraceHistogramFetchFailed: {
            return {
                ...state,
                serviceTraceHistogramList: {
                    ...state.serviceTraceHistogramList,
                    loading: false
                },
            } as IClientTracingState;
        }

        case ClientTracingActionTypes.TraceDetailFetch: {
            return {
                ...state,
                traceDetail: {
                    ...state.traceDetail,
                    loading: true,
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.TraceDetailFetchSuccess: {
            return {
                ...state,
                traceDetail: {
                    ...state.traceDetail,
                    loading: false
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.TraceDetailFetchFailed: {
            return {
                ...state,
                traceDetail: {
                    ...state.traceDetail,
                    loading: false
                },
            } as IClientTracingState;
        }

        case ClientTracingActionTypes.SpanDetailFetch: {
            return {
                ...state,
                spanDetail: {
                    ...state.spanDetail,
                    loading: true,
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SpanDetailFetchSuccess: {
            return {
                ...state,
                spanDetail: {
                    ...state.spanDetail,
                    loading: false,
                    Visible: true,
                    data: action.data
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SpanDetailFetchFailed: {
            return {
                ...state,
                spanDetail: {
                    ...state.spanDetail,
                    loading: false
                },
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.SpanDetailFetchModal: {
            return {
                ...state,
                spanDetail: {
                    ...state.spanDetail,
                    Visible: action.Visible
                },
            } as IClientTracingState;
        }

        case ClientTracingActionTypes.PushAlert: {
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            } as IClientTracingState;
        }
        case ClientTracingActionTypes.ClearAlerts: {
            return {
                ...state,
                alerts: []
            } as IClientTracingState;
        }
    }
    return state;
};
