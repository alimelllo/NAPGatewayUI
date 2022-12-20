import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { globalConfigurationActions } from '../../Actions/GlobalConfiguration/action';
import { IGlobalConfigurationState } from '../../Actions/GlobalConfiguration/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof globalConfigurationActions & IGlobalConfigurationState

const ServiceDiscoveryProviderUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            id: [{ required: true }, { isNumber: true }, { min: 1 }],
            scheme: [],
            host: [],
            port: [{ isNumber: true }, { min: 0 }],
            type: [],
            token: [],
            configurationKey: [],
            pollingInterval: [{ isNumber: true }, { min: 0 }],
            nameSpace: [],
        }
    );
    useEffect(() => {
        setInitialValues(props.serviceDiscoveryProviderSet.item)
    }, [props.serviceDiscoveryProviderSet.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.setServiceDiscoveryProvider(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleSetServiceDiscoveryProviderModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("updateRateLimitRule")} Visible={props.serviceDiscoveryProviderSet.Visible} onCancel={() => props.toggleSetServiceDiscoveryProviderModal({}, false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="scheme">{t("scheme")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="scheme"
                    value={GetValue("scheme")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHscheme")} />
                <GetError name="scheme" />
            </div>
            <div className="form-group">
                <label htmlFor="host">{t("host")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="host"
                    value={GetValue("host")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHhost")} />
                <GetError name="host" />
            </div>
            <div className="form-group">
                <label htmlFor="port">{t("port")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="port"
                    value={GetValue("port")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHport")} />
                <GetError name="port" />
            </div>
            <div className="form-group">
                <label htmlFor="type">{t("type")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="type"
                    value={GetValue("type")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHtype")} />
                <GetError name="type" />
            </div>
            <div className="form-group">
                <label htmlFor="token">{t("token")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="token"
                    value={GetValue("token")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHtoken")} />
                <GetError name="token" />
            </div>
            <div className="form-group">
                <label htmlFor="configurationKey">{t("configurationKey")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="configurationKey"
                    value={GetValue("configurationKey")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHconfigurationKey")} />
                <GetError name="configurationKey" />
            </div>
            <div className="form-group">
                <label htmlFor="pollingInterval">{t("pollingInterval")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="pollingInterval"
                    value={GetValue("pollingInterval")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHpollingInterval")} />
                <GetError name="pollingInterval" />
            </div>
            <div className="form-group">
                <label htmlFor="nameSpace">{t("nameSpace")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="nameSpace"
                    value={GetValue("nameSpace")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHnameSpace")} />
                <GetError name="nameSpace" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.globalConfiguration,
    globalConfigurationActions,
)(ServiceDiscoveryProviderUpdate);