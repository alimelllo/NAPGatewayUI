import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { ssoConfigActions } from '../../Actions/SSOConfig/action';
import { ISSOConfigState } from '../../Actions/SSOConfig/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof ssoConfigActions & ISSOConfigState & { fileConfigurationId: number }

const CreateClient = (props: IProps) => {
    const [t] = useTranslation()
    const [scope, setScope] = useState<string>("")
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, resetForm, setValue } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }, { initialValue: props.fileConfigurationId }],
            clientId: [{ required: true }, { minLength: 2 }],
            clientName: [{ required: true }, { minLength: 2 }],
            clientSecret: [{ required: true }, { minLength: 2 }],
            grantType: [{ required: true }, { minLength: 2 }],
            allowedScopes: [{ isArray: true }],
            description: []
        }
    );
    useEffect(() => {
        if (props.clientCreate.Visible)
            resetForm();
    }, [props.clientCreate.Visible])
    const addScopeKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            if (scope != "") {
                let scopes: string[] = values.allowedScopes;
                scopes.push(scope);
                setValue(scopes);
                setScope("");
            } else
                props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
        }
    }
    const addScope = () => {
        if (scope != "") {
            let scopes: string[] = values.allowedScopes;
            scopes.push(scope);
            setValue(scopes);
            setScope("");
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const removeScope = (index: number) => {
        let claims: string[] = values.allowedScopes;
        claims.splice(index, 1);
        setValue(claims);
        setScope("");
    }
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.saveClient(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleCreateClientModal(false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("createClient")} Visible={props.clientCreate.Visible} onCancel={() => props.toggleCreateClientModal(false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="clientId">{t("clientId")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="clientId"
                    value={GetValue("clientId")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHclientId")} />
                <GetError name="clientId" />
            </div>
            <div className="form-group">
                <label htmlFor="clientName">{t("clientName")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="clientName"
                    value={GetValue("clientName")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHclientName")} />
                <GetError name="clientName" />
            </div>
            <div className="form-group">
                <label htmlFor="clientSecret">{t("clientSecret")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="clientSecret"
                    value={GetValue("clientSecret")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHclientSecret")} />
                <GetError name="clientSecret" />
            </div>
            <div className="form-group">
                <label htmlFor="grantType">{t("grantType")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="grantType"
                    value={GetValue("grantType")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHgrantType")} />
                <GetError name="grantType" />
            </div>
            <div className="form-group">
                <label htmlFor="allowedScopes">{t("allowedScopes")} </label>
                <div className="d-flex position-relative">
                    <input type="text"
                        className="form-control form-control-sm"
                        placeholder={t("placeHallowedScope")}
                        onKeyUp={(e) => addScopeKeyPress(e)}
                        value={scope} onChange={(e) => setScope(e.target.value)} />
                    <span
                        className="mdi mdi-18px mdi-plus btn btn-sm text-basic text-nowrap"
                        style={{ position: "absolute", marginLeft: "93%", top: "3px" }}
                        onClick={() => addScope()} />
                </div>
                <div className="row mt-2 px-3">
                    {
                        values && values.allowedScopes ? values.allowedScopes.map((item: any, index: number) => {
                            return (
                                <span className="badge badge-success mr-1 p-2 mt-1">
                                    <span className="mdi mdi-18px mdi-delete link mr-2" onClick={() => removeScope(index)} />
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
)(CreateClient);