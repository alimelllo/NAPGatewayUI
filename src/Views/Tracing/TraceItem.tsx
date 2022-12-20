import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITracingState } from '../../Actions/Tracing/model';
import { tracingActions } from '../../Actions/Tracing/action';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import NDate from '@nepo/ndate';

type IProps = typeof tracingActions & ITracingState & {
    data: any,
    max: number
}

const TraceItem = (props: IProps) => {
    const [t] = useTranslation()
    return (
        <React.Fragment>
            <div className="card border-secondary bg-light mb-3">
                <div className="card-header">
                    <div className="row justify-content-between link" onClick={() => props.getTraceDetail(props.data.traceId)}>
                        {new NDate(props.data.startTimestamp).formatJalali("YYYY/MM/DD HH:mm:ss")}
                        <span className={"link mdi mdi-24px " + (props.data.visible && props.data.detail ? "mdi-chevron-up" : "mdi-chevron-down")} />
                    </div>
                </div>
                <div className="card-body text-secondary">
                    <div className="progress my-1">
                        <div className={"progress-bar progress-bar-striped bg-success" + (props.data.visible && props.data.detail ? " progress-bar-animated" : "")} role="progressbar" style={{ width: (props.data.duration / props.max * 100) + "%" }}>{String(props.data.duration / 1000) + "  ms"}</div>
                    </div>
                    <div className="d-flex flex-column mt-3">
                        {
                            props.data.services && props.data.services.filter((x: any) => x.name != "" && x.name != "unknown").length > 0 ?
                                <React.Fragment>
                                    <span style={{ textAlign: "start" }}>{t("services")}</span>
                                    <div className="row mt-2 mx-3">
                                        {
                                            props.data.services.filter((x: any) => x.name != "" && x.name != "unknown").map((item: any) => {
                                                return <span className="badge badge-secondary p-1">{item.name}</span>
                                            })
                                        }
                                    </div>
                                </React.Fragment>
                                : ""
                        }
                        {
                            props.data.clients && props.data.clients.filter((x: any) => x.id != "" && x.id != "unknown").length > 0 ?
                                <React.Fragment>
                                    <span style={{ textAlign: "start" }}>{t("clients")}</span>
                                    <div className="row mt-2 mx-3">
                                        {
                                            props.data.clients.filter((x: any) => x.id != "" && x.id != "unknown").map((item: any) => {
                                                return <span className="badge badge-secondary p-1">{item.id}</span>
                                            })
                                        }
                                    </div>
                                </React.Fragment>
                                : ""
                        }
                    </div>
                    <div className={"mt-2 collapse" + (props.data.visible && props.data.detail ? " show" : "")}>
                        <div className="card card-body">
                            <div className="row">
                                <label className="mb-0">{t("span1")}: </label>
                                <span className="badge badge-secondary p-1 mx-2">{props.data.detail && props.data.detail.spans ? props.data.detail.spans.length : 0}</span>
                            </div>
                            <table className="table table-striped table-dark table-sm table-hover mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: "25%", textAlign: "center" }} className="font-weight-bold" >{t("serviceName1")}</th>
                                        <th scope="col" style={{ width: "25%", textAlign: "center" }} className="font-weight-bold">{t("operationName1")}</th>
                                        <th scope="col" style={{ width: "50%", textAlign: "center" }} className="font-weight-bold">{t("timeLine1")}</th>
                                        {/* <th scope="col" className="font-weight-bold">{t("duration")}</th> */}
                                        {/* <th scope="col" className="font-weight-bold">{t("startTimestamp")}</th>
                                        <th scope="col" className="font-weight-bold">{t("finishTimestamp")}</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.detail && props.data.detail.spans ? props.data.detail.spans.map((span: any) => {
                                            return (
                                                <tr className="link" onClick={() => props.getSpanDetail(span.spanId)}>
                                                    <td className="align-middle" style={{ textAlign: "center" }}>{span.serviceName}</td>
                                                    <td className="align-middle">{span.operationName}</td>
                                                    <td className="align-middle">
                                                        <div className="progress my-1">
                                                            <div className="progress-bar progress-bar-striped progress-bar-animated  bg-info"
                                                                role="progressbar"
                                                                style={{ width: (span.duration / props.data.duration * 100) + "%" }}>
                                                                {String(span.duration / 1000) + "  ms"}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* <td className="font-weight-bold align-middle">{String(span.duration / 1000) + "  ms"}</td> */}
                                                    {/* <td className="font-weight-bold align-middle">{span.startTimestamp}</td>
                                                    <td className="font-weight-bold align-middle">{span.finishTimestamp}</td> */}
                                                </tr>
                                            )
                                        })
                                            : ""
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default connect(
    (state: IApplicationState) => state.tracing,
    tracingActions,
)(TraceItem); 