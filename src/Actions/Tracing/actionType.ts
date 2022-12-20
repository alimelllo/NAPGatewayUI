export enum TracingActionTypes {
    BaseUrlFetch = "@@Tracing/BaseUrlFetch",
    BaseUrlFetchSuccess = "@@Tracing/BaseUrlFetchSuccess",
    BaseUrlFetchFailed = "@@Tracing/BaseUrlFetchFailed",

    ServiceListFetch = "@@Tracing/ServiceListFetch",
    ServiceListFetchSuccess = "@@Tracing/ServiceListFetchSuccess",
    ServiceListFetchFailed = "@@Tracing/ServiceListFetchFailed",

    SetCurrentService = "@@Tracing/SetCurrentService",

    ServiceTraceFetch = "@@Tracing/ServiceTraceFetch",
    ServiceTraceFetchSuccess = "@@Tracing/ServiceTraceFetchSuccess",
    ServiceTraceFetchFailed = "@@Tracing/ServiceTraceFetchFailed",
    SetServiceName = "@@Tracing/SetServiceName",
    SetLimit = "@@Tracing/SetLimit",
    SetTags = "@@Tracing/SetTags",
    SetStartTimestamp = "@@Tracing/SetStartTimestamp",
    SetFinishTimestamp = "@@Tracing/SetFinishTimestamp",

    ServiceTraceHistogramFetch = "@@Tracing/ServiceTraceHistogramFetch",
    ServiceTraceHistogramFetchSuccess = "@@Tracing/ServiceTraceHistogramFetchSuccess",
    ServiceTraceHistogramFetchFailed = "@@Tracing/ServiceTraceHistogramFetchFailed",

    TraceDetailFetch = "@@Tracing/TraceDetailFetch",
    TraceDetailFetchSuccess = "@@Tracing/TraceDetailFetchSuccess",
    TraceDetailFetchFailed = "@@Tracing/TraceDetailFetchFailed",

    SpanDetailFetch = "@@Tracing/SpanDetailFetch",
    SpanDetailFetchSuccess = "@@Tracing/SpanDetailFetchSuccess",
    SpanDetailFetchFailed = "@@Tracing/SpanDetailFetchFailed",
    SpanDetailFetchModal = "@@Tracing/SpanDetailFetchModal",

    PushAlert = "@@Tracing/PushAlert",
    ClearAlerts = "@@Tracing/ClearAlerts",
}
