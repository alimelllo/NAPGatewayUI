import { Reducer } from "redux";
import { TracingActionTypes } from "./actionType";
import { ITracingState, KnownAction } from "./model";

const unloadedState: ITracingState = {
    baseUrl: {
        loading: false,
        baseUrl: '',
    },
    serviceList: {
        loading: false,
        data: [],
    },
    currentService: {
        serviceName: "",
        index: -1
    },
    serviceTraceList: {
        loading: false,
        data: [],
        serviceName: '',
        limit: 10,
        tags: "",
        startTimestamp: "",
        finishTimestamp: "",
    },
    serviceTraceHistogramList: {
        loading: false,
        data: []
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

export const TracingReducer: Reducer<ITracingState, KnownAction> = (state: ITracingState = unloadedState, action: KnownAction) => {
    switch (action.type) {
        case TracingActionTypes.BaseUrlFetch: {
            return {
                ...state,
                baseUrl: {
                    ...state.baseUrl,
                    loading: true,
                },
            } as ITracingState;
        }
        case TracingActionTypes.BaseUrlFetchSuccess: {
            return {
                ...state,
                baseUrl: {
                    ...state.baseUrl,
                    loading: false,
                    baseUrl: action.baseUrl
                },
            } as ITracingState;
        }
        case TracingActionTypes.BaseUrlFetchFailed: {
            return {
                ...state,
                baseUrl: {
                    ...state.baseUrl,
                    loading: false
                },
            } as ITracingState;
        }

        case TracingActionTypes.ServiceListFetch: {
            return {
                ...state,
                serviceList: {
                    ...state.serviceList,
                    loading: true,
                },
            } as ITracingState;
        }
        case TracingActionTypes.ServiceListFetchSuccess: {
            return {
                ...state,
                serviceList: {
                    ...state.serviceList,
                    loading: false,
                    data: action.data
                },
            } as ITracingState;
        }
        case TracingActionTypes.ServiceListFetchFailed: {
            return {
                ...state,
                serviceList: {
                    ...state.serviceList,
                    loading: false
                },
            } as ITracingState;
        }

        case TracingActionTypes.SetCurrentService: {
            return {
                ...state,
                currentService: {
                    ...state.currentService,
                    serviceName: action.serviceName,
                    index: action.index
                },
            } as ITracingState;
        }

        case TracingActionTypes.ServiceTraceFetch: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: true
                },
            } as ITracingState;
        }
        case TracingActionTypes.ServiceTraceFetchSuccess: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    data: action.data
                },
            } as ITracingState;
        }
        case TracingActionTypes.ServiceTraceFetchFailed: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false
                },
            } as ITracingState;
        }

        case TracingActionTypes.SetServiceName: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    serviceName: action.serviceName
                },
            } as ITracingState;
        }
        case TracingActionTypes.SetLimit: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    limit: action.limit
                },
            } as ITracingState;
        }
        case TracingActionTypes.SetTags: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    tags: action.tags
                },
            } as ITracingState;
        }
        case TracingActionTypes.SetStartTimestamp: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    startTimestamp: action.startTimestamp
                },
            } as ITracingState;
        }
        case TracingActionTypes.SetFinishTimestamp: {
            return {
                ...state,
                serviceTraceList: {
                    ...state.serviceTraceList,
                    loading: false,
                    finishTimestamp: action.finishTimestamp
                },
            } as ITracingState;
        }

        case TracingActionTypes.ServiceTraceHistogramFetch: {
            return {
                ...state,
                serviceTraceHistogramList: {
                    ...state.serviceTraceHistogramList,
                    loading: true,
                },
            } as ITracingState;
        }
        case TracingActionTypes.ServiceTraceHistogramFetchSuccess: {
            return {
                ...state,
                serviceTraceHistogramList: {
                    ...state.serviceTraceHistogramList,
                    loading: false,
                    data: action.data
                },
            } as ITracingState;
        }
        case TracingActionTypes.ServiceTraceHistogramFetchFailed: {
            return {
                ...state,
                serviceTraceHistogramList: {
                    ...state.serviceTraceHistogramList,
                    loading: false
                },
            } as ITracingState;
        }

        case TracingActionTypes.TraceDetailFetch: {
            return {
                ...state,
                traceDetail: {
                    ...state.traceDetail,
                    loading: true,
                },
            } as ITracingState;
        }
        case TracingActionTypes.TraceDetailFetchSuccess: {
            return {
                ...state,
                traceDetail: {
                    ...state.traceDetail,
                    loading: false
                },
            } as ITracingState;
        }
        case TracingActionTypes.TraceDetailFetchFailed: {
            return {
                ...state,
                traceDetail: {
                    ...state.traceDetail,
                    loading: false
                },
            } as ITracingState;
        }

        case TracingActionTypes.SpanDetailFetch: {
            return {
                ...state,
                spanDetail: {
                    ...state.spanDetail,
                    loading: true,
                },
            } as ITracingState;
        }
        case TracingActionTypes.SpanDetailFetchSuccess: {
            return {
                ...state,
                spanDetail: {
                    ...state.spanDetail,
                    loading: false,
                    Visible: true,
                    data: action.data
                },
            } as ITracingState;
        }
        case TracingActionTypes.SpanDetailFetchFailed: {
            return {
                ...state,
                spanDetail: {
                    ...state.spanDetail,
                    loading: false
                },
            } as ITracingState;
        }
        case TracingActionTypes.SpanDetailFetchModal: {
            return {
                ...state,
                spanDetail: {
                    ...state.spanDetail,
                    Visible: action.Visible
                },
            } as ITracingState;
        }

        case TracingActionTypes.PushAlert: {
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            } as ITracingState;
        }
        case TracingActionTypes.ClearAlerts: {
            return {
                ...state,
                alerts: []
            } as ITracingState;
        }
    }
    return state;
};
