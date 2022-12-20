import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationActions } from '../../Actions/FileConfiguration/action';
import { IFileConfigurationState } from '../../Actions/FileConfiguration/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof fileConfigurationActions & IFileConfigurationState

const FileConfigurationUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setInitialValues, resetForm } = useFormControl(
        {
            id: [{ required: true }, { isNumber: true }, { min: 1 }],
            title: [{ required: true }, { minLength: 2 }, { maxLength: 250 }],
            tracingUrl: [{ isUrl: true }],
            description: [{ maxLength: 2500 }]
        }
    );
    useEffect(() => {
        setInitialValues(props.fileConfigurationUpdate.item);
    }, [props.fileConfigurationUpdate.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.updateFileConfiguration(values);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleUpdateFileConfigurationModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <React.Fragment>
            <GymModal ModalTitle={t("edit")} Visible={props.fileConfigurationUpdate.Visible} onCancel={() => props.toggleUpdateFileConfigurationModal({}, false)} buttons={<Buttons />}>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">{t("title")}  </label>
                        <input className="form-control form-control-sm"
                            type="text"
                            name="title"
                            value={GetValue("title")}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder={t("placeHtitle")} />
                        <GetError name="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tracingUrl">{t("tracingUrl")}  </label>
                        <input className="form-control form-control-sm"
                            type="text"
                            name="tracingUrl"
                            value={GetValue("tracingUrl")}
                            onChange={(e) => onChangeHandler(e)}
                            placeholder={t("placeHtracingUrl")} />
                        <GetError name="tracingUrl" />
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
                </form >
            </GymModal>
        </React.Fragment>
    )
}

export default connect(
    (state: IApplicationState) => state.fileConfiguration,
    fileConfigurationActions,
)(FileConfigurationUpdate);