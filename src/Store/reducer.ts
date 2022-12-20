import { DashboardReducer } from "../Actions/Dashboard/reducer";
import { FileConfigurationReducer } from "../Actions/FileConfiguration/reducer";
import { FileConfigurationRoutesDisplayReducer } from "../Actions/FileConfigurationRoutesDisplay/reducer";
import { FileConfigurationRouteStateReducer } from "../Actions/FileConfigurationRouteState/reducer";
import { RouteReducer } from "../Actions/Route/reducer";
import { GlobalConfigurationReducer } from "../Actions/GlobalConfiguration/reducer";
import { TracingReducer } from "../Actions/Tracing/reducer";
import { ClientTracingReducer } from "../Actions/ClientTracing/reducer";
import { SSOConfigReducer } from "../Actions/SSOConfig/reducer";
import { reducer as oidcReducer } from 'redux-oidc';

export const reducers = {
   dashboard: DashboardReducer,
   fileConfiguration: FileConfigurationReducer,
   fileConfigurationRouteState: FileConfigurationRouteStateReducer,
   fileConfigurationRoutesDisplay: FileConfigurationRoutesDisplayReducer,
   route: RouteReducer,
   globalConfiguration: GlobalConfigurationReducer,
   tracing: TracingReducer,
   clientTracing: ClientTracingReducer,
   ssoConfig: SSOConfigReducer,
   oidc: oidcReducer
};