import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';
import Select from 'react-select';

type IProps = typeof routeActions & IRouteState & {routeId:string}

const PreAuthenticationPartyUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
            url: [{ isUrl: true }],
            requestType: [],
            resultField: [],
            responseType: [],
            keyName: [],
            keyPosition: []
        }
    );
    var requestTypes = [{ value: "", label: "noSelect" }, { value: "x-www-form-urlencoded", label: "x-www-form-urlencoded" }, { value: "json", label: "json" }];
    var keyPositions = [{ value: "", label: "noSelect" }, { value: "Body", label: "Body" }, { value: "Header", label: "Header" }];
    useEffect(() => {
        setInitialValues(props.preAuthenticationPartySet.item)
    }, [props.preAuthenticationPartySet.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.setPreAuthenticationParty(values,props.routeId);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleSetPreAuthenticationPartyModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("updatePreAuthenticationParty")} Visible={props.preAuthenticationPartySet.Visible} onCancel={() => props.toggleSetPreAuthenticationPartyModal({}, false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="url">{t("url")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="url"
                    value={GetValue("url")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHurl")} />
                <GetError name="url" />
            </div>
            <div className="form-group">
                <label htmlFor="requestType">{t("requestType")}  </label>
                <Select
                    id="requestType"
                    value={requestTypes.find(x => x.value == GetValue("requestType")) ? requestTypes.find(x => x.value == GetValue("requestType")) : null}
                    options={requestTypes}
                    name="requestType"
                    onChange={(data: any) => setValue("requestType", data.value)} />
                <GetError name="requestType" />
            </div>
            <div className="form-group">
                <label htmlFor="resultField">{t("resultField")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="resultField"
                    value={GetValue("resultField")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHresultField")} />
                <GetError name="resultField" />
            </div>
            <div className="form-group">
                <label htmlFor="responseType">{t("responseType")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="responseType"
                    value={GetValue("responseType")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHresponseType")} />
                <GetError name="responseType" />
            </div>
            <div className="form-group">
                <label htmlFor="keyName">{t("keyName")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="keyName"
                    value={GetValue("keyName")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHkeyName")} />
                <GetError name="keyName" />
            </div>
            <div className="form-group">
                <label htmlFor="keyPosition">{t("keyPosition")}  </label>
                <Select
                    id="keyPosition"
                    value={keyPositions.find(x => x.value == GetValue("keyPosition")) ? keyPositions.find(x => x.value == GetValue("keyPosition")) : null}
                    options={keyPositions}
                    name="keyPosition"
                    onChange={(data: any) => setValue("keyPosition", data.value)} />
                <GetError name="keyPosition" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(PreAuthenticationPartyUpdate);