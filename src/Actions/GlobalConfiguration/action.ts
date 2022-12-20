import { AppAction } from "../../Store/state";
import { GlobalConfigurationActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../GeneralComponents/baseURL";
import { getJson } from "../convertData";
import Axios from "axios";

export const globalConfigurationActions = {
  getGlobalConfiguration: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetGlobalConfiguration?fileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: GlobalConfigurationActionTypes.GlobalConfigurationFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: GlobalConfigurationActionTypes.GlobalConfigurationFetchSuccess,
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: GlobalConfigurationActionTypes.GlobalConfigurationFetchSuccess,
          data: {},
        });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationFetchFailed });
      globalConfigurationActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  getRoutePushHistoryList: (fileGlobalConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.GetRoutePushHistory });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetRoutePushHistoryByFileGlobalConfigurationId?fileGlobalConfigurationId=" + fileGlobalConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: GlobalConfigurationActionTypes.GetRoutePushHistorySuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: GlobalConfigurationActionTypes.GetRoutePushHistorySuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: GlobalConfigurationActionTypes.GetRoutePushHistorySuccess,
          data: [],
        });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.GetRoutePushHistoryFailed });
      globalConfigurationActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },
  toggleRoutePushHistoryModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.GetRoutePushHistoryModal, Visible: Visible });
  },

  createGlobalConfiguration: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationCreate });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/AddGlobalConfiguration", data);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationCreateSuccess });
        globalConfigurationActions.getGlobalConfiguration(data.fileConfigurationId)(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationCreateFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationCreateFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateGlobalConfigurationModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationCreateModal, Visible: Visible });
  },

  updateGlobalConfiguration: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationUpdate });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/UpdateGlobalConfiguration", data);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationUpdateSuccess });
        globalConfigurationActions.getGlobalConfiguration(data.fileConfigurationId)(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationUpdateFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationUpdateFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleUpdateGlobalConfigurationModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationUpdateModal, item, Visible: Visible });
  },

  removeGlobalConfiguration: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = getState().globalConfiguration.globalConfigurationRemove.item;
    dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationRemove });
    try {
      const result = await API.delete("/NAPGateWay/FileConfigurationCommand/RemoveGlobalConfiguration?fileConfigurationId=" + data.fileConfigurationId + "&id=" + data.id);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationRemoveSuccess });
        globalConfigurationActions.getGlobalConfiguration(data.fileConfigurationId)(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationRemoveFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationRemoveFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleRemoveGlobalConfigurationModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.GlobalConfigurationRemoveModal, item, Visible: Visible });
  },

  setServiceDiscoveryProvider: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetServiceDiscoveryProvider });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetServiceDiscoveryProvider", data);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.SetServiceDiscoveryProviderSuccess });
        globalConfigurationActions.getGlobalConfiguration(data.fileConfigurationId)(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.SetServiceDiscoveryProviderFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.SetServiceDiscoveryProviderFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSetServiceDiscoveryProviderModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetServiceDiscoveryProviderModal, item, Visible: Visible });
  },

  setQoSOptions: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetQoSOptions });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetGlobalConfigurationQoSOptions", data);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.SetQoSOptionsSuccess });
        globalConfigurationActions.getGlobalConfiguration(data.fileConfigurationId)(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.SetQoSOptionsFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.SetQoSOptionsFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSetQoSOptionsModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetQoSOptionsModal, item, Visible: Visible });
  },

  setLoadBalancerOptions: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetLoadBalancerOptions });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetGlobalConfigurationLoadBalancerOptions", data);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.SetLoadBalancerOptionsSuccess });
        globalConfigurationActions.getGlobalConfiguration(data.fileConfigurationId)(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.SetLoadBalancerOptionsFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.SetLoadBalancerOptionsFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSetLoadBalancerOptionsModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetLoadBalancerOptionsModal, item, Visible: Visible });
  },

  setRateLimitOptions: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetRateLimitOptions });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetGlobalConfigurationRateLimitOptions", data);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.SetRateLimitOptionsSuccess });
        globalConfigurationActions.getGlobalConfiguration(data.fileConfigurationId)(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.SetRateLimitOptionsFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.SetRateLimitOptionsFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSetRateLimitOptionsModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetRateLimitOptionsModal, item, Visible: Visible });
  },

  setHttpHandlerOptions: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetHttpHandlerOptions });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetGlobalConfigurationHttpHandlerOptions", data);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.SetHttpHandlerOptionsSuccess });
        globalConfigurationActions.getGlobalConfiguration(data.fileConfigurationId)(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.SetHttpHandlerOptionsFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.SetHttpHandlerOptionsFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleSetHttpHandlerOptionsModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SetHttpHandlerOptionsModal, item, Visible: Visible });
  },

  // getToken: (url: string, fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
  //   dispatch({ type: GlobalConfigurationActionTypes.TokenFetch });
  //   var formBody = [];
  //   formBody.push(encodeURIComponent("client_id") + "=" + encodeURIComponent(""));
  //   formBody.push(encodeURIComponent("client_secret") + "=" + encodeURIComponent(""));
  //   formBody.push(encodeURIComponent("scope") + "=" + encodeURIComponent(""));
  //   formBody.push(encodeURIComponent("grant_type") + "=" + encodeURIComponent(""));
  //   var ff = formBody.join("&");

  //   axios.post(url + "/administration/connect/token", ff, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
  //     .then((result: any) => {
  //       if (result.status == 200) {
  //         dispatch({
  //           type: GlobalConfigurationActionTypes.TokenFetchSuccess,
  //           token: result.data.access_token,
  //           url
  //         });
  //         globalConfigurationActions.getJsonData(url, fileConfigurationId)(dispatch, getState);
  //       } else if (result.status == 204) {
  //         dispatch({ type: GlobalConfigurationActionTypes.TokenFetchSuccess, token: "", url });
  //       } else if (result.status == 401) {
  //         dispatch({ type: GlobalConfigurationActionTypes.TokenFetchSuccess, token: "", url });
  //         globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
  //       }
  //     })
  //     .catch(error => {
  //       dispatch({ type: GlobalConfigurationActionTypes.TokenFetchFailed });
  //       globalConfigurationActions.pushCommonAlert('errorFetch')(dispatch, getState);
  //     });
  // },

  getJsonData: (url: string, fileConfigurationId: number, fileGlobalConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.JsonDataFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetJsonFile?fileConfigurationId=" + fileConfigurationId + "&fileGlobalConfigurationId=" + fileGlobalConfigurationId + "&baseUrl=" + url);
      if (result.status == 200) {
        dispatch({
          type: GlobalConfigurationActionTypes.JsonDataFetchSuccess,
          url: url,
          token: result.data.token,
          data: result.data.jsonData,
          fileConfigurationId,
          fileGlobalConfigurationId
        });
        globalConfigurationActions.togglePostJsonModal(true)(dispatch, getState)
      } else if (result.status == 204) {
        dispatch({ type: GlobalConfigurationActionTypes.JsonDataFetchSuccess, url: "", token: "", data: {}, fileConfigurationId: 0, fileGlobalConfigurationId: 0 });
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.JsonDataFetchSuccess, url: "", token: "", data: {}, fileConfigurationId: 0, fileGlobalConfigurationId: 0 });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.JsonDataFetchFailed });
      globalConfigurationActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  postJson: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.PostJson });
    try {
      let url = getState().globalConfiguration.jsonData.url + "/administration/configuration"
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + getState().globalConfiguration.jsonData.token;
      // let data = getState().highAvailability.jsonData.data;
      let data = getJson(getState().globalConfiguration.jsonData.data);
      const result = await Axios.post(url, data);
      if (result.status == 200) {
        dispatch({ type: GlobalConfigurationActionTypes.PostJsonSuccess });
        globalConfigurationActions.addRoutesPushHistory({ fileConfigurationId: getState().globalConfiguration.jsonData.fileConfigurationId, fileGlobalConfigurationId: getState().globalConfiguration.jsonData.fileGlobalConfigurationId })(dispatch, getState)
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.PostJsonFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.PostJsonFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  togglePostJsonModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.PostJsonModal, Visible: Visible });
  },

  addRoutesPushHistory: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.AddRoutesPushHistory });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/AddRoutesPushHistory", data);
      if (result.status == 201) {
        dispatch({ type: GlobalConfigurationActionTypes.AddRoutesPushHistorySuccess });
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.AddRoutesPushHistoryFailed });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.AddRoutesPushHistoryFailed });
      globalConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },

  sendTest: (baseUrl: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.SendTest });
    try {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + getState().oidc.user.access_token;
      const result = await Axios.get(baseUrl + "/api/Coaches/CoachQuery/GetAllCoaches");
      if (result.status == 200) {
        dispatch({ type: GlobalConfigurationActionTypes.SendTestSuccess });
        globalConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 204) {
        dispatch({ type: GlobalConfigurationActionTypes.SendTestSuccess });
        globalConfigurationActions.pushCommonAlert('204')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: GlobalConfigurationActionTypes.SendTestSuccess });
        globalConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: GlobalConfigurationActionTypes.GetRoutePushHistoryFailed });
      globalConfigurationActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
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
      type: GlobalConfigurationActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: GlobalConfigurationActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      globalConfigurationActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      globalConfigurationActions.pushAlert(
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
        globalConfigurationActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        globalConfigurationActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        globalConfigurationActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        globalConfigurationActions.pushAlert(
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
