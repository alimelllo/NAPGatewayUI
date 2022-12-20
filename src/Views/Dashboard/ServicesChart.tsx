import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Chart from '../Dashboard/ChartInfo'
import { IDashboardState } from '../../Actions/Dashboard/model';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IApplicationState } from '../../Store/state';
import { useTranslation } from 'react-i18next';

type IProps = typeof dashboardActions & IDashboardState

const ServicesChart = (props: IProps) => {
    const [t] = useTranslation()
    const [xAxisData, setxAxisData] = useState<string[]>([])
    const [data1, setData1] = useState<number[]>([])
    const [data2, setData2] = useState<number[]>([])
    useEffect(() => {
        let d = [];
        let d0: number[] = [];
        let d1: number[] = [];
        for (let i = 0; i < props.allserviceinterval.data.length; i++) {
            var sum = props.allserviceinterval.data[i].countOfSuccess + props.allserviceinterval.data[i].countofUnsuccess;
            d.push(props.allserviceinterval.data[i].datetime);
            d0.push((props.allserviceinterval.data[i].countOfSuccess * 100) / sum);
            d1.push((props.allserviceinterval.data[i].countofUnsuccess * 100) / sum);
        }
        setxAxisData(d);
        setData1(d0);
        setData2(d1);
    }, [props.allserviceinterval.data])
    var emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    };
    const option: any = {
        title: {
            left: 'left',
            text: t('conditionResponsRequests')
        },
        // tooltip: {
        //     trigger: 'axis'
        // },
        // tooltip: {
        //     trigger: 'axis',
        //     formatter: '{a} <br/>{b} : ({d}%)'
        // },
        toolbox: {
            left: 'right',
            show: true,
            feature: {
                
                magicType: { type: ['line', 'bar', 'stack', 'tiled'], title: { line: t('lineChart'), bar: t('barChart') ,stack : t('stackChart') , tiled : t('tiledChart') } },
                saveAsImage: { title: t('saveAspicture') },
               
                dataZoom: {
                    yAxisIndex: 'none'
                },
            }
        },
        legend: {
            data: ['موفق', 'ناموفق']
        },
        xAxis: {
            data: xAxisData,
            // name: 'X Axis',
            axisLine: { onZero: true },
            splitLine: { show: false },
            splitArea: { show: false }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
        },
        dataZoom: [
            {
                type: 'inside',
            },
            {
                start: 0,
                end: 10
            }
        ],
        series: [
            {
                itemStyle: {color: 'cyan'},
                name: 'موفق',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data1
            },
            {
                color: ['red'],
                name: 'ناموفق',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data2
            }
        ]
        // series: [
        //     {
        //         name: t('pushesCount'),
        //         type: 'line',
        //         data: [10, 20, 30]
        //     }
        // ]
    };
    return (
        <React.Fragment>
            <Chart option={option} height={500} margin={"0 auto"} />
        </React.Fragment>
    )
}

export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(ServicesChart);