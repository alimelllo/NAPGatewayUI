import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { tracingActions } from '../../Actions/Tracing/action';
import { ITracingState } from '../../Actions/Tracing/model';
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

type IProps = typeof tracingActions & ITracingState & RouteComponentProps<{ fileconfigurationid: string }>

const TracingIndex = (props: IProps) => {
    const [t] = useTranslation()
    const match = useRouteMatch();
    const history = useHistory();
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
    }
    useEffect(() => {
        document.title = t("apigw") + " - " + t("tracings")
    }, [t])
    useEffect(() => {
        props.getBaseUrl(Number(props.match.params.fileconfigurationid));
    }, [props.match.params.fileconfigurationid])
    const tagsHandler = (newTags: string) => {
        if (props.serviceTraceList.tags != newTags)
            props.setTags(newTags);
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
                <GymLoading loading={props.baseUrl.loading || props.serviceList.loading || props.serviceTraceList.loading || props.serviceTraceHistogramList.loading || props.traceDetail.loading || props.spanDetail.loading} />
                <SpanDetail />
                <div className="p-4">
                    <div className="subject d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {t("tracings1")}
                        </h5>
                        <div>
                            <Link className="btn btn-secondary mr-1"
                                to={"/FileConfigurations"}>
                                {t("back1")}
                                <span className="mdi mdi-18px mdi-chevron-left mr-2"></span>
                            </Link>
                            {/* <GymAccessControl data={userAccessData.create}>
                                <button className="btn btn-info"
                                    onClick={() => props.toggleCreateTracingModal(true)}>
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
                                                <a className={"list-group-item list-group-item-action" + (window.location.pathname.includes("AllServices") ? " active" : "")}
                                                    onClick={() => { props.setCurrectService("AllServices", -1); props.setServiceName("AllServices"); history.push(`${match.url}/AllServices`) }}
                                                    data-toggle="list"
                                                    href={"#list-all"}
                                                    role="tab">
                                                    <label className="form-check-label ml-3" style={{ float: "right" }}>{t("allServices1")}</label>
                                                </a>
                                                {
                                                    props.serviceList.data.map((service: any, i: number) => {
                                                        return (
                                                            <a className={"list-group-item list-group-item-action" + (decodeURIComponent(window.location.pathname).includes(service) ? " active" : "")}
                                                                onClick={() => { props.setCurrectService(service, i); props.setServiceName(service); history.push(`${match.url}/${service}`) }}
                                                                id={"list-" + i + "-list"}
                                                                data-toggle="list"
                                                                href={"#list-" + i}
                                                                role="tab"
                                                                aria-controls={String(i)}>
                                                                <label className="form-check-label ml-3" style={{ float: "right" }}>{service}</label>
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </React.Fragment>
                                        </div>
                                    </div>
                                    <div className="col-9">
                                        <Switch>
                                            <Route path={"/Tracing/:fileconfigurationid"} exact render={() => (<Redirect to={"/Tracing/" + props.match.params.fileconfigurationid + "/AllServices"} />)} />
                                            <Route path={`/Tracing/:fileconfigurationid/AllServices`} exact component={ServiceTrace} />
                                            {
                                                props.serviceList.data.map((service: any, i: number) => {
                                                    return (
                                                        <Route path={`/Tracing/:fileconfigurationid/${service}`} exact component={ServiceTrace} />
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
    (state: IApplicationState) => state.tracing,
    tracingActions,
)(TracingIndex);