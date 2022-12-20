import { AppAction } from "../../Store/state";
import { FileConfigurationRouteStateActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../GeneralComponents/baseURL";
import { getRoute } from "../convertData";

export const fileConfigurationRouteStateActions = {
  getFileConfigurationList: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.FileConfigurationFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetAllFileConfigurations?PageSize=2000");
      if (result.status == 200) {
        dispatch({
          type: FileConfigurationRouteStateActionTypes.FileConfigurationFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: FileConfigurationRouteStateActionTypes.FileConfigurationFetchSuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: FileConfigurationRouteStateActionTypes.FileConfigurationFetchSuccess,
          data: [],
        });
        fileConfigurationRouteStateActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationRouteStateActionTypes.FileConfigurationFetchFailed });
      fileConfigurationRouteStateActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  getRouteStateList: (fileConfigurationId: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.RouteStateFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetRouteState?fileConfigurationId=" + fileConfigurationId);
      if (result.status == 200) {
        dispatch({
          type: FileConfigurationRouteStateActionTypes.RouteStateFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: FileConfigurationRouteStateActionTypes.RouteStateFetchSuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: FileConfigurationRouteStateActionTypes.RouteStateFetchSuccess,
          data: [],
        });
        fileConfigurationRouteStateActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationRouteStateActionTypes.RouteStateFetchFailed });
      fileConfigurationRouteStateActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  setRouteManagerAccepted: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = getState().fileConfigurationRouteState.routeManagerAcceptedSet.item;
    dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteManagerAccepted });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetRouteManagerAccepted", data);
      if (result.status == 201) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedSuccess });
        fileConfigurationRouteStateActions.getRouteStateList(data.fileConfigurationId)(dispatch, getState);
        fileConfigurationRouteStateActions.toggleRouteBAModal(false)(dispatch, getState);
        fileConfigurationRouteStateActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedFailed });
        fileConfigurationRouteStateActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedFailed });
      fileConfigurationRouteStateActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleRouteManagerAcceptedModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedModal, item, Visible: Visible });
  },

  setRouteAccepted: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = getState().fileConfigurationRouteState.routeAcceptedSet.item;
    dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteAccepted });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetRouteAccepted", data);
      if (result.status == 201) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteAcceptedSuccess });
        fileConfigurationRouteStateActions.getRouteStateList(data.fileConfigurationId)(dispatch, getState);
        fileConfigurationRouteStateActions.toggleRouteBAModal(false)(dispatch, getState);
        fileConfigurationRouteStateActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteAcceptedFailed });
        fileConfigurationRouteStateActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteAcceptedFailed });
      fileConfigurationRouteStateActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleRouteAcceptedModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteAcceptedModal, item, Visible: Visible });
  },

  setRouteIgnored: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = getState().fileConfigurationRouteState.routeIgnoredSet.item;
    dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteIgnored });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetRouteIgnored", data);
      if (result.status == 201) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteIgnoredSuccess });
        fileConfigurationRouteStateActions.getRouteStateList(data.fileConfigurationId)(dispatch, getState);
        fileConfigurationRouteStateActions.toggleRouteBAModal(false)(dispatch, getState);
        fileConfigurationRouteStateActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteIgnoredFailed });
        fileConfigurationRouteStateActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteIgnoredFailed });
      fileConfigurationRouteStateActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleRouteIgnoredModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteIgnoredModal, item, Visible: Visible });
  },

  setRouteToLastState: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = getState().fileConfigurationRouteState.routeToLastStateSet.item;
    dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteToLastState });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/SetRouteToLastState", data);
      if (result.status == 201) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteToLastStateSuccess });
        fileConfigurationRouteStateActions.getRouteStateList(data.fileConfigurationId)(dispatch, getState);
        fileConfigurationRouteStateActions.toggleRouteBAModal(false)(dispatch, getState);
        fileConfigurationRouteStateActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteToLastStateFailed });
        fileConfigurationRouteStateActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteToLastStateFailed });
      fileConfigurationRouteStateActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleRouteToLastStateModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.SetRouteToLastStateModal, item, Visible: Visible });
  },

  getRouteBA: (item: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.GetRouteBA });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetRouteBA?fileRouteId=" + item.data.id);
      if (result.status == 200) {
        dispatch({
          type: FileConfigurationRouteStateActionTypes.GetRouteBASuccess,
          managerAccept: item.managerAccept,
          routeState: item.routeState,
          item: item.data,
          data: { befor: result.data.befor ? getRoute(result.data.befor) : {}, after: getRoute(result.data.after) },
        });
      } else if (result.status == 204) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.GetRouteBAFailed });
      } else if (result.status == 401) {
        dispatch({ type: FileConfigurationRouteStateActionTypes.GetRouteBAFailed });
        fileConfigurationRouteStateActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationRouteStateActionTypes.GetRouteBAFailed });
      fileConfigurationRouteStateActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },
  toggleRouteBAModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.GetRouteBAModal, Visible: Visible });
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
      type: FileConfigurationRouteStateActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationRouteStateActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      fileConfigurationRouteStateActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      fileConfigurationRouteStateActions.pushAlert(
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
        fileConfigurationRouteStateActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        fileConfigurationRouteStateActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        fileConfigurationRouteStateActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        fileConfigurationRouteStateActions.pushAlert(
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
