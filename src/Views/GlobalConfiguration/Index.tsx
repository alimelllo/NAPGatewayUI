import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { globalConfigurationActions } from '../../Actions/GlobalConfiguration/action';
import { IGlobalConfigurationState } from '../../Actions/GlobalConfiguration/model';
import { GridOptions } from "ag-grid-community";
import "../../GeneralComponents/ToggleButton/GymToggleButton.css"
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import GymAlerts from '../../GeneralComponents/GymAlerts/GymAlerts';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import { RouteComponentProps } from 'react-router-dom';
import Edit from './Edit';
import EditQoSOptions from './EditQoSOptions';
import EditLoadBalancerOptions from './EditLoadBalancerOptions';
import EditRateLimitOptions from './EditRateLimitOptions';
import EditHttpHandlerOptions from './EditHttpHandlerOptions';
import EditServiceDiscoveryProvider from './EditServiceDiscoveryProvider';
import ItemView from '../Route/ItemView';
import Create from './Create';
import GymQuestionModal from '../../GeneralComponents/GymQuestionModal/GymQuestionModal';
import GymDeleteModal from '../../GeneralComponents/GymDeleteModal/GymDeleteModal';
import RoutePushHistory from './RoutePushHistory';

type IProps = typeof globalConfigurationActions & IGlobalConfigurationState & GridOptions & RouteComponentProps<{ fileconfigurationid: string }>

