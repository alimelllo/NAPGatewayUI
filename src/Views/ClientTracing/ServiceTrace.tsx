import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { clientTracingActions } from '../../Actions/ClientTracing/action';
import { IClientTracingState } from '../../Actions/ClientTracing/model';
import "../../GeneralComponents/ToggleButton/GymToggleButton.css"
import { useTranslation } from 'react-i18next';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import Histogram from './Histogram';
import Traces from './Traces';
import { useRouteMatch } from 'react-router';

type IProps = typeof clientTracingActions & IClientTracingState// & { serviceName: string, index: number }

const ServiceTrace = (props: IProps) => {
    const [t] = useTranslation()
    const match = useRouteMatch();
    const [, updateState] = React.useState<any>('');
    const forceUpdate = React.useCallback(() => updateState({}), []);
    useEffect(() => {
        if (!props.serviceTraceList.loading)
            forceUpdate();
    }, [props.serviceTraceList.loading])
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
    }
    useEffect(() => {
        document.title = t("apigw") + " - " + t("clientTracings")
    }, [t])
    useEffect(() => {
        if (props.serviceTraceList.clientId != match.url.split("/")[match.url.split("/").length - 1])
            props.setClientId(match.url.split("/")[match.url.split("/").length - 1])
    }, [])
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="card" style={{ width: "100%" }}>
                <div className="card-header px-4 py-2">
                    <div className="row justify-content-between align-items-center">
                        <label className="text-info mb-0" style={{ fontSize: "large" }}>{props.currentClient.clientId ? props.currentClient.clientId : (match.url.split("/")[match.url.split("/").length - 1] == "AllServices" ? t("allServices1") : match.url.split("/")[match.url.split("/").length - 1])}</label>
                        <label className="text-info mb-0" style={{ fontSize: "large" }}>{t("requestCount") + " : " + props.serviceTraceHistogramList.count}</label>
                    </div>
                </div>
                <ul className="nav nav-tabs nav-tabs--outbox p-0 m-0" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id={props.currentClient.index + "-tab"} data-toggle="tab"
                            href={"#tab" + props.currentClient.index} role="tab" aria-controls={"tab" + props.currentClient.index}
                            aria-selected="true">{t("chart1")}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id={props.currentClient.index + "-tabOther"} data-toggle="tab" href={"#tabOther" + props.currentClient.index} role="tab"
                            aria-controls={"tabOther" + props.currentClient.index} aria-selected="false">{t("details1")}</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id={"tab" + props.currentClient.index} role="tabpanel"
                        aria-labelledby={props.currentClient.index + "-tab"}>
                        <div className="d-flex p-2" style={{ width: "100%" }}>
                            <Histogram />
                        </div>
                    </div>
                    <div className="tab-pane fade" id={"tabOther" + props.currentClient.index} role="tabpanel"
                        aria-labelledby={props.currentClient.index + "-tabOther"}>
                        <div className="d-flex p-2" style={{ width: "100%" }}>
                            <Traces />
                        </div>
                    </div>
                </div>
            </div>
        </GymAccessControl >
    )
}
export default connect(
    (state: IApplicationState) => state.clientTracing,
    clientTracingActions,
)(ServiceTrace);