import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { useTranslation } from 'react-i18next';
import GymModal from '../../GeneralComponents/GymModal/GymModal';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

type IProps = typeof routeActions & IRouteState

const RouteHistoryBA = (props: IProps) => {
    const [t] = useTranslation()
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleRouteHistoryBAModal(false)}><span className="mdi mdi-18px mdi-chevron-left" />{t("back")}</button>
            {/* <button type="button" className="btn btn-warning" disabled={props.routeBA.routeState == 0} onClick={() => props.toggleRouteToLastStateModal(props.routeBA.item, true)}><span className="mdi mdi-18px mdi-refresh mr-1" />{t("returnToLastState")}</button> */}
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("routeBA")} size={"modal-xl"} Visible={props.routeHistoryBA.Visible} onCancel={() => props.toggleRouteHistoryBAModal(false)} buttons={<Buttons />}>
            <div className="row justify-content-between">
                <div className="col-6">
                    {t("befor")}:
                    <JSONPretty id="json-pretty-befor" data={props.routeHistoryBA.data.befor}></JSONPretty>
                </div>
                <div className="col-6">
                    {t("after")}:
                    <JSONPretty id="json-pretty-after" data={props.routeHistoryBA.data.after}></JSONPretty>
                </div>
            </div>
        </GymModal>
    )
}
export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(RouteHistoryBA);