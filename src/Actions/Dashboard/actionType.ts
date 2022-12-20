export enum DashboardActionTypes {
    GetPushes = "@@Dashboard/GetPushes",
    GetPushesByDaySuccess = "@@Dashboard/GetPushesByDaySuccess",
    GetPushesByWeekSuccess = "@@Dashboard/GetPushesByDaySuccess",
    GetPushesByMonthSuccess = "@@Dashboard/GetPushesByDaySuccess",
    GetPushesByThreeMonthSuccess = "@@Dashboard/GetPushesByDaySuccess",
    GetPushesByYearSuccess = "@@Dashboard/GetPushesByDaySuccess",
    GetPushesByDatePeriodSuccess = "@@Dashboard/GetPushesByDaySuccess",
    GetPushesFailed = "@@Dashboard/GetPushesFailed",

    NotyPanelModal = "@@Dashboard/NotyPanelModal",

    UserPassUpdate = "@@Dashboard/UserPassUpdate",
    UserPassUpdateSuccess = "@@Dashboard/UserPassUpdateSuccess",
    UserPassUpdateFailed = "@@Dashboard/UserPassUpdateFailed",
    UserPassUpdateModal = "@@Dashboard/UserPassUpdateModal",

    ServicesNameFetch = "@@FileConfiguration/ServicesNameFetch",
    ServicesNameFetchSuccess = "@@FileConfiguration/ServicesNameFetchSuccess",
    ServicesNameFetchFailed = "@@FileConfiguration/ServicesNameFetchFailed",

    AllServicesNameFetch = "@@FileConfiguration/AllServicesNameFetch",
    AllServicesNameFetchSuccess = "@@FileConfiguration/AllServicesNameFetchSuccess",
    AllServicesNameFetchFailed = "@@FileConfiguration/AllServicesNameFetchFailed",




    ClientsNameFetch = "@@FileConfiguration/ClientsNameFetch",
    ClientsNameFetchSuccess = "@@FileConfiguration/ClientsNameFetchSuccess",
    ClientsNameFetchFailed = "@@FileConfiguration/ClientsNameFetchFailed",

    CountOfAllRequestFetch = "@@FileConfiguration/CountOfAllRequestFetch",
    CountOfAllRequestFetchSuccess = "@@FileConfiguration/CountOfAllRequestFetchSuccess",
    CountOfAllRequestFetchFailed = "@@FileConfiguration/CountOfAllRequestFetchFailed",

    AllsumallbystatuscodeFetch = "@@FileConfiguration/AllsumallbystatuscodeFetch",
    AllsumallbystatuscodeFetchSuccess = "@@FileConfiguration/AllsumallbystatuscodeFetchSuccess",
    AllsumallbystatuscodeFetchFailed = "@@FileConfiguration/AllsumallbystatuscodeFetchFailed",

    AllbystatuscodeclienteserviceFetch = "@@FileConfiguration/AllbystatuscodeclienteserviceFetch",
    AllbystatuscodeclienteserviceFetchSuccess = "@@FileConfiguration/AllbystatuscodeclienteserviceFetchSuccess",
    AllbystatuscodeclienteserviceFetchFailed = "@@FileConfiguration/AllbystatuscodeclienteserviceFetchFailed",

    AllcountbyclientnameFetch = "@@FileConfiguration/AllcountbyclientnameFetch",
    AllcountbyclientnameFetchSuccess = "@@FileConfiguration/AllcountbyclientnameFetchSuccess",
    AllcountbyclientnameFetchFailed = "@@FileConfiguration/AllcountbyclientnameFetchFailed",

    AllbystatuscodeclientnameFetch = "@@FileConfiguration/AllbystatuscodeclientnameFetch",
    AllbystatuscodeclientnameFetchSuccess = "@@FileConfiguration/AllbystatuscodeclientnameFetchSuccess",
    AllbystatuscodeclientnameFetchFailed = "@@FileConfiguration/AllbystatuscodeclientnameFetchFailed",

    AllserviceintervalFetch = "@@FileConfiguration/AllserviceintervalFetch",
    AllserviceintervalFetchSuccess = "@@FileConfiguration/AllserviceintervalFetchSuccess",
    AllserviceintervalFetchFailed = "@@FileConfiguration/AllserviceintervalFetchFailed",

    AllbystatuscodeservicenameFetch = "@@FileConfiguration/AllbystatuscodeservicenameFetch",
    AllbystatuscodeservicenameFetchSuccess = "@@FileConfiguration/AllbystatuscodeservicenameFetchSuccess",
    AllbystatuscodeservicenameFetchFailed = "@@FileConfiguration/AllbystatuscodeservicenameFetchFailed",

    AllcountbyservicetitleFetch = "@@FileConfiguration/AllcountbyservicetitleFetch",
    AllcountbyservicetitleFetchSuccess = "@@FileConfiguration/AllcountbyservicetitleFetchSuccess",
    AllcountbyservicetitleFetchFailed = "@@FileConfiguration/AllcountbyservicetitleFetchFailed",

    AllservicecountdetailFetch = "@@FileConfiguration/AllservicecountdetailFetch",
    AllservicecountdetailFetchSuccess = "@@FileConfiguration/AllservicecountdetailFetchSuccess",
    AllservicecountdetailFetchFailed = "@@FileConfiguration/AllservicecountdetailFetchFailed",

    UserClaimsSet = "@@Dashboard/UserClaimsSet",
    UserClaimsClear = "@@Dashboard/UserClaimsClear",
    PushAlert = "@@Dashboard/PushAlert",
    ClearAlerts = "@@Dashboard/ClearAlerts",
}
