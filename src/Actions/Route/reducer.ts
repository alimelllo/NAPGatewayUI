import { Reducer } from "redux";
import { RouteActionTypes } from "./actionType";
import { IRouteState, KnownAction } from "./model";

const unloadedState: IRouteState = {
  routeList: {
    loading: false,
    data: [],
  },
  route: {
    loading: false,
    data: [],
  },
  scopeList: {
    loading: false,
    loaded: false,
    fileConfigurationId: 0,
    data: [],
  },
  routeHistoryList: {
    loading: false,
    Visible: false,
    data: [],
  },
  routeHistoryBA: {
    loading: false,
    Visible: false,
    data: {},
  },
  routePushHistoryList: {
    loading: false,
    Visible: false,
    data: [],
  },
  routeCreate: {
    loading: false,
    Visible: false,
  },
  routeUpdate: {
    loading: false,
    Visible: false,
    item: {},
  },
  routeRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  routeCopy: {
    loading: false,
    Visible: false,
    item: {},
  },
  upstreamHttpMethodRouteKeyAdd: {
    loading: false,
  },
  upstreamHttpMethodRouteKeyRemove: {
    loading: false,
  },
  fileCacheOptionsSet: {
    loading: false,
    Visible: false,
    item: {},
  },
  qoSOptionsSet: {
    loading: false,
    Visible: false,
    item: {},
  },
  loadBalancerOptionsSet: {
    loading: false,
    Visible: false,
    item: {},
  },
  hostAndPortAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  hostAndPortRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  rateLimitRuleAdd: {
    loading: false,
    Visible: false,
    item: {},
  },
  rateLimitRuleUpdate: {
    loading: false,
    Visible: false,
    item: {},
  },
  rateLimitRuleRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  clientWhiteModal: {
    Visible: false,
    item: {},
  },
  clientWhiteAdd: {
    loading: false,
  },
  clientWhiteRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  authenticationOptionsSet: {
    loading: false,
    Visible: false,
    item: {},
  },
  allowedScopeAdd: {
    loading: false,
  },
  allowedhelpAdd: {
    loading: false,
  },
  allowedScopeRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  httpHandlerOptionsSet: {
    loading: false,
    Visible: false,
    item: {},
  },
  preAuthenticationPartySet: {
    loading: false,
    Visible: false,
    item: {},
  },
  preAuthenticationPartyBodyAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  preAuthenticationPartyBodyRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  preAuthenticationPartyHeaderAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  preAuthenticationPartyHeaderRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  delegatingHandlerAdd: {
    loading: false,
  },
  delegatingHandlerRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  iPAllowedAdd: {
    loading: false,
  },
  iPAllowedRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  iPBlockedAdd: {
    loading: false,
  },
  iPBlockedRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  routeUserNameAndPasswordSet: {
    loading: false,
    Visible: false,
    item: {},
  },
  userPassAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  userPassRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  addHeadersToRequestAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  addHeadersToRequestRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  upstreamHeaderTransformAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  upstreamHeaderTransformRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  downstreamHeaderTransformAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  downstreamHeaderTransformRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  addClaimsToRequestAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  addClaimsToRequestRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  routeClaimsRequirementAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  routeClaimsRequirementRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  addQueriesToRequestAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  addQueriesToRequestRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  changeDownstreamPathTemplateAdd: {
    loading: false,
    Visible: false,
    fileConfigurationId: 0,
    fileRouteId: 0,
  },
  changeDownstreamPathTemplateRemove: {
    loading: false,
    Visible: false,
    item: {},
  },
  base64: {
    Visible: false,
  },
  alerts: [],
};

