import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import FileConfigurationIndex from '../FileConfiguration/Index';
import FileConfigurationRouteStateIndex from '../FileConfigurationRouteState/Index';
import RouteDisplay from '../FileConfigurationRoutesDisplay/Routes';
import RouteState from '../FileConfigurationRouteState/RouteState';
import RouteIndex from '../Route/Index';
import GlobalConfigurationIndex from '../GlobalConfiguration/Index';
import TracingIndex from '../Tracing/Index';
import ClientTracingIndex from '../ClientTracing/Index';
import SSOConfigIndex from '../SSOConfig/Index';

import User from '../User/UserInfo';
import SignInCallbackPage from '../User/SignInCallbackPage';
import SignOutCallbackPage from '../User/SignOutCallbackPage';
import NotFoundPage from '../Dashboard/NotFoundPage';
import { IApplicationState } from '../../Store/state';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { connect } from 'react-redux';
import { IDashboardState } from '../../Actions/Dashboard/model';
import KibanaPage from '../KibanaPage/KibanaPage';
import { useEffect } from 'react';
import RouteDetails from '../Route/RouteDetails/RouteDetails';
import Accounting from '../Accounting/Accounting';
import Bill from '../Bill/Bill';
import ClientAccountingInformation from "../ClientAccountingInformation/ClientAccountingInformation";

type IProps = typeof dashboardActions & IDashboardState

