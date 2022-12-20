import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Chart from '../Dashboard/ChartInfo'
import { IClientTracingState } from '../../Actions/ClientTracing/model';
import { clientTracingActions } from '../../Actions/ClientTracing/action';
import { IApplicationState } from '../../Store/state';
import { useTranslation } from 'react-i18next';
import NDate from '@nepo/ndate';

type IProps = typeof clientTracingActions & IClientTracingState

const Histogram = (props: IProps) => {
    const [t] = useTranslation()
    const option: any = {
        title: {
            left: 'right',
            text: t('clientTracingChart1'),
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            left: 'left',
            show: true,
            feature: {
                magicType: { type: ['line', 'bar'], title: { line: t('lineChart1'), bar: t('barChart1') } },
                saveAsImage: { title: t('saveAspicture1') }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: props.serviceTraceHistogramList.data.map((item: any) => {
                return new NDate(item.time).formatJalali("YYYY/MM/DD HH:mm:ss")
            })
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: t('count'),
                type: 'line',
                data: props.serviceTraceHistogramList.data.map((item: any) => {
                    return item.count
                }),
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'Avg' }
                    ]
                }
            }
        ]
    };
    return (
        <React.Fragment>
            <div className="flex-grow-1 mt-4">
                {props.serviceTraceHistogramList.data.length > 0 ?
                    <Chart option={option} height={400} margin={"0 auto"} />
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
)(Histogram); 