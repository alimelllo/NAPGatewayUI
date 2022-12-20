import { Action } from "redux";
import { GlobalConfigurationActionTypes } from "./actionType";

export interface IGlobalConfigurationState {
  globalConfigurationList: {
    loading: boolean;
    data: any[];
  },
  routePushHistoryList: {
    loading: boolean;
    Visible: boolean;
    data: any[];
  },
  globalConfigurationCreate: {
    loading: boolean;
    Visible: boolean;
  },
  globalConfigurationUpdate: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  globalConfigurationRemove: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  routesPushHistoryAdd: {
    loading: boolean;
  },
  serviceDiscoveryProviderSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  qoSOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  loadBalancerOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  rateLimitOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  httpHandlerOptionsSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  jsonData: {
    loading: boolean;
    loaded: boolean;
    url: string;
    token: string;
    data: any;
    fileConfigurationId: number;
    fileGlobalConfigurationId: number;
  },
  jsonPost: {
    loading: boolean;
    Visible: boolean;
  },
  test: {
    loading: boolean;
  },
  alerts: any[]
}

interface IGlobalConfigurationFetch extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationFetch;
}
interface IGlobalConfigurationFetchSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationFetchSuccess;
  data: any
}
interface IGlobalConfigurationFetchFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationFetchFailed;
}

interface IGetRoutePushHistory extends Action<string> {
  type: GlobalConfigurationActionTypes.GetRoutePushHistory;
}
interface IGetRoutePushHistorySuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.GetRoutePushHistorySuccess;
  data: any
}
interface IGetRoutePushHistoryFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.GetRoutePushHistoryFailed;
}
interface IGetRoutePushHistoryModal extends Action<string> {
  type: GlobalConfigurationActionTypes.GetRoutePushHistoryModal;
  Visible: boolean;
}

interface IGlobalConfigurationCreate extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationCreate;
}
interface IGlobalConfigurationCreateSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationCreateSuccess;
}
interface IGlobalConfigurationCreateFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationCreateFailed;
}
interface IGlobalConfigurationCreateModal extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationCreateModal;
  Visible: boolean;
}

interface IGlobalConfigurationUpdate extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationUpdate;
}
interface IGlobalConfigurationUpdateSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationUpdateSuccess;
}
interface IGlobalConfigurationUpdateFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationUpdateFailed;
}
interface IGlobalConfigurationUpdateModal extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationUpdateModal;
  Visible: boolean;
  item: any;
}

interface IAddRoutesPushHistory extends Action<string> {
  type: GlobalConfigurationActionTypes.AddRoutesPushHistory;
}
interface IAddRoutesPushHistorySuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.AddRoutesPushHistorySuccess;
}
interface IAddRoutesPushHistoryFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.AddRoutesPushHistoryFailed;
}

interface IGlobalConfigurationRemove extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationRemove;
}
interface IGlobalConfigurationRemoveSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationRemoveSuccess;
}
interface IGlobalConfigurationRemoveFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationRemoveFailed;
}
interface IGlobalConfigurationRemoveModal extends Action<string> {
  type: GlobalConfigurationActionTypes.GlobalConfigurationRemoveModal;
  Visible: boolean;
  item: any;
}

interface ISetServiceDiscoveryProvider extends Action<string> {
  type: GlobalConfigurationActionTypes.SetServiceDiscoveryProvider;
}
interface ISetServiceDiscoveryProviderSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.SetServiceDiscoveryProviderSuccess;
}
interface ISetServiceDiscoveryProviderFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.SetServiceDiscoveryProviderFailed;
}
interface ISetServiceDiscoveryProviderModal extends Action<string> {
  type: GlobalConfigurationActionTypes.SetServiceDiscoveryProviderModal;
  Visible: boolean;
  item: any;
}

interface ISetQoSOptions extends Action<string> {
  type: GlobalConfigurationActionTypes.SetQoSOptions;
}
interface ISetQoSOptionsSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.SetQoSOptionsSuccess;
}
interface ISetQoSOptionsFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.SetQoSOptionsFailed;
}
interface ISetQoSOptionsModal extends Action<string> {
  type: GlobalConfigurationActionTypes.SetQoSOptionsModal;
  Visible: boolean;
  item: any;
}

interface ISetLoadBalancerOptions extends Action<string> {
  type: GlobalConfigurationActionTypes.SetLoadBalancerOptions;
}
interface ISetLoadBalancerOptionsSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.SetLoadBalancerOptionsSuccess;
}
interface ISetLoadBalancerOptionsFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.SetLoadBalancerOptionsFailed;
}
interface ISetLoadBalancerOptionsModal extends Action<string> {
  type: GlobalConfigurationActionTypes.SetLoadBalancerOptionsModal;
  Visible: boolean;
  item: any;
}

