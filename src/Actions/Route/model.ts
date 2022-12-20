import { Action } from "redux";
import { RouteActionTypes } from "./actionType";

export interface IRouteState {
  routeList: {
    loading: boolean;
    data: any;
  };
  route: {
    loading: boolean;
    data: any;
  };
  scopeList: {
    loading: boolean;
    loaded: boolean;
    fileConfigurationId: number;
    data: { value: string; label: string }[];
  };
  routeHistoryList: {
    loading: boolean;
    Visible: boolean;
    data: any[];
  };
  routeHistoryBA: {
    loading: boolean;
    Visible: boolean;
    data: any;
  };
  routePushHistoryList: {
    loading: boolean;
    Visible: boolean;
    data: any[];
  };
  routeCreate: {
    loading: boolean;
    Visible: boolean;
  };
  routeUpdate: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  routeRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  routeCopy: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  upstreamHttpMethodRouteKeyAdd: {
    loading: boolean;
  };
  upstreamHttpMethodRouteKeyRemove: {
    loading: boolean;
  };
  fileCacheOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  qoSOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  loadBalancerOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  hostAndPortAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  hostAndPortRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  rateLimitRuleAdd: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  rateLimitRuleUpdate: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  rateLimitRuleRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  clientWhiteModal: {
    Visible: boolean;
    item: any;
  };
  clientWhiteAdd: {
    loading: boolean;
  };
  clientWhiteRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  authenticationOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  allowedScopeAdd: {
    loading: boolean;
  };

  allowedhelpAdd: {
    loading: boolean;
  };

  allowedScopeRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  httpHandlerOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  preAuthenticationPartySet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  preAuthenticationPartyBodyAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  preAuthenticationPartyBodyRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  preAuthenticationPartyHeaderAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  preAuthenticationPartyHeaderRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  delegatingHandlerAdd: {
    loading: boolean;
  };
  delegatingHandlerRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  iPAllowedAdd: {
    loading: boolean;
  };
  iPAllowedRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  iPBlockedAdd: {
    loading: boolean;
  };
  iPBlockedRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  routeUserNameAndPasswordSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  userPassAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  userPassRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  addHeadersToRequestAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  addHeadersToRequestRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  upstreamHeaderTransformAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  upstreamHeaderTransformRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  downstreamHeaderTransformAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  downstreamHeaderTransformRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  addClaimsToRequestAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  addClaimsToRequestRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  routeClaimsRequirementAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  routeClaimsRequirementRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  addQueriesToRequestAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  addQueriesToRequestRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  changeDownstreamPathTemplateAdd: {
    loading: boolean;
    Visible: boolean;
    fileConfigurationId: number;
    fileRouteId: number;
  };
  changeDownstreamPathTemplateRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  };
  base64: {
    Visible: boolean;
  };
  alerts: any[];
}

interface IRouteFetch extends Action<string> {
  type: RouteActionTypes.RouteFetch;
}
interface IRouteFetchSuccess extends Action<string> {
  type: RouteActionTypes.RouteFetchSuccess;
  data: any;
}
interface IRouteFetchFailed extends Action<string> {
  type: RouteActionTypes.RouteFetchFailed;
}

interface IScopeFetch extends Action<string> {
  type: RouteActionTypes.ScopeFetch;
}
interface IScopeFetchSuccess extends Action<string> {
  type: RouteActionTypes.ScopeFetchSuccess;
  data: any;
  fileConfigurationId: number;
}
interface IScopeFetchFailed extends Action<string> {
  type: RouteActionTypes.ScopeFetchFailed;
}

interface IGetRouteHistory extends Action<string> {
  type: RouteActionTypes.GetRouteHistory;
}
interface IGetRouteHistorySuccess extends Action<string> {
  type: RouteActionTypes.GetRouteHistorySuccess;
  data: any;
}
interface IGetRouteHistoryFailed extends Action<string> {
  type: RouteActionTypes.GetRouteHistoryFailed;
}
interface IGetRouteHistoryModal extends Action<string> {
  type: RouteActionTypes.GetRouteHistoryModal;
  Visible: boolean;
}

interface IGetRouteHistoryBA extends Action<string> {
  type: RouteActionTypes.GetRouteHistoryBA;
}
interface IGetRouteHistoryBASuccess extends Action<string> {
  type: RouteActionTypes.GetRouteHistoryBASuccess;
  data: any;
}
interface IGetRouteHistoryBAFailed extends Action<string> {
  type: RouteActionTypes.GetRouteHistoryBAFailed;
}
interface IGetRouteHistoryBAModal extends Action<string> {
  type: RouteActionTypes.GetRouteHistoryBAModal;
  Visible: boolean;
}

interface IGetRoutePushHistory extends Action<string> {
  type: RouteActionTypes.GetRoutePushHistory;
}
interface IGetRoutePushHistorySuccess extends Action<string> {
  type: RouteActionTypes.GetRoutePushHistorySuccess;
  data: any;
}
interface IGetRoutePushHistoryFailed extends Action<string> {
  type: RouteActionTypes.GetRoutePushHistoryFailed;
}
interface IGetRoutePushHistoryModal extends Action<string> {
  type: RouteActionTypes.GetRoutePushHistoryModal;
  Visible: boolean;
}

