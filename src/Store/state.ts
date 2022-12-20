import { IDashboardState } from "../Actions/Dashboard/model";
import { IFileConfigurationState } from "../Actions/FileConfiguration/model";
import { IFileConfigurationRoutesDisplayState } from "../Actions/FileConfigurationRoutesDisplay/model";
import { IFileConfigurationRouteStateState } from "../Actions/FileConfigurationRouteState/model";
import { IRouteState } from "../Actions/Route/model";
import { IGlobalConfigurationState } from "../Actions/GlobalConfiguration/model";
import { ITracingState } from "../Actions/Tracing/model";
import { IClientTracingState } from "../Actions/ClientTracing/model";
import { ISSOConfigState } from "../Actions/SSOConfig/model";
import { User } from "oidc-client";

export interface OidcState {
    isLoadingUser: boolean;
    user: User;
}

export interface IApplicationState {
    dashboard: IDashboardState,
    fileConfiguration: IFileConfigurationState,
    fileConfigurationRoutesDisplay: IFileConfigurationRoutesDisplayState,
    fileConfigurationRouteState: IFileConfigurationRouteStateState,
    route: IRouteState,
    globalConfiguration: IGlobalConfigurationState,
    tracing: ITracingState,
    clientTracing: IClientTracingState,
    ssoConfig: ISSOConfigState,
    oidc: OidcState
}

export type AppAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
