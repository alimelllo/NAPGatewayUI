export enum GlobalConfigurationActionTypes {
    GlobalConfigurationFetch = "@@GlobalConfiguration/GlobalConfigurationFetch",
    GlobalConfigurationFetchSuccess = "@@GlobalConfiguration/GlobalConfigurationFetchSuccess",
    GlobalConfigurationFetchFailed = "@@GlobalConfiguration/GlobalConfigurationFetchFailed",

    GetRoutePushHistory = "@@GlobalConfiguration/GetRoutePushHistory",
    GetRoutePushHistorySuccess = "@@GlobalConfiguration/GetRoutePushHistorySuccess",
    GetRoutePushHistoryFailed = "@@GlobalConfiguration/GetRoutePushHistoryFailed",
    GetRoutePushHistoryModal = "@@GlobalConfiguration/GetRoutePushHistoryModal",

    GlobalConfigurationCreate = "@@GlobalConfiguration/GlobalConfigurationCreate",
    GlobalConfigurationCreateSuccess = "@@GlobalConfiguration/GlobalConfigurationCreateSuccess",
    GlobalConfigurationCreateFailed = "@@GlobalConfiguration/GlobalConfigurationCreateFailed",
    GlobalConfigurationCreateModal = "@@GlobalConfiguration/GlobalConfigurationCreateModal",

    GlobalConfigurationUpdate = "@@GlobalConfiguration/GlobalConfigurationUpdate",
    GlobalConfigurationUpdateSuccess = "@@GlobalConfiguration/GlobalConfigurationUpdateSuccess",
    GlobalConfigurationUpdateFailed = "@@GlobalConfiguration/GlobalConfigurationUpdateFailed",
    GlobalConfigurationUpdateModal = "@@GlobalConfiguration/GlobalConfigurationUpdateModal",

    GlobalConfigurationRemove = "@@GlobalConfiguration/GlobalConfigurationRemove",
    GlobalConfigurationRemoveSuccess = "@@GlobalConfiguration/GlobalConfigurationRemoveSuccess",
    GlobalConfigurationRemoveFailed = "@@GlobalConfiguration/GlobalConfigurationRemoveFailed",
    GlobalConfigurationRemoveModal = "@@GlobalConfiguration/GlobalConfigurationRemoveModal",

    AddRoutesPushHistory = "@@GlobalConfiguration/AddRoutesPushHistory",
    AddRoutesPushHistorySuccess = "@@GlobalConfiguration/AddRoutesPushHistorySuccess",
    AddRoutesPushHistoryFailed = "@@GlobalConfiguration/AddRoutesPushHistoryFailed",
    AddRoutesPushHistoryModal = "@@GlobalConfiguration/AddRoutesPushHistoryModal",

    SetServiceDiscoveryProvider = "@@GlobalConfiguration/SetServiceDiscoveryProvider",
    SetServiceDiscoveryProviderSuccess = "@@GlobalConfiguration/SetServiceDiscoveryProviderSuccess",
    SetServiceDiscoveryProviderFailed = "@@GlobalConfiguration/SetServiceDiscoveryProviderFailed",
    SetServiceDiscoveryProviderModal = "@@GlobalConfiguration/SetServiceDiscoveryProviderModal",

    SetQoSOptions = "@@GlobalConfiguration/SetQoSOptions",
    SetQoSOptionsSuccess = "@@GlobalConfiguration/SetQoSOptionsSuccess",
    SetQoSOptionsFailed = "@@GlobalConfiguration/SetQoSOptionsFailed",
    SetQoSOptionsModal = "@@GlobalConfiguration/SetQoSOptionsModal",
    
    SetLoadBalancerOptions = "@@GlobalConfiguration/SetLoadBalancerOptions",
    SetLoadBalancerOptionsSuccess = "@@GlobalConfiguration/SetLoadBalancerOptionsSuccess",
    SetLoadBalancerOptionsFailed = "@@GlobalConfiguration/SetLoadBalancerOptionsFailed",
    SetLoadBalancerOptionsModal = "@@GlobalConfiguration/SetLoadBalancerOptionsModal",

    SetRateLimitOptions = "@@GlobalConfiguration/SetRateLimitOptions",
    SetRateLimitOptionsSuccess = "@@GlobalConfiguration/SetRateLimitOptionsSuccess",
    SetRateLimitOptionsFailed = "@@GlobalConfiguration/SetRateLimitOptionsFailed",
    SetRateLimitOptionsModal = "@@GlobalConfiguration/SetRateLimitOptionsModal",

    SetHttpHandlerOptions = "@@GlobalConfiguration/SetHttpHandlerOptions",
    SetHttpHandlerOptionsSuccess = "@@GlobalConfiguration/SetHttpHandlerOptionsSuccess",
    SetHttpHandlerOptionsFailed = "@@GlobalConfiguration/SetHttpHandlerOptionsFailed",
    SetHttpHandlerOptionsModal = "@@GlobalConfiguration/SetHttpHandlerOptionsModal",

    TokenFetch = "@@GlobalConfiguration/TokenFetch",
    TokenFetchSuccess = "@@GlobalConfiguration/TokenFetchSuccess",
    TokenFetchFailed = "@@GlobalConfiguration/TokenFetchFailed",

    JsonDataFetch = "@@GlobalConfiguration/JsonDataFetch",
    JsonDataFetchSuccess = "@@GlobalConfiguration/JsonDataFetchSuccess",
    JsonDataFetchFailed = "@@GlobalConfiguration/JsonDataFetchFailed",

    PostJson = "@@GlobalConfiguration/PostJson",
    PostJsonSuccess = "@@GlobalConfiguration/PostJsonSuccess",
    PostJsonFailed = "@@GlobalConfiguration/PostJsonFailed",
    PostJsonModal = "@@GlobalConfiguration/PostJsonModal",

    SendTest = "@@GlobalConfiguration/SendTest",
    SendTestSuccess = "@@GlobalConfiguration/SendTestSuccess",
    SendTestFailed = "@@GlobalConfiguration/SendTestFailed",

    PushAlert = "@@GlobalConfiguration/PushAlert",
    ClearAlerts = "@@GlobalConfiguration/ClearAlerts",
}
