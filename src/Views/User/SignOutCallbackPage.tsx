import * as React from 'react';
import { SignoutResponse } from 'oidc-client';
import userManager from '../../Store/userManager';
import { useHistory } from 'react-router';
import { SignoutCallbackComponent } from 'redux-oidc';
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';

const SignOutCallbackPage = () => {
  const [t] = useTranslation()
  const history = useHistory();

  const successCallback = (response: SignoutResponse) => {
    userManager.removeUser();
    localStorage.clear();
    userManager.clearStaleState();
    userManager.signinRedirect({ data: { path: "/" } });
  };

  const errorCallback = (error: Error) => {
    //console.log(error);
    history.push('/');
  };

  return (
    <SignoutCallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={errorCallback}>
      <GymLoading loading={true} title={t("logOut")} />
    </SignoutCallbackComponent>
  )
};

export default SignOutCallbackPage;
