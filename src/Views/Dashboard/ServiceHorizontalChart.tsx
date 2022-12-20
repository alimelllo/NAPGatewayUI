import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Chart from '../Dashboard/ChartInfo'
import { IDashboardState } from '../../Actions/Dashboard/model';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IApplicationState } from '../../Store/state';
import { useTranslation } from 'react-i18next';

type IProps = typeof dashboardActions & IDashboardState

const ServiceHorizontalChart = (props: IProps) => {
    const [t] = useTranslation()
    const [xAxisData, setxAxisData] = useState<string[]>([])
    const [data1, setData1] = useState<any[]>([])
const colors= ["#13a399", "#ff58452", "#fff200", "#fac858", "#0b00ff", "#00ff03", "#13a399", "#13a399", "#13a399", "#13a399", "#13a399"]
    useEffect(() => {
        let d = [];
        let d0: any[] = [];
        for (let i = 0; i < props.allservicecountdetail.data.length; i++) {
            d.push(props.allservicecountdetail.data[i].serviceName);
            d0.push({value:props.allservicecountdetail.data[i].count, itemStyle:{color:colors[i%10]}});
        }
        setxAxisData(d);
        setData1(d0);
    }, [props.allservicecountdetail.data])

    var emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    };
    const option: any = {
        title: {
            left: 'left',
            text: t('presentationServices')
        },
        tooltip: {
            trigger: 'axis'
        },
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

                     
                        var axisData = opt.yAxis[0].data;
                 
                        var series = opt.series;
                        var tdHeads = '<td  style="padding:0 10px">نام</td>';
                   
                        
                       

                        
                            tdHeads += '<td style="padding: 0 10px">'+"تعداد کل"+'</td>';
                        
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
                // dataZoom: {
                //     xAxisIndex: 'none'
                // },
            }
        },
        legend: {
            // data: ['bar', 'bar2']
            // data: props.allservicecountdetail.data.forEach(element => {
            //     return element.serviceName
            // })
        },
        yAxis: {
            data: xAxisData,
            type: 'category',
            // name: 'X Axis',
            axisLine: { onZero: true },
            splitLine: { show: false },
            splitArea: { show: false }
        },
        xAxis: {
            type: 'value',
            min: 0
        },
        // dataZoom: [
        //     {
        //         type: 'inside',
        //     },
        //     {
        //         start: 0,
        //         end: 10
        //     }
        // ],
        series: [
            {
                // name: 'bar',
                type: 'bar',
                // stack: 'one',
                colorBy:"series",
                // emphasis: emphasisStyle,
                
                data: data1
            }
        ]
    };
    return (
        <React.Fragment>
            <Chart option={option} height={  props.allservicecountdetail.data.length < 10  ? (500) :   props.allservicecountdetail.data.length * 35}    margin={"0 auto"} />
        </React.Fragment>
    )
}

export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(ServiceHorizontalChart);