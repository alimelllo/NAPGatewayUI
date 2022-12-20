import { Reducer } from "redux";
import { DashboardActionTypes } from "./actionType";
import { IDashboardState, KnownAction } from "./model";

const unloadedState: IDashboardState = {
    pushes: {
        loading: false,
        byDayTitles: [],
        byDayValues: [],
        byWeekTitles: [],
        byWeekValues: [],
        byMonthTitles: [],
        byMonthValues: [],
        byThreeMonthTitles: [],
        byThreeMonthValues: [],
        byYearTitles: [],
        byYearValues: [],
        byDatePeriodTitles: [],
        byDatePeriodValues: [],
    },
    notyPanel: {
        Visible: false
    },
    userPassUpdate: {
        loading: false,
        Visible: false
    },
    servicesName: {
        loading: false,
        loaded: false,
        data: [],
        dataNotAll: [],
    },

    allservicesName: {
        loading: false,
        loaded: false,
        data: [],
        dataNotAll: [],
    },

    allserviceinterval: {
        loading: false,
        data: [],
    },
    allbystatuscodeservicename: {
        loading: false,
        loaded: false,
        data: []
    },
    clientsName: {
        loading: false,
        loaded: false,
        data: [],
    },
    countOfAllRequest: {
        loading: false,
        Visible: false,
        dataall: { countOfAllSuccess: { sum: 0, interval: [] }, countOfAllUnSuccess: { sum: 0, interval: [] } },
        data: { countOfAllSuccess: { sum: 0, interval: [] }, countOfAllUnSuccess: { sum: 0, interval: [] } }
    },
    allbystatuscodeclientname: {
        loading: false,
        Visible: false,
        data: []
    },
    allcountbyclientname: {
        loading: false,
        loaded: false,
        dataall: 0,
        data: 0,
    },
    allsumallbystatuscode: {
        loading: false,
        loaded: false,
        data: {}
    },
    allservicecountdetail: {
        loading: false,
        Visible: false,
        data: []
    },
    allbystatuscodeclienteservice: {
        loading: false,
        Visible: false,
        data: { legend :[],statusByClientNameSliceServiceName: [] }
    },
    allcountbyservicetitle: {
        loading: false,
        Visible: false,
        dataall: 0,
        data: 0,
    },
    userClaims: {
        roles: [],
        kibanaUser: 'kibana_user',
        isLogOut: false
    },
    alerts: []
};

