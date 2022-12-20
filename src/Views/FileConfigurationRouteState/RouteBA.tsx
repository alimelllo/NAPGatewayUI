import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationRouteStateActions } from '../../Actions/FileConfigurationRouteState/action';
import { IFileConfigurationRouteStateState } from '../../Actions/FileConfigurationRouteState/model';
import { useTranslation } from 'react-i18next';
import GymModal from '../../GeneralComponents/GymModal/GymModal';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';

type IProps = typeof fileConfigurationRouteStateActions & IFileConfigurationRouteStateState

const RoutePushHistory = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        manager: { roles: ["Manager"] },
        security: { roles: ["Security"] }
    }
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleRouteBAModal(false)}><span className="mdi mdi-18px mdi-chevron-left" />{t("back")}</button>
            <GymAccessControl data={userAccessData.security}>
                <button type="button" className="btn btn-warning" disabled={props.routeBA.routeState == 0 || props.routeBA.routeState == 3} onClick={() => props.toggleRouteToLastStateModal(props.routeBA.item, true)}><span className="mdi mdi-18px mdi-refresh mr-1" />{t("returnToLastState")}</button>
            </GymAccessControl>
            <GymAccessControl data={userAccessData.security}>
                <button type="button" className="btn btn-danger" disabled={props.routeBA.routeState == 2 || props.routeBA.routeState == 3} onClick={() => props.toggleRouteIgnoredModal(props.routeBA.item, true)}><span className="mdi mdi-18px mdi-block-helper mr-1" />{t("ignore")}</button>
            </GymAccessControl>
            <GymAccessControl data={userAccessData.security}>
                <button type="button" className="btn btn-success" disabled={!props.routeBA.managerAccept} onClick={() => props.toggleRouteAcceptedModal(props.routeBA.item, true)}><span className="mdi mdi-18px mdi-check-all mr-1" />{t("accept")}</button>
            </GymAccessControl>
            <GymAccessControl data={userAccessData.manager}>
                <button type="button" className="btn btn-success" disabled={props.routeBA.managerAccept} onClick={() => props.toggleRouteManagerAcceptedModal(props.routeBA.item, true)}><span className="mdi mdi-18px mdi-check mr-1" />{t("managerAccept")}</button>
            </GymAccessControl>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("routeBA")} size={"modal-xl"} Visible={props.routeBA.Visible} onCancel={() => props.toggleRouteBAModal(false)} buttons={<Buttons />}>
            <div className="row justify-content-between">
                <div className="col-6">
                    {t("befor")}:
                    <JSONPretty id="json-pretty-befor" data={props.routeBA.data.befor}></JSONPretty>
                </div>
                <div className="col-6">
                    {t("after")}:
                    <JSONPretty id="json-pretty-after" data={props.routeBA.data.after}></JSONPretty>
                </div>
            </div>
        </GymModal>
    )
}
export default connect(
    (state: IApplicationState) => state.fileConfigurationRouteState,
    fileConfigurationRouteStateActions,
)(RoutePushHistory);