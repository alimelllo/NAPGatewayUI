import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Chart from '../Dashboard/ChartInfo'
import { IClientTracingState } from '../../Actions/ClientTracing/model';
import { clientTracingActions } from '../../Actions/ClientTracing/action';
import { IApplicationState } from '../../Store/state';
import { useTranslation } from 'react-i18next';
import TraceItem from './TraceItem';

type IProps = typeof clientTracingActions & IClientTracingState

const Traces = (props: IProps) => {
    const [t] = useTranslation()
    return (
        <React.Fragment>
            <div className="flex-grow-1">
                {props.serviceTraceList.data.length > 0 ?
                    props.serviceTraceList.data.map((item: any) => {
                        return <TraceItem data={item} max={Math.max.apply(Math, props.serviceTraceList.data.map(function(o) { return o.duration; }))} />
                    })
                    :
                    <React.Fragment>
                        <div className="d-flex justify-content-center align-items-center font-weight-bold mt-auto mb-auto p-5 text-danger">
                            <span className="mdi mdi-18px mdi-alert-outline"></span>
                            <label className="m-2">{t("noData")}</label>
                        </div>
                    </React.Fragment>}
            </div>
        </React.Fragment>
    )
}

export default connect(
    (state: IApplicationState) => state.clientTracing,
    clientTracingActions,
)(Traces); 