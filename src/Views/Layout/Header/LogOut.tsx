import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userManager from '../../../Store/userManager';
import { IApplicationState } from '../../../Store/state';
import { connect } from 'react-redux';
import { dashboardActions } from '../../../Actions/Dashboard/action';
import ChangePass from '../../User/ChangePass';
import GymLoading from '../../../GeneralComponents/GymLoading/GymLoading';

type IProps = typeof dashboardActions & IApplicationState

const LogOut = (props: IProps) => {
    const [t] = useTranslation()
    const logout = (event: any) => {
        event.preventDefault();
        userManager.signoutRedirect();
        userManager.removeUser();
        localStorage.clear();
        userManager.clearStaleState();
        props.clearUserClaims();
    };

    return (
        <React.Fragment>
            <div className="dropdown mx-1 dropleft">
                <Link to="/" className="dropdown-toggle align-items-center d-flex dropdown-toggle justify-content-center rounded-circle nav-icons_item link"
                    id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false" title={props.oidc.user?.profile?.name}>
                    <span className="mdi mdi-account mdi-20px"></span>
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to={"/UserInfo"} title={t("userAccount")}>{t("userAccount")}</Link>
                    <button className="dropdown-item" onClick={() => props.toggleUpdateUserPassModal(true)}>{t("changePassword")}</button>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item" onClick={event => logout(event)}>{t("logOut")}</button>
                </div>
            </div>
            <ChangePass />
            <GymLoading loading={props.dashboard.userPassUpdate.loading}/>
        </React.Fragment>
    );
}

export default connect((state: IApplicationState) => state, dashboardActions)(LogOut);