export const DashboardReducer: Reducer<IDashboardState, KnownAction> = (state: IDashboardState = unloadedState, action: KnownAction) => {
    switch (action.type) {
        case DashboardActionTypes.GetPushes: {
            return {
                ...state,
                pushes: {
                    ...state.pushes,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.GetPushesByDaySuccess: {
            return {
                ...state,
                pushes: {
                    ...state.pushes,
                    loading: false,
                    byDayTitles: action.titles,
                    byDayValues: action.values
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.GetPushesByWeekSuccess: {
            return {
                ...state,
                pushes: {
                    ...state.pushes,
                    loading: false,
                    byWeekTitles: action.titles,
                    byWeekValues: action.values
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.GetPushesByMonthSuccess: {
            return {
                ...state,
                pushes: {
                    ...state.pushes,
                    loading: false,
                    byMonthTitles: action.titles,
                    byMonthValues: action.values
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.GetPushesByThreeMonthSuccess: {
            return {
                ...state,
                pushes: {
                    ...state.pushes,
                    loading: false,
                    byThreeMonthTitles: action.titles,
                    byThreeMonthValues: action.values
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.GetPushesByYearSuccess: {
            return {
                ...state,
                pushes: {
                    ...state.pushes,
                    loading: false,
                    byYearTitles: action.titles,
                    byYearValues: action.values
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.GetPushesByDatePeriodSuccess: {
            return {
                ...state,
                pushes: {
                    ...state.pushes,
                    loading: false,
                    byDatePeriodTitles: action.titles,
                    byDatePeriodValues: action.values
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.GetPushesFailed: {
            return {
                ...state,
                pushes: {
                    ...state.pushes,
                    loading: false
                },
            } as IDashboardState;
        }

        case DashboardActionTypes.NotyPanelModal: {
            return {
                ...state,
                notyPanel: {
                    ...state.notyPanel,
                    Visible: action.Visible
                },
            } as IDashboardState;
        }

        case DashboardActionTypes.UserPassUpdate: {
            return {
                ...state,
                userPassUpdate: {
                    ...state.userPassUpdate,
                    loading: true
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.UserPassUpdateSuccess: {
            return {
                ...state,
                userPassUpdate: {
                    ...state.userPassUpdate,
                    loading: false,
                    Visible: false,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.UserPassUpdateFailed: {
            return {
                ...state,
                userPassUpdate: {
                    ...state.userPassUpdate,
                    loading: false
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.UserPassUpdateModal: {
            return {
                ...state,
                userPassUpdate: {
                    ...state.userPassUpdate,
                    Visible: action.Visible
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.ServicesNameFetch: {
            return {
                ...state,
                servicesName: {
                    ...state.servicesName,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.ServicesNameFetchSuccess: {
            return {
                ...state,
                servicesName: {
                    ...state.servicesName,
                    loading: false,
                    loaded: true,
                    data: action.data,
                    dataNotAll: action.dataNotAll,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.ServicesNameFetchFailed: {
            return {
                ...state,
                servicesName: {
                    ...state.servicesName,
                    loading: false
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.AllServicesNameFetch: {
            return {
                ...state,
                allservicesName: {
                    ...state.allservicesName,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllServicesNameFetchSuccess: {
            return {
                ...state,
                allservicesName: {
                    ...state.allservicesName,
                    loading: false,
                    loaded: true,
                    data: action.data,
                    dataNotAll: action.dataNotAll,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllServicesNameFetchFailed: {
            return {
                ...state,
                allservicesName: {
                    ...state.allservicesName,
                    loading: false
                },
            } as IDashboardState;
        }



        case DashboardActionTypes.ClientsNameFetch: {
            return {
                ...state,
                clientsName: {
                    ...state.clientsName,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.ClientsNameFetchSuccess: {
            return {
                ...state,
                clientsName: {
                    ...state.clientsName,
                    loading: false,
                    loaded: true,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.ClientsNameFetchFailed: {
            return {
                ...state,
                clientsName: {
                    ...state.clientsName,
                    loading: false
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.AllbystatuscodeclientnameFetch: {
            return {
                ...state,
                allbystatuscodeclientname: {
                    ...state.allbystatuscodeclientname,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllbystatuscodeclientnameFetchSuccess: {
            return {
                ...state,
                allbystatuscodeclientname: {
                    ...state.allbystatuscodeclientname,
                    loading: false,
                    loaded: true,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllbystatuscodeclientnameFetchFailed: {
            return {
                ...state,
                allbystatuscodeclientname: {
                    ...state.allbystatuscodeclientname,
                    loading: false
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.AllbystatuscodeservicenameFetch: {
            return {
                ...state,
                allbystatuscodeservicename: {
                    ...state.allbystatuscodeservicename,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllbystatuscodeservicenameFetchSuccess: {
            return {
                ...state,
                allbystatuscodeservicename: {
                    ...state.allbystatuscodeservicename,
                    loading: false,
                    loaded: true,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllbystatuscodeservicenameFetchFailed: {
            return {
                ...state,
                allbystatuscodeservicename: {
                    ...state.allbystatuscodeservicename,
                    loading: false
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.AllcountbyservicetitleFetch: {
            return {
                ...state,
                allcountbyservicetitle: {
                    ...state.allcountbyservicetitle,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllcountbyservicetitleFetchSuccess: {
            return {
                ...state,
                allcountbyservicetitle: {
                    ...state.allcountbyservicetitle,
                    loading: false,
                    loaded: true,
                    dataall: action.dataall,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllcountbyservicetitleFetchFailed: {
            return {
                ...state,
                allcountbyservicetitle: {
                    ...state.allcountbyservicetitle,
                    loading: false
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.AllservicecountdetailFetch: {
            return {
                ...state,
                allservicecountdetail: {
                    ...state.allservicecountdetail,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllservicecountdetailFetchSuccess: {
            return {
                ...state,
                allservicecountdetail: {
                    ...state.allservicecountdetail,
                    loading: false,
                    loaded: true,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllservicecountdetailFetchFailed: {
            return {
                ...state,
                allservicecountdetail: {
                    ...state.allservicecountdetail,
                    loading: false
                },
            } as IDashboardState;
        }

        case DashboardActionTypes.AllserviceintervalFetch: {
            return {
                ...state,
                allserviceinterval: {
                    ...state.allserviceinterval,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllserviceintervalFetchSuccess: {
            return {
                ...state,
                allserviceinterval: {
                    ...state.allserviceinterval,
                    loading: false,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllserviceintervalFetchFailed: {
            return {
                ...state,
                allserviceinterval: {
                    ...state.allserviceinterval,
                    loading: false
                },
            } as IDashboardState;
        }

        case DashboardActionTypes.CountOfAllRequestFetch: {
            return {
                ...state,
                countOfAllRequest: {
                    ...state.countOfAllRequest,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.CountOfAllRequestFetchSuccess: {
            return {
                ...state,
                countOfAllRequest: {
                    ...state.countOfAllRequest,
                    loading: false,
                    loaded: true,
                    dataall: action.dataall,
                    data: action.data,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.CountOfAllRequestFetchFailed: {
            return {
                ...state,
                countOfAllRequest: {
                    ...state.countOfAllRequest,
                    loading: false
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.AllsumallbystatuscodeFetch: {
            return {
                ...state,
                allsumallbystatuscode: {
                    ...state.allsumallbystatuscode,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllsumallbystatuscodeFetchSuccess: {
            return {
                ...state,
                allsumallbystatuscode: {
                    ...state.allsumallbystatuscode,
                    loading: false,
                    loaded: true,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllsumallbystatuscodeFetchFailed: {
            return {
                ...state,
                allsumallbystatuscode: {
                    ...state.allsumallbystatuscode,
                    loading: false
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.AllbystatuscodeclienteserviceFetch: {
            return {
                ...state,
                allbystatuscodeclienteservice: {
                    ...state.allbystatuscodeclienteservice,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllbystatuscodeclienteserviceFetchSuccess: {
            return {
                ...state,
                allbystatuscodeclienteservice: {
                    ...state.allbystatuscodeclienteservice,
                    loading: false,
                    loaded: true,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllbystatuscodeclienteserviceFetchFailed: {
            return {
                ...state,
                allbystatuscodeclienteservice: {
                    ...state.allbystatuscodeclienteservice,
                    loading: false
                },
            } as IDashboardState;
        }


        case DashboardActionTypes.AllcountbyclientnameFetch: {
            return {
                ...state,
                allcountbyclientname: {
                    ...state.allcountbyclientname,
                    loading: true,
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllcountbyclientnameFetchSuccess: {
            return {
                ...state,
                allcountbyclientname: {
                    ...state.allcountbyclientname,
                    loading: false,
                    loaded: true,
                    dataall: action.dataall,
                    data: action.data
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.AllcountbyclientnameFetchFailed: {
            return {
                ...state,
                allcountbyclientname: {
                    ...state.allcountbyclientname,
                    loading: false
                },
            } as IDashboardState;
        }

        case DashboardActionTypes.UserClaimsSet: {
            return {
                ...state,
                userClaims: {
                    ...state.userClaims,
                    roles: action.roles
                },
            } as IDashboardState;
        }
        case DashboardActionTypes.UserClaimsClear: {
            return {
                ...state,
                userClaims: {
                    ...state.userClaims,
                    services: [],
                    controllers: [],
                    actions: [],
                    isLogOut: true
                },
            } as IDashboardState;
        }

        case DashboardActionTypes.PushAlert: {
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            } as IDashboardState;
        }
        case DashboardActionTypes.ClearAlerts: {
            return {
                ...state,
                alerts: []
            } as IDashboardState;
        }
    }
    return state;
};