interface ISetRateLimitOptions extends Action<string> {
  type: GlobalConfigurationActionTypes.SetRateLimitOptions;
}
interface ISetRateLimitOptionsSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.SetRateLimitOptionsSuccess;
}
interface ISetRateLimitOptionsFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.SetRateLimitOptionsFailed;
}
interface ISetRateLimitOptionsModal extends Action<string> {
  type: GlobalConfigurationActionTypes.SetRateLimitOptionsModal;
  Visible: boolean;
  item: any;
}

interface ISetHttpHandlerOptions extends Action<string> {
  type: GlobalConfigurationActionTypes.SetHttpHandlerOptions;
}
interface ISetHttpHandlerOptionsSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.SetHttpHandlerOptionsSuccess;
}
interface ISetHttpHandlerOptionsFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.SetHttpHandlerOptionsFailed;
}
interface ISetHttpHandlerOptionsModal extends Action<string> {
  type: GlobalConfigurationActionTypes.SetHttpHandlerOptionsModal;
  Visible: boolean;
  item: any;
}

interface IJsonDataFetch extends Action<string> {
  type: GlobalConfigurationActionTypes.JsonDataFetch;
}
interface IJsonDataFetchSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.JsonDataFetchSuccess;
  url:string
  token: string;
  data: any;
  fileConfigurationId: number;
  fileGlobalConfigurationId: number;
}
interface IJsonDataFetchFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.JsonDataFetchFailed;
}

interface IPostJson extends Action<string> {
  type: GlobalConfigurationActionTypes.PostJson;
}
interface IPostJsonSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.PostJsonSuccess;
}
interface IPostJsonFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.PostJsonFailed;
}
interface IPostJsonModal extends Action<string> {
  type: GlobalConfigurationActionTypes.PostJsonModal;
  Visible: boolean;
}

interface ISendTest extends Action<string> {
  type: GlobalConfigurationActionTypes.SendTest;
}
interface ISendTestSuccess extends Action<string> {
  type: GlobalConfigurationActionTypes.SendTestSuccess;
}
interface ISendTestFailed extends Action<string> {
  type: GlobalConfigurationActionTypes.SendTestFailed;
}

interface IPushAlert extends Action<string> {
  type: GlobalConfigurationActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: GlobalConfigurationActionTypes.ClearAlerts;
}

export type KnownAction =
  | IGlobalConfigurationFetch
  | IGlobalConfigurationFetchSuccess
  | IGlobalConfigurationFetchFailed
  | IGetRoutePushHistory
  | IGetRoutePushHistorySuccess
  | IGetRoutePushHistoryFailed
  | IGetRoutePushHistoryModal
  | IGlobalConfigurationCreate
  | IGlobalConfigurationCreateSuccess
  | IGlobalConfigurationCreateFailed
  | IGlobalConfigurationCreateModal
  | IGlobalConfigurationUpdate
  | IGlobalConfigurationUpdateSuccess
  | IGlobalConfigurationUpdateFailed
  | IGlobalConfigurationUpdateModal
  | IGlobalConfigurationRemove
  | IGlobalConfigurationRemoveSuccess
  | IGlobalConfigurationRemoveFailed
  | IGlobalConfigurationRemoveModal
  | IAddRoutesPushHistory
  | IAddRoutesPushHistorySuccess
  | IAddRoutesPushHistoryFailed
  | ISetServiceDiscoveryProvider
  | ISetServiceDiscoveryProviderSuccess
  | ISetServiceDiscoveryProviderFailed
  | ISetServiceDiscoveryProviderModal
  | ISetQoSOptions
  | ISetQoSOptionsSuccess
  | ISetQoSOptionsFailed
  | ISetQoSOptionsModal
  | ISetLoadBalancerOptions
  | ISetLoadBalancerOptionsSuccess
  | ISetLoadBalancerOptionsFailed
  | ISetLoadBalancerOptionsModal
  | ISetRateLimitOptions
  | ISetRateLimitOptionsSuccess
  | ISetRateLimitOptionsFailed
  | ISetRateLimitOptionsModal
  | ISetHttpHandlerOptions
  | ISetHttpHandlerOptionsSuccess
  | ISetHttpHandlerOptionsFailed
  | ISetHttpHandlerOptionsModal
  | IJsonDataFetch
  | IJsonDataFetchSuccess
  | IJsonDataFetchFailed
  | IPostJson
  | IPostJsonSuccess
  | IPostJsonFailed
  | IPostJsonModal
  | ISendTest
  | ISendTestSuccess
  | ISendTestFailed
  | IPushAlert
  | IClearAlerts;
