import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { clientTracingActions } from '../../Actions/ClientTracing/action';
import { IClientTracingState } from '../../Actions/ClientTracing/model';
import "../../GeneralComponents/ToggleButton/GymToggleButton.css"
import { useTranslation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import GymAlerts from '../../GeneralComponents/GymAlerts/GymAlerts';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import { RouteComponentProps, useRouteMatch, useHistory, Switch, Route, Redirect, Link } from 'react-router-dom';
import ServiceTrace from './ServiceTrace';
import SpanDetail from './SpanDetail';
import DatePicker from '../../GeneralComponents/Calendar'
import NDate from '@nepo/ndate';

type IProps = typeof clientTracingActions & IClientTracingState & RouteComponentProps<{ fileconfigurationid: string }>

const ClientTracingIndex = (props: IProps) => {
    const [t] = useTranslation()
    const match = useRouteMatch();
    const history = useHistory();
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
    }
    useEffect(() => {
        document.title = t("apigw") + " - " + t("clientTracings")
    }, [t])
    useEffect(() => {
        props.getBaseUrl(Number(props.match.params.fileconfigurationid));
    }, [props.match.params.fileconfigurationid])
    const servicesHandler = (newServices: string) => {
        if (props.serviceTraceList.serviceName != newServices)
            props.setServiceName(newServices);
    }
    const tagsHandler = (newTags: string) => {
        if (props.serviceTraceList.tags != newTags)
            props.setTags(newTags);
    }
    const timeTypeHandler = (newTimeType: number) => {
        if (props.serviceTraceList.timeType != newTimeType)
            props.setTimeType(newTimeType);
    }
    const startTimestampHandler = (newStartTimestamp: string) => {
        if (props.serviceTraceList.startTimestamp != newStartTimestamp)
            props.setStartTimestamp(newStartTimestamp);
    }
    const finishTimestampHandler = (newFinishTimestamp: string) => {
        if (props.serviceTraceList.finishTimestamp != newFinishTimestamp)
            props.setFinishTimestamp(newFinishTimestamp);
    }
    const limitHandler = (newLimit: number) => {
        if (props.serviceTraceList.limit != newLimit)
            props.setLimit(newLimit);
    }
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="flex-fill" style={{ direction: "rtl" }}>
                <GymLoading loading={props.baseUrl.loading || props.clientList.loading || props.serviceList.loading || props.serviceTraceList.loading || props.serviceTraceHistogramList.loading || props.traceDetail.loading || props.spanDetail.loading} />
                <SpanDetail />
                <div className="p-4">
                    <div className="subject d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {t("clientTracings1")}
                        </h5>
                        <div>
                            <Link className="btn btn-secondary mr-1"
                                to={"/FileConfigurations"}>
                                {t("back1")}
                                <span className="mdi mdi-18px mdi-chevron-left mr-2"></span>
                            </Link>
                            {/* <GymAccessControl data={userAccessData.create}>
                                <button className="btn btn-info"
                                    onClick={() => props.toggleCreateClientTracingModal(true)}>
                                    <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                                    {t("create")}
                                </button>
                            </GymAccessControl> */}
                        </div>
                    </div>
                    <div className="d-flex bg-white rounded p-3 shadow-sm flex-grow-1">
                        <div className="p-4 row" style={{ overflowY: "auto", width: "100%" }}>
                            {props.serviceList.data.length == 0 ?
                                props.serviceList.loading ?
                                    <div className="d-flex align-items-center text-warning">
                                        <span className="mdi mdi-24px mdi-timer-sand"></span>
                                        <div className="font-weight-bold ml-2 mt-1" style={{ fontSize: "large" }}>{t("inProcess")}</div>
                                    </div>
                                    :
                                    <div className="d-flex align-items-center text-danger">
                                        <span className="mdi mdi-24px mdi-alert-outline"></span>
                                        <div className="font-weight-bold ml-2 mt-1" style={{ fontSize: "large" }}>{t("noService")}</div>
                                    </div>
                                :
                                <React.Fragment>
                                    <div className="col-3">
                                        <div className="border mb-3 py-2 px-2">
                                            <div className="form-group">
                                                <label htmlFor="service" style={{ float: "right" }}>{t("service1")}:</label>
                                                <select
                                                    name="services"
                                                    id="services"
                                                    className="form-control form-control-sm"
                                                    onChange={(e) => servicesHandler(e.target.value)}>
                                                    <option value="AllServices" selected={"AllServices" == props.serviceTraceList.serviceName}>{t("allServices1")}</option>
                                                    {
                                                        props.serviceList.data.map((service: any, i: number) => {
                                                            return (
                                                                <option value={service} selected={service == props.serviceTraceList.serviceName}>{service}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tags" style={{ float: "right" }}>{t("tags1")}:</label>
                                                <input
                                                    type="text"
                                                    id="tags"
                                                    className="form-control form-control-sm"
                                                    onChange={(e) => tagsHandler(e.target.value)}
                                                    placeholder="http.status_code=200|http.method=GET" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="startTimestamp" style={{ float: "right" }}>{t("startTimestamp1")}:</label>
                                                <DatePicker onChange={(value) => startTimestampHandler(value)}
                                                    placeholder={t("startTimestamp1")}
                                                    // min={new NDate().format("YYYY-MM-DD")}
                                                    className={"form-control form-control-sm"} />
                                                {/* <input
                                                    type="text"
                                                    id="startTimestamp"
                                                    className="form-control form-control-sm"
                                                    onChange={(e) => startTimestampHandler(e.target.value)}
                                                    placeholder={t("startTimestamp1")} /> */}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="finishTimestamp" style={{ float: "right" }}>{t("finishTimestamp1")}:</label>
                                                <DatePicker onChange={(value) => finishTimestampHandler(value)}
                                                    placeholder={t("finishTimestamp1")}
                                                    min={new NDate(props.serviceTraceList.startTimestamp).format("YYYY-MM-DD")}
                                                    className={"form-control form-control-sm"} />
                                                {/* <input
                                                    type="text"
                                                    id="finishTimestamp"
                                                    onChange={(e) => finishTimestampHandler(e.target.value)}
                                                    className="form-control form-control-sm"
                                                    placeholder={t("finishTimestamp1")} /> */}
                                            </div>
                                            <button type="button" className="btn btn-sm btn-success w-100" onClick={() => props.getServiceTraceList()}>
                                                {t("searchbtn1")}
                                            </button>
                                        </div>
                                        <div className="d-flex border mb-3 py-2 px-2" style={{overflowX: "auto"}}>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.timeType == 0 ? " btn-success" : "")} onClick={() => timeTypeHandler(0)}>
                                                    {t("noTime")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.timeType == 1 ? " btn-success" : "")} onClick={() => timeTypeHandler(1)}>
                                                    {t("minute1")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.timeType == 2 ? " btn-success" : "")} onClick={() => timeTypeHandler(2)}>
                                                    {t("hour1")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.timeType == 3 ? " btn-success" : "")} onClick={() => timeTypeHandler(3)}>
                                                    {t("day1")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.timeType == 4 ? " btn-success" : "")} onClick={() => timeTypeHandler(4)}>
                                                    {t("month1")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="d-flex border mb-3 py-2 px-2" style={{overflowX: "auto"}}>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.limit == 10 ? " btn-success" : "")} onClick={() => limitHandler(10)}>
                                                    {t("10")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.limit == 20 ? " btn-success" : "")} onClick={() => limitHandler(20)}>
                                                    {t("20")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.limit == 30 ? " btn-success" : "")} onClick={() => limitHandler(30)}>
                                                    {t("30")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.limit == 40 ? " btn-success" : "")} onClick={() => limitHandler(40)}>
                                                    {t("40")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.limit == 50 ? " btn-success" : "")} onClick={() => limitHandler(50)}>
                                                    {t("50")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.limit == 100 ? " btn-success" : "")} onClick={() => limitHandler(100)}>
                                                    {t("100")}
                                                </button>
                                            </div>
                                            <div className="p-2 text-left">
                                                <button type="button" className={"btn btn-sm" + (props.serviceTraceList.limit == 1000 ? " btn-success" : "")} onClick={() => limitHandler(1000)}>
                                                    {t("1000")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="list-group" id="list-tab" role="tablist">
                                            <React.Fragment>
                                                {
                                                    props.clientList.data.map((client: any, i: number) => {
                                                        return (
                                                            <a className={"list-group-item list-group-item-action" + (decodeURIComponent(window.location.pathname).includes(client) ? " active" : "")}
                                                                onClick={() => { props.setCurrectClient(client, i); props.setClientId(client); history.push(`${match.url}/${client}`) }}
                                                                id={"list-" + i + "-list"}
                                                                data-toggle="list"
                                                                href={"#list-" + i}
                                                                role="tab"
                                                                aria-controls={String(i)}>
                                                                <label className="form-check-label ml-3" style={{ float: "right" }}>{client}</label>
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </React.Fragment>
                                        </div>
                                    </div>
                                    <div className="col-9">
                                        <Switch>
                                            <Route path={"/ClientTracing/:fileconfigurationid"} exact render={() => (<Redirect to={"/ClientTracing/" + props.match.params.fileconfigurationid + "/" + props.clientList.data[0]} />)} />
                                            {
                                                props.clientList.data.map((client: any, i: number) => {
                                                    return (
                                                        <Route path={`/ClientTracing/:fileconfigurationid/${client}`} exact component={ServiceTrace} />
                                                    )
                                                })
                                            }
                                        </Switch>
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
    (state: IApplicationState) => state.clientTracing,
    clientTracingActions,
)(ClientTracingIndex);