export enum RouteActionTypes {
    RouteFetch = "@@Route/RouteFetch",
    RouteFetchSuccess = "@@Route/RouteFetchSuccess",
    RouteFetchFailed = "@@Route/RouteFetchFailed",

    ScopeFetch = "@@Route/ScopeFetch",
    ScopeFetchSuccess = "@@Route/ScopeFetchSuccess",
    ScopeFetchFailed = "@@Route/ScopeFetchFailed",

    GetRouteHistory = "@@Route/GetRouteHistory",
    GetRouteHistorySuccess = "@@Route/GetRouteHistorySuccess",
    GetRouteHistoryFailed = "@@Route/GetRouteHistoryFailed",
    GetRouteHistoryModal = "@@Route/GetRouteHistoryModal",

    GetRouteHistoryBA = "@@Route/GetRouteHistoryBA",
    GetRouteHistoryBASuccess = "@@Route/GetRouteHistoryBASuccess",
    GetRouteHistoryBAFailed = "@@Route/GetRouteHistoryBAFailed",
    GetRouteHistoryBAModal = "@@Route/GetRouteHistoryBAModal",

    GetRoutePushHistory = "@@Route/GetRoutePushHistory",
    GetRoutePushHistorySuccess = "@@Route/GetRoutePushHistorySuccess",
    GetRoutePushHistoryFailed = "@@Route/GetRoutePushHistoryFailed",
    GetRoutePushHistoryModal = "@@Route/GetRoutePushHistoryModal",

    RouteCreate = "@@Route/RouteCreate",
    RouteCreateSuccess = "@@Route/RouteCreateSuccess",
    RouteCreateFailed = "@@Route/RouteCreateFailed",
    RouteCreateModal = "@@Route/RouteCreateModal",

    RouteUpdate = "@@Route/RouteUpdate",
    RouteUpdateSuccess = "@@Route/RouteUpdateSuccess",
    RouteUpdateFailed = "@@Route/RouteUpdateFailed",
    RouteUpdateModal = "@@Route/RouteUpdateModal",

    RouteRemove = "@@Route/RouteRemove",
    RouteCopy = "@@Route/RouteCopy",
    RouteRemoveSuccess = "@@Route/RouteRemoveSuccess",
    RouteRemoveFailed = "@@Route/RouteRemoveFailed",
    RouteRemoveModal = "@@Route/RouteRemoveModal",
    RouteCopyModal = "@@Route/RouteCopyModal",

    AddUpstreamHttpMethodRouteKey = "@@Route/AddUpstreamHttpMethodRouteKey",
    AddUpstreamHttpMethodRouteKeySuccess = "@@Route/AddUpstreamHttpMethodRouteKeySuccess",
    AddUpstreamHttpMethodRouteKeyFailed = "@@Route/AddUpstreamHttpMethodRouteKeyFailed",

    RemoveUpstreamHttpMethodRouteKey = "@@Route/RemoveUpstreamHttpMethodRouteKey",
    RemoveUpstreamHttpMethodRouteKeySuccess = "@@Route/RemoveUpstreamHttpMethodRouteKeySuccess",
    RemoveUpstreamHttpMethodRouteKeyFailed = "@@Route/RemoveUpstreamHttpMethodRouteKeyFailed",

    SetFileCacheOptions = "@@Route/SetFileCacheOptions",
    SetFileCacheOptionsSuccess = "@@Route/SetFileCacheOptionsSuccess",
    SetFileCacheOptionsFailed = "@@Route/SetFileCacheOptionsFailed",
    SetFileCacheOptionsModal = "@@Route/SetFileCacheOptionsModal",

    SetQoSOptions = "@@Route/SetQoSOptions",
    SetQoSOptionsSuccess = "@@Route/SetQoSOptionsSuccess",
    SetQoSOptionsFailed = "@@Route/SetQoSOptionsFailed",
    SetQoSOptionsModal = "@@Route/SetQoSOptionsModal",
    