const GlobalConfigurationIndex = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
        create: { roles: ["Operator", "Manager"] },
        edit: { roles: ["Operator", "Manager"] },
        remove: { roles: ["Operator", "Manager"] },
        editServiceDiscoveryProvider: { roles: ["Operator", "Manager"] },
        editQoSOptions: { roles: ["Operator", "Manager"] },
        editLoadBalancerOptions: { roles: ["Operator", "Manager"] },
        editRateLimitOptions: { roles: ["Operator", "Manager"] },
        editHttpHandlerOptions: { roles: ["Operator", "Manager"] },
        updateConfiguration: { roles: ["Operator", "Manager"] },
        routePushHistory: { roles: ["Operator", "Manager"] },
    }
    useEffect(() => {
        document.title = t("apigw") + " - " + t("highAvailabilities")
    }, [t])
    useEffect(() => {
        props.getGlobalConfiguration(Number(props.match.params.fileconfigurationid))
    }, [])
    const sendJsonFileHandle = (url: string, id: number) => {
        props.getJsonData(url, Number(props.match.params.fileconfigurationid), id);
    }
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="flex-fill">
                <GymLoading loading={props.globalConfigurationList.loading ||
                    props.routePushHistoryList.loading ||
                    props.globalConfigurationCreate.loading ||
                    props.globalConfigurationUpdate.loading ||
                    props.globalConfigurationRemove.loading ||
                    props.serviceDiscoveryProviderSet.loading ||
                    props.qoSOptionsSet.loading ||
                    props.loadBalancerOptionsSet.loading ||
                    props.rateLimitOptionsSet.loading ||
                    props.httpHandlerOptionsSet.loading ||
                    props.jsonData.loading ||
                    props.jsonPost.loading} />
                <GymAccessControl data={userAccessData.create}>
                    <Create fileConfigurationId={Number(props.match.params.fileconfigurationid)} />
                </GymAccessControl>
                <GymAccessControl data={userAccessData.edit}>
                    <Edit fileConfigurationId={Number(props.match.params.fileconfigurationid)} />
                </GymAccessControl>
                <GymAccessControl data={userAccessData.editServiceDiscoveryProvider}>
                    <EditServiceDiscoveryProvider />
                </GymAccessControl>
                <GymAccessControl data={userAccessData.editQoSOptions}>
                    <EditQoSOptions />
                </GymAccessControl>
                <GymAccessControl data={userAccessData.editLoadBalancerOptions}>
                    <EditLoadBalancerOptions />
                </GymAccessControl>
                <GymAccessControl data={userAccessData.editRateLimitOptions}>
                    <EditRateLimitOptions />
                </GymAccessControl>
                <GymAccessControl data={userAccessData.editHttpHandlerOptions}>
                    <EditHttpHandlerOptions />
                </GymAccessControl>
                <GymAccessControl data={userAccessData.routePushHistory}>
                    <RoutePushHistory />
                </GymAccessControl>
                <GymQuestionModal
                    title={t("updateConfiguration")}
                    description={t("updateConfigurationQuestion")}
                    visible={props.jsonPost.Visible}
                    onCancel={() => props.togglePostJsonModal(false)}
                    onAccept={() => props.postJson()} />
                <GymAccessControl data={userAccessData.remove}>
                    <GymDeleteModal
                        visible={props.globalConfigurationRemove.Visible}
                        onCancel={() => props.toggleRemoveGlobalConfigurationModal({}, false)}
                        onAccept={() => props.removeGlobalConfiguration()} />
                </GymAccessControl>
                <div className="p-4">
                    <div className="subject d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {t("highAvailabilities")}
                        </h5>
                        <div>
                            <button className="btn btn-secondary mr-1"
                                onClick={() => window.history.back()}>
                                <span className="mdi mdi-18px mdi-chevron-left mr-2"></span>
                                {t("back")}
                            </button>
                            <GymAccessControl data={userAccessData.create}>
                                <button className="btn btn-info"
                                    onClick={() => props.toggleCreateGlobalConfigurationModal(true)}>
                                    <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                                    {t("create")}
                                </button>
                            </GymAccessControl>
                        </div>
                    </div>
                    <div className="d-flex bg-white rounded p-3 shadow-sm flex-grow-1">
                        <div className="p-4 row" style={{ overflowY: "auto", width: "100%" }}>
                            {props.globalConfigurationList.data.length == 0 ?
                                props.globalConfigurationList.loading ?
                                    <div className="d-flex align-items-center text-warning">
                                        <span className="mdi mdi-24px mdi-timer-sand"></span>
                                        <div className="font-weight-bold ml-2 mt-1" style={{ fontSize: "large" }}>{t("inProcess")}</div>
                                    </div>
                                    :
                                    <div className="d-flex align-items-center text-danger">
                                        <span className="mdi mdi-24px mdi-alert-outline"></span>
                                        <div className="font-weight-bold ml-2 mt-1" style={{ fontSize: "large" }}>{t("noHighAvailabilities")}</div>
                                    </div>
                                :
                                <React.Fragment>
                                    <div className="col-3">
                                        <div className="list-group" id="list-tab" role="tablist">
                                            {
                                                props.globalConfigurationList.data.map((conf: any, i: number) => {
                                                    return (
                                                        <a className={"list-group-item list-group-item-action" + (i == 0 ? " active" : "")}
                                                            id={"list-" + conf.id + "-list"}
                                                            data-toggle="list"
                                                            href={"#list-" + conf.id}
                                                            role="tab"
                                                            aria-controls={conf.id}>
                                                            <label className="form-check-label mr-3">{conf.title}</label>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="col-9">
                                        <div className="tab-content" id="nav-tabContent">
                                            {
                                                props.globalConfigurationList.data.map((conf: any, i: number) => {
                                                    return (
                                                        <div className={"tab-pane fade" + (i == 0 ? " show active" : "")}
                                                            id={"list-" + conf.id}
                                                            role="tabpanel"
                                                            aria-labelledby={"list-" + conf.id + "-list"}>
                                                            <div className="card" style={{ width: "100%" }}>
                                                                <div className="card-header px-4 py-2">
                                                                    <div className="row justify-content-between align-items-center">
                                                                        <label className="text-info mb-0" style={{ fontSize: "large" }}>{conf.title}</label>
                                                                        <div>
                                                                            {/* <button className="btn btn-success mr-1" onClick={() => props.sendTest(conf.baseUrl)}>
                                                                                <span className="mdi mdi-18px mdi-cast mr-1"></span>
                                                                                {t("test")}
                                                                            </button> */}
                                                                            <GymAccessControl data={userAccessData.remove}>
                                                                                <button className="btn btn-danger"
                                                                                    onClick={() => props.toggleRemoveGlobalConfigurationModal({ fileConfigurationId: Number(props.match.params.fileconfigurationid), id: conf.id }, true)}>
                                                                                    <span className="mdi mdi-18px mdi-delete mr-2"></span>
                                                                                    {t("remove")}
                                                                                </button>
                                                                            </GymAccessControl>
                                                                            <GymAccessControl data={userAccessData.routePushHistory}>
                                                                                <button className="btn btn-primary mx-1" onClick={() => props.getRoutePushHistoryList(conf.id)}>
                                                                                    <span className="mdi mdi-18px mdi-history mr-1"></span>
                                                                                    {t("routePushHistory")}
                                                                                </button>
                                                                            </GymAccessControl>
                                                                            <GymAccessControl data={userAccessData.updateConfiguration}>
                                                                                <button className="btn btn-success" onClick={() => sendJsonFileHandle(conf.baseUrl, conf.id)}>
                                                                                    <span className="mdi mdi-18px mdi-cast mr-1"></span>
                                                                                    {t("updateConfiguration")}
                                                                                </button>
                                                                            </GymAccessControl>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex p-2" style={{ width: "100%" }}>
                                                                    <div className="col-6">
                                                                        <div className="d-flex flex-column border p-2 mt-1">
                                                                            <div className="d-flex justify-content-between">
                                                                                <label className="text-info mb-3">{t("main")}</label>
                                                                                <GymAccessControl data={userAccessData.edit}>
                                                                                    <span
                                                                                        title={t("edit")}
                                                                                        className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                                                                        onClick={() => props.toggleUpdateGlobalConfigurationModal({
                                                                                            fileConfigurationId: Number(props.match.params.fileconfigurationid),
                                                                                            id: conf.id,
                                                                                            title: conf.title,
                                                                                            requestIdKey: conf.requestIdKey,
                                                                                            baseUrl: conf.baseUrl,
                                                                                            downstreamScheme: conf.downstreamScheme,
                                                                                            downstreamHttpVersion: conf.downstreamHttpVersion
                                                                                        }, true)}>
                                                                                    </span>
                                                                                </GymAccessControl>
                                                                            </div>
                                                                            <ItemView label="title" value={conf.title} />
                                                                            <ItemView label="requestIdKey" value={conf.requestIdKey} />
                                                                            <ItemView label="baseUrl" value={conf.baseUrl} />
                                                                            <ItemView label="downstreamScheme" value={conf.downstreamScheme} />
                                                                            <ItemView label="downstreamHttpVersion" value={conf.downstreamHttpVersion} />
                                                                        </div>
                                                                        <div className="d-flex flex-column border p-2 mt-1">
                                                                            <div className="d-flex justify-content-between">
                                                                                <label className="text-info mb-3">{t("serviceDiscoveryProvider")}</label>
                                                                                <GymAccessControl data={userAccessData.editServiceDiscoveryProvider}>
                                                                                    <span
                                                                                        title={t("edit")}
                                                                                        className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                                                                        onClick={() => props.toggleSetServiceDiscoveryProviderModal({
                                                                                            fileConfigurationId: Number(props.match.params.fileconfigurationid),
                                                                                            id: conf.id,
                                                                                            scheme: conf.serviceDiscoveryProvider.scheme,
                                                                                            host: conf.serviceDiscoveryProvider.host,
                                                                                            port: conf.serviceDiscoveryProvider.port,
                                                                                            type: conf.serviceDiscoveryProvider.serviceDiscoveryProvider_Type,
                                                                                            token: conf.serviceDiscoveryProvider.token,
                                                                                            configurationKey: conf.serviceDiscoveryProvider.configurationKey,
                                                                                            nameSpace: conf.serviceDiscoveryProvider.nameSpace,
                                                                                        }, true)}>
                                                                                    </span>
                                                                                </GymAccessControl>
                                                                            </div>
                                                                            <ItemView label="scheme" value={conf.serviceDiscoveryProvider.scheme ? conf.serviceDiscoveryProvider.scheme : ""} />
                                                                            <ItemView label="host" value={conf.serviceDiscoveryProvider.host ? conf.serviceDiscoveryProvider.host : ""} />
                                                                            <ItemView label="port" value={conf.serviceDiscoveryProvider.port ? conf.serviceDiscoveryProvider.port : ""} />
                                                                            <ItemView label="type" value={conf.serviceDiscoveryProvider.serviceDiscoveryProvider_Type ? conf.serviceDiscoveryProvider.serviceDiscoveryProvider_Type : ""} />
                                                                            <ItemView label="token" value={conf.serviceDiscoveryProvider.token ? conf.serviceDiscoveryProvider.token : ""} />
                                                                            <ItemView label="configurationKey" value={conf.serviceDiscoveryProvider.configurationKey ? conf.serviceDiscoveryProvider.configurationKey : ""} />
                                                                            <ItemView label="nameSpace" value={conf.serviceDiscoveryProvider.nameSpace ? conf.serviceDiscoveryProvider.nameSpace : ""} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="d-flex flex-column ml-1">
                                                                            <div className="d-flex flex-column border p-2 mt-1">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <label className="text-info mb-3">{t("qoSOptions")}</label>
                                                                                    <span
                                                                                        title={t("edit")}
                                                                                        className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                                                                        onClick={() => props.toggleSetQoSOptionsModal({
                                                                                            fileConfigurationId: Number(props.match.params.fileconfigurationid),
                                                                                            id: conf.id,
                                                                                            exceptionsAllowedBeforeBreaking: conf.qoSOptions.exceptionsAllowedBeforeBreaking,
                                                                                            durationOfBreak: conf.qoSOptions.durationOfBreak,
                                                                                            timeoutValue: conf.qoSOptions.timeoutValue
                                                                                        }, true)}>
                                                                                    </span>
                                                                                </div>
                                                                                <ItemView label="exceptionsAllowedBeforeBreaking" value={conf.qoSOptions.exceptionsAllowedBeforeBreaking} />
                                                                                <ItemView label="durationOfBreak" value={conf.qoSOptions.durationOfBreak} />
                                                                                <ItemView label="timeoutValue" value={conf.qoSOptions.timeoutValue} />
                                                                            </div>
                                                                            <div className="d-flex flex-column border p-2 mt-1">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <label className="text-info mb-3">{t("loadBalancerOptions")}</label>
                                                                                    <span
                                                                                        title={t("edit")}
                                                                                        className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                                                                        onClick={() => props.toggleSetLoadBalancerOptionsModal({
                                                                                            fileConfigurationId: Number(props.match.params.fileconfigurationid),
                                                                                            id: conf.id,
                                                                                            type: conf.loadBalancerOptions.type,
                                                                                            key: conf.loadBalancerOptions.key,
                                                                                            expiry: conf.loadBalancerOptions.expiry
                                                                                        }, true)}>
                                                                                    </span>
                                                                                </div>
                                                                                <ItemView label="type" value={conf.loadBalancerOptions.type ? conf.loadBalancerOptions.type : ""} />
                                                                                <ItemView label="key" value={conf.loadBalancerOptions.key ? conf.loadBalancerOptions.key : ""} />
                                                                                <ItemView label="expiry" value={conf.loadBalancerOptions.expiry ? conf.loadBalancerOptions.expiry : ""} />
                                                                            </div>
                                                                            <div className="d-flex flex-column border p-2 mt-1">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <label className="text-info mb-3">{t("rateLimitOptions")}</label>
                                                                                    <span
                                                                                        title={t("edit")}
                                                                                        className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                                                                        onClick={() => props.toggleSetRateLimitOptionsModal({
                                                                                            fileConfigurationId: Number(props.match.params.fileconfigurationid),
                                                                                            id: conf.id,
                                                                                            clientIdHeader: conf.rateLimitOptions.clientIdHeader,
                                                                                            quotaExceededMessage: conf.rateLimitOptions.quotaExceededMessage,
                                                                                            rateLimitCounterPrefix: conf.rateLimitOptions.rateLimitCounterPrefix,
                                                                                            disableRateLimitHeaders: conf.rateLimitOptions.disableRateLimitHeaders,
                                                                                            httpStatusCode: conf.rateLimitOptions.httpStatusCode
                                                                                        }, true)}>
                                                                                    </span>
                                                                                </div>
                                                                                <ItemView label="clientIdHeader" value={conf.rateLimitOptions.clientIdHeader ? conf.rateLimitOptions.clientIdHeader : ""} />
                                                                                <ItemView label="quotaExceededMessage" value={conf.rateLimitOptions.quotaExceededMessage ? conf.rateLimitOptions.quotaExceededMessage : ""} />
                                                                                <ItemView label="rateLimitCounterPrefix" value={conf.rateLimitOptions.rateLimitCounterPrefix ? conf.rateLimitOptions.rateLimitCounterPrefix : ""} />
                                                                                <ItemView label="disableRateLimitHeaders" value={conf.rateLimitOptions.disableRateLimitHeaders} />
                                                                                <ItemView label="httpStatusCode" value={conf.rateLimitOptions.httpStatusCode ? conf.rateLimitOptions.httpStatusCode : ""} />
                                                                            </div>
                                                                            <div className="d-flex flex-column border p-2 mt-1">
                                                                                <div className="d-flex justify-content-between">
                                                                                    <label className="text-info mb-3">{t("httpHandlerOptions")}</label>
                                                                                    <span
                                                                                        title={t("edit")}
                                                                                        className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                                                                        onClick={() => props.toggleSetHttpHandlerOptionsModal({
                                                                                            fileConfigurationId: Number(props.match.params.fileconfigurationid),
                                                                                            id: conf.id,
                                                                                            allowAutoRedirect: conf.httpHandlerOptions.allowAutoRedirect,
                                                                                            useCookieContainer: conf.httpHandlerOptions.useCookieContainer,
                                                                                            useTracing: conf.httpHandlerOptions.useTracing,
                                                                                            useProxy: conf.httpHandlerOptions.useProxy,
                                                                                            maxConnectionsPerServer: conf.httpHandlerOptions.maxConnectionsPerServer
                                                                                        }, true)}>
                                                                                    </span>
                                                                                </div>
                                                                                <ItemView label="allowAutoRedirect" value={conf.httpHandlerOptions.allowAutoRedirect} />
                                                                                <ItemView label="useCookieContainer" value={conf.httpHandlerOptions.useCookieContainer} />
                                                                                <ItemView label="useTracing" value={conf.httpHandlerOptions.useTracing} />
                                                                                <ItemView label="useProxy" value={conf.httpHandlerOptions.useProxy} />
                                                                                <ItemView label="maxConnectionsPerServer" value={conf.httpHandlerOptions.maxConnectionsPerServer} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <GymAlerts
                alerts={props.alerts}
                clearAlerts={() => props.clearAlerts()} />
        </GymAccessControl >
    )
}
export default connect(
    (state: IApplicationState) => state.globalConfiguration,
    globalConfigurationActions,
)(GlobalConfigurationIndex);