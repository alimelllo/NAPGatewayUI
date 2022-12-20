import { Action } from "redux";
import { ClientTracingActionTypes } from "./actionType";

export interface IClientTracingState {
  baseUrl: {
    loading: boolean;
    baseUrl: string;
  },
  serviceList: {
    loading: boolean;
    data: string[];
  },
  clientList: {
    loading: boolean;
    data: string[];
  },
  currentClient: {
    clientId: string;
    index: number
  }
  serviceTraceList: {
    loading: boolean;
    data: any[];
    serviceName: string;
    clientId: string;
    limit: number;
    tags: string;
    timeType: number;
    startTimestamp: string;
    finishTimestamp: string;
  },
  serviceTraceHistogramList: {
    loading: boolean;
    data: any[];
    count: number
  },
  traceDetail: {
    loading: boolean;
  },
  spanDetail: {
    loading: boolean;
    Visible: boolean;
    data: any;
  },
  alerts: any[]
}

interface IBaseUrlFetch extends Action<string> {
  type: ClientTracingActionTypes.BaseUrlFetch;
}
interface IBaseUrlFetchSuccess extends Action<string> {
  type: ClientTracingActionTypes.BaseUrlFetchSuccess;
  baseUrl: string
}
interface IBaseUrlFetchFailed extends Action<string> {
  type: ClientTracingActionTypes.BaseUrlFetchFailed;
}

interface IServiceListFetch extends Action<string> {
  type: ClientTracingActionTypes.ServiceListFetch;
}
interface IServiceListFetchSuccess extends Action<string> {
  type: ClientTracingActionTypes.ServiceListFetchSuccess;
  data: any
}
interface IServiceListFetchFailed extends Action<string> {
  type: ClientTracingActionTypes.ServiceListFetchFailed;
}

interface IClientListFetch extends Action<string> {
  type: ClientTracingActionTypes.ClientListFetch;
}
interface IClientListFetchSuccess extends Action<string> {
  type: ClientTracingActionTypes.ClientListFetchSuccess;
  data: any
}
interface IClientListFetchFailed extends Action<string> {
  type: ClientTracingActionTypes.ClientListFetchFailed;
}

interface ISetCurrentClient extends Action<string> {
  type: ClientTracingActionTypes.SetCurrentClient;
  clientId: string;
  index: number
}

interface IServiceTraceFetch extends Action<string> {
  type: ClientTracingActionTypes.ServiceTraceFetch;
}
interface IServiceTraceFetchSuccess extends Action<string> {
  type: ClientTracingActionTypes.ServiceTraceFetchSuccess;
  data: any;
}
interface IServiceTraceFetchFailed extends Action<string> {
  type: ClientTracingActionTypes.ServiceTraceFetchFailed;
}
interface ISetServiceName extends Action<string> {
  type: ClientTracingActionTypes.SetServiceName;
  serviceName: string
}
interface ISetClientId extends Action<string> {
  type: ClientTracingActionTypes.SetClientId;
  clientId: string
}
interface ISetLimit extends Action<string> {
  type: ClientTracingActionTypes.SetLimit;
  limit: number
}
interface ISetTags extends Action<string> {
  type: ClientTracingActionTypes.SetTags;
  tags: string
}
interface ISetTimeType extends Action<string> {
  type: ClientTracingActionTypes.SetTimeType;
  timeType: number
}
interface ISetStartTimestamp extends Action<string> {
  type: ClientTracingActionTypes.SetStartTimestamp;
  startTimestamp: string
}
interface ISetFinishTimestamp extends Action<string> {
  type: ClientTracingActionTypes.SetFinishTimestamp;
  finishTimestamp: string
}

interface IServiceTraceHistogramFetch extends Action<string> {
  type: ClientTracingActionTypes.ServiceTraceHistogramFetch;
}
interface IServiceTraceHistogramFetchSuccess extends Action<string> {
  type: ClientTracingActionTypes.ServiceTraceHistogramFetchSuccess;
  data: any
  count: number
}
interface IServiceTraceHistogramFetchFailed extends Action<string> {
  type: ClientTracingActionTypes.ServiceTraceHistogramFetchFailed;
}

interface ITraceDetailFetch extends Action<string> {
  type: ClientTracingActionTypes.TraceDetailFetch;
}
interface ITraceDetailFetchSuccess extends Action<string> {
  type: ClientTracingActionTypes.TraceDetailFetchSuccess;
}
interface ITraceDetailFetchFailed extends Action<string> {
  type: ClientTracingActionTypes.TraceDetailFetchFailed;
}

interface ISpanDetailFetch extends Action<string> {
  type: ClientTracingActionTypes.SpanDetailFetch;
}
interface ISpanDetailFetchSuccess extends Action<string> {
  type: ClientTracingActionTypes.SpanDetailFetchSuccess;
  data: any
}
interface ISpanDetailFetchFailed extends Action<string> {
  type: ClientTracingActionTypes.SpanDetailFetchFailed;
}
interface ISpanDetailFetchModal extends Action<string> {
  type: ClientTracingActionTypes.SpanDetailFetchModal;
  Visible: boolean;
}

interface IPushAlert extends Action<string> {
  type: ClientTracingActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: ClientTracingActionTypes.ClearAlerts;
}

export type KnownAction =
  | IBaseUrlFetch
  | IBaseUrlFetchSuccess
  | IBaseUrlFetchFailed
  | IServiceListFetch
  | IServiceListFetchSuccess
  | IServiceListFetchFailed
  | IClientListFetch
  | IClientListFetchSuccess
  | IClientListFetchFailed
  | IServiceTraceFetch
  | IServiceTraceFetchSuccess
  | IServiceTraceFetchFailed
  | ISetClientId
  | ISetServiceName
  | ISetLimit
  | ISetTags
  | ISetTimeType
  | ISetStartTimestamp
  | ISetFinishTimestamp
  | ISetCurrentClient
  | IServiceTraceHistogramFetch
  | IServiceTraceHistogramFetchSuccess
  | IServiceTraceHistogramFetchFailed
  | ITraceDetailFetch
  | ITraceDetailFetchSuccess
  | ITraceDetailFetchFailed
  | ISpanDetailFetch
  | ISpanDetailFetchSuccess
  | ISpanDetailFetchFailed
  | ISpanDetailFetchModal
  | IPushAlert
  | IClearAlerts;
