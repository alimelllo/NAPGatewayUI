import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const CreateRole = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, resetForm } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }, { initialValue: props.fileConfigurationId }],
            name: [{ required: true }, { minLength: 2 }]
        }
    );
    useEffect(() => {
        if (props.roleCreate.Visible)
            resetForm();
    }, [props.roleCreate.Visible])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.saveRole(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleCreateRoleModal(false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("createRole")} Visible={props.roleCreate.Visible} onCancel={() => props.toggleCreateRoleModal(false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="name">{t("name")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="name"
                    value={GetValue("name")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHname")} />
                <GetError name="name" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.ssoConfig,
    ssoConfigActions,
)(CreateRole);