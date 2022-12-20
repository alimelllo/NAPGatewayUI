import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof dashboardActions & IApplicationState

const ChangePass = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue } = useFormControl(
        {
            userId: [{ required: true }],
            password: [{ required: true }, { minLength: 8 }, { maxLength: 16 }],
            confirmPassword: [{ required: true }, { minLength: 8 }, { maxLength: 16 }]
        }
    );
    useEffect(() => {
        setValue("userId", props.oidc.user?.profile?.sub)
    }, [props.dashboard.userPassUpdate.Visible])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.updateUserPass(values)
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleUpdateUserPassModal(false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <React.Fragment>
            <GymModal ModalTitle={t("changePassword")} Visible={props.dashboard.userPassUpdate.Visible} onCancel={() => props.toggleUpdateUserPassModal(false)} buttons={<Buttons />}>
                <form>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="password">
                                {t("password")}
                            </label>
                            <input className="form-control form-control-sm"
                                type="password"
                                name="password"
                                value={GetValue("password")}
                                onChange={(e) => { onChangeHandler(e); }}
                                placeholder={t("placeHpassword")} />
                            <GetError name="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                {t("confirmPassword")}
                            </label>
                            <input className="form-control form-control-sm"
                                type="password"
                                name="confirmPassword"
                                value={GetValue("confirmPassword")}
                                onChange={(e) => { onChangeHandler(e); }}
                                placeholder={t("placeHconfirmPassword")} />
                            <GetError name="confirmPassword" />
                        </div>
                    </div>
                </form>
            </GymModal>
        </React.Fragment >
    )
}
export default connect(
    (state: IApplicationState) => state,
    dashboardActions,
)(ChangePass);