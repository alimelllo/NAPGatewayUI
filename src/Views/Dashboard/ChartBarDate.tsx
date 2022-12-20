// import * as echarts from 'echarts';
// import React, { useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { dashboardActions } from '../../Actions/Dashboard/action'
// import { IApplicationState } from '../../Store/state'
// import { connect } from 'react-redux';
// import { IDashboardState } from '../../Actions/Dashboard/model';

// type EChartsOption = echarts.EChartOption;
// // const chartDom = React.createRef().current;
// // var myChart = echarts.init(chartDom);
// var option: EChartsOption;
// const defaultOption = {
//     textStyle: { fontFamily: "IRANSANs" },
//     // color: Colors,
// };
// let xAxisData: string[] = [];
// let data1: number[] = [];
// let data2: number[] = [];
// let data3: number[] = [];
// let data4: number[] = [];

// for (let i = 0; i < 10; i++) {
//   xAxisData.push('Class' + i);
//   data1.push(+(Math.random() * 2).toFixed(2));
//   data2.push(+(Math.random() * 5).toFixed(2));
//   data3.push(+(Math.random() + 0.3).toFixed(2));
//   data4.push(+Math.random().toFixed(2));
// }

// var emphasisStyle = {
//   itemStyle: {
//     shadowBlur: 10,
//     shadowColor: 'rgba(0,0,0,0.3)'
//   }
// };

// option = {
//   legend: {
//     data: ['bar', 'bar2', 'bar3', 'bar4'],
//     left: '10%'
//   },
//   brush: {
//     toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
//     xAxisIndex: 0
//   },
//   toolbox: {
//     feature: {
//       magicType: {
//         type: ['stack']
//       },
//       dataView: {}
//     }
//   },
//   tooltip: {},
//   xAxis: {
//     data: xAxisData,
//     name: 'X Axis',
//     axisLine: { onZero: true },
//     splitLine: { show: false },
//     splitArea: { show: false }
//   },
//   yAxis: {},
//   grid: {
//     bottom: 100
//   },
//   series: [
//     {
//       name: 'bar',
//       type: 'bar',
//       stack: 'one',
//       emphasis: emphasisStyle,
//       data: data1
//     },
//     {
//       name: 'bar2',
//       type: 'bar',
//       stack: 'one',
//       emphasis: emphasisStyle,
//       data: data2
//     },
//     {
//       name: 'bar3',
//       type: 'bar',
//       stack: 'two',
//       emphasis: emphasisStyle,
//       data: data3
//     },
//     {
//       name: 'bar4',
//       type: 'bar',
//       stack: 'two',
//       emphasis: emphasisStyle,
//       data: data4
//     }
//   ]
// };

// //  myChart.on('brushSelected', function (params: any) {
// //   var brushed = [];
// //   var brushComponent = params.batch[0];

// //   for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
// //     var rawIndices = brushComponent.selected[sIdx].dataIndex;
// //     brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
// //   }

// //   myChart.setOption<echarts.EChartOption>({
// //     title: {
// //       backgroundColor: '#333',
// //       text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
// //       bottom: 0,
// //       right: '10%',
// //       width: 100,
// //       textStyle: {
// //         fontSize: 12,
// //         color: '#fff'
// //       }
// //     }
// //   });
// // });
// // type IProps = typeof dashboardActions & IDashboardState & { text: string, data: number }

// // const ChartBarDate = (props: IProps) => {
// //     const [t] = useTranslation()
// //     return(
// //         <div id='ad'>
// //         </div>
// //     )
// // }

// // export default connect(
// //     (state: IApplicationState) => state.dashboard,
// //     dashboardActions,
// // )(ChartBarDate);
// interface IProps {
//     height: number;
//     option: any;
//     showLoading?: boolean;
//     onClick?: any;
//     onReady?: any;
//     margin: string
// }
// class ChartBarDate extends React.Component<IProps> {
//     private chartRef: any;
//     private chart: any;

//     constructor(props: IProps) {
//         super(props);
//         this.chartRef = React.createRef();
//     }

//     public componentDidMount() {
//         this.chart = this.renderChart();
//         // elementResizeEvent(this.chartRef.current, () => {
//         //     chart.resize();
//         // });
//         const { onReady } = this.props;
//         if (typeof onReady === "function") {
//             onReady(this.chart);
//         }
//         window.addEventListener('resize', this.updateDimensions);
//     }
//     updateDimensions = () => {
//         this.chart.resize();
//     };

//     public componentDidUpdate() {
//         this.renderChart();
//     }

//     public componentWillUnmount() {
//         echarts.dispose(this.chartRef.current);
//         window.removeEventListener('resize', this.updateDimensions);
//     }

//     public render() {
//         const { height, margin } = this.props;
//         return <div ref={this.chartRef} style={{ height, margin }} className="echart-wrapper mx-auto" />;
//     }

//     private renderChart() {
//         const chartDom = this.chartRef.current;
//         const chart = echarts.init(chartDom);
//         const { onClick, optionn, showLoading } = this.props;
//         if (onClick) {
//             chart.off("click");
//             chart.on("click", onClick);
//         }
//         const options = Object.assign({}, optionn, defaultOption);
//         chart.setOption(options);
//         if (showLoading) {
//             chart.showLoading();
//         } else {
//             chart.hideLoading();
//         }
//         chart.resize();
//         return chart;
//     }
// }

// export default ChartBarDate;
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { dashboardActions } from '../../Actions/Dashboard/action'
import { IApplicationState } from '../../Store/state'
import { connect } from 'react-redux';
import { IDashboardState } from '../../Actions/Dashboard/model';

type IProps = typeof dashboardActions & IDashboardState & { text: string, data: number }

const CardNumber = (props: IProps) => {
    const [t] = useTranslation()

    useEffect(() => {

    }, [])

    return (
        <div className="card border-danger rounded p-3 m-1" style={{ height: '150px', width: '24%',border:'2px solid red'}}>
            <div className="text-center mt-4">
                <span className="font-weight-bold"><h1>{props.data}</h1></span>
            </div>
            <div className="text-center mt-1">
                <span className=""><h6>{props.text}</h6></span>
            </div>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(CardNumber);
