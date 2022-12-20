import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const CreateIdentityResource = (props: IProps) => {
    const [t] = useTranslation()
    const [claim, setClaim] = useState<string>("")
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, resetForm } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }, { initialValue: props.fileConfigurationId }],
            name: [{ required: true }, { minLength: 2 }],
            displayName: [{ required: true }, { minLength: 2 }],
            userClaims: [{ isArray: true }],
            description: []
        }
    );
    useEffect(() => {
        if (props.identityResourceCreate.Visible)
            resetForm();
    }, [props.identityResourceCreate.Visible])
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
            props.saveIdentityResource(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleCreateIdentityResourceModal(false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("createIdentityResource")} Visible={props.identityResourceCreate.Visible} onCancel={() => props.toggleCreateIdentityResourceModal(false)} buttons={<Buttons />}>
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
            <div className="form-group">
                <label htmlFor="displayName">{t("displayName")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="displayName"
                    value={GetValue("displayName")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHdisplayName")} />
                <GetError name="displayName" />
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
                        style={{ position: "absolute", marginLeft: "93%", top: "3px" }}
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
            <div className="form-group">
                <label htmlFor="description">{t("description")} </label>
                <textarea className="form-control form-control-sm"
                    name="description"
                    value={GetValue("description")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHdescription")} />
                <GetError name="description" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.ssoConfig,
    ssoConfigActions,
)(CreateIdentityResource);