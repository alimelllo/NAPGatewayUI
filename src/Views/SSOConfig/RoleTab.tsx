import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import CreateRole from './CreateRole';
import GymDeleteModal from '../../GeneralComponents/GymDeleteModal/GymDeleteModal';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import GymQuestionModal from '../../GeneralComponents/GymQuestionModal/GymQuestionModal';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const RoleTab = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
        sync: { roles: ["Operator", "Manager"] },
        create: { roles: ["Operator", "Manager"] },
        delete: { roles: ["Operator", "Manager"] },
    }
    useEffect(() => {
        props.getRoleList(props.fileConfigurationId)
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <GymAccessControl data={userAccessData.create}>
                <CreateRole fileConfigurationId={props.fileConfigurationId} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.sync}>
                <GymQuestionModal
                    title={t("sync")}
                    description={t("syncQuestion")}
                    visible={props.roleSync.Visible}
                    onCancel={() => props.toggleSyncRoleModal(0, false)}
                    onAccept={() => props.syncRoles()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.delete}>
                <GymDeleteModal
                    visible={props.roleDelete.Visible}
                    onCancel={() => props.toggleDeleteRoleModal(0, false)}
                    onAccept={() => props.deleteRole()} />
            </GymAccessControl>
            <div className="tab-pane fade"
                id={"list-role"}
                role="tabpanel"
                aria-labelledby={"list-role-list"}>
                <div className="card" style={{ width: "100%" }}>
                    <div className="card-header px-4 py-2">
                        <div className="row justify-content-between align-items-center">
                            <label className="text-info mb-0" style={{ fontSize: "large" }}>{t("roles")}</label>
                            <div>
                                <GymAccessControl data={userAccessData.sync}>
                                    <button className="btn btn-success mr-1"
                                        onClick={() => props.toggleSyncRoleModal(props.fileConfigurationId, true)}>
                                        <span className="mdi mdi-18px mdi-sync mr-2"></span>
                                        {t("sync")}
                                    </button>
                                </GymAccessControl>
                                <GymAccessControl data={userAccessData.create}>
                                    <button className="btn btn-primary"
                                        onClick={() => props.toggleCreateRoleModal(true)}>
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
                                    { field: 'name', headerName: t("name"), flex: 2 },
                                    {
                                        field: 'id', headerName: t("operation"), lockPinned: true, pinned: 'right',
                                        cellClass: 'lock-pinned', width: 100, cellRendererFramework: function (params: any) {
                                            return <div className="btn-group">
                                                <GymAccessControl data={userAccessData.delete}>
                                                    <button title={t("remove")} className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => props.toggleDeleteRoleModal(params.value, true)}>
                                                        <span className="mdi mdi-18px mdi-delete" />
                                                    </button>
                                                </GymAccessControl>
                                            </div>
                                        }
                                    },
                                ]}
                                rowData={props.roleList.data ? props.roleList.data.map((item: any) => ({
                                    name: item.name,
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
)(RoleTab);