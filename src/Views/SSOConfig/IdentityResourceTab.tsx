import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import CreateIdentityResource from './CreateIdentityResource';
import GymDeleteModal from '../../GeneralComponents/GymDeleteModal/GymDeleteModal';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const IdentityResourceTab = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
        create: { roles: ["Operator", "Manager"] },
        delete: { roles: ["Operator", "Manager"] },
    }
    useEffect(() => {
        props.getIdentityResourceList(props.fileConfigurationId)
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <GymAccessControl data={userAccessData.create}>
                <CreateIdentityResource fileConfigurationId={props.fileConfigurationId} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.delete}>
                <GymDeleteModal
                    visible={props.identityResourceDelete.Visible}
                    onCancel={() => props.toggleDeleteIdentityResourceModal(0, false)}
                    onAccept={() => props.deleteIdentityResource()} />
            </GymAccessControl>
            <div className="tab-pane fade"
                id={"list-identityResource"}
                role="tabpanel"
                aria-labelledby={"list-identityResource-list"}>
                <div className="card" style={{ width: "100%" }}>
                    <div className="card-header px-4 py-2">
                        <div className="row justify-content-between align-items-center">
                            <label className="text-info mb-0" style={{ fontSize: "large" }}>{t("identityResources")}</label>
                            <div>
                                <GymAccessControl data={userAccessData.create}>
                                    <button className="btn btn-primary"
                                        onClick={() => props.toggleCreateIdentityResourceModal(true)}>
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
                                    {
                                        field: 'userClaims', headerName: t("userClaims"), flex: 4,
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
                                                        onClick={() => props.toggleDeleteIdentityResourceModal(params.value, true)}>
                                                        <span className="mdi mdi-18px mdi-delete" />
                                                    </button>
                                                </GymAccessControl>
                                            </div>
                                        }
                                    },
                                ]}
                                rowData={props.identityResourceList.data ? props.identityResourceList.data.map((item: any) => ({
                                    name: item.name,
                                    displayName: item.displayName,
                                    userClaims: item.userClaims,
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
)(IdentityResourceTab);