interface IRouteCreate extends Action<string> {
  type: RouteActionTypes.RouteCreate;
}
interface IRouteCreateSuccess extends Action<string> {
  type: RouteActionTypes.RouteCreateSuccess;
}
interface IRouteCreateFailed extends Action<string> {
  type: RouteActionTypes.RouteCreateFailed;
}
interface IRouteCreateModal extends Action<string> {
  type: RouteActionTypes.RouteCreateModal;
  Visible: boolean;
}

interface IRouteUpdate extends Action<string> {
  type: RouteActionTypes.RouteUpdate;
}
interface IRouteUpdateSuccess extends Action<string> {
  type: RouteActionTypes.RouteUpdateSuccess;
}
interface IRouteUpdateFailed extends Action<string> {
  type: RouteActionTypes.RouteUpdateFailed;
}
interface IRouteUpdateModal extends Action<string> {
  type: RouteActionTypes.RouteUpdateModal;
  Visible: boolean;
  item: any;
}

interface IRouteRemove extends Action<string> {
  type: RouteActionTypes.RouteRemove;
}
interface IRouteCopy extends Action<string> {
  type: RouteActionTypes.RouteCopy;
}
interface IRouteRemoveSuccess extends Action<string> {
  type: RouteActionTypes.RouteRemoveSuccess;
}
interface IRouteRemoveFailed extends Action<string> {
  type: RouteActionTypes.RouteRemoveFailed;
}
interface IRouteRemoveModal extends Action<string> {
  type: RouteActionTypes.RouteRemoveModal;
  Visible: boolean;
  item: any;
}
interface IRouteCopyModal extends Action<string> {
  type: RouteActionTypes.RouteCopyModal;
  Visible: boolean;
  item: any;
}
interface IAddUpstreamHttpMethodRouteKey extends Action<string> {
  type: RouteActionTypes.AddUpstreamHttpMethodRouteKey;
}
interface IAddUpstreamHttpMethodRouteKeySuccess extends Action<string> {
  type: RouteActionTypes.AddUpstreamHttpMethodRouteKeySuccess;
}
interface IAddUpstreamHttpMethodRouteKeyFailed extends Action<string> {
  type: RouteActionTypes.AddUpstreamHttpMethodRouteKeyFailed;
}

interface IRemoveUpstreamHttpMethodRouteKey extends Action<string> {
  type: RouteActionTypes.RemoveUpstreamHttpMethodRouteKey;
}
interface IRemoveUpstreamHttpMethodRouteKeySuccess extends Action<string> {
  type: RouteActionTypes.RemoveUpstreamHttpMethodRouteKeySuccess;
}
interface IRemoveUpstreamHttpMethodRouteKeyFailed extends Action<string> {
  type: RouteActionTypes.RemoveUpstreamHttpMethodRouteKeyFailed;
}

interface ISetFileCacheOptions extends Action<string> {
  type: RouteActionTypes.SetFileCacheOptions;
}
interface ISetFileCacheOptionsSuccess extends Action<string> {
  type: RouteActionTypes.SetFileCacheOptionsSuccess;
}
interface ISetFileCacheOptionsFailed extends Action<string> {
  type: RouteActionTypes.SetFileCacheOptionsFailed;
}
interface ISetFileCacheOptionsModal extends Action<string> {
  type: RouteActionTypes.SetFileCacheOptionsModal;
  Visible: boolean;
  item: any;
}

interface ISetQoSOptions extends Action<string> {
  type: RouteActionTypes.SetQoSOptions;
}
interface ISetQoSOptionsSuccess extends Action<string> {
  type: RouteActionTypes.SetQoSOptionsSuccess;
}
interface ISetQoSOptionsFailed extends Action<string> {
  type: RouteActionTypes.SetQoSOptionsFailed;
}
interface ISetQoSOptionsModal extends Action<string> {
  type: RouteActionTypes.SetQoSOptionsModal;
  Visible: boolean;
  item: any;
}

interface ISetLoadBalancerOptions extends Action<string> {
  type: RouteActionTypes.SetLoadBalancerOptions;
}
interface ISetLoadBalancerOptionsSuccess extends Action<string> {
  type: RouteActionTypes.SetLoadBalancerOptionsSuccess;
}
interface ISetLoadBalancerOptionsFailed extends Action<string> {
  type: RouteActionTypes.SetLoadBalancerOptionsFailed;
}
interface ISetLoadBalancerOptionsModal extends Action<string> {
  type: RouteActionTypes.SetLoadBalancerOptionsModal;
  Visible: boolean;
  item: any;
}

