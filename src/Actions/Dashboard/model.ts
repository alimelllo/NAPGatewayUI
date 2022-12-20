import { Action } from "redux";
import { DashboardActionTypes } from "./actionType";

export interface IDashboardState {
    pushes: {
        loading: boolean;
        byDayTitles: string[];
        byDayValues: number[];
        byWeekTitles: string[];
        byWeekValues: number[];
        byMonthTitles: string[];
        byMonthValues: number[];
        byThreeMonthTitles: string[];
        byThreeMonthValues: number[];
        byYearTitles: string[];
        byYearValues: number[];
        byDatePeriodTitles: string[];
        byDatePeriodValues: number[];
    };
    notyPanel: {
        Visible: boolean;
    };
    userPassUpdate: {
        loading: boolean
        Visible: boolean
    },
    servicesName: {
        loading: boolean;
        loaded: boolean;
        data: { value: string, label: string }[];
        dataNotAll: { value: string, label: string }[];
    },
    allservicesName: {
        loading: boolean;
        loaded: boolean;
        data: { value: string, label: string }[];
        dataNotAll: { value: string, label: string }[];
    },


    allserviceinterval: {
        loading: boolean;
        data: { datetime: string, countOfSuccess: number, countofUnsuccess: number }[];
    },
    allbystatuscodeservicename: {
        loading: boolean;
        loaded: boolean;
        data: any[];
    },
    allcountbyclientname: {
        loading: boolean;
        loaded: boolean;
        dataall: number;
        data: number;
    },
    clientsName: {
        loading: boolean;
        loaded: boolean;
        data: { value: string, label: string }[];
    },
    countOfAllRequest:
    {
        loading: boolean;
        Visible: boolean;
        data: {
            countOfAllSuccess: {
                sum: number,
                interval: []
            },
            countOfAllUnSuccess: {
                sum: number,
                interval: []
            }
        };
        dataall: {
            countOfAllSuccess: {
                sum: number,
                interval: []
            },
            countOfAllUnSuccess: {
                sum: number,
                interval: []
            }
        };
    }
    allbystatuscodeclientname:
    {
        loading: boolean;
        Visible: boolean;
        data: any[];
    }
    allservicecountdetail:
    {
        loading: boolean;
        Visible: boolean;
        data: any[];
    }
    allbystatuscodeclienteservice:
    {
        loading: boolean;
        Visible: boolean;
        data: { legend :any[],statusByClientNameSliceServiceName: any[] };
    }
    allcountbyservicetitle:
    {
        loading: boolean;
        Visible: boolean;
        dataall: number;
        data: number;
    }
    allsumallbystatuscode:
    {
        loading: boolean;
        loaded: boolean;
        data: any;
    }
    userClaims: {
        roles: string[]
        kibanaUser: string
        isLogOut: boolean
    },
    alerts: any[]
}

interface IGetPushes extends Action<string> {
    type: DashboardActionTypes.GetPushes;
}
interface IGetPushesByDaySuccess extends Action<string> {
    type: DashboardActionTypes.GetPushesByDaySuccess;
    titles: any;
    values: any;
}
interface IGetPushesByWeekSuccess extends Action<string> {
    type: DashboardActionTypes.GetPushesByWeekSuccess;
    titles: any;
    values: any;
}
interface IGetPushesByMonthSuccess extends Action<string> {
    type: DashboardActionTypes.GetPushesByMonthSuccess;
    titles: any;
    values: any;
}
interface IGetPushesByThreeMonthSuccess extends Action<string> {
    type: DashboardActionTypes.GetPushesByThreeMonthSuccess;
    titles: any;
    values: any;
}
interface IGetPushesByYearSuccess extends Action<string> {
    type: DashboardActionTypes.GetPushesByYearSuccess;
    titles: any;
    values: any;
}
interface IGetPushesByDatePeriodSuccess extends Action<string> {
    type: DashboardActionTypes.GetPushesByDatePeriodSuccess;
    titles: any;
    values: any;
}
interface IGetPushesFailed extends Action<string> {
    type: DashboardActionTypes.GetPushesFailed;
}

