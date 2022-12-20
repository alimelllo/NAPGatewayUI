import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Chart from './ChartInfo'
import { IDashboardState } from '../../Actions/Dashboard/model';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IApplicationState } from '../../Store/state';
import { useTranslation } from 'react-i18next';

type IProps = typeof dashboardActions & IDashboardState

const CountRequestStatusCart = (props: IProps) => {
    const [t] = useTranslation()

    useEffect(() => {
    }, [props.allsumallbystatuscode.data])
    var emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    };
    const option: any = {
        
        title: {
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'right',
        },
        series: [
            {
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: props.allsumallbystatuscode.data.keyclienterror, name:'خطای کلاینت'},
                    {value: props.allsumallbystatuscode.data.keyroutechange, name:'تغییر مسیر'},
                    {value: props.allsumallbystatuscode.data.keyservererror, name:'خطای سرور'},
                    {value: props.allsumallbystatuscode.data.keysuccess, name:'موفق',color: ['blue']},
                ],
                
                emphasis: emphasisStyle
            }
        ]
    };


    return (
        <div className="chart">
            <Chart
                option={option}
                height={343}
                margin={"0 auto"}
            />
        </div>
    )
}
export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(CountRequestStatusCart);

// color: ['#f00b51', '#f85451'],
// tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//         type: 'shadow'
//     }
// },
// grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
// },
// xAxis: [
//     {
//         type: 'category',
//         data: props.doctorGender.titles,
//         axisTick: {
//             alignWithLabel: true
//         }
//     }
// ],
// yAxis: [
//     {
//         type: 'value'
//     }
// ],
// series: [
//     {
//         name: 'تعداد مربیان',
//         type: 'pie',
//         barWidth: '79%',
//         data: props.doctorGender.values
//     }
// ]
// };