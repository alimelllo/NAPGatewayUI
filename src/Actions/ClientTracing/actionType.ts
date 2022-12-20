export enum ClientTracingActionTypes {
    BaseUrlFetch = "@@ClientTracing/BaseUrlFetch",
    BaseUrlFetchSuccess = "@@ClientTracing/BaseUrlFetchSuccess",
    BaseUrlFetchFailed = "@@ClientTracing/BaseUrlFetchFailed",

    ServiceListFetch = "@@ClientTracing/ServiceListFetch",
    ServiceListFetchSuccess = "@@ClientTracing/ServiceListFetchSuccess",
    ServiceListFetchFailed = "@@ClientTracing/ServiceListFetchFailed",

    ClientListFetch = "@@ClientTracing/ClientListFetch",
    ClientListFetchSuccess = "@@ClientTracing/ClientListFetchSuccess",
    ClientListFetchFailed = "@@ClientTracing/ClientListFetchFailed",

    SetCurrentClient = "@@ClientTracing/SetCurrentClient",

    ServiceTraceFetch = "@@ClientTracing/ServiceTraceFetch",
    ServiceTraceFetchSuccess = "@@ClientTracing/ServiceTraceFetchSuccess",
    ServiceTraceFetchFailed = "@@ClientTracing/ServiceTraceFetchFailed",
    SetClientId = "@@ClientTracing/SetClientId",
    SetServiceName = "@@ClientTracing/SetServiceName",
    SetLimit = "@@ClientTracing/SetLimit",
    SetTags = "@@ClientTracing/SetTags",
    SetTimeType = "@@ClientTracing/SetTimeType",
    SetStartTimestamp = "@@ClientTracing/SetStartTimestamp",
    SetFinishTimestamp = "@@ClientTracing/SetFinishTimestamp",

    ServiceTraceHistogramFetch = "@@ClientTracing/ServiceTraceHistogramFetch",
    ServiceTraceHistogramFetchSuccess = "@@ClientTracing/ServiceTraceHistogramFetchSuccess",
    ServiceTraceHistogramFetchFailed = "@@ClientTracing/ServiceTraceHistogramFetchFailed",

    TraceDetailFetch = "@@ClientTracing/TraceDetailFetch",
    TraceDetailFetchSuccess = "@@ClientTracing/TraceDetailFetchSuccess",
    TraceDetailFetchFailed = "@@ClientTracing/TraceDetailFetchFailed",

    SpanDetailFetch = "@@ClientTracing/SpanDetailFetch",
    SpanDetailFetchSuccess = "@@ClientTracing/SpanDetailFetchSuccess",
    SpanDetailFetchFailed = "@@ClientTracing/SpanDetailFetchFailed",
    SpanDetailFetchModal = "@@ClientTracing/SpanDetailFetchModal",

    PushAlert = "@@ClientTracing/PushAlert",
    ClearAlerts = "@@ClientTracing/ClearAlerts",
}
