import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { globalConfigurationActions } from '../../Actions/GlobalConfiguration/action';
import { IGlobalConfigurationState } from '../../Actions/GlobalConfiguration/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof globalConfigurationActions & IGlobalConfigurationState

const LoadBalancerOptionsUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            id: [{ required: true }, { isNumber: true }, { min: 1 }],
            type: [],
            key: [],
            expiry: [{ isNumber: true }, { min: 0 }]
        }
    );
    useEffect(() => {
        setInitialValues(props.loadBalancerOptionsSet.item)
    }, [props.loadBalancerOptionsSet.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.setLoadBalancerOptions(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleSetLoadBalancerOptionsModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("updateLoadBalancerOptions")} Visible={props.loadBalancerOptionsSet.Visible} onCancel={() => props.toggleSetLoadBalancerOptionsModal({}, false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="type">{t("type")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="type"
                    value={GetValue("type")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHtype")} />
                <GetError name="type" />
            </div>
            <div className="form-group">
                <label htmlFor="key">{t("key")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="key"
                    value={GetValue("key")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHkey")} />
                <GetError name="key" />
            </div>
            <div className="form-group">
                <label htmlFor="expiry">{t("expiry")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="expiry"
                    value={GetValue("expiry")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHexpiry")} />
                <GetError name="expiry" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.globalConfiguration,
    globalConfigurationActions,
)(LoadBalancerOptionsUpdate);