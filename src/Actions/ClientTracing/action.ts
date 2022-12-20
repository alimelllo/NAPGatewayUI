import { AppAction } from "../../Store/state";
import { ClientTracingActionTypes } from "./actionType";
import { KnownAction } from "./model";
import axios from "axios";
import API from "../../GeneralComponents/baseURL";

export const clientTracingActions = {
  getBaseUrl: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.BaseUrlFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetTracingUrl?fileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({ type: ClientTracingActionTypes.BaseUrlFetchSuccess, baseUrl: result.data });
        clientTracingActions.getClientList()(dispatch, getState)
      } else if (result.status == 204) {
        dispatch({ type: ClientTracingActionTypes.BaseUrlFetchSuccess, baseUrl: "" });
      } else if (result.status == 401) {
        dispatch({ type: ClientTracingActionTypes.BaseUrlFetchSuccess, baseUrl: "" });
        clientTracingActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: ClientTracingActionTypes.BaseUrlFetchFailed });
      clientTracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  getClientList: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.ClientListFetch });
    axios.get(getState().clientTracing.baseUrl.baseUrl + "/api/Client/GetClients")
      .then((result: any) => {
        if (result.status == 200) {
          dispatch({ type: ClientTracingActionTypes.ClientListFetchSuccess, data: result.data });
          clientTracingActions.getServiceList(getState().clientTracing.baseUrl.baseUrl)(dispatch, getState)
        } else if (result.status == 204)
          dispatch({ type: ClientTracingActionTypes.ClientListFetchSuccess, data: [] });
        else if (result.status == 401) {
          dispatch({ type: ClientTracingActionTypes.ClientListFetchSuccess, data: [] });
          clientTracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: ClientTracingActionTypes.ClientListFetchFailed });
        clientTracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },
  getServiceList: (baseUrl: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.ServiceListFetch });
    axios.get(baseUrl + "/api/service")
      .then((result: any) => {
        if (result.status == 200)
          dispatch({ type: ClientTracingActionTypes.ServiceListFetchSuccess, data: result.data });
        else if (result.status == 204)
          dispatch({ type: ClientTracingActionTypes.ServiceListFetchSuccess, data: [] });
        else if (result.status == 401) {
          dispatch({ type: ClientTracingActionTypes.ServiceListFetchSuccess, data: [] });
          clientTracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: ClientTracingActionTypes.ServiceListFetchFailed });
        clientTracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },

  setCurrectClient: (clientId: string, index: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SetCurrentClient, clientId, index });
  },

  getServiceTraceList: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let clientId = getState().clientTracing.serviceTraceList.clientId;
    let serviceName = getState().clientTracing.serviceTraceList.serviceName;
    let limit = getState().clientTracing.serviceTraceList.limit;
    let tags = getState().clientTracing.serviceTraceList.tags;
    let startTimestamp = getState().clientTracing.serviceTraceList.startTimestamp == "" ? 0 : new Date(getState().clientTracing.serviceTraceList.startTimestamp).getTime();
    let finishTimestamp = getState().clientTracing.serviceTraceList.finishTimestamp == "" ? 0 : new Date(getState().clientTracing.serviceTraceList.finishTimestamp).getTime();
    dispatch({ type: ClientTracingActionTypes.ServiceTraceFetch });
    axios.get(getState().clientTracing.baseUrl.baseUrl + "/api/client?clientId=" + clientId + "&limit=" + limit + (serviceName != "AllServices" && serviceName != "" ? "&service=" + serviceName : "") + (tags != "" ? "&tags=" + tags : "") + (startTimestamp > 0 ? "&startTimestamp=" + startTimestamp : "") + (startTimestamp > 0 ? "&finishTimestamp=" + finishTimestamp : ""))
      .then((result: any) => {
        if (result.status == 200) {
          dispatch({ type: ClientTracingActionTypes.ServiceTraceFetchSuccess, data: result.data });
          clientTracingActions.getServiceTraceHistogramList(clientId, serviceName, limit, tags, startTimestamp, finishTimestamp)(dispatch, getState)
        } else if (result.status == 204)
          dispatch({ type: ClientTracingActionTypes.ServiceTraceFetchSuccess, data: [] });
        else if (result.status == 401) {
          dispatch({ type: ClientTracingActionTypes.ServiceTraceFetchSuccess, data: [] });
          clientTracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: ClientTracingActionTypes.ServiceTraceFetchFailed });
        clientTracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },
  setClientId: (clientId: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SetClientId, clientId });
    clientTracingActions.getServiceTraceList()(dispatch, getState)
  },
  setServiceName: (serviceName: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SetServiceName, serviceName });
  },
  setLimit: (limit: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SetLimit, limit });
    clientTracingActions.getServiceTraceList()(dispatch, getState)
  },
  setTags: (tags: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SetTags, tags });
  },
  setTimeType: (timeType: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SetTimeType, timeType });
    let clientId = getState().clientTracing.serviceTraceList.clientId;
    let serviceName = getState().clientTracing.serviceTraceList.serviceName;
    let limit = getState().clientTracing.serviceTraceList.limit;
    let tags = getState().clientTracing.serviceTraceList.tags;
    let startTimestamp = getState().clientTracing.serviceTraceList.startTimestamp == "" ? 0 : new Date(getState().clientTracing.serviceTraceList.startTimestamp).getTime();
    let finishTimestamp = getState().clientTracing.serviceTraceList.finishTimestamp == "" ? 0 : new Date(getState().clientTracing.serviceTraceList.finishTimestamp).getTime();
    clientTracingActions.getServiceTraceHistogramList(clientId, serviceName, limit, tags, startTimestamp, finishTimestamp)(dispatch, getState)
  },
  setStartTimestamp: (startTimestamp: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SetStartTimestamp, startTimestamp });
  },
  setFinishTimestamp: (finishTimestamp: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SetFinishTimestamp, finishTimestamp });
  },

  getServiceTraceHistogramList: (clientId: string, serviceName: string, limit: number, tags: string, startTimestamp: number, finishTimestamp: number): AppAction<KnownAction> => async (dispatch, getState) => {
    let timeType = getState().clientTracing.serviceTraceList.timeType;
    dispatch({ type: ClientTracingActionTypes.ServiceTraceHistogramFetch });
    axios.get(getState().clientTracing.baseUrl.baseUrl + "/api/client/histogram?clientId=" + clientId + "&limit=" + limit + (serviceName != "AllServices" && serviceName != "" ? "&service=" + serviceName : "") + (tags != "" ? "&tags=" + tags : "") + (startTimestamp > 0 ? "&startTimestamp=" + startTimestamp : "") + (startTimestamp > 0 ? "&finishTimestamp=" + finishTimestamp : "") + "&timeType=" + timeType)
      .then((result: any) => {
        if (result.status == 200){
          let count = 0;
          result.data.map((x:any) => {count += x.count})
          dispatch({ type: ClientTracingActionTypes.ServiceTraceHistogramFetchSuccess, data: result.data, count });
        }else if (result.status == 204)
          dispatch({ type: ClientTracingActionTypes.ServiceTraceHistogramFetchSuccess, data: [], count: 0 });
        else if (result.status == 401) {
          dispatch({ type: ClientTracingActionTypes.ServiceTraceHistogramFetchSuccess, data: [], count: 0 });
          clientTracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: ClientTracingActionTypes.ServiceTraceHistogramFetchFailed });
        clientTracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },

  getTraceDetail: (id: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (getState().clientTracing.serviceTraceList.data.find((x) => x.traceId == id).detail) {
      const newList: any[] = getState().clientTracing.serviceTraceList.data.map((item: any) => {
        return item.traceId == id ? { ...item, visible: !item.visible } : { ...item, visible: false }
      });
      dispatch({ type: ClientTracingActionTypes.ServiceTraceFetchSuccess, data: newList });
      return;
    }
    dispatch({ type: ClientTracingActionTypes.TraceDetailFetch });
    axios.get(getState().clientTracing.baseUrl.baseUrl + "/api/tracedetail/" + id)
      .then((result: any) => {
        if (result.status == 200) {
          dispatch({ type: ClientTracingActionTypes.TraceDetailFetchSuccess });
          const newList: any[] = getState().clientTracing.serviceTraceList.data.map((item: any) => {
            return item.traceId == id ? { ...item, visible: true, detail: result.data } : { ...item, visible: false }
          });
          dispatch({ type: ClientTracingActionTypes.ServiceTraceFetchSuccess, data: newList });
        } else if (result.status == 204)
          dispatch({ type: ClientTracingActionTypes.TraceDetailFetchFailed });
        else if (result.status == 401) {
          dispatch({ type: ClientTracingActionTypes.TraceDetailFetchFailed });
          clientTracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: ClientTracingActionTypes.TraceDetailFetchFailed });
        clientTracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },

  getSpanDetail: (id: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SpanDetailFetch });
    axios.get(getState().clientTracing.baseUrl.baseUrl + "/api/spandetail/" + id)
      .then((result: any) => {
        if (result.status == 200)
          dispatch({ type: ClientTracingActionTypes.SpanDetailFetchSuccess, data: result.data });
        else if (result.status == 204)
          dispatch({ type: ClientTracingActionTypes.SpanDetailFetchSuccess, data: [] });
        else if (result.status == 401) {
          dispatch({ type: ClientTracingActionTypes.SpanDetailFetchSuccess, data: [] });
          clientTracingActions.pushCommonAlert('401')(dispatch, getState);
        }
      })
      .catch(error => {
        dispatch({ type: ClientTracingActionTypes.SpanDetailFetchFailed });
        clientTracingActions.pushCommonAlert('errorFetch')(dispatch, getState);
      });
  },
  toggleSpanDetailModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.SpanDetailFetchModal, Visible });
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
      type: ClientTracingActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: ClientTracingActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      clientTracingActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      clientTracingActions.pushAlert(
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
        clientTracingActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        clientTracingActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        clientTracingActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        clientTracingActions.pushAlert(
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
