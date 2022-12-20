export enum FileConfigurationRouteStateActionTypes {
    FileConfigurationFetch = "@@FileConfigurationRouteState/FileConfigurationFetch",
    FileConfigurationFetchSuccess = "@@FileConfigurationRouteState/FileConfigurationFetchSuccess",
    FileConfigurationFetchFailed = "@@FileConfigurationRouteState/FileConfigurationFetchFailed",

    RouteStateFetch = "@@FileConfigurationRouteState/RouteStateFetch",
    RouteStateFetchSuccess = "@@FileConfigurationRouteState/RouteStateFetchSuccess",
    RouteStateFetchFailed = "@@FileConfigurationRouteState/RouteStateFetchFailed",

    SetRouteManagerAccepted = "@@FileConfigurationRouteState/SetRouteManagerAccepted",
    SetRouteManagerAcceptedSuccess = "@@FileConfigurationRouteState/SetRouteManagerAcceptedSuccess",
    SetRouteManagerAcceptedFailed = "@@FileConfigurationRouteState/SetRouteManagerAcceptedFailed",
    SetRouteManagerAcceptedModal = "@@FileConfigurationRouteState/SetRouteManagerAcceptedModal",

    SetRouteAccepted = "@@FileConfigurationRouteState/SetRouteAccepted",
    SetRouteAcceptedSuccess = "@@FileConfigurationRouteState/SetRouteAcceptedSuccess",
    SetRouteAcceptedFailed = "@@FileConfigurationRouteState/SetRouteAcceptedFailed",
    SetRouteAcceptedModal = "@@FileConfigurationRouteState/SetRouteAcceptedModal",

    SetRouteIgnored = "@@FileConfigurationRouteState/SetRouteIgnored",
    SetRouteIgnoredSuccess = "@@FileConfigurationRouteState/SetRouteIgnoredSuccess",
    SetRouteIgnoredFailed = "@@FileConfigurationRouteState/SetRouteIgnoredFailed",
    SetRouteIgnoredModal = "@@FileConfigurationRouteState/SetRouteIgnoredModal",

    SetRouteToLastState = "@@FileConfigurationRouteState/SetRouteToLastState",
    SetRouteToLastStateSuccess = "@@FileConfigurationRouteState/SetRouteToLastStateSuccess",
    SetRouteToLastStateFailed = "@@FileConfigurationRouteState/SetRouteToLastStateFailed",
    SetRouteToLastStateModal = "@@FileConfigurationRouteState/SetRouteToLastStateModal",

    GetRouteBA = "@@Route/GetRouteBA",
    GetRouteBASuccess = "@@Route/GetRouteBASuccess",
    GetRouteBAFailed = "@@Route/GetRouteBAFailed",
    GetRouteBAModal = "@@Route/GetRouteBAModal",

    PushAlert = "@@FileConfigurationRouteState/PushAlert",
    ClearAlerts = "@@FileConfigurationRouteState/ClearAlerts",
}
