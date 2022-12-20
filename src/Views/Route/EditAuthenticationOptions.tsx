import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof routeActions & IRouteState & {routeId:string}

const AuthenticationOptionsUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
            authenticationProviderKey: []
        }
    );
    useEffect(() => {
        setInitialValues(props.authenticationOptionsSet.item)
    }, [props.authenticationOptionsSet.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.setAuthenticationOptions(values,props.routeId);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleSetAuthenticationOptionsModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("updateAuthenticationOptions")} Visible={props.authenticationOptionsSet.Visible} onCancel={() => props.toggleSetAuthenticationOptionsModal({}, false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="authenticationProviderKey">{t("authenticationProviderKey")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="authenticationProviderKey"
                    value={GetValue("authenticationProviderKey")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHauthenticationProviderKey")} />
                <GetError name="authenticationProviderKey" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(AuthenticationOptionsUpdate);