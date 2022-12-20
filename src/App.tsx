import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './Views/Layout/Main/Main'
import userManager from './Store/userManager';
import { useTranslation } from 'react-i18next';
import GymLoading from './GeneralComponents/GymLoading/GymLoading';
import API from "./GeneralComponents/baseURL";

import "./assets/agGrid-Css/ag-enterprise/ag-grid.css";
import "./assets/agGrid-Css/ag-enterprise/ag-theme-balham.css";
import { dashboardActions } from './Actions/Dashboard/action';
import { IApplicationState } from './Store/state';
import { connect } from 'react-redux';

type IProps = typeof dashboardActions & IApplicationState

const App = (props: IProps) => {
  const [t] = useTranslation()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const isConnected: boolean = props.oidc.user && !props.oidc.user.expired;
  useEffect(() => {
    if (window.location.pathname != '/SignInCallback') {
      userManager.getUser().then(user => {
        if (!user || user.expired) {
          userManager.signinRedirect({ data: { path: window.location.pathname } });
          if (isLogin)
            setIsLogin(false);
        } else {
          API.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
          props.setUserClaims(user.access_token);
          if (!isLogin)
            setIsLogin(true);
        }
      })
    } else if (!isLogin)
      setIsLogin(true);
  }, [])
  useEffect(() => {
    if (!isConnected && isLogin && !props.dashboard.userClaims.isLogOut) {
      userManager.removeUser();
      localStorage.clear();
      userManager.clearStaleState();
      props.clearUserClaims();
      userManager.signinRedirect({ data: { path: window.location.pathname } });
    }
  }, [isConnected])

  if (isLogin)
    return (
      <BrowserRouter>
        <GymLoading loading={props.oidc.isLoadingUser} />
        <Main isConnected={isConnected} />
      </BrowserRouter>
    );
  else
    return (<GymLoading loading={true} title={t("pleaseWait")} />)
}

export default connect((state: IApplicationState) => state, dashboardActions)(App);
