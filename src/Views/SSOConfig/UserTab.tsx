import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import GymDeleteModal from '../../GeneralComponents/GymDeleteModal/GymDeleteModal';
import CreateUser from './CreateUser';
import UserRolesModal from './UserRolesModal';
import GymQuestionModal from '../../GeneralComponents/GymQuestionModal/GymQuestionModal';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const UserTab = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
        sync: { roles: ["Operator", "Manager"] },
        create: { roles: ["Operator", "Manager"] },
        delete: { roles: ["Operator", "Manager"] },
        showRoles: { roles: ["Operator", "Manager"] },
        deleteRole: { roles: ["Operator", "Manager"] },
    }
    useEffect(() => {
        props.getUserList(props.fileConfigurationId)
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <GymAccessControl data={userAccessData.create}>
                <CreateUser fileConfigurationId={props.fileConfigurationId} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.showRoles}>
                <UserRolesModal />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.sync}>
                <GymQuestionModal
                    title={t("sync")}
                    description={t("syncQuestion")}
                    visible={props.userSync.Visible}
                    onCancel={() => props.toggleSyncUserModal(0, false)}
                    onAccept={() => props.syncUsers()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.delete}>
                <GymDeleteModal
                    visible={props.userDelete.Visible}
                    onCancel={() => props.toggleDeleteUserModal(0, false)}
                    onAccept={() => props.deleteUser()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.deleteRole}>
                <GymDeleteModal
                    visible={props.userRoleDelete.Visible}
                    onCancel={() => props.toggleDeleteUserRoleModal(0, '', false)}
                    onAccept={() => props.deleteUserRole()} />
            </GymAccessControl>
            <div className="tab-pane fade show active"
                id={"list-user"}
                role="tabpanel"
                aria-labelledby={"list-user-list"}>
                <div className="card" style={{ width: "100%" }}>
                    <div className="card-header px-4 py-2">
                        <div className="row justify-content-between align-items-center">
                            <label className="text-info mb-0" style={{ fontSize: "large" }}>{t("users")}</label>
                            <div>
                                <GymAccessControl data={userAccessData.sync}>
                                    <button className="btn btn-success mr-1"
                                        onClick={() => props.toggleSyncUserModal(props.fileConfigurationId, true)}>
                                        <span className="mdi mdi-18px mdi-sync mr-2"></span>
                                        {t("sync")}
                                    </button>
                                </GymAccessControl>
                                <GymAccessControl data={userAccessData.create}>
                                    <button className="btn btn-primary"
                                        onClick={() => props.toggleCreateUserModal(true)}>
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
                                    { field: 'userName', headerName: t("userName"), flex: 2 },
                                    { field: 'email', headerName: t("email"), flex: 2 },
                                    { field: 'mobileNumber', headerName: t("mobileNumber"), flex: 2 },
                                    {
                                        field: 'id', headerName: t("operation"), lockPinned: true, pinned: 'right',
                                        cellClass: 'lock-pinned', width: 100, cellRendererFramework: function (params: any) {
                                            return <div className="btn-group">
                                                <GymAccessControl data={userAccessData.delete}>
                                                    <button title={t("remove")} className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => props.toggleDeleteUserModal(params.value, true)}>
                                                        <span className="mdi mdi-18px mdi-delete" />
                                                    </button>
                                                </GymAccessControl>
                                                <GymAccessControl data={userAccessData.showRoles}>
                                                    <button title={t("roles")} className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => props.getUserRoleList(params.value)}>
                                                        <span className="mdi mdi-18px mdi-security" />
                                                    </button>
                                                </GymAccessControl>
                                            </div>
                                        }
                                    },
                                ]}
                                rowData={props.userList.data ? props.userList.data.map((item: any) => ({
                                    userName: item.userName,
                                    email: item.email,
                                    mobileNumber: item.mobileNumber,
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
)(UserTab);