import { AppAction } from "../../Store/state";
import { DashboardActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../GeneralComponents/baseURL";
import jwt_decode from "jwt-decode";
import NDate from "@nepo/ndate";
 

export const dashboardActions = {
  getPushes: (type: number, startDate: string, endDate: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.GetPushes });
    try {
      let url = "";
      switch (type) {
        case 1:
          url = "/NAPGateWay/FileConfigurationQuery/GetPushesByDay";
          break;
        case 2:
          url = "/NAPGateWay/FileConfigurationQuery/GetPushesByWeek";
          break;
        case 3:
          url = "/NAPGateWay/FileConfigurationQuery/GetPushesByMonth";
          break;
        case 4:
          url = "/NAPGateWay/FileConfigurationQuery/GetPushesByThreeMonth";
          break;
        case 5:
          url = "/NAPGateWay/FileConfigurationQuery/GetPushesByYear";
          break;
        case 6:
          url = "/NAPGateWay/FileConfigurationQuery/GetPushesByDatePeriod?startDate=" + startDate + "&endDate=" + endDate;
      }
      const result = await API.get(url);
      if (result.status == 200) {
        let titles: any = result.data.map(function (item: any) {
          return item.title;
        });
        let values: any = result.data.map(function (item: any) {
          return item.amount;
        });
        switch (type) {
          case 1:
            dispatch({ type: DashboardActionTypes.GetPushesByDaySuccess, titles, values });
            break;
          case 2:
            dispatch({ type: DashboardActionTypes.GetPushesByWeekSuccess, titles, values });
            break;
          case 3:
            dispatch({ type: DashboardActionTypes.GetPushesByMonthSuccess, titles, values });
            break;
          case 4:
            dispatch({ type: DashboardActionTypes.GetPushesByThreeMonthSuccess, titles, values });
            break;
          case 5:
            dispatch({ type: DashboardActionTypes.GetPushesByYearSuccess, titles, values });
            break;
          case 6:
            dispatch({ type: DashboardActionTypes.GetPushesByDatePeriodSuccess, titles, values });
        }
      } else {
        switch (type) {
          case 1:
            dispatch({ type: DashboardActionTypes.GetPushesByDaySuccess, titles: [], values: [] });
            break;
          case 2:
            dispatch({ type: DashboardActionTypes.GetPushesByWeekSuccess, titles: [], values: [] });
            break;
          case 3:
            dispatch({ type: DashboardActionTypes.GetPushesByMonthSuccess, titles: [], values: [] });
            break;
          case 4:
            dispatch({ type: DashboardActionTypes.GetPushesByThreeMonthSuccess, titles: [], values: [] });
            break;
          case 5:
            dispatch({ type: DashboardActionTypes.GetPushesByYearSuccess, titles: [], values: [] });
            break;
          case 6:
            dispatch({ type: DashboardActionTypes.GetPushesByDatePeriodSuccess, titles: [], values: [] });
        }
        if (result.status == 401)
          dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.GetPushesFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  toggleNotyPanelModal: (): AppAction<KnownAction> => async (dispatch, getState) => {
    if (getState().dashboard.notyPanel.Visible)
      dispatch({ type: DashboardActionTypes.NotyPanelModal, Visible: false });
    else
      dispatch({ type: DashboardActionTypes.NotyPanelModal, Visible: true });
  },

  updateUserPass: (data: any): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.UserPassUpdate });
    try {
      const result = await API.post("/Accounts/Users/ChangePassword", data);
      if (result.status == 200) {
        dispatch({ type: DashboardActionTypes.UserPassUpdateSuccess });
        dashboardActions.pushCommonAlert('200')(dispatch, getState)
      } else if (result.status == 401) {
        dispatch({ type: DashboardActionTypes.UserPassUpdateFailed });
        dashboardActions.pushCommonAlert('401')(dispatch, getState)
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.UserPassUpdateFailed });
      dashboardActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleUpdateUserPassModal: (Visible: boolean): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({
      type: DashboardActionTypes.UserPassUpdateModal,
      Visible: Visible,
    });
  },
 
  getServicesName: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.ServicesNameFetch });
    try {
     //  const result = await API.post("NAPGateWay/Dashboard/GetAllServiceName?FromDate=" + new NDate().addDays(-120).format("YYYY-MM-DD HH:mm:ss")+"&ToDate=" + new NDate().format("YYYY-MM-DD HH:mm:ss") + "&ServiceName=" + "all" + "&ClientName=" + "all" + "&serviceType=" + "all");
      const resultfilter = await API.post("NAPGateWay/Dashboard/GetAllServiceName?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      if (resultfilter.status == 200) {
      /*   let servicesNames: any = result.data.map(function (item: any) {
          return {
            value: item.value,
            label: item.value,
          };
        }); */
        let servicesName: any = resultfilter.data.map(function (item: any) {
          return {
            value: item.value,
            label: item.value,
          };
        });
      //  servicesNames.unshift({ value: 'all', label: 'همه' });
        dispatch({
          type: DashboardActionTypes.ServicesNameFetchSuccess,
          data: servicesName,
          dataNotAll: servicesName,
        });
      } else if (resultfilter.status == 204) {
        dispatch({
          type: DashboardActionTypes.ServicesNameFetchSuccess,
          data: {},
          dataNotAll: {},
        });
      } else if (resultfilter.status == 401) {
        dispatch({
          type: DashboardActionTypes.ServicesNameFetchSuccess,
          data: {},
          dataNotAll: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.ServicesNameFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


  getAllServicesName: ( serviceType: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.ServicesNameFetch });
    try {
       
      const resultfilter = await API.post("NAPGateWay/FileConfigurationQuery/GetAllServiceNames?serviceType=" + serviceType);
      console.log(resultfilter.data) ;
      if (resultfilter.status == 200) {
      
        let allservicesName: any = resultfilter.data.map(function (item: any) {
          return {
            value: item,
            label: item,
          };
        });
        console.log(allservicesName) ;

        allservicesName.unshift({ value: 'all', label: 'همه' });
        dispatch({
          type: DashboardActionTypes.AllServicesNameFetchSuccess,
          data: allservicesName,
          dataNotAll: allservicesName,
        });
      } else if (resultfilter.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllServicesNameFetchSuccess,
          data: {},
          dataNotAll: {},
        });
      } else if (resultfilter.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllServicesNameFetchSuccess,
          data: {},
          dataNotAll: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.ServicesNameFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },




 
  getClientsName: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.ClientsNameFetch });
    try {
      const result = await API.post("/NAPGateWay/SSOQuery/GetClientNames");
      console.log(result);
      if (result.status == 200) {
        
        let servicesNames: any = result.data.map(function (item: any) {
          console.log(item);
          return {
            value: item,
            label: item,
          };
        });
        servicesNames.unshift({ value: 'all', label: 'همه' });
        dispatch({
          type: DashboardActionTypes.ClientsNameFetchSuccess,
          data: servicesNames,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.ClientsNameFetchSuccess,
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.ClientsNameFetchSuccess,
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.ClientsNameFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


     getCountOfAllRequest: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string, getalldata : number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.CountOfAllRequestFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/SumAllserviceinterval?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);

 
      const resultall = await API.post("/NAPGateWay/Dashboard/SumAllserviceinterval?FromDate=" + new NDate().addDays(getalldata).format("YYYY-MM-DD HH:mm:ss")+"&ToDate=" + new NDate().format("YYYY-MM-DD HH:mm:ss") + "&ServiceName=" + "all" + "&ClientName=" + "all" + "&serviceType=" + "all");
 
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.CountOfAllRequestFetchSuccess,
          dataall: resultall.data,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.CountOfAllRequestFetchSuccess,
          dataall: {},
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.CountOfAllRequestFetchSuccess,
          dataall: {},
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.CountOfAllRequestFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


  getAllsumallbystatuscode: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.AllsumallbystatuscodeFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/Allsumallbystatuscode?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.AllsumallbystatuscodeFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllsumallbystatuscodeFetchSuccess,
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllsumallbystatuscodeFetchSuccess,
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.AllsumallbystatuscodeFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


  getAllbystatuscodeclienteservice: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.AllbystatuscodeclienteserviceFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/Allbystatuscodeclienteservice?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeclienteserviceFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeclienteserviceFetchSuccess,
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeclienteserviceFetchSuccess,
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.AllbystatuscodeclienteserviceFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  getAllcountbyclientname: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string ,   getalldata: number): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.AllcountbyclientnameFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/Allcountbyclientname?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      const resultall = await API.post("/NAPGateWay/Dashboard/Allcountbyclientname?FromDate=" + new NDate().addDays( getalldata ).format("YYYY-MM-DD")+"&ToDate=" + new NDate().format("YYYY-MM-DD HH:mm:ss") + "&ServiceName=" + "all" + "&ClientName=" + "all" + "&serviceType=" + "all");
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.AllcountbyclientnameFetchSuccess,
          dataall: resultall.data,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllcountbyclientnameFetchSuccess,
          dataall: {},
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllcountbyclientnameFetchSuccess,
          dataall: {},
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.AllcountbyclientnameFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


  getAllbystatuscodeclientname: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.AllbystatuscodeclientnameFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/Allbystatuscodeclientname?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeclientnameFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeclientnameFetchSuccess,
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeclientnameFetchSuccess,
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.AllbystatuscodeclientnameFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


  getAllbystatuscodeservicename: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.AllbystatuscodeservicenameFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/Allbystatuscodeservicename?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeservicenameFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeservicenameFetchSuccess,
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllbystatuscodeservicenameFetchSuccess,
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.AllbystatuscodeservicenameFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


  getAllcountbyservicetitle: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string , getalldata  : number ): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.AllcountbyservicetitleFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/Allcountbyservicetitle?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      const resultall = await API.post("/NAPGateWay/Dashboard/Allcountbyservicetitle?FromDate=" + new NDate().addDays(getalldata).format("YYYY-MM-DD")+"&ToDate=" + new NDate().format("YYYY-MM-DD HH:mm:ss") + "&ServiceName=" + "all" + "&ClientName=" + "all" + "&serviceType=" + "all");
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.AllcountbyservicetitleFetchSuccess,
          dataall: resultall.data,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllcountbyservicetitleFetchSuccess,
          dataall: {},
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllcountbyservicetitleFetchSuccess,
          dataall: {},
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.AllcountbyservicetitleFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


  getAllservicecountdetail: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.AllservicecountdetailFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/Allservicecountdetail?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.AllservicecountdetailFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllservicecountdetailFetchSuccess,
          data: {},
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllservicecountdetailFetchSuccess,
          data: {},
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.AllservicecountdetailFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },


  getAllserviceinterval: (fromDate: string, toDate: string, serviceName: string, clientName: string, serviceType: string): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.AllserviceintervalFetch });
    try {
      const result = await API.post("/NAPGateWay/Dashboard/Allserviceinterval?FromDate=" + fromDate + "&ToDate=" + toDate + "&ServiceName=" + serviceName + "&ClientName=" + clientName + "&serviceType=" + serviceType);
      if (result.status == 200) {
        dispatch({
          type: DashboardActionTypes.AllserviceintervalFetchSuccess,
          data: result.data,
        });
      } else if (result.status == 204) {
        dispatch({
          type: DashboardActionTypes.AllserviceintervalFetchSuccess,
          data: [],
        });
      } else if (result.status == 401) {
        dispatch({
          type: DashboardActionTypes.AllserviceintervalFetchSuccess,
          data: [],
        });
        dashboardActions.pushCommonAlert('401')(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: DashboardActionTypes.AllserviceintervalFetchFailed });
      dashboardActions.pushCommonAlert('errorFetch')(dispatch, getState);
    }
  },

  setUserClaims: (token: any): AppAction<KnownAction> => async (dispatch, getState) => {
    let tokenData: any = jwt_decode(token);
    let roles = [];
    if (tokenData.role) {
      if (Array.isArray(tokenData.role))
        roles = tokenData.role;
      else
        roles.push(tokenData.role);
    }
    dispatch({ type: DashboardActionTypes.UserClaimsSet, roles });
  },
  clearUserClaims: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.UserClaimsClear });
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
      type: DashboardActionTypes.PushAlert,
      alert
    });
  },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: DashboardActionTypes.ClearAlerts });
  },
  showRequestErrors: (error: any): AppAction<KnownAction> => async (dispatch, getState) => {
    if (error.response.data && error.response.data.length > 0) {
      let errors = "";
      for (var i = 0; i < error.response.data.length; i++)
        errors += (errors == "" ? "" : "\n") + error.response.data[i];
      dashboardActions.pushAlert(
        {
          title: "information",
          description: errors,
          variant: 'danger'
        }
      )(dispatch, getState);
    } else {
      dashboardActions.pushAlert(
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
        dashboardActions.pushAlert(
          {
            title: "information",
            description: "SuccessfulOperation",
            variant: 'success'
          }
        )(dispatch, getState);
        break;
      case '204':
        dashboardActions.pushAlert(
          {
            title: "error",
            description: "DataInNotFound",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case '401':
        dashboardActions.pushAlert(
          {
            title: "error",
            description: "UnauthorizedError",
            variant: 'warning'
          }
        )(dispatch, getState);
        break;
      case 'errorFetch':
        dashboardActions.pushAlert(
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
