import { Action } from "redux";
import { FileConfigurationActionTypes } from "./actionType";

export interface IFileConfigurationState {
  fileConfigurationList: {
    loading: boolean;
    data: string[];
  },
  fileConfigurationCreate: {
    loading: boolean;
    Visible: boolean;
  },
  fileConfigurationUpdate: {
    loading: boolean;
    Visible: boolean;
    item: any;
  },
  options: {
    loading: boolean;
    loaded: boolean;
    data: any;
  },
  alerts: any[]
}

interface IFileConfigurationFetch extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationFetch;
}
interface IFileConfigurationFetchSuccess extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationFetchSuccess;
  data: any
}
interface IFileConfigurationFetchFailed extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationFetchFailed;
}

interface IFileConfigurationCreate extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationCreate;
}
interface IFileConfigurationCreateSuccess extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationCreateSuccess;
}
interface IFileConfigurationCreateFailed extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationCreateFailed;
}
interface IFileConfigurationCreateModal extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationCreateModal;
  Visible: boolean;
}

interface IFileConfigurationUpdate extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationUpdate;
}
interface IFileConfigurationUpdateSuccess extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationUpdateSuccess;
}
interface IFileConfigurationUpdateFailed extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationUpdateFailed;
}
interface IFileConfigurationUpdateModal extends Action<string> {
  type: FileConfigurationActionTypes.FileConfigurationUpdateModal;
  Visible: boolean;
  item: any;
}

interface IOptionsFetch extends Action<string> {
  type: FileConfigurationActionTypes.OptionsFetch;
}
interface IOptionsFetchSuccess extends Action<string> {
  type: FileConfigurationActionTypes.OptionsFetchSuccess;
  data: any
}
interface IOptionsFetchFailed extends Action<string> {
  type: FileConfigurationActionTypes.OptionsFetchFailed;
}

interface IPushAlert extends Action<string> {
  type: FileConfigurationActionTypes.PushAlert;
  alert: any;
}
interface IClearAlerts extends Action<string> {
  type: FileConfigurationActionTypes.ClearAlerts;
}

export type KnownAction =
  | IFileConfigurationFetch
  | IFileConfigurationFetchSuccess
  | IFileConfigurationFetchFailed
  | IFileConfigurationCreate
  | IFileConfigurationCreateSuccess
  | IFileConfigurationCreateFailed
  | IFileConfigurationCreateModal
  | IFileConfigurationUpdate
  | IFileConfigurationUpdateSuccess
  | IFileConfigurationUpdateFailed
  | IFileConfigurationUpdateModal
  | IOptionsFetch
  | IOptionsFetchSuccess
  | IOptionsFetchFailed
  | IPushAlert
  | IClearAlerts;
