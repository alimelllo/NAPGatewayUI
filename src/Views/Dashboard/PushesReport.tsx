import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Chart from '../Dashboard/ChartInfo'
import { IDashboardState } from '../../Actions/Dashboard/model';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IApplicationState } from '../../Store/state';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../GeneralComponents/Calendar'
import NDate from '@nepo/ndate';
import Select from 'react-select';
import useFormControl from '../../GeneralComponents/GymFormControl/GymFormControl';
import CardNumber from './CardNumber';
import ServicesChart from './ServicesChart';
import ServiceHorizontalChart from './ServiceHorizontalChart';
import ServiceVerticalChart from './ServiceVerticalChart';
import CountRequestStatusCart from './CountRequestStatusCart';
import ClientsChart from './ClientsChart';
import TimePicker from '../../GeneralComponents/GymTimePicker'
import GridClient from './GridClient';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import ServiceVerticalChartByServicename from './ServiceVerticalChartByServicename';
import { clearInterval, clearTimeout } from 'timers';
import moment from 'moment';

type IProps = typeof dashboardActions & IDashboardState

const PushesReport = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true }
    }
    const [fromDate, setFromDate] = useState<string>(new NDate().format("YYYY-MM-DD"))
    const [toDate, setToDate] = useState<string>(new NDate().format("YYYY-MM-DD"))
    const [fromTime, setFromTime] = useState<string>(  (moment().subtract(15, 'minutes')).format("HH:mm:ss") )
    const [toTime, setToTime] = useState<string>(new NDate().format("HH:mm:ss"))
    const [serviceName, setServiceName] = useState<string>('all')
    const [serviceType, setServiceType] = useState<string>('all')
    const [clientName, setClientName] = useState<string>('all')
    const [refreshTime, setrefreshTime] = useState<number>(60)
    const [activerefreshTime, setactiverefreshTime] = useState<boolean>(false)
    const [getalldata, setGetalldata] = useState<number>(-7)
    let firsttime = "";
    const refreshTimes = [
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 30, label: "30" },
        { value: 40, label: "40" },
        { value: 50, label: "50" },
        { value: 60, label: "60" },
        { value: 120, label: "120" },
        { value: 180, label: "180" },
        { value: 240, label: "240" },
        { value: 300, label: "300" },
    ];

    const getalldatas = [
        { value: -7, label: "7 روز پیش" },
        { value: -15, label: "15 روز پیش" },
        { value: -30, label: "1 ماه پیش" },
        { value: -60, label: "2 ماه پیش" },
        { value: -120, label: "4 ماه پیش" },
        { value: -180, label: "6 ماه پیش" },
        { value: -365, label: "1 سال پیش " },
      
    ];


    const setactiverefreshTimeHandel = () => {

    }
    const serviceTypes = [
        { value: 'all', label: 'همه' },
        { value: 'internalType', label: 'داخلی' },
        { value: 'externalType', label: 'خارجی' }];

    useEffect(() => {
 
        props.getAllServicesName( serviceType);
        props.getClientsName();
   
       
        getData();
    }, [getalldata,serviceType ] )

    const getData = () => {
   
         
         props.getServicesName(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType);
          props.getAllbystatuscodeclientname(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType);
          props.getAllbystatuscodeservicename(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType);
          props.getAllcountbyservicetitle(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType,getalldata);
          props.getAllservicecountdetail(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType);
          props.getAllserviceinterval(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType);
          props.getCountOfAllRequest(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType,getalldata);
          props.getAllcountbyclientname(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType,getalldata);
          props.getAllbystatuscodeclienteservice(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType);
          props.getAllsumallbystatuscode(fromDate + " " + fromTime, toDate + " " + toTime, serviceName, clientName, serviceType);
          // setFromTime(moment().subtract(15, 'minutes').format("HH:mm:ss"));  

        // setToTime( new NDate().format("HH:mm:ss") );
         
    }
    const myrefresh = (item: any) => {
        getData();
        setFromTime(moment().subtract(15, 'minutes').format("HH:mm:ss"));  
        setToTime( new NDate().format("HH:mm:ss") );
    }




    const refreshTimePage = (item: any) => {
        
        setrefreshTime(item);
        clearInterval(refMethod);
        setFromTime(moment().subtract(15, 'minutes').format("HH:mm:ss"));  
        setToTime( new NDate().format("HH:mm:ss") );
        // refresh();
    }

    const disablerefresh = () => {

        setactiverefreshTime(false);

        clearInterval(refMethod)


    }
    let refMethod: any;
    const refresh = () => {

        setactiverefreshTime(true)

        refMethod = setInterval(() => {
            myrefresh(refreshTime);
            

        }, refreshTime * 1000);


    }

    return (
        <GymAccessControl data={userAccessData.show}>
            <GymLoading loading={
                props.allbystatuscodeclientname.loading ||
                props.allbystatuscodeservicename.loading ||
                props.allserviceinterval.loading ||
                props.allsumallbystatuscode.loading ||
                props.allservicecountdetail.loading ||
                props.allcountbyservicetitle.loading ||
                props.servicesName.loading ||
                props.clientsName.loading} />
            <div className='p-3 bg-secondary' dir='rtl'>

            <div className="flex-grow-1 mt-3 mt-lg-0  p-2 d-flex justify-content-between">
                    <div className="row col-12 d-flex justify-content-between">
                        
                        <div className="col-2 form-group">
                            <label htmlFor="AllData" className="d-flex justify-content-start">{t("alldatacombo")}</label>
                            <Select
                                noOptionsMessage={t("noDataToShow")}
                                defaultValue={getalldatas[0]}
                                value={getalldatas.find(x => x.value == getalldata)}
                                options={getalldatas}
                                isRtl={true}
                                onChange={(data: any) => setGetalldata(data.value)}
                                placeholder={t("placeHselect")} />
                        </div>
                         
                        
                    </div>
                </div>


                <div className="flex-grow-1 mt-3 mt-lg-0  p-2 d-flex justify-content-between">
                    <div className="row col-12 d-flex justify-content-between">
                        
                        <div className="col-2 form-group">
                            <label htmlFor="serviceNameKind" className="d-flex justify-content-start">{t("serviceNameKindfa")}</label>
                            <Select
                                noOptionsMessage={t("noDataToShow")}
                                defaultValue={serviceTypes[0]}
                                value={serviceTypes.find(x => x.value == serviceType)}
                                options={serviceTypes}
                                isRtl={true}
                                onChange={(data: any) => setServiceType(data.value)}
                                placeholder={t("placeHselect")} />
                        </div>
                        <div className="col-5 form-group">
                            <label htmlFor="serviceName" className="d-flex justify-content-start">{t("serviceNamefa")}</label>
                            <Select
                                noOptionsMessage={t("noDataToShow")}
                                defaultValue={props.allservicesName.data[0]}
                                value={props.allservicesName.data.find(x => x.value == serviceName)}
                                options={props.allservicesName.data}
                                isRtl={true}
                                onChange={(data: any) => setServiceName(data.value)}
                                placeholder={t("placeHselect")} />
                        </div>
                        <div className="col-5 form-group">
                            <label htmlFor="clientName" className="d-flex justify-content-start">{t("clientNamefa")}</label>
                            <Select
                                noOptionsMessage={t("noDataToShow")}
                                defaultValue={props.clientsName.data[0]}
                                value={props.clientsName.data.find(x => x.value == clientName)}
                                options={props.clientsName.data}
                                isRtl={true}
                                onChange={(data: any) => setClientName(data.value)}
                                placeholder={t("placeHselect")} />
                        </div>
                    </div>
                </div>
                <div className="flex-grow-1 mt-1 mt-lg-0  p-2 d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                    <div className="col-1 form-group">
                        </div>
                        <div className="form-group mx-2">
                            <label htmlFor="startTime" className="d-flex justify-content-start">
                                {t("startDate")}
                            </label>
                            <DatePicker
                               defaultValue={fromDate}
                            
                            
                                onChange={(value) => { setFromDate(value) }}
                                placeholder={t("placeHDate")} />
                        </div>
                        <div className="form-group mx-2">
                            <label htmlFor="startTime" className="d-flex justify-content-start">
                                {t("startTime")}
                            </label>

                          
                            <TimePicker
                               defaultValueText={fromTime}
                                className="form-control"
                                valueText = {fromTime}
                                withSecond = {true }
                                onChangeText={(value) => { setFromTime(value); }}
                                placeholder={t("placeHselectTime")}
                                type="24"
                                clockType="analog" />
                        </div>
                        <div className="form-group mx-2">
                            <label htmlFor="startTime" className="d-flex justify-content-start">
                                {t("endDate")}
                            </label>
                            <DatePicker
                            
                            defaultValue={toDate}
                                onChange={(value) => { setToDate(value) }}
                                placeholder={t("placeHDate")} />
                        </div>
                        <div className="form-group mx-2">
                            <label htmlFor="endTime" className="d-flex justify-content-start">
                                {t("endTime")}
                            </label>
                            <TimePicker
                                className="form-control"
                                defaultValueText={toTime}
                                withSecond = {true }
                                minText={fromTime}
                                onChangeText={(value) => { setToTime(value); }}
                                placeholder={t("placeHselectTime")}
                                type="24"
                                clockType="analog" />
                        </div>
                        <button className="col-1 btn btn-sm btn-success my-3 mt-4" onClick={getData}>{t("refresh")}</button>
                        <div className="col-3 form-group">
                            <label htmlFor="refreshTime" className="d-flex justify-content-start">{t("refreshTime")}</label>
                            <Select
                                value={refreshTimes.find(x => x.value == refreshTime)}
                                options={refreshTimes}

                                isRtl={true}
                                onChange={(data: any) => refreshTimePage(data.value)}
                                placeholder={t("placeHselect")} />
                        </div>
                        {!activerefreshTime ?
                            <button className="col-2 btn btn-sm btn-success my-3 mt-4" onClick={refresh}>{t("refreshpage")}</button>
                            :
                            <button className="col-2 btn btn-sm btn-secondary my-3 mt-4" onClick={disablerefresh}>{t("notrefreshpage")}</button>
                        }
                    </div>
                </div>

                <div className="chart p-4">
                    <div className='p-3 m-1 bg-light rounded'>
                    <div className="text-center"> <label   >اطلاعات کلی</label> </div>
                   
                   
                        <div className='row'>
                            <CardNumber text={t("countAllRequestsNotSuccess")} data={props.countOfAllRequest.dataall.countOfAllUnSuccess.sum} color={'red'} />
                            <CardNumber text={t("countAllRequestsSuccess")} data={props.countOfAllRequest.dataall.countOfAllSuccess.sum} color={'green'} />
                            <CardNumber text={t("countAllReciveService")} data={props.allcountbyclientname.dataall} color={'black'} />
                            <CardNumber text={t("countAllReciveServicePersenttion")} data={props.allcountbyservicetitle.dataall} color={'black'} />
                        </div>
                    </div>
                    <div className='p-3 m-1 bg-light rounded'>
                        <div className='row'>
                            <CardNumber text={t("countAllRequestNotSuccess")} data={props.countOfAllRequest.data.countOfAllUnSuccess.sum} color={'red'} />
                            <CardNumber text={t("countAllRequestSuccess")} data={props.countOfAllRequest.data.countOfAllSuccess.sum} color={'green'} />
                            <CardNumber text={t("countReciveService")} data={props.allcountbyclientname.data} color={'black'} />
                            <CardNumber text={t("countReciveServicePersenttion")} data={props.allcountbyservicetitle.data} color={'black'} />
                        </div>
                    </div>
                    <div className='p-3 my-2 bg-light'>
                        <div className='px-3 my-2 bg-light d-flex justify-content-center'>
                            {t('persentionServices')}
                        </div>
                        <GridClient />
                    </div>
                    <div className='p-3 m-1 bg-light rounded'>
                        <ServicesChart />
                    </div>
                    <div className='p-3 mb-2 bg-light rounded'>
                        <ServiceHorizontalChart />
                    </div>
                    <div className='p-3 m-1 bg-light rounded'>
                        <ServiceVerticalChart />
                    </div>
                    <div className='p-3 m-1 bg-light rounded'>
                        <ClientsChart />
                    </div>
                    {/* <div className='p-3 m-1 bg-light rounded'>
                        <ServiceVerticalChartByServicename />
                    </div> */}
                    <div className='p-3 my-2 bg-light'>
                        <CountRequestStatusCart />
                    </div>
                </div>
            </div>
        </GymAccessControl>
    )
}

export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(PushesReport);

 
