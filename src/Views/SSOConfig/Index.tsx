import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { GridOptions } from "ag-grid-community";
import "../../GeneralComponents/ToggleButton/GymToggleButton.css"
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import GymAlerts from '../../GeneralComponents/GymAlerts/GymAlerts';
import { RouteComponentProps } from 'react-router-dom';
import UserTab from './UserTab';
import RoleTab from './RoleTab';
import ClientTab from './ClientTab';
import ApiResourceTab from './ApiResourceTab';
import IdentityResourceTab from './IdentityResourceTab';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';

type IProps = typeof ssoConfigActions & ISSOConfigState & GridOptions & RouteComponentProps<{ fileconfigurationid: string }>

const SSOConfigIndex = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
    }
    useEffect(() => {
        document.title = t("apigw") + " - " + t("ssoConfig")
    }, [t])
    useEffect(() => {
        props.getUserList(Number(props.match.params.fileconfigurationid))
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="flex-fill">
                <GymLoading loading={props.userList.loading ||
                    props.userSync.loading ||
                    props.userCreate.loading ||
                    props.userDelete.loading ||
                    props.userRoleList.loading ||
                    props.userRoleCreate.loading ||
                    props.userRoleDelete.loading ||
                    props.roleList.loading ||
                    props.roleSync.loading ||
                    props.roleCreate.loading ||
                    props.roleDelete.loading ||
                    props.clientList.loading ||
                    props.clientSync.loading ||
                    props.clientCreate.loading ||
                    props.clientDelete.loading ||
                    props.apiResourceList.loading ||
                    props.apiResourceSync.loading ||
                    props.apiResourceCreate.loading ||
                    props.apiResourceDelete.loading ||
                    props.apiResourceScopeList.loading ||
                    props.apiResourceScopeSync.loading ||
                    props.apiResourceScopeCreate.loading ||
                    props.apiResourceScopeDelete.loading ||
                    props.identityResourceList.loading ||
                    props.identityResourceCreate.loading ||
                    props.identityResourceDelete.loading} />
                <div className="p-4">
                    <div className="subject d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {t("ssoConfig")}
                        </h5>
                        <div>
                            <button className="btn btn-secondary mr-1"
                                onClick={() => window.history.back()}>
                                <span className="mdi mdi-18px mdi-chevron-left mr-2"></span>
                                {t("back")}
                            </button>
                        </div>
                    </div>
                    <div className="d-flex bg-white rounded p-3 shadow-sm flex-grow-1">
                        <div className="p-4 row" style={{ overflowY: "auto", width: "100%" }}>
                            <div className="col-2">
                                <div className="list-group" id="list-tab" role="tablist">
                                    <a className={"list-group-item list-group-item-action active"}
                                        id={"list-user-list"}
                                        data-toggle="list"
                                        href={"#list-user"}
                                        role="tab"
                                        aria-controls="user">
                                        <label className="form-check-label mr-3">{t("users")}</label>
                                    </a>
                                    <a className={"list-group-item list-group-item-action"}
                                        id={"list-role-list"}
                                        data-toggle="list"
                                        href={"#list-role"}
                                        role="tab"
                                        aria-controls="role">
                                        <label className="form-check-label mr-3">{t("roles")}</label>
                                    </a>
                                    <a className={"list-group-item list-group-item-action"}
                                        id={"list-client-list"}
                                        data-toggle="list"
                                        href={"#list-client"}
                                        role="tab"
                                        aria-controls="client">
                                        <label className="form-check-label mr-3">{t("ssoClients")}</label>
                                    </a>
                                    <a className={"list-group-item list-group-item-action"}
                                        id={"list-apiResource-list"}
                                        data-toggle="list"
                                        href={"#list-apiResource"}
                                        role="tab"
                                        aria-controls="apiResource">
                                        <label className="form-check-label mr-3">{t("apiResources")}</label>
                                    </a>
                                    {/* <a className={"list-group-item list-group-item-action"}
                                        id={"list-identityResource-list"}
                                        data-toggle="list"
                                        href={"#list-identityResource"}
                                        role="tab"
                                        aria-controls="identityResource">
                                        <label className="form-check-label mr-3">{t("identityResources")}</label>
                                    </a> */}
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="tab-content" id="nav-tabContent">
                                    <UserTab fileConfigurationId={Number(props.match.params.fileconfigurationid)} />
                                    <RoleTab fileConfigurationId={Number(props.match.params.fileconfigurationid)} />
                                    <ClientTab fileConfigurationId={Number(props.match.params.fileconfigurationid)} />
                                    <ApiResourceTab fileConfigurationId={Number(props.match.params.fileconfigurationid)} />
                                    {/* <IdentityResourceTab fileConfigurationId={Number(props.match.params.fileconfigurationid)} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <GymAlerts
                alerts={props.alerts}
                clearAlerts={() => props.clearAlerts()} />
        </GymAccessControl>
    )
}
export default connect(
    (state: IApplicationState) => state.ssoConfig,
    ssoConfigActions,
)(SSOConfigIndex);