export const RouteReducer: Reducer<IRouteState, KnownAction> = (
  state: IRouteState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case RouteActionTypes.RouteFetch: {
      return {
        ...state,
        routeList: {
          ...state.routeList,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteFetchSuccess: {
      return {
        ...state,
        routeList: {
          ...state.routeList,
          loading: false,
          data: action.data,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteFetchFailed: {
      return {
        ...state,
        routeList: {
          ...state.routeList,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RouteIdFetch: {
      return {
        ...state,
        route: {
          ...state.route,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteIdSuccess: {
      return {
        ...state,
        route: {
          ...state.route,
          loading: false,
          data: action.data,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteIdFailed: {
      return {
        ...state,
        route: {
          ...state.route,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.ScopeFetch: {
      return {
        ...state,
        scopeList: {
          ...state.scopeList,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.ScopeFetchSuccess: {
      return {
        ...state,
        scopeList: {
          ...state.scopeList,
          loading: false,
          loaded: true,
          fileConfigurationId: action.fileConfigurationId,
          data: action.data,
        },
      } as IRouteState;
    }
    case RouteActionTypes.ScopeFetchFailed: {
      return {
        ...state,
        scopeList: {
          ...state.scopeList,
          loading: false,
          loaded: false,
          fileConfigurationId: 0,
          data: [],
        },
      } as IRouteState;
    }

    case RouteActionTypes.GetRouteHistory: {
      return {
        ...state,
        routeHistoryList: {
          ...state.routeHistoryList,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRouteHistorySuccess: {
      return {
        ...state,
        routeHistoryList: {
          ...state.routeHistoryList,
          loading: false,
          Visible: true,
          data: action.data,
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRouteHistoryFailed: {
      return {
        ...state,
        routeHistoryList: {
          ...state.routeHistoryList,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRouteHistoryModal: {
      return {
        ...state,
        routeHistoryList: {
          ...state.routeHistoryList,
          Visible: action.Visible,
        },
      } as IRouteState;
    }

    case RouteActionTypes.GetRouteHistoryBA: {
      return {
        ...state,
        routeHistoryBA: {
          ...state.routeHistoryBA,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRouteHistoryBASuccess: {
      return {
        ...state,
        routeHistoryBA: {
          ...state.routeHistoryBA,
          loading: false,
          Visible: true,
          data: action.data,
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRouteHistoryBAFailed: {
      return {
        ...state,
        routeHistoryBA: {
          ...state.routeHistoryBA,
          loading: false,
          Visible: false,
          data: {},
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRouteHistoryBAModal: {
      return {
        ...state,
        routeHistoryBA: {
          ...state.routeHistoryBA,
          routeState: 0,
          item: {},
          Visible: action.Visible,
        },
      } as IRouteState;
    }

    case RouteActionTypes.GetRoutePushHistory: {
      return {
        ...state,
        routePushHistoryList: {
          ...state.routePushHistoryList,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRoutePushHistorySuccess: {
      return {
        ...state,
        routePushHistoryList: {
          ...state.routePushHistoryList,
          loading: false,
          Visible: true,
          data: action.data,
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRoutePushHistoryFailed: {
      return {
        ...state,
        routePushHistoryList: {
          ...state.routePushHistoryList,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.GetRoutePushHistoryModal: {
      return {
        ...state,
        routePushHistoryList: {
          ...state.routePushHistoryList,
          Visible: action.Visible,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RouteCreate: {
      return {
        ...state,
        routeCreate: {
          ...state.routeCreate,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteCreateSuccess: {
      return {
        ...state,
        routeCreate: {
          ...state.routeCreate,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteCreateFailed: {
      return {
        ...state,
        routeCreate: {
          ...state.routeCreate,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteCreateModal: {
      return {
        ...state,
        routeCreate: {
          ...state.routeCreate,
          Visible: action.Visible,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RouteUpdate: {
      return {
        ...state,
        routeUpdate: {
          ...state.routeUpdate,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteUpdateSuccess: {
      return {
        ...state,
        routeUpdate: {
          ...state.routeUpdate,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteUpdateFailed: {
      return {
        ...state,
        routeUpdate: {
          ...state.routeUpdate,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteUpdateModal: {
      return {
        ...state,
        routeUpdate: {
          ...state.routeUpdate,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RouteRemove: {
      return {
        ...state,
        routeRemove: {
          ...state.routeRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteCopy: {
      return {
        ...state,
        routeCopy: {
          ...state.routeCopy,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteRemoveSuccess: {
      return {
        ...state,
        routeRemove: {
          ...state.routeRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteRemoveFailed: {
      return {
        ...state,
        routeRemove: {
          ...state.routeRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteRemoveModal: {
      return {
        ...state,
        routeRemove: {
          ...state.routeRemove,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RouteCopyModal: {
      return {
        ...state,
        routeCopy: {
          ...state.routeCopy,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUpstreamHttpMethodRouteKey: {
      return {
        ...state,
        upstreamHttpMethodRouteKeyAdd: {
          ...state.upstreamHttpMethodRouteKeyAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUpstreamHttpMethodRouteKeySuccess: {
      return {
        ...state,
        upstreamHttpMethodRouteKeyAdd: {
          ...state.upstreamHttpMethodRouteKeyAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUpstreamHttpMethodRouteKeyFailed: {
      return {
        ...state,
        upstreamHttpMethodRouteKeyAdd: {
          ...state.upstreamHttpMethodRouteKeyAdd,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveUpstreamHttpMethodRouteKey: {
      return {
        ...state,
        upstreamHttpMethodRouteKeyRemove: {
          ...state.upstreamHttpMethodRouteKeyRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveUpstreamHttpMethodRouteKeySuccess: {
      return {
        ...state,
        upstreamHttpMethodRouteKeyRemove: {
          ...state.upstreamHttpMethodRouteKeyRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveUpstreamHttpMethodRouteKeyFailed: {
      return {
        ...state,
        upstreamHttpMethodRouteKeyRemove: {
          ...state.upstreamHttpMethodRouteKeyRemove,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.SetFileCacheOptions: {
      return {
        ...state,
        fileCacheOptionsSet: {
          ...state.fileCacheOptionsSet,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetFileCacheOptionsSuccess: {
      return {
        ...state,
        fileCacheOptionsSet: {
          ...state.fileCacheOptionsSet,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetFileCacheOptionsFailed: {
      return {
        ...state,
        fileCacheOptionsSet: {
          ...state.fileCacheOptionsSet,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetFileCacheOptionsModal: {
      return {
        ...state,
        fileCacheOptionsSet: {
          ...state.fileCacheOptionsSet,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.SetQoSOptions: {
      return {
        ...state,
        qoSOptionsSet: {
          ...state.qoSOptionsSet,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetQoSOptionsSuccess: {
      return {
        ...state,
        qoSOptionsSet: {
          ...state.qoSOptionsSet,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetQoSOptionsFailed: {
      return {
        ...state,
        qoSOptionsSet: {
          ...state.qoSOptionsSet,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetQoSOptionsModal: {
      return {
        ...state,
        qoSOptionsSet: {
          ...state.qoSOptionsSet,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.SetLoadBalancerOptions: {
      return {
        ...state,
        loadBalancerOptionsSet: {
          ...state.loadBalancerOptionsSet,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetLoadBalancerOptionsSuccess: {
      return {
        ...state,
        loadBalancerOptionsSet: {
          ...state.loadBalancerOptionsSet,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetLoadBalancerOptionsFailed: {
      return {
        ...state,
        loadBalancerOptionsSet: {
          ...state.loadBalancerOptionsSet,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetLoadBalancerOptionsModal: {
      return {
        ...state,
        loadBalancerOptionsSet: {
          ...state.loadBalancerOptionsSet,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddUserPass: {
      return {
        ...state,
        userPassAdd: {
          ...state.userPassAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUserPassSuccess: {
      return {
        ...state,
        userPassAdd: {
          ...state.userPassAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUserPassFailed: {
      return {
        ...state,
        userPassAdd: {
          ...state.userPassAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUserPassModal: {
      return {
        ...state,
        userPassAdd: {
          ...state.userPassAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveUserPass: {
      return {
        ...state,
        userPassRemove: {
          ...state.userPassRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveUserPassSuccess: {
      return {
        ...state,
        userPassRemove: {
          ...state.userPassRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveUserPassFailed: {
      return {
        ...state,
        userPassRemove: {
          ...state.userPassRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveUserPassModal: {
      return {
        ...state,
        userPassRemove: {
          ...state.userPassRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddRateLimitRule: {
      return {
        ...state,
        rateLimitRuleAdd: {
          ...state.rateLimitRuleAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddRateLimitRuleSuccess: {
      return {
        ...state,
        rateLimitRuleAdd: {
          ...state.rateLimitRuleAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddRateLimitRuleFailed: {
      return {
        ...state,
        rateLimitRuleAdd: {
          ...state.rateLimitRuleAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddRateLimitRuleModal: {
      return {
        ...state,
        rateLimitRuleAdd: {
          ...state.rateLimitRuleAdd,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.UpdateRateLimitRule: {
      return {
        ...state,
        rateLimitRuleUpdate: {
          ...state.rateLimitRuleUpdate,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.UpdateRateLimitRuleSuccess: {
      return {
        ...state,
        rateLimitRuleUpdate: {
          ...state.rateLimitRuleUpdate,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.UpdateRateLimitRuleFailed: {
      return {
        ...state,
        rateLimitRuleUpdate: {
          ...state.rateLimitRuleUpdate,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.UpdateRateLimitRuleModal: {
      return {
        ...state,
        rateLimitRuleUpdate: {
          ...state.rateLimitRuleUpdate,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveRateLimitRule: {
      return {
        ...state,
        rateLimitRuleRemove: {
          ...state.rateLimitRuleRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveRateLimitRuleSuccess: {
      return {
        ...state,
        rateLimitRuleRemove: {
          ...state.rateLimitRuleRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveRateLimitRuleFailed: {
      return {
        ...state,
        rateLimitRuleRemove: {
          ...state.rateLimitRuleRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveRateLimitRuleModal: {
      return {
        ...state,
        rateLimitRuleRemove: {
          ...state.rateLimitRuleRemove,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.ClientWhiteModal: {
      return {
        ...state,
        clientWhiteModal: {
          ...state.clientWhiteModal,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddClientWhite: {
      return {
        ...state,
        clientWhiteAdd: {
          ...state.clientWhiteAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddClientWhiteSuccess: {
      return {
        ...state,
        clientWhiteAdd: {
          ...state.clientWhiteAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddClientWhiteFailed: {
      return {
        ...state,
        clientWhiteAdd: {
          ...state.clientWhiteAdd,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveClientWhite: {
      return {
        ...state,
        clientWhiteRemove: {
          ...state.clientWhiteRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveClientWhiteSuccess: {
      return {
        ...state,
        clientWhiteRemove: {
          ...state.clientWhiteRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveClientWhiteFailed: {
      return {
        ...state,
        clientWhiteRemove: {
          ...state.clientWhiteRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveClientWhiteModal: {
      return {
        ...state,
        clientWhiteRemove: {
          ...state.clientWhiteRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.SetAuthenticationOptions: {
      return {
        ...state,
        authenticationOptionsSet: {
          ...state.authenticationOptionsSet,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetAuthenticationOptionsSuccess: {
      return {
        ...state,
        authenticationOptionsSet: {
          ...state.authenticationOptionsSet,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetAuthenticationOptionsFailed: {
      return {
        ...state,
        authenticationOptionsSet: {
          ...state.authenticationOptionsSet,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetAuthenticationOptionsModal: {
      return {
        ...state,
        authenticationOptionsSet: {
          ...state.authenticationOptionsSet,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddAllowedScope: {
      return {
        ...state,
        allowedScopeAdd: {
          ...state.allowedScopeAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAllowedScopeSuccess: {
      return {
        ...state,
        allowedScopeAdd: {
          ...state.allowedScopeAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAllowedScopeFailed: {
      return {
        ...state,
        allowedScopeAdd: {
          ...state.allowedScopeAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddHelp: {
      return {
        ...state,
        allowedhelpAdd: {
          ...state.allowedhelpAdd,
          loading: true,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddHelpSuccess: {
      return {
        ...state,
        allowedhelpAdd: {
          ...state.allowedhelpAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddHelpFailed: {
      return {
        ...state,
        allowedhelpAdd: {
          ...state.allowedhelpAdd,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveAllowedScope: {
      return {
        ...state,
        allowedScopeRemove: {
          ...state.allowedScopeRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAllowedScopeSuccess: {
      return {
        ...state,
        allowedScopeRemove: {
          ...state.allowedScopeRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAllowedScopeFailed: {
      return {
        ...state,
        allowedScopeRemove: {
          ...state.allowedScopeRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAllowedScopeModal: {
      return {
        ...state,
        allowedScopeRemove: {
          ...state.allowedScopeRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.SetHttpHandlerOptions: {
      return {
        ...state,
        httpHandlerOptionsSet: {
          ...state.httpHandlerOptionsSet,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetHttpHandlerOptionsSuccess: {
      return {
        ...state,
        httpHandlerOptionsSet: {
          ...state.httpHandlerOptionsSet,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetHttpHandlerOptionsFailed: {
      return {
        ...state,
        httpHandlerOptionsSet: {
          ...state.httpHandlerOptionsSet,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetHttpHandlerOptionsModal: {
      return {
        ...state,
        httpHandlerOptionsSet: {
          ...state.httpHandlerOptionsSet,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.SetPreAuthenticationParty: {
      return {
        ...state,
        preAuthenticationPartySet: {
          ...state.preAuthenticationPartySet,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetPreAuthenticationPartySuccess: {
      return {
        ...state,
        preAuthenticationPartySet: {
          ...state.preAuthenticationPartySet,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetPreAuthenticationPartyFailed: {
      return {
        ...state,
        preAuthenticationPartySet: {
          ...state.preAuthenticationPartySet,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetPreAuthenticationPartyModal: {
      return {
        ...state,
        preAuthenticationPartySet: {
          ...state.preAuthenticationPartySet,
          Visible: action.Visible,
          item: action.item,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddPreAuthenticationPartyBody: {
      return {
        ...state,
        preAuthenticationPartyBodyAdd: {
          ...state.preAuthenticationPartyBodyAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddPreAuthenticationPartyBodySuccess: {
      return {
        ...state,
        preAuthenticationPartyBodyAdd: {
          ...state.preAuthenticationPartyBodyAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddPreAuthenticationPartyBodyFailed: {
      return {
        ...state,
        preAuthenticationPartyBodyAdd: {
          ...state.preAuthenticationPartyBodyAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddPreAuthenticationPartyBodyModal: {
      return {
        ...state,
        preAuthenticationPartyBodyAdd: {
          ...state.preAuthenticationPartyBodyAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemovePreAuthenticationPartyBody: {
      return {
        ...state,
        preAuthenticationPartyBodyRemove: {
          ...state.preAuthenticationPartyBodyRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemovePreAuthenticationPartyBodySuccess: {
      return {
        ...state,
        preAuthenticationPartyBodyRemove: {
          ...state.preAuthenticationPartyBodyRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemovePreAuthenticationPartyBodyFailed: {
      return {
        ...state,
        preAuthenticationPartyBodyRemove: {
          ...state.preAuthenticationPartyBodyRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemovePreAuthenticationPartyBodyModal: {
      return {
        ...state,
        preAuthenticationPartyBodyRemove: {
          ...state.preAuthenticationPartyBodyRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddPreAuthenticationPartyHeader: {
      return {
        ...state,
        preAuthenticationPartyHeaderAdd: {
          ...state.preAuthenticationPartyHeaderAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddPreAuthenticationPartyHeaderSuccess: {
      return {
        ...state,
        preAuthenticationPartyHeaderAdd: {
          ...state.preAuthenticationPartyHeaderAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddPreAuthenticationPartyHeaderFailed: {
      return {
        ...state,
        preAuthenticationPartyHeaderAdd: {
          ...state.preAuthenticationPartyHeaderAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddPreAuthenticationPartyHeaderModal: {
      return {
        ...state,
        preAuthenticationPartyHeaderAdd: {
          ...state.preAuthenticationPartyHeaderAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemovePreAuthenticationPartyHeader: {
      return {
        ...state,
        preAuthenticationPartyHeaderRemove: {
          ...state.preAuthenticationPartyHeaderRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemovePreAuthenticationPartyHeaderSuccess: {
      return {
        ...state,
        preAuthenticationPartyHeaderRemove: {
          ...state.preAuthenticationPartyHeaderRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemovePreAuthenticationPartyHeaderFailed: {
      return {
        ...state,
        preAuthenticationPartyHeaderRemove: {
          ...state.preAuthenticationPartyHeaderRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemovePreAuthenticationPartyHeaderModal: {
      return {
        ...state,
        preAuthenticationPartyHeaderRemove: {
          ...state.preAuthenticationPartyHeaderRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddDelegatingHandler: {
      return {
        ...state,
        delegatingHandlerAdd: {
          ...state.delegatingHandlerAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddDelegatingHandlerSuccess: {
      return {
        ...state,
        delegatingHandlerAdd: {
          ...state.delegatingHandlerAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddDelegatingHandlerFailed: {
      return {
        ...state,
        delegatingHandlerAdd: {
          ...state.delegatingHandlerAdd,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveDelegatingHandler: {
      return {
        ...state,
        delegatingHandlerRemove: {
          ...state.delegatingHandlerRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveDelegatingHandlerSuccess: {
      return {
        ...state,
        delegatingHandlerRemove: {
          ...state.delegatingHandlerRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveDelegatingHandlerFailed: {
      return {
        ...state,
        delegatingHandlerRemove: {
          ...state.delegatingHandlerRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveDelegatingHandlerModal: {
      return {
        ...state,
        delegatingHandlerRemove: {
          ...state.delegatingHandlerRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddIPAllowed: {
      return {
        ...state,
        iPAllowedAdd: {
          ...state.iPAllowedAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddIPAllowedSuccess: {
      return {
        ...state,
        iPAllowedAdd: {
          ...state.iPAllowedAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddIPAllowedFailed: {
      return {
        ...state,
        iPAllowedAdd: {
          ...state.iPAllowedAdd,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveIPAllowed: {
      return {
        ...state,
        iPAllowedRemove: {
          ...state.iPAllowedRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveIPAllowedSuccess: {
      return {
        ...state,
        iPAllowedRemove: {
          ...state.iPAllowedRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveIPAllowedFailed: {
      return {
        ...state,
        iPAllowedRemove: {
          ...state.iPAllowedRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveIPAllowedModal: {
      return {
        ...state,
        iPAllowedRemove: {
          ...state.iPAllowedRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddIPBlocked: {
      return {
        ...state,
        iPBlockedAdd: {
          ...state.iPBlockedAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddIPBlockedSuccess: {
      return {
        ...state,
        iPBlockedAdd: {
          ...state.iPBlockedAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddIPBlockedFailed: {
      return {
        ...state,
        iPBlockedAdd: {
          ...state.iPBlockedAdd,
          loading: false,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveIPBlocked: {
      return {
        ...state,
        iPBlockedRemove: {
          ...state.iPBlockedRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveIPBlockedSuccess: {
      return {
        ...state,
        iPBlockedRemove: {
          ...state.iPBlockedRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveIPBlockedFailed: {
      return {
        ...state,
        iPBlockedRemove: {
          ...state.iPBlockedRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveIPBlockedModal: {
      return {
        ...state,
        iPBlockedRemove: {
          ...state.iPBlockedRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.SetRouteUserNameAndPassword: {
      return {
        ...state,
        routeUserNameAndPasswordSet: {
          ...state.routeUserNameAndPasswordSet,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetRouteUserNameAndPasswordSuccess: {
      return {
        ...state,
        routeUserNameAndPasswordSet: {
          ...state.routeUserNameAndPasswordSet,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetRouteUserNameAndPasswordFailed: {
      return {
        ...state,
        routeUserNameAndPasswordSet: {
          ...state.routeUserNameAndPasswordSet,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.SetRouteUserNameAndPasswordModal: {
      return {
        ...state,
        routeUserNameAndPasswordSet: {
          ...state.routeUserNameAndPasswordSet,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddHostAndPort: {
      return {
        ...state,
        hostAndPortAdd: {
          ...state.hostAndPortAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddHostAndPortSuccess: {
      return {
        ...state,
        hostAndPortAdd: {
          ...state.hostAndPortAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddHostAndPortFailed: {
      return {
        ...state,
        hostAndPortAdd: {
          ...state.hostAndPortAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddHostAndPortModal: {
      return {
        ...state,
        hostAndPortAdd: {
          ...state.hostAndPortAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveHostAndPort: {
      return {
        ...state,
        hostAndPortRemove: {
          ...state.hostAndPortRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveHostAndPortSuccess: {
      return {
        ...state,
        hostAndPortRemove: {
          ...state.hostAndPortRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveHostAndPortFailed: {
      return {
        ...state,
        hostAndPortRemove: {
          ...state.hostAndPortRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveHostAndPortModal: {
      return {
        ...state,
        hostAndPortRemove: {
          ...state.hostAndPortRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddAddHeadersToRequest: {
      return {
        ...state,
        addHeadersToRequestAdd: {
          ...state.addHeadersToRequestAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddHeadersToRequestSuccess: {
      return {
        ...state,
        addHeadersToRequestAdd: {
          ...state.addHeadersToRequestAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddHeadersToRequestFailed: {
      return {
        ...state,
        addHeadersToRequestAdd: {
          ...state.addHeadersToRequestAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddHeadersToRequestModal: {
      return {
        ...state,
        addHeadersToRequestAdd: {
          ...state.addHeadersToRequestAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveAddHeadersToRequest: {
      return {
        ...state,
        addHeadersToRequestRemove: {
          ...state.addHeadersToRequestRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddHeadersToRequestSuccess: {
      return {
        ...state,
        addHeadersToRequestRemove: {
          ...state.addHeadersToRequestRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddHeadersToRequestFailed: {
      return {
        ...state,
        addHeadersToRequestRemove: {
          ...state.addHeadersToRequestRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddHeadersToRequestModal: {
      return {
        ...state,
        addHeadersToRequestRemove: {
          ...state.addHeadersToRequestRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddUpstreamHeaderTransform: {
      return {
        ...state,
        upstreamHeaderTransformAdd: {
          ...state.upstreamHeaderTransformAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUpstreamHeaderTransformSuccess: {
      return {
        ...state,
        upstreamHeaderTransformAdd: {
          ...state.upstreamHeaderTransformAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUpstreamHeaderTransformFailed: {
      return {
        ...state,
        upstreamHeaderTransformAdd: {
          ...state.upstreamHeaderTransformAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddUpstreamHeaderTransformModal: {
      return {
        ...state,
        upstreamHeaderTransformAdd: {
          ...state.upstreamHeaderTransformAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveUpstreamHeaderTransform: {
      return {
        ...state,
        upstreamHeaderTransformRemove: {
          ...state.upstreamHeaderTransformRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveUpstreamHeaderTransformSuccess: {
      return {
        ...state,
        upstreamHeaderTransformRemove: {
          ...state.upstreamHeaderTransformRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveUpstreamHeaderTransformFailed: {
      return {
        ...state,
        upstreamHeaderTransformRemove: {
          ...state.upstreamHeaderTransformRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveUpstreamHeaderTransformModal: {
      return {
        ...state,
        upstreamHeaderTransformRemove: {
          ...state.upstreamHeaderTransformRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddDownstreamHeaderTransform: {
      return {
        ...state,
        downstreamHeaderTransformAdd: {
          ...state.downstreamHeaderTransformAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddDownstreamHeaderTransformSuccess: {
      return {
        ...state,
        downstreamHeaderTransformAdd: {
          ...state.downstreamHeaderTransformAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddDownstreamHeaderTransformFailed: {
      return {
        ...state,
        downstreamHeaderTransformAdd: {
          ...state.downstreamHeaderTransformAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddDownstreamHeaderTransformModal: {
      return {
        ...state,
        downstreamHeaderTransformAdd: {
          ...state.downstreamHeaderTransformAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveDownstreamHeaderTransform: {
      return {
        ...state,
        downstreamHeaderTransformRemove: {
          ...state.downstreamHeaderTransformRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveDownstreamHeaderTransformSuccess: {
      return {
        ...state,
        downstreamHeaderTransformRemove: {
          ...state.downstreamHeaderTransformRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveDownstreamHeaderTransformFailed: {
      return {
        ...state,
        downstreamHeaderTransformRemove: {
          ...state.downstreamHeaderTransformRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveDownstreamHeaderTransformModal: {
      return {
        ...state,
        downstreamHeaderTransformRemove: {
          ...state.downstreamHeaderTransformRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddAddClaimsToRequest: {
      return {
        ...state,
        addClaimsToRequestAdd: {
          ...state.addClaimsToRequestAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddClaimsToRequestSuccess: {
      return {
        ...state,
        addClaimsToRequestAdd: {
          ...state.addClaimsToRequestAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddClaimsToRequestFailed: {
      return {
        ...state,
        addClaimsToRequestAdd: {
          ...state.addClaimsToRequestAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddClaimsToRequestModal: {
      return {
        ...state,
        addClaimsToRequestAdd: {
          ...state.addClaimsToRequestAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveAddClaimsToRequest: {
      return {
        ...state,
        addClaimsToRequestRemove: {
          ...state.addClaimsToRequestRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddClaimsToRequestSuccess: {
      return {
        ...state,
        addClaimsToRequestRemove: {
          ...state.addClaimsToRequestRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddClaimsToRequestFailed: {
      return {
        ...state,
        addClaimsToRequestRemove: {
          ...state.addClaimsToRequestRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddClaimsToRequestModal: {
      return {
        ...state,
        addClaimsToRequestRemove: {
          ...state.addClaimsToRequestRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddRouteClaimsRequirement: {
      return {
        ...state,
        routeClaimsRequirementAdd: {
          ...state.routeClaimsRequirementAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddRouteClaimsRequirementSuccess: {
      return {
        ...state,
        routeClaimsRequirementAdd: {
          ...state.routeClaimsRequirementAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddRouteClaimsRequirementFailed: {
      return {
        ...state,
        routeClaimsRequirementAdd: {
          ...state.routeClaimsRequirementAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddRouteClaimsRequirementModal: {
      return {
        ...state,
        routeClaimsRequirementAdd: {
          ...state.routeClaimsRequirementAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveRouteClaimsRequirement: {
      return {
        ...state,
        routeClaimsRequirementRemove: {
          ...state.routeClaimsRequirementRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveRouteClaimsRequirementSuccess: {
      return {
        ...state,
        routeClaimsRequirementRemove: {
          ...state.routeClaimsRequirementRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveRouteClaimsRequirementFailed: {
      return {
        ...state,
        routeClaimsRequirementRemove: {
          ...state.routeClaimsRequirementRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveRouteClaimsRequirementModal: {
      return {
        ...state,
        routeClaimsRequirementRemove: {
          ...state.routeClaimsRequirementRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddAddQueriesToRequest: {
      return {
        ...state,
        addQueriesToRequestAdd: {
          ...state.addQueriesToRequestAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddQueriesToRequestSuccess: {
      return {
        ...state,
        addQueriesToRequestAdd: {
          ...state.addQueriesToRequestAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddQueriesToRequestFailed: {
      return {
        ...state,
        addQueriesToRequestAdd: {
          ...state.addQueriesToRequestAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddAddQueriesToRequestModal: {
      return {
        ...state,
        addQueriesToRequestAdd: {
          ...state.addQueriesToRequestAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveAddQueriesToRequest: {
      return {
        ...state,
        addQueriesToRequestRemove: {
          ...state.addQueriesToRequestRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddQueriesToRequestSuccess: {
      return {
        ...state,
        addQueriesToRequestRemove: {
          ...state.addQueriesToRequestRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddQueriesToRequestFailed: {
      return {
        ...state,
        addQueriesToRequestRemove: {
          ...state.addQueriesToRequestRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveAddQueriesToRequestModal: {
      return {
        ...state,
        addQueriesToRequestRemove: {
          ...state.addQueriesToRequestRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.AddChangeDownstreamPathTemplate: {
      return {
        ...state,
        changeDownstreamPathTemplateAdd: {
          ...state.changeDownstreamPathTemplateAdd,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddChangeDownstreamPathTemplateSuccess: {
      return {
        ...state,
        changeDownstreamPathTemplateAdd: {
          ...state.changeDownstreamPathTemplateAdd,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddChangeDownstreamPathTemplateFailed: {
      return {
        ...state,
        changeDownstreamPathTemplateAdd: {
          ...state.changeDownstreamPathTemplateAdd,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.AddChangeDownstreamPathTemplateModal: {
      return {
        ...state,
        changeDownstreamPathTemplateAdd: {
          ...state.changeDownstreamPathTemplateAdd,
          Visible: action.Visible,
          fileConfigurationId: action.fileConfigurationId,
          fileRouteId: action.fileRouteId,
        },
      } as IRouteState;
    }

    case RouteActionTypes.RemoveChangeDownstreamPathTemplate: {
      return {
        ...state,
        changeDownstreamPathTemplateRemove: {
          ...state.changeDownstreamPathTemplateRemove,
          loading: true,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveChangeDownstreamPathTemplateSuccess: {
      return {
        ...state,
        changeDownstreamPathTemplateRemove: {
          ...state.changeDownstreamPathTemplateRemove,
          loading: false,
          Visible: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveChangeDownstreamPathTemplateFailed: {
      return {
        ...state,
        changeDownstreamPathTemplateRemove: {
          ...state.changeDownstreamPathTemplateRemove,
          loading: false,
        },
      } as IRouteState;
    }
    case RouteActionTypes.RemoveChangeDownstreamPathTemplateModal: {
      return {
        ...state,
        changeDownstreamPathTemplateRemove: {
          ...state.changeDownstreamPathTemplateRemove,
          Visible: action.Visible,
          item: action.item,
        },
      } as IRouteState;
    }

    case RouteActionTypes.Base64Modal: {
      return {
        ...state,
        base64: {
          ...state.base64,
          Visible: action.Visible,
        },
      } as IRouteState;
    }

    case RouteActionTypes.PushAlert: {
      return {
        ...state,
        alerts: [...state.alerts, action.alert],
      } as IRouteState;
    }
    case RouteActionTypes.ClearAlerts: {
      return {
        ...state,
        alerts: [],
      } as IRouteState;
    }
  }
  return state;
};