    SetLoadBalancerOptions = "@@Route/SetLoadBalancerOptions",
    SetLoadBalancerOptionsSuccess = "@@Route/SetLoadBalancerOptionsSuccess",
    SetLoadBalancerOptionsFailed = "@@Route/SetLoadBalancerOptionsFailed",
    SetLoadBalancerOptionsModal = "@@Route/SetLoadBalancerOptionsModal",

    AddHostAndPort = "@@Route/AddHostAndPort",
    AddHostAndPortSuccess = "@@Route/AddHostAndPortSuccess",
    AddHostAndPortFailed = "@@Route/AddHostAndPortFailed",
    AddHostAndPortModal = "@@Route/AddHostAndPortModal",

    RemoveHostAndPort = "@@Route/RemoveHostAndPort",
    RemoveHostAndPortSuccess = "@@Route/RemoveHostAndPortSuccess",
    RemoveHostAndPortFailed = "@@Route/RemoveHostAndPortFailed",
    RemoveHostAndPortModal = "@@Route/RemoveHostAndPortModal",

    AddRateLimitRule = "@@Route/AddRateLimitRule",
    AddRateLimitRuleSuccess = "@@Route/AddRateLimitRuleSuccess",
    AddRateLimitRuleFailed = "@@Route/AddRateLimitRuleFailed",
    AddRateLimitRuleModal = "@@Route/AddRateLimitRuleModal",

    UpdateRateLimitRule = "@@Route/UpdateRateLimitRule",
    UpdateRateLimitRuleSuccess = "@@Route/UpdateRateLimitRuleSuccess",
    UpdateRateLimitRuleFailed = "@@Route/UpdateRateLimitRuleFailed",
    UpdateRateLimitRuleModal = "@@Route/UpdateRateLimitRuleModal",

    RemoveRateLimitRule = "@@Route/RemoveRateLimitRule",
    RemoveRateLimitRuleSuccess = "@@Route/RemoveRateLimitRuleSuccess",
    RemoveRateLimitRuleFailed = "@@Route/RemoveRateLimitRuleFailed",
    RemoveRateLimitRuleModal = "@@Route/RemoveRateLimitRuleModal",

    ClientWhiteModal = "@@Route/ClientWhiteModal",

    AddClientWhite = "@@Route/AddClientWhite",
    AddClientWhiteSuccess = "@@Route/AddClientWhiteSuccess",
    AddClientWhiteFailed = "@@Route/AddClientWhiteFailed",

    RemoveClientWhite = "@@Route/RemoveClientWhite",
    RemoveClientWhiteSuccess = "@@Route/RemoveClientWhiteSuccess",
    RemoveClientWhiteFailed = "@@Route/RemoveClientWhiteFailed",
    RemoveClientWhiteModal = "@@Route/RemoveClientWhiteModal",

    SetAuthenticationOptions = "@@Route/SetAuthenticationOptions",
    SetAuthenticationOptionsSuccess = "@@Route/SetAuthenticationOptionsSuccess",
    SetAuthenticationOptionsFailed = "@@Route/SetAuthenticationOptionsFailed",
    SetAuthenticationOptionsModal = "@@Route/SetAuthenticationOptionsModal",

    AddAllowedScope = "@@Route/AddAllowedScope",
    AddAllowedScopeSuccess = "@@Route/AddAllowedScopeSuccess",
    AddAllowedScopeFailed = "@@Route/AddAllowedScopeFailed",

    AddHelp = "@@Route/AddHelp",
    AddHelpSuccess = "@@Route/AddHelpSuccess",
    AddHelpFailed = "@@Route/AddHelpFailed",




    RemoveAllowedScope = "@@Route/RemoveAllowedScope",
    RemoveAllowedScopeSuccess = "@@Route/RemoveAllowedScopeSuccess",
    RemoveAllowedScopeFailed = "@@Route/RemoveAllowedScopeFailed",
    RemoveAllowedScopeModal = "@@Route/RemoveAllowedScopeModal",