interface IAddHostAndPort extends Action<string> {
  type: RouteActionTypes.AddHostAndPort;
}
interface IAddHostAndPortSuccess extends Action<string> {
  type: RouteActionTypes.AddHostAndPortSuccess;
}
interface IAddHostAndPortFailed extends Action<string> {
  type: RouteActionTypes.AddHostAndPortFailed;
}
interface IAddHostAndPortModal extends Action<string> {
  type: RouteActionTypes.AddHostAndPortModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveHostAndPort extends Action<string> {
  type: RouteActionTypes.RemoveHostAndPort;
}
interface IRemoveHostAndPortSuccess extends Action<string> {
  type: RouteActionTypes.RemoveHostAndPortSuccess;
}
interface IRemoveHostAndPortFailed extends Action<string> {
  type: RouteActionTypes.RemoveHostAndPortFailed;
}
interface IRemoveHostAndPortModal extends Action<string> {
  type: RouteActionTypes.RemoveHostAndPortModal;
  Visible: boolean;
  item: any;
}

interface IAddRateLimitRule extends Action<string> {
  type: RouteActionTypes.AddRateLimitRule;
}
interface IAddRateLimitRuleSuccess extends Action<string> {
  type: RouteActionTypes.AddRateLimitRuleSuccess;
}
interface IAddRateLimitRuleFailed extends Action<string> {
  type: RouteActionTypes.AddRateLimitRuleFailed;
}
interface IAddRateLimitRuleModal extends Action<string> {
  type: RouteActionTypes.AddRateLimitRuleModal;
  Visible: boolean;
  item: any;
}

interface IUpdateRateLimitRule extends Action<string> {
  type: RouteActionTypes.UpdateRateLimitRule;
}
interface IUpdateRateLimitRuleSuccess extends Action<string> {
  type: RouteActionTypes.UpdateRateLimitRuleSuccess;
}
interface IUpdateRateLimitRuleFailed extends Action<string> {
  type: RouteActionTypes.UpdateRateLimitRuleFailed;
}
interface IUpdateRateLimitRuleModal extends Action<string> {
  type: RouteActionTypes.UpdateRateLimitRuleModal;
  Visible: boolean;
  item: any;
}

interface IRemoveRateLimitRule extends Action<string> {
  type: RouteActionTypes.RemoveRateLimitRule;
}
interface IRemoveRateLimitRuleSuccess extends Action<string> {
  type: RouteActionTypes.RemoveRateLimitRuleSuccess;
}
interface IRemoveRateLimitRuleFailed extends Action<string> {
  type: RouteActionTypes.RemoveRateLimitRuleFailed;
}
interface IRemoveRateLimitRuleModal extends Action<string> {
  type: RouteActionTypes.RemoveRateLimitRuleModal;
  Visible: boolean;
  item: any;
}

interface IClientWhiteModal extends Action<string> {
  type: RouteActionTypes.ClientWhiteModal;
  Visible: boolean;
  item: any;
}

interface IAddClientWhite extends Action<string> {
  type: RouteActionTypes.AddClientWhite;
}
interface IAddClientWhiteSuccess extends Action<string> {
  type: RouteActionTypes.AddClientWhiteSuccess;
}
interface IAddClientWhiteFailed extends Action<string> {
  type: RouteActionTypes.AddClientWhiteFailed;
}

interface IRemoveClientWhite extends Action<string> {
  type: RouteActionTypes.RemoveClientWhite;
}
interface IRemoveClientWhiteSuccess extends Action<string> {
  type: RouteActionTypes.RemoveClientWhiteSuccess;
}
interface IRemoveClientWhiteFailed extends Action<string> {
  type: RouteActionTypes.RemoveClientWhiteFailed;
}
interface IRemoveClientWhiteModal extends Action<string> {
  type: RouteActionTypes.RemoveClientWhiteModal;
  Visible: boolean;
  item: any;
}

interface ISetAuthenticationOptions extends Action<string> {
  type: RouteActionTypes.SetAuthenticationOptions;
}
interface ISetAuthenticationOptionsSuccess extends Action<string> {
  type: RouteActionTypes.SetAuthenticationOptionsSuccess;
}
interface ISetAuthenticationOptionsFailed extends Action<string> {
  type: RouteActionTypes.SetAuthenticationOptionsFailed;
}
interface ISetAuthenticationOptionsModal extends Action<string> {
  type: RouteActionTypes.SetAuthenticationOptionsModal;
  Visible: boolean;
  item: any;
}

interface IAddAllowedScope extends Action<string> {
  type: RouteActionTypes.AddAllowedScope;
}
interface IAddAllowedScopeSuccess extends Action<string> {
  type: RouteActionTypes.AddAllowedScopeSuccess;
}
interface IAddAllowedScopeFailed extends Action<string> {
  type: RouteActionTypes.AddAllowedScopeFailed;
}

interface IAddHelp extends Action<string> {
  type: RouteActionTypes.AddHelp;
}
interface IAddHelpSuccess extends Action<string> {
  type: RouteActionTypes.AddHelpSuccess;
}
interface IAddHelpFailed extends Action<string> {
  type: RouteActionTypes.AddHelpFailed;
}

interface IRemoveAllowedScope extends Action<string> {
  type: RouteActionTypes.RemoveAllowedScope;
}
interface IRemoveAllowedScopeSuccess extends Action<string> {
  type: RouteActionTypes.RemoveAllowedScopeSuccess;
}
interface IRemoveAllowedScopeFailed extends Action<string> {
  type: RouteActionTypes.RemoveAllowedScopeFailed;
}
interface IRemoveAllowedScopeModal extends Action<string> {
  type: RouteActionTypes.RemoveAllowedScopeModal;
  Visible: boolean;
  item: any;
}

interface ISetHttpHandlerOptions extends Action<string> {
  type: RouteActionTypes.SetHttpHandlerOptions;
}
interface ISetHttpHandlerOptionsSuccess extends Action<string> {
  type: RouteActionTypes.SetHttpHandlerOptionsSuccess;
}
interface ISetHttpHandlerOptionsFailed extends Action<string> {
  type: RouteActionTypes.SetHttpHandlerOptionsFailed;
}
interface ISetHttpHandlerOptionsModal extends Action<string> {
  type: RouteActionTypes.SetHttpHandlerOptionsModal;
  Visible: boolean;
  item: any;
}

interface ISetPreAuthenticationParty extends Action<string> {
  type: RouteActionTypes.SetPreAuthenticationParty;
}
interface ISetPreAuthenticationPartySuccess extends Action<string> {
  type: RouteActionTypes.SetPreAuthenticationPartySuccess;
}
interface ISetPreAuthenticationPartyFailed extends Action<string> {
  type: RouteActionTypes.SetPreAuthenticationPartyFailed;
}
interface ISetPreAuthenticationPartyModal extends Action<string> {
  type: RouteActionTypes.SetPreAuthenticationPartyModal;
  Visible: boolean;
  item: any;
}

interface IAddPreAuthenticationPartyBody extends Action<string> {
  type: RouteActionTypes.AddPreAuthenticationPartyBody;
}
interface IAddPreAuthenticationPartyBodySuccess extends Action<string> {
  type: RouteActionTypes.AddPreAuthenticationPartyBodySuccess;
}
interface IAddPreAuthenticationPartyBodyFailed extends Action<string> {
  type: RouteActionTypes.AddPreAuthenticationPartyBodyFailed;
}
interface IAddPreAuthenticationPartyBodyModal extends Action<string> {
  type: RouteActionTypes.AddPreAuthenticationPartyBodyModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemovePreAuthenticationPartyBody extends Action<string> {
  type: RouteActionTypes.RemovePreAuthenticationPartyBody;
}
interface IRemovePreAuthenticationPartyBodySuccess extends Action<string> {
  type: RouteActionTypes.RemovePreAuthenticationPartyBodySuccess;
}
interface IRemovePreAuthenticationPartyBodyFailed extends Action<string> {
  type: RouteActionTypes.RemovePreAuthenticationPartyBodyFailed;
}
interface IRemovePreAuthenticationPartyBodyModal extends Action<string> {
  type: RouteActionTypes.RemovePreAuthenticationPartyBodyModal;
  Visible: boolean;
  item: any;
}

interface IAddPreAuthenticationPartyHeader extends Action<string> {
  type: RouteActionTypes.AddPreAuthenticationPartyHeader;
}
interface IAddPreAuthenticationPartyHeaderSuccess extends Action<string> {
  type: RouteActionTypes.AddPreAuthenticationPartyHeaderSuccess;
}
interface IAddPreAuthenticationPartyHeaderFailed extends Action<string> {
  type: RouteActionTypes.AddPreAuthenticationPartyHeaderFailed;
}
interface IAddPreAuthenticationPartyHeaderModal extends Action<string> {
  type: RouteActionTypes.AddPreAuthenticationPartyHeaderModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemovePreAuthenticationPartyHeader extends Action<string> {
  type: RouteActionTypes.RemovePreAuthenticationPartyHeader;
}
interface IRemovePreAuthenticationPartyHeaderSuccess extends Action<string> {
  type: RouteActionTypes.RemovePreAuthenticationPartyHeaderSuccess;
}
interface IRemovePreAuthenticationPartyHeaderFailed extends Action<string> {
  type: RouteActionTypes.RemovePreAuthenticationPartyHeaderFailed;
}
interface IRemovePreAuthenticationPartyHeaderModal extends Action<string> {
  type: RouteActionTypes.RemovePreAuthenticationPartyHeaderModal;
  Visible: boolean;
  item: any;
}

interface IAddDelegatingHandler extends Action<string> {
  type: RouteActionTypes.AddDelegatingHandler;
}
interface IAddDelegatingHandlerSuccess extends Action<string> {
  type: RouteActionTypes.AddDelegatingHandlerSuccess;
}
interface IAddDelegatingHandlerFailed extends Action<string> {
  type: RouteActionTypes.AddDelegatingHandlerFailed;
}

interface IRemoveDelegatingHandler extends Action<string> {
  type: RouteActionTypes.RemoveDelegatingHandler;
}
interface IRemoveDelegatingHandlerSuccess extends Action<string> {
  type: RouteActionTypes.RemoveDelegatingHandlerSuccess;
}
interface IRemoveDelegatingHandlerFailed extends Action<string> {
  type: RouteActionTypes.RemoveDelegatingHandlerFailed;
}
interface IRemoveDelegatingHandlerModal extends Action<string> {
  type: RouteActionTypes.RemoveDelegatingHandlerModal;
  Visible: boolean;
  item: any;
}

interface IAddIPAllowed extends Action<string> {
  type: RouteActionTypes.AddIPAllowed;
}
interface IAddIPAllowedSuccess extends Action<string> {
  type: RouteActionTypes.AddIPAllowedSuccess;
}
interface IAddIPAllowedFailed extends Action<string> {
  type: RouteActionTypes.AddIPAllowedFailed;
}

interface IRemoveIPAllowed extends Action<string> {
  type: RouteActionTypes.RemoveIPAllowed;
}
interface IRemoveIPAllowedSuccess extends Action<string> {
  type: RouteActionTypes.RemoveIPAllowedSuccess;
}
interface IRemoveIPAllowedFailed extends Action<string> {
  type: RouteActionTypes.RemoveIPAllowedFailed;
}
interface IRemoveIPAllowedModal extends Action<string> {
  type: RouteActionTypes.RemoveIPAllowedModal;
  Visible: boolean;
  item: any;
}

interface IAddIPBlocked extends Action<string> {
  type: RouteActionTypes.AddIPBlocked;
}
interface IAddIPBlockedSuccess extends Action<string> {
  type: RouteActionTypes.AddIPBlockedSuccess;
}
interface IAddIPBlockedFailed extends Action<string> {
  type: RouteActionTypes.AddIPBlockedFailed;
}

interface IRemoveIPBlocked extends Action<string> {
  type: RouteActionTypes.RemoveIPBlocked;
}
interface IRemoveIPBlockedSuccess extends Action<string> {
  type: RouteActionTypes.RemoveIPBlockedSuccess;
}
interface IRemoveIPBlockedFailed extends Action<string> {
  type: RouteActionTypes.RemoveIPBlockedFailed;
}
interface IRemoveIPBlockedModal extends Action<string> {
  type: RouteActionTypes.RemoveIPBlockedModal;
  Visible: boolean;
  item: any;
}

interface ISetRouteUserNameAndPassword extends Action<string> {
  type: RouteActionTypes.SetRouteUserNameAndPassword;
}
interface ISetRouteUserNameAndPasswordSuccess extends Action<string> {
  type: RouteActionTypes.SetRouteUserNameAndPasswordSuccess;
}
interface ISetRouteUserNameAndPasswordFailed extends Action<string> {
  type: RouteActionTypes.SetRouteUserNameAndPasswordFailed;
}
interface ISetRouteUserNameAndPasswordModal extends Action<string> {
  type: RouteActionTypes.SetRouteUserNameAndPasswordModal;
  Visible: boolean;
  item: any;
}

interface IAddUserPass extends Action<string> {
  type: RouteActionTypes.AddUserPass;
}
interface IAddUserPassSuccess extends Action<string> {
  type: RouteActionTypes.AddUserPassSuccess;
}
interface IAddUserPassFailed extends Action<string> {
  type: RouteActionTypes.AddUserPassFailed;
}
interface IAddUserPassModal extends Action<string> {
  type: RouteActionTypes.AddUserPassModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveUserPass extends Action<string> {
  type: RouteActionTypes.RemoveUserPass;
}
interface IRemoveUserPassSuccess extends Action<string> {
  type: RouteActionTypes.RemoveUserPassSuccess;
}
interface IRemoveUserPassFailed extends Action<string> {
  type: RouteActionTypes.RemoveUserPassFailed;
}
interface IRemoveUserPassModal extends Action<string> {
  type: RouteActionTypes.RemoveUserPassModal;
  Visible: boolean;
  item: any;
}

interface IAddAddHeadersToRequest extends Action<string> {
  type: RouteActionTypes.AddAddHeadersToRequest;
}
interface IAddAddHeadersToRequestSuccess extends Action<string> {
  type: RouteActionTypes.AddAddHeadersToRequestSuccess;
}
interface IAddAddHeadersToRequestFailed extends Action<string> {
  type: RouteActionTypes.AddAddHeadersToRequestFailed;
}
interface IAddAddHeadersToRequestModal extends Action<string> {
  type: RouteActionTypes.AddAddHeadersToRequestModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveAddHeadersToRequest extends Action<string> {
  type: RouteActionTypes.RemoveAddHeadersToRequest;
}
interface IRemoveAddHeadersToRequestSuccess extends Action<string> {
  type: RouteActionTypes.RemoveAddHeadersToRequestSuccess;
}
interface IRemoveAddHeadersToRequestFailed extends Action<string> {
  type: RouteActionTypes.RemoveAddHeadersToRequestFailed;
}
interface IRemoveAddHeadersToRequestModal extends Action<string> {
  type: RouteActionTypes.RemoveAddHeadersToRequestModal;
  Visible: boolean;
  item: any;
}

interface IAddUpstreamHeaderTransform extends Action<string> {
  type: RouteActionTypes.AddUpstreamHeaderTransform;
}
interface IAddUpstreamHeaderTransformSuccess extends Action<string> {
  type: RouteActionTypes.AddUpstreamHeaderTransformSuccess;
}
interface IAddUpstreamHeaderTransformFailed extends Action<string> {
  type: RouteActionTypes.AddUpstreamHeaderTransformFailed;
}
interface IAddUpstreamHeaderTransformModal extends Action<string> {
  type: RouteActionTypes.AddUpstreamHeaderTransformModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveUpstreamHeaderTransform extends Action<string> {
  type: RouteActionTypes.RemoveUpstreamHeaderTransform;
}
interface IRemoveUpstreamHeaderTransformSuccess extends Action<string> {
  type: RouteActionTypes.RemoveUpstreamHeaderTransformSuccess;
}
interface IRemoveUpstreamHeaderTransformFailed extends Action<string> {
  type: RouteActionTypes.RemoveUpstreamHeaderTransformFailed;
}
interface IRemoveUpstreamHeaderTransformModal extends Action<string> {
  type: RouteActionTypes.RemoveUpstreamHeaderTransformModal;
  Visible: boolean;
  item: any;
}

interface IAddDownstreamHeaderTransform extends Action<string> {
  type: RouteActionTypes.AddDownstreamHeaderTransform;
}
interface IAddDownstreamHeaderTransformSuccess extends Action<string> {
  type: RouteActionTypes.AddDownstreamHeaderTransformSuccess;
}
interface IAddDownstreamHeaderTransformFailed extends Action<string> {
  type: RouteActionTypes.AddDownstreamHeaderTransformFailed;
}
interface IAddDownstreamHeaderTransformModal extends Action<string> {
  type: RouteActionTypes.AddDownstreamHeaderTransformModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveDownstreamHeaderTransform extends Action<string> {
  type: RouteActionTypes.RemoveDownstreamHeaderTransform;
}
interface IRemoveDownstreamHeaderTransformSuccess extends Action<string> {
  type: RouteActionTypes.RemoveDownstreamHeaderTransformSuccess;
}
interface IRemoveDownstreamHeaderTransformFailed extends Action<string> {
  type: RouteActionTypes.RemoveDownstreamHeaderTransformFailed;
}
interface IRemoveDownstreamHeaderTransformModal extends Action<string> {
  type: RouteActionTypes.RemoveDownstreamHeaderTransformModal;
  Visible: boolean;
  item: any;
}

interface IAddAddClaimsToRequest extends Action<string> {
  type: RouteActionTypes.AddAddClaimsToRequest;
}
interface IAddAddClaimsToRequestSuccess extends Action<string> {
  type: RouteActionTypes.AddAddClaimsToRequestSuccess;
}
interface IAddAddClaimsToRequestFailed extends Action<string> {
  type: RouteActionTypes.AddAddClaimsToRequestFailed;
}
interface IAddAddClaimsToRequestModal extends Action<string> {
  type: RouteActionTypes.AddAddClaimsToRequestModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveAddClaimsToRequest extends Action<string> {
  type: RouteActionTypes.RemoveAddClaimsToRequest;
}
interface IRemoveAddClaimsToRequestSuccess extends Action<string> {
  type: RouteActionTypes.RemoveAddClaimsToRequestSuccess;
}
interface IRemoveAddClaimsToRequestFailed extends Action<string> {
  type: RouteActionTypes.RemoveAddClaimsToRequestFailed;
}
interface IRemoveAddClaimsToRequestModal extends Action<string> {
  type: RouteActionTypes.RemoveAddClaimsToRequestModal;
  Visible: boolean;
  item: any;
}

interface IAddRouteClaimsRequirement extends Action<string> {
  type: RouteActionTypes.AddRouteClaimsRequirement;
}
interface IAddRouteClaimsRequirementSuccess extends Action<string> {
  type: RouteActionTypes.AddRouteClaimsRequirementSuccess;
}
interface IAddRouteClaimsRequirementFailed extends Action<string> {
  type: RouteActionTypes.AddRouteClaimsRequirementFailed;
}
interface IAddRouteClaimsRequirementModal extends Action<string> {
  type: RouteActionTypes.AddRouteClaimsRequirementModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveRouteClaimsRequirement extends Action<string> {
  type: RouteActionTypes.RemoveRouteClaimsRequirement;
}
interface IRemoveRouteClaimsRequirementSuccess extends Action<string> {
  type: RouteActionTypes.RemoveRouteClaimsRequirementSuccess;
}
interface IRemoveRouteClaimsRequirementFailed extends Action<string> {
  type: RouteActionTypes.RemoveRouteClaimsRequirementFailed;
}
interface IRemoveRouteClaimsRequirementModal extends Action<string> {
  type: RouteActionTypes.RemoveRouteClaimsRequirementModal;
  Visible: boolean;
  item: any;
}

interface IAddAddQueriesToRequest extends Action<string> {
  type: RouteActionTypes.AddAddQueriesToRequest;
}
interface IAddAddQueriesToRequestSuccess extends Action<string> {
  type: RouteActionTypes.AddAddQueriesToRequestSuccess;
}
interface IAddAddQueriesToRequestFailed extends Action<string> {
  type: RouteActionTypes.AddAddQueriesToRequestFailed;
}
interface IAddAddQueriesToRequestModal extends Action<string> {
  type: RouteActionTypes.AddAddQueriesToRequestModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveAddQueriesToRequest extends Action<string> {
  type: RouteActionTypes.RemoveAddQueriesToRequest;
}
interface IRemoveAddQueriesToRequestSuccess extends Action<string> {
  type: RouteActionTypes.RemoveAddQueriesToRequestSuccess;
}
interface IRemoveAddQueriesToRequestFailed extends Action<string> {
  type: RouteActionTypes.RemoveAddQueriesToRequestFailed;
}
interface IRemoveAddQueriesToRequestModal extends Action<string> {
  type: RouteActionTypes.RemoveAddQueriesToRequestModal;
  Visible: boolean;
  item: any;
}

interface IAddChangeDownstreamPathTemplate extends Action<string> {
  type: RouteActionTypes.AddChangeDownstreamPathTemplate;
}
interface IAddChangeDownstreamPathTemplateSuccess extends Action<string> {
  type: RouteActionTypes.AddChangeDownstreamPathTemplateSuccess;
}
interface IAddChangeDownstreamPathTemplateFailed extends Action<string> {
  type: RouteActionTypes.AddChangeDownstreamPathTemplateFailed;
}
interface IAddChangeDownstreamPathTemplateModal extends Action<string> {
  type: RouteActionTypes.AddChangeDownstreamPathTemplateModal;
  Visible: boolean;
  fileConfigurationId: number;
  fileRouteId: number;
}

interface IRemoveChangeDownstreamPathTemplate extends Action<string> {
  type: RouteActionTypes.RemoveChangeDownstreamPathTemplate;
}
interface IRemoveChangeDownstreamPathTemplateSuccess extends Action<string> {
  type: RouteActionTypes.RemoveChangeDownstreamPathTemplateSuccess;
}
interface IRemoveChangeDownstreamPathTemplateFailed extends Action<string> {
  type: RouteActionTypes.RemoveChangeDownstreamPathTemplateFailed;
}
interface IRemoveChangeDownstreamPathTemplateModal extends Action<string> {
  type: RouteActionTypes.RemoveChangeDownstreamPathTemplateModal;
  Visible: boolean;
  item: any;
}

interface IBase64Modal extends Action<string> {
  type: RouteActionTypes.Base64Modal;
  Visible: boolean;
}

interface IPushAlert extends Action<string> {
  type: RouteActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: RouteActionTypes.ClearAlerts;
}
interface IRouteIdFetch extends Action<string> {
  type: RouteActionTypes.RouteIdFetch;
}
interface IRouteIdSuccess extends Action<string> {
  type: RouteActionTypes.RouteIdSuccess;
  data: any;
}
interface IRouteIdFailed extends Action<string> {
  type: RouteActionTypes.RouteIdFailed;
}

export type KnownAction =
  | IRouteFetch
  | IRouteFetchSuccess
  | IRouteFetchFailed
  | IScopeFetch
  | IScopeFetchSuccess
  | IScopeFetchFailed
  | IGetRouteHistory
  | IGetRouteHistorySuccess
  | IGetRouteHistoryFailed
  | IGetRouteHistoryModal
  | IGetRouteHistoryBA
  | IGetRouteHistoryBASuccess
  | IGetRouteHistoryBAFailed
  | IGetRouteHistoryBAModal
  | IGetRoutePushHistory
  | IGetRoutePushHistorySuccess
  | IGetRoutePushHistoryFailed
  | IGetRoutePushHistoryModal
  | IRouteCreate
  | IRouteCreateSuccess
  | IRouteCreateFailed
  | IRouteCreateModal
  | IRouteUpdate
  | IRouteUpdateSuccess
  | IRouteUpdateFailed
  | IRouteUpdateModal
  | IRouteRemove 
  | IRouteCopy
  | IRouteRemoveSuccess
  | IRouteRemoveFailed
  | IRouteRemoveModal
  | IRouteCopyModal
  | IAddUpstreamHttpMethodRouteKey
  | IAddUpstreamHttpMethodRouteKeySuccess
  | IAddUpstreamHttpMethodRouteKeyFailed
  | IRemoveUpstreamHttpMethodRouteKey
  | IRemoveUpstreamHttpMethodRouteKeySuccess
  | IRemoveUpstreamHttpMethodRouteKeyFailed
  | ISetFileCacheOptions
  | ISetFileCacheOptionsSuccess
  | ISetFileCacheOptionsFailed
  | ISetFileCacheOptionsModal
  | ISetQoSOptions
  | ISetQoSOptionsSuccess
  | ISetQoSOptionsFailed
  | ISetQoSOptionsModal
  | ISetLoadBalancerOptions
  | ISetLoadBalancerOptionsSuccess
  | ISetLoadBalancerOptionsFailed
  | ISetLoadBalancerOptionsModal
  | IAddHostAndPort
  | IAddHostAndPortSuccess
  | IAddHostAndPortFailed
  | IAddHostAndPortModal
  | IRemoveHostAndPort
  | IRemoveHostAndPortSuccess
  | IRemoveHostAndPortFailed
  | IRemoveHostAndPortModal
  | IAddRateLimitRule
  | IAddRateLimitRuleSuccess
  | IAddRateLimitRuleFailed
  | IAddRateLimitRuleModal
  | IUpdateRateLimitRule
  | IUpdateRateLimitRuleSuccess
  | IUpdateRateLimitRuleFailed
  | IUpdateRateLimitRuleModal
  | IRemoveRateLimitRule
  | IRemoveRateLimitRuleSuccess
  | IRemoveRateLimitRuleFailed
  | IRemoveRateLimitRuleModal
  | IClientWhiteModal
  | IAddClientWhite
  | IAddClientWhiteSuccess
  | IAddClientWhiteFailed
  | IRemoveClientWhite
  | IRemoveClientWhiteSuccess
  | IRemoveClientWhiteFailed
  | IRemoveClientWhiteModal
  | ISetAuthenticationOptions
  | ISetAuthenticationOptionsSuccess
  | ISetAuthenticationOptionsFailed
  | ISetAuthenticationOptionsModal
  | IAddAllowedScope
  | IAddAllowedScopeSuccess
  | IAddAllowedScopeFailed
  | IAddHelp
  | IAddHelpSuccess
  | IAddHelpFailed
  | IRemoveAllowedScope
  | IRemoveAllowedScopeSuccess
  | IRemoveAllowedScopeFailed
  | IRemoveAllowedScopeModal
  | ISetHttpHandlerOptions
  | ISetHttpHandlerOptionsSuccess
  | ISetHttpHandlerOptionsFailed
  | ISetHttpHandlerOptionsModal
  | ISetPreAuthenticationParty
  | ISetPreAuthenticationPartySuccess
  | ISetPreAuthenticationPartyFailed
  | ISetPreAuthenticationPartyModal
  | IAddPreAuthenticationPartyBody
  | IAddPreAuthenticationPartyBodySuccess
  | IAddPreAuthenticationPartyBodyFailed
  | IAddPreAuthenticationPartyBodyModal
  | IRemovePreAuthenticationPartyBody
  | IRemovePreAuthenticationPartyBodySuccess
  | IRemovePreAuthenticationPartyBodyFailed
  | IRemovePreAuthenticationPartyBodyModal
  | IAddPreAuthenticationPartyHeader
  | IAddPreAuthenticationPartyHeaderSuccess
  | IAddPreAuthenticationPartyHeaderFailed
  | IAddPreAuthenticationPartyHeaderModal
  | IRemovePreAuthenticationPartyHeader
  | IRemovePreAuthenticationPartyHeaderSuccess
  | IRemovePreAuthenticationPartyHeaderFailed
  | IRemovePreAuthenticationPartyHeaderModal
  | IAddDelegatingHandler
  | IAddDelegatingHandlerSuccess
  | IAddDelegatingHandlerFailed
  | IRemoveDelegatingHandler
  | IRemoveDelegatingHandlerSuccess
  | IRemoveDelegatingHandlerFailed
  | IRemoveDelegatingHandlerModal
  | IAddIPAllowed
  | IAddIPAllowedSuccess
  | IAddIPAllowedFailed
  | IRemoveIPAllowed
  | IRemoveIPAllowedSuccess
  | IRemoveIPAllowedFailed
  | IRemoveIPAllowedModal
  | IAddIPBlocked
  | IAddIPBlockedSuccess
  | IAddIPBlockedFailed
  | IRemoveIPBlocked
  | IRemoveIPBlockedSuccess
  | IRemoveIPBlockedFailed
  | IRemoveIPBlockedModal
  | ISetRouteUserNameAndPassword
  | ISetRouteUserNameAndPasswordSuccess
  | ISetRouteUserNameAndPasswordFailed
  | ISetRouteUserNameAndPasswordModal
  | IAddUserPass
  | IAddUserPassSuccess
  | IAddUserPassFailed
  | IAddUserPassModal
  | IRemoveUserPass
  | IRemoveUserPassSuccess
  | IRemoveUserPassFailed
  | IRemoveUserPassModal
  | IAddAddHeadersToRequest
  | IAddAddHeadersToRequestSuccess
  | IAddAddHeadersToRequestFailed
  | IAddAddHeadersToRequestModal
  | IRemoveAddHeadersToRequest
  | IRemoveAddHeadersToRequestSuccess
  | IRemoveAddHeadersToRequestFailed
  | IRemoveAddHeadersToRequestModal
  | IAddUpstreamHeaderTransform
  | IAddUpstreamHeaderTransformSuccess
  | IAddUpstreamHeaderTransformFailed
  | IAddUpstreamHeaderTransformModal
  | IRemoveUpstreamHeaderTransform
  | IRemoveUpstreamHeaderTransformSuccess
  | IRemoveUpstreamHeaderTransformFailed
  | IRemoveUpstreamHeaderTransformModal
  | IAddDownstreamHeaderTransform
  | IAddDownstreamHeaderTransformSuccess
  | IAddDownstreamHeaderTransformFailed
  | IAddDownstreamHeaderTransformModal
  | IRemoveDownstreamHeaderTransform
  | IRemoveDownstreamHeaderTransformSuccess
  | IRemoveDownstreamHeaderTransformFailed
  | IRemoveDownstreamHeaderTransformModal
  | IAddAddClaimsToRequest
  | IAddAddClaimsToRequestSuccess
  | IAddAddClaimsToRequestFailed
  | IAddAddClaimsToRequestModal
  | IRemoveAddClaimsToRequest
  | IRemoveAddClaimsToRequestSuccess
  | IRemoveAddClaimsToRequestFailed
  | IRemoveAddClaimsToRequestModal
  | IAddRouteClaimsRequirement
  | IAddRouteClaimsRequirementSuccess
  | IAddRouteClaimsRequirementFailed
  | IAddRouteClaimsRequirementModal
  | IRemoveRouteClaimsRequirement
  | IRemoveRouteClaimsRequirementSuccess
  | IRemoveRouteClaimsRequirementFailed
  | IRemoveRouteClaimsRequirementModal
  | IAddAddQueriesToRequest
  | IAddAddQueriesToRequestSuccess
  | IAddAddQueriesToRequestFailed
  | IAddAddQueriesToRequestModal
  | IRemoveAddQueriesToRequest
  | IRemoveAddQueriesToRequestSuccess
  | IRemoveAddQueriesToRequestFailed
  | IRemoveAddQueriesToRequestModal
  | IAddChangeDownstreamPathTemplate
  | IAddChangeDownstreamPathTemplateSuccess
  | IAddChangeDownstreamPathTemplateFailed
  | IAddChangeDownstreamPathTemplateModal
  | IRemoveChangeDownstreamPathTemplate
  | IRemoveChangeDownstreamPathTemplateSuccess
  | IRemoveChangeDownstreamPathTemplateFailed
  | IRemoveChangeDownstreamPathTemplateModal
  | IBase64Modal
  | IPushAlert
  | IClearAlerts
  | IRouteIdFetch
  | IRouteIdSuccess
  | IRouteIdFailed;
