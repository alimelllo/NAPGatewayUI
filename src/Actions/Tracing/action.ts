import { AppAction } from "../../Store/state";
import { TracingActionTypes } from "./actionType";
import { KnownAction } from "./model";
import axios from "axios";
import API from "../../GeneralComponents/baseURL";

export const tracingActions = {
  getBaseUrl: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.BaseUrlFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetTracingUrl?fileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({ type: TracingActionTypes.BaseUrlFetchSuccess, baseUrl: result.data });
        tracingActions.getServiceList()(dispatch, getState)
      } else if (result.status == 204) {
        dispatch({ type: TracingActionTypes.BaseUrlFetchSuccess, baseUrl: "" });
      } else if (result.status == 401) {
        dispatch({ type: TracingActionTypes.BaseUrlFetchSuccess, baseUrl: "" });
        tracingActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: TracingActionTypes.BaseUrlFetchFailed });
      tracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  getServiceList: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.ServiceListFetch });
    axios.get(getState().tracing.baseUrl.baseUrl + "/api/service")
      .then((result: any) => {
        if (result.status == 200)
          dispatch({ type: TracingActionTypes.ServiceListFetchSuccess, data: result.data });
        else if (result.status == 204)
          dispatch({ type: TracingActionTypes.ServiceListFetchSuccess, data: [] });
        else if (result.status == 401) {
          dispatch({ type: TracingActionTypes.ServiceListFetchSuccess, data: [] });
          tracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: TracingActionTypes.ServiceListFetchFailed });
        tracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },

  setCurrectService: (serviceName: string, index: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.SetCurrentService, serviceName, index });
  },

  getServiceTraceList: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let serviceName = getState().tracing.serviceTraceList.serviceName;
    let limit = getState().tracing.serviceTraceList.limit;
    let tags = getState().tracing.serviceTraceList.tags;
    let startTimestamp = getState().tracing.serviceTraceList.startTimestamp == "" ? 0 : new Date(getState().tracing.serviceTraceList.startTimestamp).getTime();
    let finishTimestamp = getState().tracing.serviceTraceList.finishTimestamp == "" ? 0 :new Date(getState().tracing.serviceTraceList.finishTimestamp).getTime();
    dispatch({ type: TracingActionTypes.ServiceTraceFetch });
    axios.get(getState().tracing.baseUrl.baseUrl + "/api/trace?limit=" + limit + (serviceName != "AllServices" && serviceName != "" ? "&service=" + serviceName : "") + (tags != "" ? "&tags=" + tags : "") + (startTimestamp > 0 ? "&startTimestamp=" + startTimestamp : "") + (startTimestamp > 0 ? "&finishTimestamp=" + finishTimestamp : ""))
      .then((result: any) => {
        if (result.status == 200) {
          dispatch({ type: TracingActionTypes.ServiceTraceFetchSuccess, data: result.data });
          tracingActions.getServiceTraceHistogramList(serviceName, limit, tags, startTimestamp, finishTimestamp)(dispatch, getState)
        } else if (result.status == 204)
          dispatch({ type: TracingActionTypes.ServiceTraceFetchSuccess, data: [] });
        else if (result.status == 401) {
          dispatch({ type: TracingActionTypes.ServiceTraceFetchSuccess, data: [] });
          tracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: TracingActionTypes.ServiceTraceFetchFailed });
        tracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },
  setServiceName: (serviceName: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.SetServiceName, serviceName });
    tracingActions.getServiceTraceList()(dispatch, getState)
  },
  setLimit: (limit: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.SetLimit, limit });
    tracingActions.getServiceTraceList()(dispatch, getState)
  },
  setTags: (tags: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.SetTags, tags });
  },
  setStartTimestamp: (startTimestamp: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.SetStartTimestamp, startTimestamp });
  },
  setFinishTimestamp: (finishTimestamp: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.SetFinishTimestamp, finishTimestamp });
  },

  getServiceTraceHistogramList: (serviceName: string, limit: number, tags: string, startTimestamp: number, finishTimestamp: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.ServiceTraceHistogramFetch });
    axios.get(getState().tracing.baseUrl.baseUrl + "/api/trace/histogram?limit=" + limit + (serviceName != "AllServices" && serviceName != "" ? "&service=" + serviceName : "") + (tags != "" ? "&tags=" + tags : "") + (startTimestamp > 0 ? "&startTimestamp=" + startTimestamp : "") + (startTimestamp > 0 ? "&finishTimestamp=" + finishTimestamp : ""))
      .then((result: any) => {
        if (result.status == 200)
          dispatch({ type: TracingActionTypes.ServiceTraceHistogramFetchSuccess, data: result.data });
        else if (result.status == 204)
          dispatch({ type: TracingActionTypes.ServiceTraceHistogramFetchSuccess, data: [] });
        else if (result.status == 401) {
          dispatch({ type: TracingActionTypes.ServiceTraceHistogramFetchSuccess, data: [] });
          tracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: TracingActionTypes.ServiceTraceHistogramFetchFailed });
        tracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },

  getTraceDetail: (id: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (getState().tracing.serviceTraceList.data.find((x) => x.traceId == id).detail) {
      const newList: any[] = getState().tracing.serviceTraceList.data.map((item: any) => {
        return item.traceId == id ? { ...item, visible: !item.visible } : { ...item, visible: false }
      });
      dispatch({ type: TracingActionTypes.ServiceTraceFetchSuccess, data: newList });
      return;
    }
    dispatch({ type: TracingActionTypes.TraceDetailFetch });
    axios.get(getState().tracing.baseUrl.baseUrl + "/api/tracedetail/" + id)
      .then((result: any) => {
        if (result.status == 200) {
          dispatch({ type: TracingActionTypes.TraceDetailFetchSuccess });
          const newList: any[] = getState().tracing.serviceTraceList.data.map((item: any) => {
            return item.traceId == id ? { ...item, visible: true, detail: result.data } : { ...item, visible: false }
          });
          dispatch({ type: TracingActionTypes.ServiceTraceFetchSuccess, data: newList });
        } else if (result.status == 204)
          dispatch({ type: TracingActionTypes.TraceDetailFetchFailed });
        else if (result.status == 401) {
          dispatch({ type: TracingActionTypes.TraceDetailFetchFailed });
          tracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: TracingActionTypes.TraceDetailFetchFailed });
        tracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },

  getSpanDetail: (id: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.SpanDetailFetch });
    axios.get(getState().tracing.baseUrl.baseUrl + "/api/spandetail/" + id)
      .then((result: any) => {
        if (result.status == 200)
          dispatch({ type: TracingActionTypes.SpanDetailFetchSuccess, data: result.data });
        else if (result.status == 204)
          dispatch({ type: TracingActionTypes.SpanDetailFetchSuccess, data: [] });
        else if (result.status == 401) {
          dispatch({ type: TracingActionTypes.SpanDetailFetchSuccess, data: [] });
          tracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: TracingActionTypes.SpanDetailFetchFailed });
        tracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },
  toggleSpanDetailModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.SpanDetailFetchModal, Visible });
  },

  pushAlert: (
    alert: {
      title: string,
      description: string,
      variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
      dismissTime?: number
    }
  ): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
      type: TracingActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: TracingActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      tracingActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      tracingActions.pushAlert(
        {
          title: "error",
          description: "UnSuccessfulOperation",
          variant: 'danger'
        }
      )(dispatch, getState);
    }
  },
  pushCommonAlert: (type: '200' | '204' | '401' | 'errorFetch'): AppAction<KnownAction> => async (dispatch, getState) => {
    switch (type) {
      case '200':
        tracingActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        tracingActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        tracingActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        tracingActions.pushAlert(
          {
            title: "error",
            description: "UnSuccessfetchData",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
    }
  },
};
