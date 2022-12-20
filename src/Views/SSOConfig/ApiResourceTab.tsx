import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import CreateApiResource from './CreateApiResource';
import GymDeleteModal from '../../GeneralComponents/GymDeleteModal/GymDeleteModal';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import ApiResourceScopesModal from './ApiResourceScopesModal';
import GymQuestionModal from '../../GeneralComponents/GymQuestionModal/GymQuestionModal';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const ApiResourceTab = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
        sync: { roles: ["Operator", "Manager"] },
        syncScopes: { roles: ["Operator", "Manager"] },
        create: { roles: ["Operator", "Manager"] },
        delete: { roles: ["Operator", "Manager"] },
        showScopes: { roles: ["Operator", "Manager"] },
        deleteScope: { roles: ["Operator", "Manager"] }
    }
    useEffect(() => {
        props.getApiResourceList(props.fileConfigurationId)
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <GymAccessControl data={userAccessData.create}>
                <CreateApiResource fileConfigurationId={props.fileConfigurationId} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.showScopes}>
                <ApiResourceScopesModal />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.sync}>
                <GymQuestionModal
                    title={t("sync")}
                    description={t("syncQuestion")}
                    visible={props.apiResourceSync.Visible}
                    onCancel={() => props.toggleSyncApiResourceModal(0, false)}
                    onAccept={() => props.syncApiResources()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.syncScopes}>
                <GymQuestionModal
                    title={t("sync")}
                    description={t("syncQuestion")}
                    visible={props.apiResourceScopeSync.Visible}
                    onCancel={() => props.toggleSyncApiResourceScopeModal(0, false)}
                    onAccept={() => props.syncApiResourceScopes()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.delete}>
                <GymDeleteModal
                    visible={props.apiResourceDelete.Visible}
                    onCancel={() => props.toggleDeleteApiResourceModal(0, false)}
                    onAccept={() => props.deleteApiResource()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.deleteScope}>
                <GymDeleteModal
                    visible={props.apiResourceScopeDelete.Visible}
                    onCancel={() => props.toggleDeleteApiResourceScopeModal(0, 0, false)}
                    onAccept={() => props.deleteApiResourceScope()} />
            </GymAccessControl>
            <div className="tab-pane fade"
                id={"list-apiResource"}
                role="tabpanel"
                aria-labelledby={"list-apiResource-list"}>
                <div className="card" style={{ width: "100%" }}>
                    <div className="card-header px-4 py-2">
                        <div className="row justify-content-between align-items-center">
                            <label className="text-info mb-0" style={{ fontSize: "large" }}>{t("apiResources")}</label>
                            <div>
                                <GymAccessControl data={userAccessData.sync}>
                                    <button className="btn btn-success mr-1"
                                        onClick={() => props.toggleSyncApiResourceModal(props.fileConfigurationId, true)}>
                                        <span className="mdi mdi-18px mdi-sync mr-2"></span>
                                        {t("sync")}
                                    </button>
                                </GymAccessControl>
                                <GymAccessControl data={userAccessData.create}>
                                    <button className="btn btn-primary"
                                        onClick={() => props.toggleCreateApiResourceModal(true)}>
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
                                    { field: 'name', headerName: t("name"), flex: 1 },
                                    { field: 'displayName', headerName: t("displayName"), flex: 1 },
                                    // {
                                    //     field: 'userClaims', headerName: t("userClaims"), flex: 4,
                                    //     cellRendererFramework: function (params: any) {
                                    //         return params.value ? params.value.split(",").map((item: any) => {
                                    //             return (
                                    //                 <span className="badge badge-success mr-1 p-2">
                                    //                     {item}
                                    //                 </span>
                                    //             )
                                    //         }) : ""
                                    //     }
                                    // },
                                    { field: 'description', headerName: t("description"), flex: 2 },
                                    {
                                        field: 'id', headerName: t("operation"), lockPinned: true, pinned: 'right',
                                        cellClass: 'lock-pinned', width: 100, cellRendererFramework: function (params: any) {
                                            return <div className="btn-group">
                                                <GymAccessControl data={userAccessData.delete}>
                                                    <button title={t("remove")} className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => props.toggleDeleteApiResourceModal(params.value, true)}>
                                                        <span className="mdi mdi-18px mdi-delete" />
                                                    </button>
                                                </GymAccessControl>
                                                <GymAccessControl data={userAccessData.showScopes}>
                                                    <button title={t("scopes")} className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => props.getApiResourceScopeList(params.value)}>
                                                        <span className="mdi mdi-18px mdi-ungroup" />
                                                    </button>
                                                </GymAccessControl>
                                            </div>
                                        }
                                    },
                                ]}
                                rowData={props.apiResourceList.data ? props.apiResourceList.data.map((item: any) => ({
                                    name: item.name,
                                    displayName: item.displayName,
                                    // userClaims: item.userClaims,
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
)(ApiResourceTab);