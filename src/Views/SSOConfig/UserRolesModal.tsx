import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import Select from 'react-select';

type IProps = typeof ssoConfigActions & ISSOConfigState

const UserRolesModal = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        create: { roles: ["Operator", "Manager"] },
        delete: { roles: ["Operator", "Manager"] }
    }
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, resetForm } = useFormControl(
        {
            id: [{ required: true }, { isNumber: true }, { min: 1 }],
            role: [{ required: true }, { minLength: 2 }]
        }
    );
    useEffect(() => {
        if (props.userRoleList.Visible)
            resetForm([{ id: props.userRoleList.userId }]);
    }, [props.userRoleList.Visible])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.saveUserRole(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleUserRoleModal(false)}>{t("cancel")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("roles")} Visible={props.userRoleList.Visible} onCancel={() => props.toggleUserRoleModal(false)} buttons={<Buttons />}>
            <div className="d-flex justify-content-between mb-3">
                <div className="col-9" style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <Select
                        id="role"
                        value={props.roleList.data.map((x: any) => { return { value: x.name, label: x.name } }).find((x: any) => x.value == GetValue("role"))}
                        options={props.roleList.data.map((x: any) => { return { value: x.name, label: x.name } })}
                        name="role"
                        onChange={(data: any) => setValue("role", data.value)} />
                    <GetError name="role" />
                </div>
                <div className="col-3" style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <button className="btn btn-success pr-3" onClick={formSubmitHandler} style={{ float: "right" }}>
                        <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                        {t("add")}
                    </button>
                </div>
            </div>
            <div className="ag-theme-balham" style={{ height: "400px" }}>
                <AgGridReact
                    columnDefs={[
                        { field: 'role', headerName: t("role"), flex: 1 },
                        {
                            field: 'item', headerName: t("operation"), lockPinned: true, pinned: 'right',
                            cellClass: 'lock-pinned', width: 100, cellRendererFramework: function (params: any) {
                                return <div className="btn-group">
                                    <GymAccessControl data={userAccessData.delete}>
                                        <button title={t("remove")} className="btn btn-sm btn-outline-secondary"
                                            onClick={() => props.toggleDeleteUserRoleModal(params.value.userId, params.value.role, true)}>
                                            <span className="mdi mdi-18px mdi-delete" />
                                        </button>
                                    </GymAccessControl>
                                </div>
                            }
                        },
                    ]}
                    rowData={props.userRoleList.data ? props.userRoleList.data.map((item: any) => ({
                        role: item.role,
                        item: item
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
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.ssoConfig,
    ssoConfigActions,
)(UserRolesModal);