interface INotyPanelModal extends Action<string> {
    type: DashboardActionTypes.NotyPanelModal;
    Visible: boolean;
}

interface IUserPassUpdate extends Action<string> {
    type: DashboardActionTypes.UserPassUpdate;
}
interface IUserPassUpdateSuccess extends Action<string> {
    type: DashboardActionTypes.UserPassUpdateSuccess;
}
interface IUserPassUpdateFailed extends Action<string> {
    type: DashboardActionTypes.UserPassUpdateFailed;
}
interface IUserPassUpdateModal extends Action<string> {
    type: DashboardActionTypes.UserPassUpdateModal;
    Visible: boolean
}

interface IServicesNameFetch extends Action<string> {
    type: DashboardActionTypes.ServicesNameFetch;
}
interface IServicesNameFetchSuccess extends Action<string> {
    type: DashboardActionTypes.ServicesNameFetchSuccess;
    data: any
    dataNotAll: any
}
interface IServicesNameFetchFailed extends Action<string> {
    type: DashboardActionTypes.ServicesNameFetchFailed;
}


interface IAllServicesNameFetch extends Action<string> {
    type: DashboardActionTypes.AllServicesNameFetch;
}
interface IAllServicesNameFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllServicesNameFetchSuccess;
    data: any
    dataNotAll: any
}
interface IAllServicesNameFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllServicesNameFetchFailed;
}


interface IClientsNameFetch extends Action<string> {
    type: DashboardActionTypes.ClientsNameFetch;
}
interface IClientsNameFetchSuccess extends Action<string> {
    type: DashboardActionTypes.ClientsNameFetchSuccess;
    data: any
}
interface IClientsNameFetchFailed extends Action<string> {
    type: DashboardActionTypes.ClientsNameFetchFailed;
}

interface IAllbystatuscodeclientnameFetch extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeclientnameFetch;
}
interface IAllbystatuscodeclientnameFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeclientnameFetchSuccess;
    data: any
}
interface IAllbystatuscodeclientnameFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeclientnameFetchFailed;
}

interface IAllbystatuscodeservicenameFetch extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeservicenameFetch;
}
interface IAllbystatuscodeservicenameFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeservicenameFetchSuccess;
    data: any
}
interface IAllbystatuscodeservicenameFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeservicenameFetchFailed;
}


interface IAllcountbyservicetitleFetch extends Action<string> {
    type: DashboardActionTypes.AllcountbyservicetitleFetch;
}
interface IAllcountbyservicetitleFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllcountbyservicetitleFetchSuccess;
    dataall: any
    data: any
}
interface IAllcountbyservicetitleFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllcountbyservicetitleFetchFailed;
}

interface IAllservicecountdetailFetch extends Action<string> {
    type: DashboardActionTypes.AllservicecountdetailFetch;
}
interface IAllservicecountdetailFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllservicecountdetailFetchSuccess;
    data: any
}
interface IAllservicecountdetailFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllservicecountdetailFetchFailed;
}

interface IAllserviceintervalFetch extends Action<string> {
    type: DashboardActionTypes.AllserviceintervalFetch;
}
interface IAllserviceintervalFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllserviceintervalFetchSuccess;
    data: any
}
interface IAllserviceintervalFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllserviceintervalFetchFailed;
}

interface ICountOfAllRequestFetch extends Action<string> {
    type: DashboardActionTypes.CountOfAllRequestFetch;
}
interface ICountOfAllRequestFetchSuccess extends Action<string> {
    type: DashboardActionTypes.CountOfAllRequestFetchSuccess;
    dataall: any
    data: any
}
interface ICountOfAllRequestFetchFailed extends Action<string> {
    type: DashboardActionTypes.CountOfAllRequestFetchFailed;
}

