import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Chart from '../Dashboard/ChartInfo'
import { IDashboardState } from '../../Actions/Dashboard/model';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IApplicationState } from '../../Store/state';
import { useTranslation } from 'react-i18next';

type IProps = typeof dashboardActions & IDashboardState

const ServiceVerticalChartByServicename = (props: IProps) => {
  const [t] = useTranslation()
  const [xAxisData, setxAxisData] = useState<string[]>([])
  const [yAxisData, setyAxisData] = useState<string[]>([])
  const [data1, setData1] = useState<any[]>([])
  const [data2, setData2] = useState<string[]>([])
  const [data3, setData3] = useState<any[]>([])
 
  useEffect(() => {
    let d = [];
    let d1 = [];
    let d2 = [];
    let d3 = [];
 

 
    for (let z = 0; z< props.allbystatuscodeclienteservice.data.legend.length; z++) {
      d2.push(props.allbystatuscodeclienteservice.data.legend[z]) ;

    }
    console.log(props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName);
    
    for (let i = 0; i < props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName.length; i++) {
      d.push(props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i].clientName);
      console.log(props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i]);
      console.log(props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i].countStatusByServiceName);
      for (let k = 0; k < props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i].countStatusByServiceName.length; k++) {
      //  d2.push(props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i].countStatusByServiceName[k].serviceName);

        d1.push({ value: props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i].countStatusByServiceName[k].success, name: props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i].countStatusByServiceName[k].serviceName });
        d3.push({ value: props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i].countStatusByServiceName[k].unsuccess, name: props.allbystatuscodeclienteservice.data.statusByClientNameSliceServiceName[i].countStatusByServiceName[k].serviceName });


     
      }

    }
console.log("d:"  +  d);
console.log("d1:"+ d1);
console.log("d2:"+ d2);
console.log("d3:"+ d3);
 



    setxAxisData(d);
    setyAxisData(d2);
    setData1(d1);
    setData2(d2);
    setData3(d3);
 
    let model:any

  }, [props.allbystatuscodeclienteservice.data])
  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)'
    }
  };
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} '
    },
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
    legend:  {
      data: data2
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        color: ['blue'],
        name: 'موفق',
        type: 'bar',
        stack: 'one',
        emphasis: {
          focus: 'series'
        },
        data: data1
      },
      {
        color: ['red'],
        name: 'ناموفق',
        type: 'bar',
        stack: 'one',
        emphasis: {
          focus: 'series'
        },
        data: data3
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
)(ServiceVerticalChartByServicename);