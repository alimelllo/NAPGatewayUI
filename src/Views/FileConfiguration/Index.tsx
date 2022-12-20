import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationActions } from '../../Actions/FileConfiguration/action';
import { IFileConfigurationState } from '../../Actions/FileConfiguration/model';
import { GridOptions } from "ag-grid-community";
import FileConfigurationGrid from './Grid'
import "../../GeneralComponents/ToggleButton/GymToggleButton.css"
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import GymAlerts from '../../GeneralComponents/GymAlerts/GymAlerts';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import Create from './Create';
import Edit from './Edit';
import { Link } from 'react-router-dom';

type IProps = typeof fileConfigurationActions & IFileConfigurationState & GridOptions

const FileConfigurationIndex = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager", "Supervisor"], withNoAccessPage: true },
        showRoutes: { roles: ["Operator", "Manager"] },
        showActiveRoutes: { roles: ["Manager", "Supervisor"] },
        create: { roles: ["Operator", "Manager"] },
        edit: { roles: ["Operator", "Manager"] },
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
        document.title = t("apigw") + " - " + t("fileConfigurations");
    }, [t])
    useEffect(() => {
        props.getFileConfigurationList();
        if (!props.options.loaded)
            props.getOptions();
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="flex-fill">
                <GymLoading loading={props.fileConfigurationList.loading || props.fileConfigurationCreate.loading || props.fileConfigurationUpdate.loading || props.options.loading} />
                <div className="p-4">
                    <div className="subject d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {t("fileConfigurations")}
                        </h5>
                        <div>
                            {props.options.loaded && !props.fileConfigurationList.loading && props.fileConfigurationList.data.length < props.options.data.mapgc ?
                                <GymAccessControl data={userAccessData.create}>
                                    <button className="btn btn-info"
                                        onClick={() => props.toggleCreateFileConfigurationModal(true)}>
                                        <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                                        {t("create")}
                                    </button>
                                </GymAccessControl>
                                : ""}
                        </div>
                    </div>
                    <div className="p-4 w-100">
                        <div className="container h-100">
                            <div className="row gym-dashboard justify-content-center h-100">
                                {props.fileConfigurationList.data && props.fileConfigurationList.data.length ? props.fileConfigurationList.data.map((item: any, i: number) => {
                                    if (i <= props.options.data.mapgc)
                                        return (
                                            <div className="col-sm-6 col-lg-4 mb-4" title={item.description} >
                                                <div
                                                    className="gym-dashboard_item d-flex justify-content-center align-items-center p-5 h-100 rounded shadow-sm"
                                                    style={{ backgroundColor: colors[i % 16] }}>
                                                    <div className="bg-cover opacity-3 position-absolute full-offset" style={{ backgroundImage: "url('content/images/image.jpg')" }} />
                                                    <div className="d-flex flex-column" style={{ zIndex: 100 }}>
                                                        <span className="position-relative z-1 p-3 text-center text-nowrap">{item.title}</span>
                                                        <div className="row justify-content-center">
                                                            <GymAccessControl data={userAccessData.edit}>
                                                                <a title={t("edit")} onClick={() => props.toggleUpdateFileConfigurationModal(item, true)}><span className="mdi mdi-24px mdi-pencil px-1 text-white link" title={t("edit")} /></a>
                                                            </GymAccessControl>
                                                            <GymAccessControl data={userAccessData.showRoutes}>
                                                                <Link title={t("routes")} to={"/Routes/" + item.id}> <span className="mdi mdi-24px mdi-lan px-1 text-white" title={t("routes")} /></Link>
                                                            </GymAccessControl>
                                                            <GymAccessControl data={userAccessData.showRoutes}>
                                                                <Link title={t("highAvailabilities")} to={"/GlobalConfiguration/" + item.id}> <span className="mdi mdi-24px mdi-nfc-tap px-1 text-white" title={t("highAvailabilities")} /></Link>
                                                            </GymAccessControl>
                                                            <GymAccessControl data={userAccessData.showRoutes}>
                                                                <Link title={t("ssoConfig")} to={"/SSOConfiguration/" + item.id}> <span className="mdi mdi-24px mdi-shield-outline px-1 text-white" title={t("ssoConfig")} /></Link>
                                                            </GymAccessControl>
                                                            <GymAccessControl data={userAccessData.showActiveRoutes}>
                                                                <Link title={t("activeRoutes")} to={"/ActiveRoutes/" + item.id}> <span className="mdi mdi-24px mdi-monitor px-1 text-white" title={t("activeRoutes")} /></Link>
                                                            </GymAccessControl>
                                                            {item.tracingUrl ?
                                                                // <Link to={{ pathname: (item.tracingUrl.startsWith("http://") || item.tracingUrl.startsWith("https://") ? "" : "http://") + item.tracingUrl }} target="_blank"><span className="mdi mdi-24px mdi-chart-pie px-1 text-white link" title={t("tracing")} /></Link>
                                                                <GymAccessControl data={userAccessData.showRoutes}>
                                                                    <Link to={"/Tracing/" + item.id}><span className="mdi mdi-24px mdi-chart-pie px-1 text-white link" title={t("tracing")} /></Link>
                                                                    <Link to={"/ClientTracing/" + item.id}><span className="mdi mdi-24px mdi-account-multiple-outline px-1 text-white link" title={t("clientTracing")} /></Link>
                                                                </GymAccessControl>
                                                                : ""}
                                                        </div>
                                                    </div>
                                                    <div className="corners">
                                                        <span className="corners_top"></span>
                                                        <span className="corners_right"></span>
                                                        <span className="corners_bottom"></span>
                                                        <span className="corners_left"></span>
                                                    </div>
                                                </div>
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
                        <FileConfigurationGrid />
                    </div> */}
                </div>
            </div>
            <GymAccessControl data={userAccessData.create}>
                <Create />
            </GymAccessControl>
            <GymAccessControl data={userAccessData.edit}>
                <Edit />
            </GymAccessControl>
            <GymAlerts
                alerts={props.alerts}
                clearAlerts={() => props.clearAlerts()} />
        </GymAccessControl >
    )
}
export default connect(
    (state: IApplicationState) => state.fileConfiguration,
    fileConfigurationActions,
)(FileConfigurationIndex);