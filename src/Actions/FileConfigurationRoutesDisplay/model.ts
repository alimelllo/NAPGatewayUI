import { Action } from "redux";
import { FileConfigurationRoutesDisplayActionTypes } from "./actionType";

export interface IFileConfigurationRoutesDisplayState {
  routeList: {
    loading: boolean;
    data: string[];
  },
  alerts: any[]
}

interface IRouteFetch extends Action<string> {
  type: FileConfigurationRoutesDisplayActionTypes.RouteFetch;
}
interface IRouteFetchSuccess extends Action<string> {
  type: FileConfigurationRoutesDisplayActionTypes.RouteFetchSuccess;
  data: any
}
interface IRouteFetchFailed extends Action<string> {
  type: FileConfigurationRoutesDisplayActionTypes.RouteFetchFailed;
}

interface IPushAlert extends Action<string> {
  type: FileConfigurationRoutesDisplayActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: FileConfigurationRoutesDisplayActionTypes.ClearAlerts;
}

export type KnownAction =
  | IRouteFetch
  | IRouteFetchSuccess
  | IRouteFetchFailed
  | IPushAlert
  | IClearAlerts;
