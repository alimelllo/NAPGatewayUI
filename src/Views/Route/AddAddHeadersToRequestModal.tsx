import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof routeActions & IRouteState & {routeId:string}

const AddAddHeadersToRequestModal = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, resetForm } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
            key: [{ required: true }],
            value: [{ required: true }]
        }
    );
    useEffect(() => {
        if (props.addHeadersToRequestAdd.Visible)
            resetForm([{ fileConfigurationId: props.addHeadersToRequestAdd.fileConfigurationId }, { fileRouteId: props.addHeadersToRequestAdd.fileRouteId }]);
    }, [props.addHeadersToRequestAdd.Visible])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.addAddHeadersToRequest(values,props.routeId);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleAddAddHeadersToRequestModal(0, 0, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("addAddHeadersToRequest")} Visible={props.addHeadersToRequestAdd.Visible} onCancel={() => props.toggleAddAddHeadersToRequestModal(0, 0, false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="key">{t("key")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="key"
                    value={GetValue("key")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHkey")} />
                <GetError name="key" />
            </div>
            <div className="form-group">
                <label htmlFor="value">{t("value")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="value"
                    value={GetValue("value")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHvalue")} />
                <GetError name="value" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(AddAddHeadersToRequestModal);