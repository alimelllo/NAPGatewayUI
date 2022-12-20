import { Action } from "redux";
import { FileConfigurationRouteStateActionTypes } from "./actionType";

export interface IFileConfigurationRouteStateState {
  fileConfigurationList: {
    loading: boolean;
    data: string[];
  },
  routeStateList: {
    loading: boolean;
    data: string[];
  },
  routeManagerAcceptedSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  routeAcceptedSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  routeIgnoredSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  routeToLastStateSet: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  routeBA: {
    loading: boolean;
    Visible: boolean;
    managerAccept: boolean;
    routeState: number;
    item: any;
    data: any;
  },
  alerts: any[]
}

interface IFileConfigurationFetch extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.FileConfigurationFetch;
}
interface IFileConfigurationFetchSuccess extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.FileConfigurationFetchSuccess;
  data: any
}
interface IFileConfigurationFetchFailed extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.FileConfigurationFetchFailed;
}

interface IRouteStateFetch extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.RouteStateFetch;
}
interface IRouteStateFetchSuccess extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.RouteStateFetchSuccess;
  data: any
}
interface IRouteStateFetchFailed extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.RouteStateFetchFailed;
}

interface ISetRouteManagerAccepted extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteManagerAccepted;
}
interface ISetRouteManagerAcceptedSuccess extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedSuccess;
}
interface ISetRouteManagerAcceptedFailed extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedFailed;
}
interface ISetRouteManagerAcceptedModal extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteManagerAcceptedModal;
  Visible: boolean;
  item: any;
}

interface ISetRouteAccepted extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteAccepted;
}
interface ISetRouteAcceptedSuccess extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteAcceptedSuccess;
}
interface ISetRouteAcceptedFailed extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteAcceptedFailed;
}
interface ISetRouteAcceptedModal extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteAcceptedModal;
  Visible: boolean;
  item: any;
}

interface ISetRouteIgnored extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteIgnored;
}
interface ISetRouteIgnoredSuccess extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteIgnoredSuccess;
}
interface ISetRouteIgnoredFailed extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteIgnoredFailed;
}
interface ISetRouteIgnoredModal extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteIgnoredModal;
  Visible: boolean;
  item: any;
}

interface ISetRouteToLastState extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteToLastState;
}
interface ISetRouteToLastStateSuccess extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteToLastStateSuccess;
}
interface ISetRouteToLastStateFailed extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteToLastStateFailed;
}
interface ISetRouteToLastStateModal extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.SetRouteToLastStateModal;
  Visible: boolean;
  item: any;
}

interface IGetRouteBA extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.GetRouteBA;
}
interface IGetRouteBASuccess extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.GetRouteBASuccess;
  managerAccept: boolean;
  routeState: number;
  item: any;
  data: any
}
interface IGetRouteBAFailed extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.GetRouteBAFailed;
}
interface IGetRouteBAModal extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.GetRouteBAModal;
  Visible: boolean
}

interface IPushAlert extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: FileConfigurationRouteStateActionTypes.ClearAlerts;
}

export type KnownAction =
  | IFileConfigurationFetch
  | IFileConfigurationFetchSuccess
  | IFileConfigurationFetchFailed
  | IRouteStateFetch
  | IRouteStateFetchSuccess
  | IRouteStateFetchFailed
  | ISetRouteManagerAccepted
  | ISetRouteManagerAcceptedSuccess
  | ISetRouteManagerAcceptedFailed
  | ISetRouteManagerAcceptedModal
  | ISetRouteAccepted
  | ISetRouteAcceptedSuccess
  | ISetRouteAcceptedFailed
  | ISetRouteAcceptedModal
  | ISetRouteIgnored
  | ISetRouteIgnoredSuccess
  | ISetRouteIgnoredFailed
  | ISetRouteIgnoredModal
  | ISetRouteToLastState
  | ISetRouteToLastStateSuccess
  | ISetRouteToLastStateFailed
  | ISetRouteToLastStateModal
  | IGetRouteBA
  | IGetRouteBASuccess
  | IGetRouteBAFailed
  | IGetRouteBAModal
  | IPushAlert
  | IClearAlerts;