interface IAllsumallbystatuscodeFetch extends Action<string> {
    type: DashboardActionTypes.AllsumallbystatuscodeFetch;
}
interface IAllsumallbystatuscodeFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllsumallbystatuscodeFetchSuccess;
    data: any
}
interface IAllsumallbystatuscodeFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllsumallbystatuscodeFetchFailed;
}

interface IAllbystatuscodeclienteserviceFetch extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeclienteserviceFetch;
}
interface IAllbystatuscodeclienteserviceFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeclienteserviceFetchSuccess;
    data: any
}
interface IAllbystatuscodeclienteserviceFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllbystatuscodeclienteserviceFetchFailed;
}

interface IAllcountbyclientnameFetch extends Action<string> {
    type: DashboardActionTypes.AllcountbyclientnameFetch;
}
interface IAllcountbyclientnameFetchSuccess extends Action<string> {
    type: DashboardActionTypes.AllcountbyclientnameFetchSuccess;
    dataall: any;
    data: any;
}
interface IAllcountbyclientnameFetchFailed extends Action<string> {
    type: DashboardActionTypes.AllcountbyclientnameFetchFailed;
}

interface IUserClaimsSet extends Action<string> {
    type: DashboardActionTypes.UserClaimsSet;
    roles: string[]
}
interface IUserClaimsClear extends Action<string> {
    type: DashboardActionTypes.UserClaimsClear;
}

interface IPushAlert extends Action<string> {
    type: DashboardActionTypes.PushAlert;
    alert: any;
}
interface IClearAlerts extends Action<string> {
    type: DashboardActionTypes.ClearAlerts;
}

export type KnownAction = IGetPushes
    | IGetPushesByDaySuccess
    | IGetPushesByWeekSuccess
    | IGetPushesByMonthSuccess
    | IGetPushesByThreeMonthSuccess
    | IGetPushesByYearSuccess
    | IGetPushesByDatePeriodSuccess
    | IGetPushesFailed
    | INotyPanelModal
    | IUserPassUpdate
    | IUserPassUpdateSuccess
    | IUserPassUpdateFailed
    | IUserPassUpdateModal
    | IServicesNameFetch
    | IServicesNameFetchSuccess
    | IServicesNameFetchFailed
    | IAllServicesNameFetch
    | IAllServicesNameFetchSuccess
    | IAllServicesNameFetchFailed


    | IClientsNameFetch
    | IClientsNameFetchSuccess
    | IClientsNameFetchFailed
    | IAllbystatuscodeclientnameFetch
    | IAllbystatuscodeclientnameFetchSuccess
    | IAllbystatuscodeclientnameFetchFailed
    | IAllbystatuscodeservicenameFetch
    | IAllbystatuscodeservicenameFetchSuccess
    | IAllbystatuscodeservicenameFetchFailed
    | IAllcountbyservicetitleFetch
    | IAllcountbyservicetitleFetchSuccess
    | IAllcountbyservicetitleFetchFailed
    | IAllservicecountdetailFetch
    | IAllservicecountdetailFetchSuccess
    | IAllservicecountdetailFetchFailed
    | IAllserviceintervalFetch
    | IAllserviceintervalFetchSuccess
    | IAllserviceintervalFetchFailed
    | ICountOfAllRequestFetch
    | ICountOfAllRequestFetchSuccess
    | ICountOfAllRequestFetchFailed
    | IAllsumallbystatuscodeFetch
    | IAllsumallbystatuscodeFetchSuccess
    | IAllsumallbystatuscodeFetchFailed
    | IAllbystatuscodeclienteserviceFetch
    | IAllbystatuscodeclienteserviceFetchSuccess
    | IAllbystatuscodeclienteserviceFetchFailed
    | IAllcountbyclientnameFetch
    | IAllcountbyclientnameFetchSuccess
    | IAllcountbyclientnameFetchFailed
    | IUserClaimsSet
    | IUserClaimsClear
    | IPushAlert
    | IClearAlerts;