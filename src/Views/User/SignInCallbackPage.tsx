import * as React from 'react';
import { User } from 'oidc-client';
import userManager from '../../Store/userManager';
import { useHistory } from 'react-router';
import { CallbackComponent } from 'redux-oidc';
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import API from "../../GeneralComponents/baseURL";
import { IApplicationState } from '../../Store/state';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { connect } from 'react-redux';
import { IDashboardState } from '../../Actions/Dashboard/model';

type IProps = typeof dashboardActions & IDashboardState

const SignInCallbackPage = (props: IProps) => {
  const [t] = useTranslation()
  const history = useHistory();

  const successCallback = (user: User) => {
    API.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
    props.setUserClaims(user.access_token);
    var redirectPath = user.state.path as string;
    history.push(redirectPath);
  };

  const errorCallback = (error: Error) => {
    // console.log(error);
    history.push('/');
  };

  return (
    <CallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={errorCallback}>
      <GymLoading loading={true} title={t("welcome")} />
    </CallbackComponent>
  )
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(SignInCallbackPage);
