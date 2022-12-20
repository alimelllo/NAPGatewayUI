import React from 'react';
import Header from '../Header/Header';
import WebRoute from '../WebRoute';
import { dashboardActions } from '../../../Actions/Dashboard/action';
import { IDashboardState } from '../../../Actions/Dashboard/model';
import { IApplicationState } from '../../../Store/state';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignInCallbackPage from '../../User/SignInCallbackPage';

type IProps = typeof dashboardActions & IDashboardState & { isConnected: boolean }

const Main = (props: IProps) => {
    return (
        <main className="wrapper d-flex flex-column h-100">
            {props.userClaims.roles && props.userClaims.roles.length > 0 ?
                <React.Fragment>
                    <Header isConnected={props.isConnected} />
                    <WebRoute />
                </React.Fragment>
                :
                <Switch>
                    <Route path="/SignIncallback" exact component={SignInCallbackPage} />
                </Switch>}
            <div className="border-top">
                <p className="text-muted small p-3 m-0">
                    <span className="mdi mdi-24px mdi-copyright px-1 text-basic" />
                    NAJA 2022
                </p>
            </div>
        </main>
    );
}

export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(Main);