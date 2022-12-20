import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationRouteStateActions } from '../../Actions/FileConfigurationRouteState/action';
import { IFileConfigurationRouteStateState } from '../../Actions/FileConfigurationRouteState/model';
import RouteStateGrid from './Grid'
import "../../GeneralComponents/ToggleButton/GymToggleButton.css"
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import GymAlerts from '../../GeneralComponents/GymAlerts/GymAlerts';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import { RouteComponentProps } from 'react-router-dom';
import GymQuestionModal from '../../GeneralComponents/GymQuestionModal/GymQuestionModal';
import RouteBA from './RouteBA';

type IProps = typeof fileConfigurationRouteStateActions & IFileConfigurationRouteStateState & RouteComponentProps<{ fileconfigurationid: string }>

const RouteState = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Security", "Manager"], withNoAccessPage: true },
        manager: { roles: ["Manager"] },
        security: { roles: ["Security"] }
    }
    useEffect(() => {
        document.title = t("apigw") + " - " + t("routeStates")
    }, [t])
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="flex-fill">
                <GymLoading loading={props.fileConfigurationList.loading || props.routeBA.loading || props.routeStateList.loading || props.routeAcceptedSet.loading || props.routeIgnoredSet.loading || props.routeToLastStateSet.loading} />
                <div className="p-4">
                    <div className="subject d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {t("routeStates")}
                        </h5>
                        <div>
                            <button className="btn btn-secondary mr-1"
                                onClick={() => window.history.back()}>
                                <span className="mdi mdi-18px mdi-chevron-left mr-2"></span>
                                {t("back")}
                            </button>
                        </div>
                    </div>
                    <div className="d-flex bg-white rounded p-3 shadow-sm">
                        <RouteStateGrid fileConfigurationId={Number(props.match.params.fileconfigurationid)} />
                    </div>
                </div>
            </div>
            <RouteBA />
            <GymAccessControl data={userAccessData.manager}>
                <GymQuestionModal
                    title={t("accept")}
                    description={t("acceptQuestion")}
                    visible={props.routeManagerAcceptedSet.Visible}
                    onCancel={() => props.toggleRouteManagerAcceptedModal({}, false)}
                    onAccept={() => props.setRouteManagerAccepted()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.security}>
                <GymQuestionModal
                    title={t("accept")}
                    description={t("acceptQuestion")}
                    visible={props.routeAcceptedSet.Visible}
                    onCancel={() => props.toggleRouteAcceptedModal({}, false)}
                    onAccept={() => props.setRouteAccepted()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.security}>
                <GymQuestionModal
                    title={t("ignore")}
                    description={t("ignoreQuestion")}
                    visible={props.routeIgnoredSet.Visible}
                    onCancel={() => props.toggleRouteIgnoredModal({}, false)}
                    onAccept={() => props.setRouteIgnored()} />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.security}>
                <GymQuestionModal
                    title={t("returnToLastState")}
                    description={t("returnToLastStateQuestion")}
                    visible={props.routeToLastStateSet.Visible}
                    onCancel={() => props.toggleRouteToLastStateModal({}, false)}
                    onAccept={() => props.setRouteToLastState()} />
            </GymAccessControl>
            <GymAlerts
                alerts={props.alerts}
                clearAlerts={() => props.clearAlerts()} />
        </GymAccessControl>
    )
}
export default connect(
    (state: IApplicationState) => state.fileConfigurationRouteState,
    fileConfigurationRouteStateActions,
)(RouteState);