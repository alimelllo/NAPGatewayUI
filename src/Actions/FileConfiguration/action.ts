import { AppAction } from "../../Store/state";
import { FileConfigurationActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../GeneralComponents/baseURL";

export const fileConfigurationActions = {
  getFileConfigurationList: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationActionTypes.FileConfigurationFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetAllFileConfigurations?PageSize=2000");
      if (result.status == 200) {
        dispatch({
          type: FileConfigurationActionTypes.FileConfigurationFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: FileConfigurationActionTypes.FileConfigurationFetchSuccess,
          data: [],
        });
      }else if(result.status == 401){
        dispatch({
          type: FileConfigurationActionTypes.FileConfigurationFetchSuccess,
          data: [],
        });
        fileConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationActionTypes.FileConfigurationFetchFailed });
      fileConfigurationActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  saveFileConfiguration: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationActionTypes.FileConfigurationCreate });
    try {
      const result = await API.post("/NAPGateWay/FileConfigurationCommand/CreateFileConfiguration", data);
      if (result.status == 201) {
        dispatch({ type: FileConfigurationActionTypes.FileConfigurationCreateSuccess });
        const newList: any[] = getState().fileConfiguration.fileConfigurationList.data;
        newList.push({
          id: result.data,
          title: data.title,
          tracingUrl: data.tracingUrl,
          description: data.description
        });
        dispatch({type: FileConfigurationActionTypes.FileConfigurationFetchSuccess, data: newList});
        fileConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: FileConfigurationActionTypes.FileConfigurationCreateFailed });
        fileConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationActionTypes.FileConfigurationCreateFailed });
      fileConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleCreateFileConfigurationModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationActionTypes.FileConfigurationCreateModal, Visible: Visible });
  },

  updateFileConfiguration: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationActionTypes.FileConfigurationUpdate });
    try {
      const result = await API.put("/NAPGateWay/FileConfigurationCommand/UpdateFileConfiguration", data);
      if (result.status == 201) {
        dispatch({ type: FileConfigurationActionTypes.FileConfigurationUpdateSuccess });
        const newList: any[] = getState().fileConfiguration.fileConfigurationList.data;
        const index = newList.findIndex((x) => x.id == data.id);
        if (index > - 1) {
          newList[index].title = data.title;
          newList[index].description = data.description;
          newList[index].tracingUrl = data.tracingUrl;
          dispatch({type: FileConfigurationActionTypes.FileConfigurationFetchSuccess, data: newList});
        }
        fileConfigurationActions.pushCommonAlert('200')(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: FileConfigurationActionTypes.FileConfigurationUpdateFailed });
        fileConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationActionTypes.FileConfigurationUpdateFailed });
      fileConfigurationActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleUpdateFileConfigurationModal: (item: any, Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationActionTypes.FileConfigurationUpdateModal, item, Visible: Visible });
  },

  getOptions: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationActionTypes.OptionsFetch });
    try {
      const result = await API.get("/NAPGateWay/FileConfigurationQuery/GetOptions");
      if (result.status == 200) {
        dispatch({
          type: FileConfigurationActionTypes.OptionsFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: FileConfigurationActionTypes.OptionsFetchSuccess,
          data: {},
        });
      }else if(result.status == 401){
        dispatch({
          type: FileConfigurationActionTypes.OptionsFetchSuccess,
          data: {},
        });
        fileConfigurationActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: FileConfigurationActionTypes.OptionsFetchFailed });
      fileConfigurationActions.pushCommonAlert('errorFetch')(dispatch, getState);
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
      type: FileConfigurationActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: FileConfigurationActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      fileConfigurationActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      fileConfigurationActions.pushAlert(
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
        fileConfigurationActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        fileConfigurationActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        fileConfigurationActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        fileConfigurationActions.pushAlert(
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