    SetHttpHandlerOptions = "@@Route/SetHttpHandlerOptions",
    SetHttpHandlerOptionsSuccess = "@@Route/SetHttpHandlerOptionsSuccess",
    SetHttpHandlerOptionsFailed = "@@Route/SetHttpHandlerOptionsFailed",
    SetHttpHandlerOptionsModal = "@@Route/SetHttpHandlerOptionsModal",

    SetPreAuthenticationParty = "@@Route/SetPreAuthenticationParty",
    SetPreAuthenticationPartySuccess = "@@Route/SetPreAuthenticationPartySuccess",
    SetPreAuthenticationPartyFailed = "@@Route/SetPreAuthenticationPartyFailed",
    SetPreAuthenticationPartyModal = "@@Route/SetPreAuthenticationPartyModal",

    AddPreAuthenticationPartyBody = "@@Route/AddPreAuthenticationPartyBody",
    AddPreAuthenticationPartyBodySuccess = "@@Route/AddPreAuthenticationPartyBodySuccess",
    AddPreAuthenticationPartyBodyFailed = "@@Route/AddPreAuthenticationPartyBodyFailed",
    AddPreAuthenticationPartyBodyModal = "@@Route/AddPreAuthenticationPartyBodyModal",

    RemovePreAuthenticationPartyBody = "@@Route/RemovePreAuthenticationPartyBody",
    RemovePreAuthenticationPartyBodySuccess = "@@Route/RemovePreAuthenticationPartyBodySuccess",
    RemovePreAuthenticationPartyBodyFailed = "@@Route/RemovePreAuthenticationPartyBodyFailed",
    RemovePreAuthenticationPartyBodyModal = "@@Route/RemovePreAuthenticationPartyBodyModal",

    AddPreAuthenticationPartyHeader = "@@Route/AddPreAuthenticationPartyHeader",
    AddPreAuthenticationPartyHeaderSuccess = "@@Route/AddPreAuthenticationPartyHeaderSuccess",
    AddPreAuthenticationPartyHeaderFailed = "@@Route/AddPreAuthenticationPartyHeaderFailed",
    AddPreAuthenticationPartyHeaderModal = "@@Route/AddPreAuthenticationPartyHeaderModal",

    RemovePreAuthenticationPartyHeader = "@@Route/RemovePreAuthenticationPartyHeader",
    RemovePreAuthenticationPartyHeaderSuccess = "@@Route/RemovePreAuthenticationPartyHeaderSuccess",
    RemovePreAuthenticationPartyHeaderFailed = "@@Route/RemovePreAuthenticationPartyHeaderFailed",
    RemovePreAuthenticationPartyHeaderModal = "@@Route/RemovePreAuthenticationPartyHeaderModal",

    AddDelegatingHandler = "@@Route/AddDelegatingHandler",
    AddDelegatingHandlerSuccess = "@@Route/AddDelegatingHandlerSuccess",
    AddDelegatingHandlerFailed = "@@Route/AddDelegatingHandlerFailed",

    RemoveDelegatingHandler = "@@Route/RemoveDelegatingHandler",
    RemoveDelegatingHandlerSuccess = "@@Route/RemoveDelegatingHandlerSuccess",
    RemoveDelegatingHandlerFailed = "@@Route/RemoveDelegatingHandlerFailed",
    RemoveDelegatingHandlerModal = "@@Route/RemoveDelegatingHandlerModal",

    AddIPAllowed = "@@Route/AddIPAllowed",
    AddIPAllowedSuccess = "@@Route/AddIPAllowedSuccess",
    AddIPAllowedFailed = "@@Route/AddIPAllowedFailed",

    RemoveIPAllowed = "@@Route/RemoveIPAllowed",
    RemoveIPAllowedSuccess = "@@Route/RemoveIPAllowedSuccess",
    RemoveIPAllowedFailed = "@@Route/RemoveIPAllowedFailed",
    RemoveIPAllowedModal = "@@Route/RemoveIPAllowedModal",

