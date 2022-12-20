import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { globalConfigurationActions } from '../../Actions/GlobalConfiguration/action';
import { IGlobalConfigurationState } from '../../Actions/GlobalConfiguration/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof globalConfigurationActions & IGlobalConfigurationState

const RateLimitOptionsUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            id: [{ required: true }, { isNumber: true }, { min: 1 }],
            clientIdHeader: [],
            quotaExceededMessage: [],
            rateLimitCounterPrefix: [],
            disableRateLimitHeaders: [{ initialValue: false }],
            httpStatusCode: [{ isNumber: true }, { min: 0 }],
        }
    );
    useEffect(() => {
        setInitialValues(props.rateLimitOptionsSet.item)
    }, [props.rateLimitOptionsSet.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.setRateLimitOptions(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleSetRateLimitOptionsModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("updateRateLimitOptions")} Visible={props.rateLimitOptionsSet.Visible} onCancel={() => props.toggleSetRateLimitOptionsModal({}, false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="clientIdHeader">{t("clientIdHeader")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="clientIdHeader"
                    value={GetValue("clientIdHeader")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHclientIdHeader")} />
                <GetError name="clientIdHeader" />
            </div>
            <div className="form-group">
                <label htmlFor="quotaExceededMessage">{t("quotaExceededMessage")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="quotaExceededMessage"
                    value={GetValue("quotaExceededMessage")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHquotaExceededMessage")} />
                <GetError name="quotaExceededMessage" />
            </div>
            <div className="form-group">
                <label htmlFor="rateLimitCounterPrefix">{t("rateLimitCounterPrefix")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="rateLimitCounterPrefix"
                    value={GetValue("rateLimitCounterPrefix")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHrateLimitCounterPrefix")} />
                <GetError name="rateLimitCounterPrefix" />
            </div>
            <div className="row px-3">
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="disableRateLimitHeaders" checked={GetValue("disableRateLimitHeaders")} onChange={(e) => setValue("disableRateLimitHeaders", e.target.checked)} />
                    <label className="custom-control-label" htmlFor="disableRateLimitHeaders">{t("disableRateLimitHeaders")}</label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="httpStatusCode">{t("httpStatusCode")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="httpStatusCode"
                    value={GetValue("httpStatusCode")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHhttpStatusCode")} />
                <GetError name="httpStatusCode" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.globalConfiguration,
    globalConfigurationActions,
)(RateLimitOptionsUpdate);