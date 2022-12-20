import { AppAction } from "../../Store/state";
import { FileConfigurationRoutesDisplayActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../GeneralComponents/baseURL";

export const fileConfigurationRoutesDisplayActions = {
  getRouteStateList: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRoutesDisplayActionTypes.RouteFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetActiveRoutes?FileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: FileConfigurationRoutesDisplayActionTypes.RouteFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: FileConfigurationRoutesDisplayActionTypes.RouteFetchSuccess,
          data: [],
        });
      }
    } catch (error) {
      dispatch({ type: FileConfigurationRoutesDisplayActionTypes.RouteFetchFailed });
      fileConfigurationRoutesDisplayActions.pushCommonAlert('errorFetch')(dispatch, getState);
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
      type: FileConfigurationRoutesDisplayActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRoutesDisplayActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      fileConfigurationRoutesDisplayActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      fileConfigurationRoutesDisplayActions.pushAlert(
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
        fileConfigurationRoutesDisplayActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        fileConfigurationRoutesDisplayActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        fileConfigurationRoutesDisplayActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        fileConfigurationRoutesDisplayActions.pushAlert(
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
