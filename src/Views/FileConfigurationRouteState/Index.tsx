import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationRouteStateActions } from '../../Actions/FileConfigurationRouteState/action';
import { IFileConfigurationRouteStateState } from '../../Actions/FileConfigurationRouteState/model';
import { GridOptions } from "ag-grid-community";
import "../../GeneralComponents/ToggleButton/GymToggleButton.css"
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import GymAlerts from '../../GeneralComponents/GymAlerts/GymAlerts';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import { Link } from 'react-router-dom';

type IProps = typeof fileConfigurationRouteStateActions & IFileConfigurationRouteStateState & GridOptions

const FileConfigurationRouteStateIndex = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Security", "Manager"], withNoAccessPage: true }
    }
    var colors = ["#8a64eb",
        "#E9573F",
        "#1267eb",
        "#F6BB42",
        "#967ADC",
        "#3a3985",
        "#3BAFDA",
        "#D770AD",
        "#4A89DC",
        "#fc8a91",
        "#15f5fd",
        "#5d6874",
        "#8CC152",
        "#37BC9B",
        "#DA4453",
        "#BF4453"]
    useEffect(() => {
        document.title = t("apigw") + " - " + t("routeStates");
    }, [t])
    useEffect(() => {
        props.getFileConfigurationList();
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="flex-fill">
                <GymLoading loading={props.fileConfigurationList.loading || props.routeStateList.loading || props.routeAcceptedSet.loading || props.routeIgnoredSet.loading || props.routeToLastStateSet.loading} />
                <div className="p-4">
                    <div className="subject d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {t("routeStates")}
                        </h5>
                    </div>
                    <div className="p-4 w-100">
                        <div className="container h-100">
                            <div className="row gym-dashboard justify-content-center h-100">
                                {props.fileConfigurationList.data && props.fileConfigurationList.data.length ? props.fileConfigurationList.data.map((item: any, i: number) => {
                                    return (
                                        <div className="col-sm-6 col-lg-4 mb-4">
                                            <Link to={"/FileConfigurationRouteState/" + item.id} rel="noopener noreferrer"
                                                className="gym-dashboard_item d-flex justify-content-center align-items-center p-5 h-100 rounded shadow-sm"
                                                style={{ backgroundColor: colors[i % 16] }}>
                                                <div className="bg-cover opacity-3 position-absolute full-offset"
                                                    style={{ backgroundImage: "url('content/images/image.jpg" }}>
                                                </div>
                                                {item.title}
                                                <div className="corners">
                                                    <span className="corners_top"></span>
                                                    <span className="corners_right"></span>
                                                    <span className="corners_bottom"></span>
                                                    <span className="corners_left"></span>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                }) : props.fileConfigurationList.loading ?
                                        <div className="d-flex align-items-center text-warning">
                                            <span className="mdi mdi-24px mdi-timer-sand"></span>
                                            <div className="font-weight-bold ml-2 mt-1" style={{ fontSize: "large" }}>{t("inProcess")}</div>
                                        </div>
                                        :
                                        <div className="d-flex align-items-center text-danger">
                                            <span className="mdi mdi-24px mdi-alert-outline"></span>
                                            <div className="font-weight-bold ml-2 mt-1" style={{ fontSize: "large" }}>{t("noFileConfigurations")}</div>
                                        </div>}
                            </div>
                        </div>
                    </div>
                    {/* <div className="d-flex bg-white rounded p-3 shadow-sm">
                        <FileConfigurationRouteStateGrid />
                    </div> */}
                </div>
            </div>
            <GymAlerts
                alerts={props.alerts}
                clearAlerts={() => props.clearAlerts()} />
        </GymAccessControl >
    )
}
export default connect(
    (state: IApplicationState) => state.fileConfigurationRouteState,
    fileConfigurationRouteStateActions,
)(FileConfigurationRouteStateIndex);