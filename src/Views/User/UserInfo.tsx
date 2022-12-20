import * as React from 'react';
import { connect } from 'react-redux';
import { ReactElement } from 'react';
import { IApplicationState, OidcState } from '../../Store/state';
import { useTranslation } from 'react-i18next';
import userManager from '../../Store/userManager';
import { dashboardActions } from '../../Actions/Dashboard/action';

type IProps = typeof dashboardActions & OidcState

const UserInfo = (props: IProps): ReactElement => {
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
      <div className="p-4 w-100 overflow-auto">
        <div className="d-flex flex-column h-100 bg-white shadow-sm overflow-hidden">
          <div className="panel-subject d-flex justify-content-between align-items-center font-weight-bold border-bottom p-3">
            {t("userinformation")}
            <div>
              <button className="btn btn-sm btn-danger" onClick={event => logout(event)}>
                <span className="mdi mdi-18px mdi-logout ml-1"></span>
                {t("logOut")}
              </button>
            </div>
          </div>
          <div className="p-4 position-relative flex-grow-1" style={{ overflowY: "auto" }}>
            {props.user ?
              <div className="container">
                <table className="table">
                  <tbody>
                  <tr>
                      <td>{t("userName")}</td>
                      <td>{props.user.profile.preferred_username}</td>
                    </tr>
                    <tr>
                      <td>{t("email")}</td>
                      <td>{props.user.profile.email}</td>
                    </tr>
                    <tr>
                      <td>{t("phoneNumber")}</td>
                      <td>{props.user.profile.phone_number}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              :
              <div className="empty">
                <div className="empty-icon">
                  <i className="icon icon-people" />
                </div>
                <p className="empty-title h5">{t("pleaseLogin")}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect((state: IApplicationState) => state.oidc, dashboardActions)(UserInfo);