    AddIPBlocked = "@@Route/AddIPBlocked",
    AddIPBlockedSuccess = "@@Route/AddIPBlockedSuccess",
    AddIPBlockedFailed = "@@Route/AddIPBlockedFailed",

    RemoveIPBlocked = "@@Route/RemoveIPBlocked",
    RemoveIPBlockedSuccess = "@@Route/RemoveIPBlockedSuccess",
    RemoveIPBlockedFailed = "@@Route/RemoveIPBlockedFailed",
    RemoveIPBlockedModal = "@@Route/RemoveIPBlockedModal",

    SetRouteUserNameAndPassword = "@@Route/SetRouteUserNameAndPassword",
    SetRouteUserNameAndPasswordSuccess = "@@Route/SetRouteUserNameAndPasswordSuccess",
    SetRouteUserNameAndPasswordFailed = "@@Route/SetRouteUserNameAndPasswordFailed",
    SetRouteUserNameAndPasswordModal = "@@Route/SetRouteUserNameAndPasswordModal",

    AddUserPass = "@@Route/AddUserPass",
    AddUserPassSuccess = "@@Route/AddUserPassSuccess",
    AddUserPassFailed = "@@Route/AddUserPassFailed",
    AddUserPassModal = "@@Route/AddUserPassModal",

    RemoveUserPass = "@@Route/RemoveUserPass",
    RemoveUserPassSuccess = "@@Route/RemoveUserPassSuccess",
    RemoveUserPassFailed = "@@Route/RemoveUserPassFailed",
    RemoveUserPassModal = "@@Route/RemoveUserPassModal",

    AddAddHeadersToRequest = "@@Route/AddAddHeadersToRequest",
    AddAddHeadersToRequestSuccess = "@@Route/AddAddHeadersToRequestSuccess",
    AddAddHeadersToRequestFailed = "@@Route/AddAddHeadersToRequestFailed",
    AddAddHeadersToRequestModal = "@@Route/AddAddHeadersToRequestModal",

    RemoveAddHeadersToRequest = "@@Route/RemoveAddHeadersToRequest",
    RemoveAddHeadersToRequestSuccess = "@@Route/RemoveAddHeadersToRequestSuccess",
    RemoveAddHeadersToRequestFailed = "@@Route/RemoveAddHeadersToRequestFailed",
    RemoveAddHeadersToRequestModal = "@@Route/RemoveAddHeadersToRequestModal",

    AddUpstreamHeaderTransform = "@@Route/AddUpstreamHeaderTransform",
    AddUpstreamHeaderTransformSuccess = "@@Route/AddUpstreamHeaderTransformSuccess",
    AddUpstreamHeaderTransformFailed = "@@Route/AddUpstreamHeaderTransformFailed",
    AddUpstreamHeaderTransformModal = "@@Route/AddUpstreamHeaderTransformModal",

    RemoveUpstreamHeaderTransform = "@@Route/RemoveUpstreamHeaderTransform",
    RemoveUpstreamHeaderTransformSuccess = "@@Route/RemoveUpstreamHeaderTransformSuccess",
    RemoveUpstreamHeaderTransformFailed = "@@Route/RemoveUpstreamHeaderTransformFailed",
    RemoveUpstreamHeaderTransformModal = "@@Route/RemoveUpstreamHeaderTransformModal",

    AddDownstreamHeaderTransform = "@@Route/AddDownstreamHeaderTransform",
    AddDownstreamHeaderTransformSuccess = "@@Route/AddDownstreamHeaderTransformSuccess",
    AddDownstreamHeaderTransformFailed = "@@Route/AddDownstreamHeaderTransformFailed",
    AddDownstreamHeaderTransformModal = "@@Route/AddDownstreamHeaderTransformModal",

    RemoveDownstreamHeaderTransform = "@@Route/RemoveDownstreamHeaderTransform",
    RemoveDownstreamHeaderTransformSuccess = "@@Route/RemoveDownstreamHeaderTransformSuccess",
    RemoveDownstreamHeaderTransformFailed = "@@Route/RemoveDownstreamHeaderTransformFailed",
    RemoveDownstreamHeaderTransformModal = "@@Route/RemoveDownstreamHeaderTransformModal",

