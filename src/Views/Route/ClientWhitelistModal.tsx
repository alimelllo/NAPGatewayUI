import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof routeActions & IRouteState

const ClientWhiteList = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, resetForm, setValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
            fileRateLimitRuleId: [{ required: true }, { isNumber: true }, { min: 1 }],
            client: [{ required: true }, { isIP: true }]
        }
    );
    useEffect(() => {
        setValues([
            { fileConfigurationId: props.clientWhiteModal.item.fileConfigurationId },
            { fileRouteId: props.clientWhiteModal.item.fileRouteId },
            { fileRateLimitRuleId: props.clientWhiteModal.item.fileRateLimitRuleId }
        ])
    }, [props.clientWhiteModal.item])
    const addClientClickHandler = () => {
        if (onFormSubmit()) {
            props.addClientWhite(values);
            resetForm([
                { fileConfigurationId: props.clientWhiteModal.item.fileConfigurationId },
                { fileRouteId: props.clientWhiteModal.item.fileRouteId },
                { fileRateLimitRuleId: props.clientWhiteModal.item.fileRateLimitRuleId }
            ]);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const addClientHandleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            if (onFormSubmit()) {
                props.addClientWhite(values);
                resetForm([
                    { fileConfigurationId: props.clientWhiteModal.item.fileConfigurationId },
                    { fileRouteId: props.clientWhiteModal.item.fileRouteId },
                    { fileRateLimitRuleId: props.clientWhiteModal.item.fileRateLimitRuleId }
                ]);
            } else
                props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
        }
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleClientWhiteListModal({}, false)}>{t("cancel")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("clientWhiteList")} Visible={props.clientWhiteModal.Visible} onCancel={() => props.toggleClientWhiteListModal({}, false)} buttons={<Buttons />}>
            <div className="d-flex position-relative">
                <input type="text"
                    name="client"
                    className="form-control form-control-sm"
                    placeholder={t("placeHclientWhite")}
                    onKeyUp={(e) => addClientHandleKeyPress(e)}
                    value={GetValue("client")}
                    onChange={(e) => onChangeHandler(e)} />
                <span
                    className="mdi mdi-18px mdi-plus btn btn-sm text-basic text-nowrap"
                    style={{ position: "absolute", marginLeft: "93%", top: "3px" }}
                    onClick={() => addClientClickHandler()} />
            </div>
            <GetError name="client" />
            <div className="row mt-2 px-3">
                {
                    props.clientWhiteModal.item && props.clientWhiteModal.item.clientWhitelist ? props.clientWhiteModal.item.clientWhitelist.map((client: any) => {
                        return (
                            <span className="badge badge-warning mr-1 p-2 mt-1">
                                <span className="mdi mdi-18px mdi-delete link mr-2" onClick={() => props.toggleRemoveClientWhiteModal({ fileConfigurationId: GetValue("fileConfigurationId"), fileRouteId: GetValue("fileRouteId"), fileRateLimitRuleId: GetValue("fileRateLimitRuleId"), client: client.client }, true)} />
                                {client.client}
                            </span>
                        )
                    })
                        : ""
                }
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(ClientWhiteList);