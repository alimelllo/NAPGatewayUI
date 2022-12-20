import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userManager from '../../../Store/userManager';

const LogIn = () => {
    const history = useHistory();
    const [t] = useTranslation()
    const login = () => {
        userManager.signinRedirect({
            data: { path: history.location.pathname },
        });
    };
    return (
        <a className="align-items-center d-flex justify-content-center rounded-circle nav-icons_item link" role="button"
            title={t("login")} onClick={login}>
            <span className="mdi mdi-18px mdi-login ml-1"></span>
        </a>
    );
}

export default LogIn;