const WebRoute = (props: IProps) => {
    const [type, setType] = useState<string>('');
    useEffect(() => {
        if (props.userClaims.roles.some(x => x.toLocaleLowerCase() == props.userClaims.kibanaUser.toLocaleLowerCase()))
            setType("KibanaUser");
        else if (props.userClaims.roles.some(x => x.toLocaleLowerCase() == "OAuthAdminAdministrator".toLocaleLowerCase()))
            setType("Admin");
        else if (props.userClaims.roles.some(x => x.toLocaleLowerCase() == "Operator".toLocaleLowerCase()))
            setType("Operator");
        else if (props.userClaims.roles.some(x => x.toLocaleLowerCase() == "Manager".toLocaleLowerCase()))
            setType("Manager");
        else if (props.userClaims.roles.some(x => x.toLocaleLowerCase() == "Supervisor".toLocaleLowerCase()))
            setType("Supervisor");
        else if (props.userClaims.roles.some(x => x.toLocaleLowerCase() == "Security".toLocaleLowerCase()))
            setType("Security");
    }, [])
    console.log("type : "  + type ) ;
    if (type == "KibanaUser") {
        return (
            <Switch>
                <Route path="/" exact render={() => (<Redirect to="/Reports" />)} />
                <Route path="/Monitoring" exact component={KibanaPage} />

                <Route path="/UserInfo" exact component={User} />
                <Route path="/SignIncallback" exact component={SignInCallbackPage} />
                <Route path="/SignOutCallbackPage" exact component={SignOutCallbackPage} />

                <Route component={NotFoundPage} />
            </Switch>)
    } else if (type == "Admin" || type == "Manager") {

        return (
            <Switch>
                <Route path="/" exact render={() => (<Redirect to="/FileConfigurations" />)} />
                <Route path="/Accounting" exact component={Accounting} />
                <Route path="/Bill" exact component={Bill} />
                <Route path="/ClientAccountingInformation" exact component={ClientAccountingInformation} />
                <Route path="/Dashboard" exact component={Dashboard} />
                <Route path="/Tracing/:fileconfigurationid" component={TracingIndex} />
                <Route path="/ClientTracing/:fileconfigurationid" component={ClientTracingIndex} />
                <Route path="/FileConfigurations" exact component={FileConfigurationIndex} />
                <Route path="/FileConfigurationRouteState" exact component={FileConfigurationRouteStateIndex} />
                <Route path="/FileConfigurationRouteState/:fileconfigurationid" exact component={RouteState} />
                <Route path="/ActiveRoutes/:fileconfigurationid" exact component={RouteDisplay} />
                <Route path="/Routes/:fileconfigurationid" exact component={RouteIndex} />
                <Route path="/Routes/:fileconfigurationid/Detail/:routeId" exact component={RouteDetails} />
                <Route path="/GlobalConfiguration/:fileconfigurationid" exact component={GlobalConfigurationIndex} />
                <Route path="/SSOConfiguration/:fileconfigurationid" exact component={SSOConfigIndex} />
                <Route path="/Monitoring" exact component={KibanaPage} />
                <Route path="/UserInfo" exact component={User} />
                <Route path="/SignIncallback" exact component={SignInCallbackPage} />
                <Route path="/SignOutCallbackPage" exact component={SignOutCallbackPage} />

                <Route component={NotFoundPage} />
            </Switch>)
    } else if (type == "Operator") {
        console.log("type : "  + type ) ;
        return (
          
            <Switch>
                <Route path="/" exact render={() => (<Redirect to="/FileConfigurations" />)} />
                <Route path="/Accounting" exact component={Accounting} />
                <Route path="/Bill" exact component={Bill} />
                <Route path="/Dashboard" exact component={Dashboard} />
                <Route path="/ClientAccountingInformation" exact component={ClientAccountingInformation} />
                <Route path="/Tracing/:fileconfigurationid" component={TracingIndex} />
                <Route path="/ClientTracing/:fileconfigurationid" component={ClientTracingIndex} />
                <Route path="/FileConfigurations" exact component={FileConfigurationIndex} />
                <Route path="/Routes/:fileconfigurationid" exact component={RouteIndex} />
                <Route path="/Routes/:fileconfigurationid/Detail/:routeId" exact component={RouteDetails} />
                <Route path="/GlobalConfiguration/:fileconfigurationid" exact component={GlobalConfigurationIndex} />
                <Route path="/SSOConfiguration/:fileconfigurationid" exact component={SSOConfigIndex} />
                <Route path="/Monitoring" exact component={KibanaPage} />
                <Route path="/UserInfo" exact component={User} />
                <Route path="/SignIncallback" exact component={SignInCallbackPage} />
                <Route path="/SignOutCallbackPage" exact component={SignOutCallbackPage} />

                <Route component={NotFoundPage} />
            </Switch>)
    } else if (type == "Supervisor") {
        return (
            <Switch>
                <Route path="/" exact render={() => (<Redirect to="/FileConfigurations" />)} />
                <Route path="/Accounting" exact component={Accounting} />
                <Route path="/Bill" exact component={Bill} />
                <Route path="/Dashboard" exact component={Dashboard} />
                <Route path="/ClientAccountingInformation" exact component={ClientAccountingInformation} />
                <Route path="/FileConfigurations" exact component={FileConfigurationIndex} />
                <Route path="/ActiveRoutes/:fileconfigurationid" exact component={RouteDisplay} />

                <Route path="/UserInfo" exact component={User} />
                <Route path="/SignIncallback" exact component={SignInCallbackPage} />
                <Route path="/SignOutCallbackPage" exact component={SignOutCallbackPage} />

                <Route component={NotFoundPage} />
            </Switch>)
    } else if (type == "Security") {
        return (
            <Switch>
                <Route path="/" exact render={() => (<Redirect to="/Dashboard" />)} />
                <Route path="/Accounting" exact component={Accounting} />
                <Route path="/Bill" exact component={Bill} />
                <Route path="/Dashboard" exact component={Dashboard} />
                <Route path="/ClientAccountingInformation" exact component={ClientAccountingInformation} />
                <Route path="/FileConfigurationRouteState" exact component={FileConfigurationRouteStateIndex} />
                <Route path="/FileConfigurationRouteState/:fileconfigurationid" exact component={RouteState} />

                <Route path="/UserInfo" exact component={User} />
                <Route path="/SignIncallback" exact component={SignInCallbackPage} />
                <Route path="/SignOutCallbackPage" exact component={SignOutCallbackPage} />

                <Route component={NotFoundPage} />
            </Switch>)
    } else
        return (
            <Switch>
                <Route path="/" exact render={() => (<Redirect to="/FileConfigurations" />)} />
                <Route path="/Dashboard" exact component={Dashboard} />
                
                <Route path="/SignIncallback" exact component={SignInCallbackPage} />
                <Route path="/SignOutCallbackPage" exact component={SignOutCallbackPage} />

                <Route component={NotFoundPage} />
            </Switch>)
}

export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(WebRoute);