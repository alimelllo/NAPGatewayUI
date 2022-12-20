import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof routeActions & IRouteState & {routeId:string}

const HttpHandlerOptionsUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
            allowAutoRedirect: [{ initialValue: false }],
            useCookieContainer: [{ initialValue: false }],
            useTracing: [{ initialValue: true }],
            useProxy: [{ initialValue: false }],
            maxConnectionsPerServer: [{ isNumber: true }, { min: 1 }]
        }
    );
    useEffect(() => {
        setInitialValues(props.httpHandlerOptionsSet.item)
    }, [props.httpHandlerOptionsSet.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.setHttpHandlerOptions(values,props.routeId);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleSetHttpHandlerOptionsModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("updateHttpHandlerOptions")} Visible={props.httpHandlerOptionsSet.Visible} onCancel={() => props.toggleSetHttpHandlerOptionsModal({}, false)} buttons={<Buttons />}>
            <div className="row px-3">
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="allowAutoRedirect" checked={GetValue("allowAutoRedirect")} onChange={(e) => setValue("allowAutoRedirect", e.target.checked)} />
                    <label className="custom-control-label" htmlFor="allowAutoRedirect">{t("allowAutoRedirect")}</label>
                </div>
            </div>
            <div className="row px-3">
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="useCookieContainer" checked={GetValue("useCookieContainer")} onChange={(e) => setValue("useCookieContainer", e.target.checked)} />
                    <label className="custom-control-label" htmlFor="useCookieContainer">{t("useCookieContainer")}</label>
                </div>
            </div>
            {/* <div className="row px-3">
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="useTracing" checked={GetValue("useTracing")} onChange={(e) => setValue("useTracing", e.target.checked)} />
                    <label className="custom-control-label" htmlFor="useTracing">{t("useTracing")}</label>
                </div>
            </div> */}
            <div className="row px-3">
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input" id="useProxy" checked={GetValue("useProxy")} onChange={(e) => setValue("useProxy", e.target.checked)} />
                    <label className="custom-control-label" htmlFor="useProxy">{t("useProxy")}</label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="maxConnectionsPerServer">{t("maxConnectionsPerServer")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="maxConnectionsPerServer"
                    value={GetValue("maxConnectionsPerServer")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHmaxConnectionsPerServer")} />
                <GetError name="maxConnectionsPerServer" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(HttpHandlerOptionsUpdate);