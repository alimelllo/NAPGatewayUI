import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Chart from '../Dashboard/ChartInfo'
import { IDashboardState } from '../../Actions/Dashboard/model';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IApplicationState } from '../../Store/state';
import { useTranslation } from 'react-i18next';

type IProps = typeof dashboardActions & IDashboardState

const ClientsChart = (props: IProps) => {
    const [t] = useTranslation()
    const [xAxisData, setxAxisData] = useState<string[]>([])
    const [data1, setData1] = useState<number[]>([])
    const [data2, setData2] = useState<number[]>([])
    useEffect(() => {
        let d = [];
        let d0: number[] = [];
        let d1: number[] = [];
        for (let i = 0; i < props.allbystatuscodeclientname.data.length; i++) {
            var sum = props.allbystatuscodeclientname.data[i].success + props.allbystatuscodeclientname.data[i].unsuccess;
            d.push(props.allbystatuscodeclientname.data[i].clientName);
            d0.push(props.allbystatuscodeclientname.data[i].success);
            d1.push(props.allbystatuscodeclientname.data[i].unsuccess);
        }
        setxAxisData(d);
        setData1(d0);
        setData2(d1);
    }, [props.allbystatuscodeclientname.data])
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
        tooltip: {
            trigger: 'axis'
        },
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
                dataView: {
                    lang: ['جدول', 'بستن', 'Refresh'],
                    show: true,
                    title: 'نمایش جدولی',
                    optionToContent: function (opt:any) {
                        var axisData = opt.xAxis[0].data;
                        var series = opt.series;
                        var tdHeads = '<td  style="padding:0 10px">نام</td>';
                        series.forEach(function (item: { name: string; }) {
                            tdHeads += '<td style="padding: 0 10px">'+item.name+'</td>';
                        });
                        var table = '<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>'+tdHeads+'</tr>';
                        var tdBodys = '';
                        for (var i = 0, l = axisData.length; i < l; i++) {
                            for (var j = 0; j < series.length; j++) {
                                if(typeof(series[j].data[i]) == 'object'){
                                    tdBodys += '<td>'+series[j].data[i].value+'</td>';
                                }else{
                                    tdBodys += '<td>'+ series[j].data[i]+'</td>';
                                }
                            }
                            table += '<tr><td style="padding: 0 10px">'+axisData[i]+'</td>'+ tdBodys +'</tr>';
                            tdBodys = '';
                        }
                        table += '</tbody></table>';
                        return table;
                    }
                },
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
            min: 0
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
                color: ['green'],
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
)(ClientsChart);