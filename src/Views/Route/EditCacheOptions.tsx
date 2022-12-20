import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { useTranslation } from 'react-i18next';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof routeActions & IRouteState & {routeId:string}

const CacheOptionsUpdate = (props: IProps) => {
    const [t] = useTranslation()
    const { values, onChangeHandler, onFormSubmit, GetError, GetValue, setValue, setInitialValues } = useFormControl(
        {
            fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
            fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
            ttlSeconds: [{ isNumber: true }, { min: 0 }],
            region: []
        }
    );
    useEffect(() => {
        setInitialValues(props.fileCacheOptionsSet.item)
    }, [props.fileCacheOptionsSet.item])
    const formSubmitHandler = () => {
        if (onFormSubmit()) {
            props.setFileCacheOptions(values,props.routeId);
        } else
            props.pushAlert({ title: t('userError'), description: t('DataIsIncomplete'), variant: 'warning' })
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleSetFileCacheOptionsModal({}, false)}>{t("cancel")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={formSubmitHandler}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("updateCacheOptions")} Visible={props.fileCacheOptionsSet.Visible} onCancel={() => props.toggleSetFileCacheOptionsModal({}, false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="ttlSeconds">{t("ttlSeconds")}  </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="ttlSeconds"
                    value={GetValue("ttlSeconds")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHttlSeconds")} />
                <GetError name="ttlSeconds" />
            </div>
            <div className="form-group">
                <label htmlFor="region">{t("region")} </label>
                <input className="form-control form-control-sm"
                    type="text"
                    name="region"
                    value={GetValue("region")}
                    onChange={(e) => onChangeHandler(e)}
                    placeholder={t("placeHregion")} />
                <GetError name="region" />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(CacheOptionsUpdate);