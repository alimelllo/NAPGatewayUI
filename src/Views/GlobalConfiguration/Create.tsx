import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { globalConfigurationActions } from '../../Actions/GlobalConfiguration/action';
import { IGlobalConfigurationState } from '../../Actions/GlobalConfiguration/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';
import Select from 'react-select';

type IProps = typeof globalConfigurationActions & IGlobalConfigurationState & { fileConfigurationId: number }

const GlobalConfigurationCreate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }, { initialValue: props.fileConfigurationId }],
            title: [{ required: true }, { minLength: 2 }, { maxLength: 250 }],
            requestIdKey: [],
            baseUrl: [{ required: true }, { isUrl: true }],
            downstreamScheme: [],
            downstreamHttpVersion: []
        }
    );
    var downstreamSchemes = [{ value: "http", label: "http" },
    { value: "https", label: "https" },
    { value: "ws", label: "ws" },
    { value: "wss", label: "wss" },
    { value: "ftp", label: "ftp" }];
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.createGlobalConfiguration(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleCreateGlobalConfigurationModal(false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("create")} size="modal-xl" Visible={props.globalConfigurationCreate.Visible} onCancel={() => props.toggleCreateGlobalConfigurationModal(false)} buttons={<Buttons />}>
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="title">{t("title")}  </label>
                    <input className="form-control form-control-sm"
                        type="text"
                        name="title"
                        value={GetValue("title")}
                        onChange={(e) => onChangeHandler(e)}
                        placeholder={t("placeHtitle")} />
                    <GetError name="title" />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="requestIdKey">{t("requestIdKey")}  </label>
                    <input className="form-control form-control-sm"
                        type="text"
                        name="requestIdKey"
                        value={GetValue("requestIdKey")}
                        onChange={(e) => onChangeHandler(e)}
                        placeholder={t("placeHrequestIdKey")} />
                    <GetError name="requestIdKey" />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="baseUrl">{t("baseUrl")}  </label>
                    <input className="form-control form-control-sm"
                        type="text"
                        name="baseUrl"
                        value={GetValue("baseUrl")}
                        onChange={(e) => onChangeHandler(e)}
                        placeholder={t("placeHbaseUrl")} />
                    <GetError name="baseUrl" />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="downstreamScheme">{t("downstreamScheme")}</label>
                    <Select
                        id="downstreamScheme"
                        value={downstreamSchemes.find(x => x.value == GetValue("downstreamScheme"))}
                        options={downstreamSchemes}
                        name="downstreamScheme"
                        onChange={(data: any) => setValue("downstreamScheme", data.value)} />
                    <GetError name="downstreamScheme" />
                </div>
                <div className="form-group col-6">
                    <label htmlFor="downstreamHttpVersion">{t("downstreamHttpVersion")}  </label>
                    <input className="form-control form-control-sm"
                        type="text"
                        name="downstreamHttpVersion"
                        value={GetValue("downstreamHttpVersion")}
                        onChange={(e) => onChangeHandler(e)}
                        placeholder={t("placeHdownstreamHttpVersion")} />
                    <GetError name="downstreamHttpVersion" />
                </div>
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.globalConfiguration,
    globalConfigurationActions,
)(GlobalConfigurationCreate);