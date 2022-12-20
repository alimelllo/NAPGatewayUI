import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import GymDeleteModal from '../../GeneralComponents/GymDeleteModal/GymDeleteModal';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import CreateClient from './CreateClient';
import GymQuestionModal from '../../GeneralComponents/GymQuestionModal/GymQuestionModal';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const ClientTab = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
        sync: { roles: ["Operator", "Manager"] },
        create: { roles: ["Operator", "Manager"] },
        delete: { roles: ["Operator", "Manager"] },
    }
    useEffect(() => {
        props.getClientList(props.fileConfigurationId)
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <GymAccessControl data={userAccessData.create}>
                <CreateClient fileConfigurationId={props.fileConfigurationId} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.sync}>
                <GymQuestionModal
                    title={t("sync")}
                    description={t("syncQuestion")}
                    visible={props.clientSync.Visible}
                    onCancel={() => props.toggleSyncClientModal(0, false)}
                    onAccept={() => props.syncClients()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.delete}>
                <GymDeleteModal
                    visible={props.clientDelete.Visible}
                    onCancel={() => props.toggleDeleteClientModal(0, false)}
                    onAccept={() => props.deleteClient()} />
            </GymAccessControl>
            <div className="tab-pane fade"
                id={"list-client"}
                role="tabpanel"
                aria-labelledby={"list-client-list"}>
                <div className="card" style={{ width: "100%" }}>
                    <div className="card-header px-4 py-2">
                        <div className="row justify-content-between align-items-center">
                            <label className="text-info mb-0" style={{ fontSize: "large" }}>{t("ssoClients")}</label>
                            <div>
                                <GymAccessControl data={userAccessData.sync}>
                                    <button className="btn btn-success mr-1"
                                        onClick={() => props.toggleSyncClientModal(props.fileConfigurationId, true)}>
                                        <span className="mdi mdi-18px mdi-sync mr-2"></span>
                                        {t("sync")}
                                    </button>
                                </GymAccessControl>
                                <GymAccessControl data={userAccessData.create}>
                                    <button className="btn btn-primary"
                                        onClick={() => props.toggleCreateClientModal(true)}>
                                        <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                                        {t("create")}
                                    </button>
                                </GymAccessControl>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-2 mt-1" style={{ width: "100%" }}>
                        <div className="ag-theme-balham" style={{ height: "400px" }}>
                            <AgGridReact
                                columnDefs={[
                                    { field: 'clientId', headerName: t("clientId"), flex: 2 },
                                    { field: 'clientName', headerName: t("clientName"), flex: 2 },
                                    { field: 'clientSecret', headerName: t("clientSecret"), flex: 2 },
                                    { field: 'grantType', headerName: t("grantType"), flex: 2 },
                                    {
                                        field: 'allowedScopes', headerName: t("allowedScopes"), flex: 4,
                                        cellRendererFramework: function (params: any) {
                                            return params.value ? params.value.split(",").map((item: any) => {
                                                return (
                                                    <span className="badge badge-success mr-1 p-2">
                                                        {item}
                                                    </span>
                                                )
                                            }) : ""
                                        }
                                    },
                                    { field: 'description', headerName: t("description"), flex: 2 },
                                    {
                                        field: 'id', headerName: t("operation"), lockPinned: true, pinned: 'right',
                                        cellClass: 'lock-pinned', width: 100, cellRendererFramework: function (params: any) {
                                            return <div className="btn-group">
                                                <GymAccessControl data={userAccessData.delete}>
                                                    <button title={t("remove")} className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => props.toggleDeleteClientModal(params.value, true)}>
                                                        <span className="mdi mdi-18px mdi-delete" />
                                                    </button>
                                                </GymAccessControl>
                                            </div>
                                        }
                                    },
                                ]}
                                rowData={props.clientList.data ? props.clientList.data.map((item: any) => ({
                                    clientId: item.clientId,
                                    clientName: item.clientName,
                                    clientSecret: item.clientSecret,
                                    grantType: item.grantType,
                                    allowedScopes: item.allowedScopes,
                                    description: item.description,
                                    id: item.id
                                })) : []}
                                sideBar={true}
                                suppressDragLeaveHidesColumns={true}
                                autoHeight={true}
                                animateRows={true}
                                localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                }}
                                onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        </GymAccessControl>
    )
}
export default connect(
    (state: IApplicationState) => state.ssoConfig,
    ssoConfigActions,
)(ClientTab);