    AddAddClaimsToRequest = "@@Route/AddAddClaimsToRequest",
    AddAddClaimsToRequestSuccess = "@@Route/AddAddClaimsToRequestSuccess",
    AddAddClaimsToRequestFailed = "@@Route/AddAddClaimsToRequestFailed",
    AddAddClaimsToRequestModal = "@@Route/AddAddClaimsToRequestModal",

    RemoveAddClaimsToRequest = "@@Route/RemoveAddClaimsToRequest",
    RemoveAddClaimsToRequestSuccess = "@@Route/RemoveAddClaimsToRequestSuccess",
    RemoveAddClaimsToRequestFailed = "@@Route/RemoveAddClaimsToRequestFailed",
    RemoveAddClaimsToRequestModal = "@@Route/RemoveAddClaimsToRequestModal",
    
    AddRouteClaimsRequirement = "@@Route/AddRouteClaimsRequirement",
    AddRouteClaimsRequirementSuccess = "@@Route/AddRouteClaimsRequirementSuccess",
    AddRouteClaimsRequirementFailed = "@@Route/AddRouteClaimsRequirementFailed",
    AddRouteClaimsRequirementModal = "@@Route/AddRouteClaimsRequirementModal",

    RemoveRouteClaimsRequirement = "@@Route/RemoveRouteClaimsRequirement",
    RemoveRouteClaimsRequirementSuccess = "@@Route/RemoveRouteClaimsRequirementSuccess",
    RemoveRouteClaimsRequirementFailed = "@@Route/RemoveRouteClaimsRequirementFailed",
    RemoveRouteClaimsRequirementModal = "@@Route/RemoveRouteClaimsRequirementModal",

    AddAddQueriesToRequest = "@@Route/AddAddQueriesToRequest",
    AddAddQueriesToRequestSuccess = "@@Route/AddAddQueriesToRequestSuccess",
    AddAddQueriesToRequestFailed = "@@Route/AddAddQueriesToRequestFailed",
    AddAddQueriesToRequestModal = "@@Route/AddAddQueriesToRequestModal",

    RemoveAddQueriesToRequest = "@@Route/RemoveAddQueriesToRequest",
    RemoveAddQueriesToRequestSuccess = "@@Route/RemoveAddQueriesToRequestSuccess",
    RemoveAddQueriesToRequestFailed = "@@Route/RemoveAddQueriesToRequestFailed",
    RemoveAddQueriesToRequestModal = "@@Route/RemoveAddQueriesToRequestModal",

    AddChangeDownstreamPathTemplate = "@@Route/AddChangeDownstreamPathTemplate",
    AddChangeDownstreamPathTemplateSuccess = "@@Route/AddChangeDownstreamPathTemplateSuccess",
    AddChangeDownstreamPathTemplateFailed = "@@Route/AddChangeDownstreamPathTemplateFailed",
    AddChangeDownstreamPathTemplateModal = "@@Route/AddChangeDownstreamPathTemplateModal",

    RemoveChangeDownstreamPathTemplate = "@@Route/RemoveChangeDownstreamPathTemplate",
    RemoveChangeDownstreamPathTemplateSuccess = "@@Route/RemoveChangeDownstreamPathTemplateSuccess",
    RemoveChangeDownstreamPathTemplateFailed = "@@Route/RemoveChangeDownstreamPathTemplateFailed",
    RemoveChangeDownstreamPathTemplateModal = "@@Route/RemoveChangeDownstreamPathTemplateModal",

    Base64Modal = "@@Route/Base64Modal",

    PushAlert = "@@Route/PushAlert",
    ClearAlerts = "@@Route/ClearAlerts",

    RouteIdFetch = "@@Route/RouteIdFetch",
    RouteIdSuccess = "@@Route/RouteIdSuccess",
    RouteIdFailed = "@@Route/RouteIdFailed",
}
