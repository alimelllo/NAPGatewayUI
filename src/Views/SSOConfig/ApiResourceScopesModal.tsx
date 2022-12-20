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

const ApiResourceScopesModal = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        syncScopes: { roles: ["Operator", "Manager"] },
        create: { roles: ["Operator", "Manager"] },
        delete: { roles: ["Operator", "Manager"] },
    }
    const [claim, setClaim] = useState<string>("")
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, resetForm } = useFormControl(
        {
            apiResourceId: [{ required: true }, { isNumber: true }, { min: 1 }],
            name: [{ required: true }, { minLength: 2 }],
            displayName: [{ required: true }, { minLength: 2 }],
            userClaims: [{ isArray: true }],
        }
    );
    useEffect(() => {
        if (props.apiResourceScopeList.Visible)
            resetForm([{ apiResourceId: props.apiResourceScopeList.apiResourceId }]);
    }, [props.apiResourceScopeList.Visible])
    useEffect(() => {
        resetForm([{ apiResourceId: props.apiResourceScopeList.apiResourceId }]);
    }, [props.apiResourceScopeList.data])
    const addClaimKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            if (claim != "") {
                let claims: string[] = values.userClaims;
                claims.push(claim);
                setValue(claims);
                setClaim("");
            } else
                props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
        }
    }
    const addClaim = () => {
        if (claim != "") {
            let claims: string[] = values.userClaims;
            claims.push(claim);
            setValue(claims);
            setClaim("");
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const removeClaim = (index: number) => {
        let claims: string[] = values.userClaims;
        claims.splice(index, 1);
        setValue(claims);
        setClaim("");
    }
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.saveApiResourceScope(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <GymAccessControl data={userAccessData.syncScopes}>
                <button className="btn btn-success mr-1"
                    onClick={() => props.toggleSyncApiResourceScopeModal(props.apiResourceScopeList.apiResourceId, true)}>
                    <span className="mdi mdi-18px mdi-sync mr-2"></span>
                    {t("sync")}
                </button>
            </GymAccessControl>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleApiResourceScopeModal(false)}>{t("cancel")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("scopes")} size="modal-xl" Visible={props.apiResourceScopeList.Visible} onCancel={() => props.toggleApiResourceScopeModal(false)} buttons={<Buttons />}>
            <div className="d-flex justify-content-between mb-3">
                <div className="col-10">
                    <div className="row justify-content-between">
                        <div className="form-group col-6">
                            <label htmlFor="name">{t("name")} </label>
                            <input className="form-control form-control-sm"
                                type="text"
                                name="name"
                                value={GetValue("name")}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder={t("placeHname")} />
                            <GetError name="name" />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="displayName">{t("displayName")} </label>
                            <input className="form-control form-control-sm"
                                type="text"
                                name="displayName"
                                value={GetValue("displayName")}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder={t("placeHdisplayName")} />
                            <GetError name="displayName" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userClaims">{t("userClaims")} </label>
                        <div className="d-flex position-relative">
                            <input type="text"
                                className="form-control form-control-sm"
                                placeholder={t("placeHclaims")}
                                onKeyUp={(e) => addClaimKeyPress(e)}
                                value={claim} onChange={(e) => setClaim(e.target.value)} />
                            <span
                                className="mdi mdi-18px mdi-plus btn btn-sm text-basic text-nowrap"
                                style={{ position: "absolute", marginLeft: "96%", top: "3px" }}
                                onClick={() => addClaim()} />
                        </div>
                        <div className="row mt-2 px-3">
                            {
                                values && values.userClaims ? values.userClaims.map((item: any, index: number) => {
                                    return (
                                        <span className="badge badge-success mr-1 p-2 mt-1">
                                            <span className="mdi mdi-18px mdi-delete link mr-2" onClick={() => removeClaim(index)} />
                                            {item}
                                        </span>
                                    )
                                })
                                    : ""
                            }
                        </div>
                    </div>
                </div>
                <div className="col-2 mt-5" style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <button className="btn btn-success pr-3" onClick={formSubmitHandler} style={{ float: "right" }}>
                        <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                        {t("add")}
                    </button>
                </div>
            </div>
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
                        {
                            field: 'item', headerName: t("operation"), lockPinned: true, pinned: 'right',
                            cellClass: 'lock-pinned', width: 100, cellRendererFramework: function (params: any) {
                                return <div className="btn-group">
                                    <GymAccessControl data={userAccessData.delete}>
                                        <button title={t("remove")} className="btn btn-sm btn-outline-secondary"
                                            onClick={() => props.toggleDeleteApiResourceScopeModal(params.value.apiResourceId, params.value.id, true)}>
                                            <span className="mdi mdi-18px mdi-delete" />
                                        </button>
                                    </GymAccessControl>
                                </div>
                            }
                        },
                    ]}
                    rowData={props.apiResourceScopeList.data ? props.apiResourceScopeList.data.map((item: any) => ({
                        name: item.name,
                        displayName: item.displayName,
                        userClaims: item.userClaims,
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
)(ApiResourceScopesModal);