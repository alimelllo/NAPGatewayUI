import { createUserManager } from 'redux-oidc';
import Oidc, { UserManagerSettings, Log } from 'oidc-client';

//const ssoURL = "http://10.33.202.135:83";
//const ssoURL = "http://192.168.150.34:83";
//const ssoURL = "http://sso.opin.navoshgaran.com";
const ssoURL = "http://192.168.10.1:83";

const userManagerConfig: UserManagerSettings = {
  //client_id: 'gateway_ui',
  client_id: 'napgateway_ui_local',
  redirect_uri: window.location.origin + '/SignInCallback',
  silent_redirect_uri: window.location.origin + '/SilentCallback',
  response_type: 'code',
  scope:"openid profile roles gateway_api",
  // scope:"openid profile branchid roles gateway_api",
  // scope:"openid profile roles",
  authority: ssoURL,
  post_logout_redirect_uri: window.location.origin + '/SignOutCallback',
  userStore: new Oidc.WebStorageStateStore({store: localStorage}),
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  clockSkew : 1200,
  loadUserInfo: true,
  monitorSession: false,
  // silentRequestTimeout: 1,
   //client_secret: "gateway_ui_client_secret",
   client_secret: "napgateway_ui_client_secret",
};
Log.logger = console;
Log.level = Log.DEBUG;
const userManager = createUserManager(userManagerConfig);

export default userManager;