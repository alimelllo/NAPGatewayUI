import { Action } from "redux";
import { TracingActionTypes } from "./actionType";

export interface ITracingState {
  baseUrl: {
    loading: boolean;
    baseUrl: string;
  },
  serviceList: {
    loading: boolean;
    data: string[];
  },
  currentService: {
    serviceName: string;
    index: number
  }
  serviceTraceList: {
    loading: boolean;
    data: any[];
    serviceName: string;
    limit: number;
    tags: string;
    startTimestamp: string;
    finishTimestamp: string;
  },
  serviceTraceHistogramList: {
    loading: boolean;
    data: any[];
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
  type: TracingActionTypes.BaseUrlFetch;
}
interface IBaseUrlFetchSuccess extends Action<string> {
  type: TracingActionTypes.BaseUrlFetchSuccess;
  baseUrl: string
}
interface IBaseUrlFetchFailed extends Action<string> {
  type: TracingActionTypes.BaseUrlFetchFailed;
}

interface IServiceListFetch extends Action<string> {
  type: TracingActionTypes.ServiceListFetch;
}
interface IServiceListFetchSuccess extends Action<string> {
  type: TracingActionTypes.ServiceListFetchSuccess;
  data: any
}
interface IServiceListFetchFailed extends Action<string> {
  type: TracingActionTypes.ServiceListFetchFailed;
}

interface ISetCurrentService extends Action<string> {
  type: TracingActionTypes.SetCurrentService;
  serviceName: string;
  index: number
}

interface IServiceTraceFetch extends Action<string> {
  type: TracingActionTypes.ServiceTraceFetch;
}
interface IServiceTraceFetchSuccess extends Action<string> {
  type: TracingActionTypes.ServiceTraceFetchSuccess;
  data: any;
}
interface IServiceTraceFetchFailed extends Action<string> {
  type: TracingActionTypes.ServiceTraceFetchFailed;
}
interface ISetServiceName extends Action<string> {
  type: TracingActionTypes.SetServiceName;
  serviceName: string
}
interface ISetLimit extends Action<string> {
  type: TracingActionTypes.SetLimit;
  limit: number
}
interface ISetTags extends Action<string> {
  type: TracingActionTypes.SetTags;
  tags: string
}
interface ISetStartTimestamp extends Action<string> {
  type: TracingActionTypes.SetStartTimestamp;
  startTimestamp: string
}
interface ISetFinishTimestamp extends Action<string> {
  type: TracingActionTypes.SetFinishTimestamp;
  finishTimestamp: string
}

interface IServiceTraceHistogramFetch extends Action<string> {
  type: TracingActionTypes.ServiceTraceHistogramFetch;
}
interface IServiceTraceHistogramFetchSuccess extends Action<string> {
  type: TracingActionTypes.ServiceTraceHistogramFetchSuccess;
  data: any
}
interface IServiceTraceHistogramFetchFailed extends Action<string> {
  type: TracingActionTypes.ServiceTraceHistogramFetchFailed;
}

interface ITraceDetailFetch extends Action<string> {
  type: TracingActionTypes.TraceDetailFetch;
}
interface ITraceDetailFetchSuccess extends Action<string> {
  type: TracingActionTypes.TraceDetailFetchSuccess;
}
interface ITraceDetailFetchFailed extends Action<string> {
  type: TracingActionTypes.TraceDetailFetchFailed;
}

interface ISpanDetailFetch extends Action<string> {
  type: TracingActionTypes.SpanDetailFetch;
}
interface ISpanDetailFetchSuccess extends Action<string> {
  type: TracingActionTypes.SpanDetailFetchSuccess;
  data: any
}
interface ISpanDetailFetchFailed extends Action<string> {
  type: TracingActionTypes.SpanDetailFetchFailed;
}
interface ISpanDetailFetchModal extends Action<string> {
  type: TracingActionTypes.SpanDetailFetchModal;
  Visible: boolean;
}

interface IPushAlert extends Action<string> {
  type: TracingActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: TracingActionTypes.ClearAlerts;
}

export type KnownAction =
  | IBaseUrlFetch
  | IBaseUrlFetchSuccess
  | IBaseUrlFetchFailed
  | IServiceListFetch
  | IServiceListFetchSuccess
  | IServiceListFetchFailed
  | IServiceTraceFetch
  | IServiceTraceFetchSuccess
  | IServiceTraceFetchFailed
  | ISetServiceName
  | ISetLimit
  | ISetTags
  | ISetStartTimestamp
  | ISetFinishTimestamp
  | ISetCurrentService
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
