import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { globalConfigurationActions } from '../../Actions/GlobalConfiguration/action';
import { IGlobalConfigurationState } from '../../Actions/GlobalConfiguration/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof globalConfigurationActions & IGlobalConfigurationState

const QoSOptionsUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            id: [{ required: true }, { isNumber: true }, { min: 1 }],
            exceptionsAllowedBeforeBreaking: [{ isNumber: true }, { min: 0 }],
            durationOfBreak: [{ isNumber: true }, { min: 0 }],
            timeoutValue: [{ isNumber: true }, { min: 0 }]
        }
    );
    useEffect(() => {
        setInitialValues(props.qoSOptionsSet.item)
    }, [props.qoSOptionsSet.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.setQoSOptions(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleSetQoSOptionsModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("updateqoSOptions")} Visible={props.qoSOptionsSet.Visible} onCancel={() => props.toggleSetQoSOptionsModal({}, false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="exceptionsAllowedBeforeBreaking">{t("exceptionsAllowedBeforeBreaking")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="exceptionsAllowedBeforeBreaking"
                    value={GetValue("exceptionsAllowedBeforeBreaking")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHexceptionsAllowedBeforeBreaking")} />
                <GetError name="exceptionsAllowedBeforeBreaking" />
            </div>
            <div className="form-group">
                <label htmlFor="durationOfBreak">{t("durationOfBreak")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="durationOfBreak"
                    value={GetValue("durationOfBreak")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHdurationOfBreak")} />
                <GetError name="durationOfBreak" />
            </div>
            <div className="form-group">
                <label htmlFor="timeoutValue">{t("timeoutValue")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="timeoutValue"
                    value={GetValue("timeoutValue")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHtimeoutValue")} />
                <GetError name="timeoutValue" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.globalConfiguration,
    globalConfigurationActions,
)(QoSOptionsUpdate);