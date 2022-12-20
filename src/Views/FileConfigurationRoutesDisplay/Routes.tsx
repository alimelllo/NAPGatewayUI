import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationRoutesDisplayActions } from '../../Actions/FileConfigurationRoutesDisplay/action';
import { IFileConfigurationRoutesDisplayState } from '../../Actions/FileConfigurationRoutesDisplay/model';
import RouteGrid from './Grid'
import "../../GeneralComponents/ToggleButton/GymToggleButton.css"
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import GymAlerts from '../../GeneralComponents/GymAlerts/GymAlerts';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import { RouteComponentProps } from 'react-router-dom';

type IProps = typeof fileConfigurationRoutesDisplayActions & IFileConfigurationRoutesDisplayState & RouteComponentProps<{ fileconfigurationid: string }>

const RouteState = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Supervisor", "Manager"], withNoAccessPage: true }
    }
    useEffect(() => {
        document.title = t("apigw") + " - " + t("activeRoutes")
    }, [t])
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="flex-fill">
                <GymLoading loading={props.routeList.loading} />
                <div className="p-4">
                    <div className="subject d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {t("activeRoutes")}
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
                        <RouteGrid fileConfigurationId={Number(props.match.params.fileconfigurationid)} />
                    </div>
                </div>
            </div>
            <GymAlerts
                alerts={props.alerts}
                clearAlerts={() => props.clearAlerts()} />
        </GymAccessControl>
    )
}
export default connect(
    (state: IApplicationState) => state.fileConfigurationRoutesDisplay,
    fileConfigurationRoutesDisplayActions,
)(RouteState);