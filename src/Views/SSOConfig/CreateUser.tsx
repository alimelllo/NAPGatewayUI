import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const CreateUser = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, resetForm } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }, { initialValue: props.fileConfigurationId }],
            userName: [{ required: true }, { minLength: 2 }],
            email: [{ required: true }, { emailValidate: true }],
            mobileNumber: [{ required: true }, { isMobile: true }, { isStringNumber: true }, { minLength: 11 }, { maxLength: 11 }],
            password: [{ required: true }, { minLength: 8 }],
            password1: [{ required: true }, { minLength: 8 }]
        }
    );
    useEffect(() => {
        if (props.userCreate.Visible)
            resetForm();
    }, [props.userCreate.Visible])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            if (values.password == values.password1)
                props.saveUser(values);
            else
                props.pushAlert({ title: t('userError'), description: t('passwordConfirmWrong'), variant: 'warning' })
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleCreateUserModal(false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("createUser")} Visible={props.userCreate.Visible} onCancel={() => props.toggleCreateUserModal(false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="userName">{t("userName")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="userName"
                    value={GetValue("userName")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHuserName")} />
                <GetError name="userName" />
            </div>
            <div className="form-group">
                <label htmlFor="email">{t("email")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="email"
                    value={GetValue("email")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHemail")} />
                <GetError name="email" />
            </div>
            <div className="form-group">
                <label htmlFor="mobileNumber">{t("mobileNumber")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="mobileNumber"
                    value={GetValue("mobileNumber")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHmobileNumber")} />
                <GetError name="mobileNumber" />
            </div>
            <div className="form-group">
                <label htmlFor="password">{t("password")} </label>
                <input className="form-control form-control-sm"
                    type="password"
                    name="password"
                    value={GetValue("password")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHpassword")} />
                <GetError name="password" />
            </div>
            <div className="form-group">
                <label htmlFor="password1">{t("confirmPassword")} </label>
                <input className="form-control form-control-sm"
                    type="password"
                    name="password1"
                    value={GetValue("password1")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHconfirmPassword")} />
                <GetError name="password1" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.ssoConfig,
    ssoConfigActions,
)(CreateUser);