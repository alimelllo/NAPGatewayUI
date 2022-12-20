import React, { useEffect, useState } from 'react';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IDashboardState } from '../../Actions/Dashboard/model';
import { IApplicationState } from '../../Store/state';
import { connect } from 'react-redux';
import { useTranslation, Translation } from 'react-i18next';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import Select from 'react-select';
import NDate from '@nepo/ndate';
import moment from 'moment';
import API from "../../GeneralComponents/baseURL";
import DatePicker from '../../GeneralComponents/Calendar'
import  '../Accounting/accounting.css';
import { Link } from 'react-router-dom';
import loading from '../../assets/loading.svg'
import '../../GeneralComponents/GymLoading/GymLoading.css';

type IProps = typeof dashboardActions & IDashboardState 

const Bill = ( props: IProps ) => {
	const [t] = useTranslation()
	const userAccessData = {
		show: { roles: ["Operator", "Manager", "Supervisor"], withNoAccessPage: true },
	}
    const [serviceName, setServiceName] = useState<string>('')
    const [clientName, setClientName] = useState<string>('')
    const [fromDate, setFromDate] = useState<string>('')
    const [toDate, setToDate] = useState<string>('')
    const [fromTime, setFromTime] = useState<string>(  (moment().subtract(15, 'minutes')).format("HH:mm:ss") )
    const [toTime, setToTime] = useState<string>(new NDate().format("HH:mm:ss"))
    const [ price , setPrice ] = useState<any>(0);
    const [ description , setDescription ] = useState<any>('');
    const [serviceType, setServiceType] = useState<string>('all')
    const [getalldata, setGetalldata] = useState<number>(-7);

    const [ showTable , setShowTable ] = useState<boolean>(false); 
    const [ error , setError ] = useState<any>('');
    const [accountingList , setAccountingList ] = useState<any>([]);
    const [ showAddForm , setShowAddForm ] = useState<boolean>(false);

    const [ requiredMessage , setRequiredMessage] = useState<boolean>(false);
    const [ showDetail , setShowDetail] = useState<boolean>(false);
    const [ billList , setBillList] = useState<any>();

    const [ isLoading , SetIsLoading ] = useState<boolean>(false);
    let   [ pageNumber , SetPageNumber ] = useState<number>(1);


	useEffect(() => {
		document.title = t("bill")
	}, [t])



    // my code ... 
    // ======================= //

    useEffect(() => {
        props.getAllServicesName( serviceType);
        props.getClientsName();
    }, [ getalldata,serviceType ] )

    props.clientsName.data.map( (item:any , index:any ) => 
        item.value === 'all' ? props.clientsName.data.splice(index , 1) : null
    );
    

    const AccountingsQuery = async ( clientName:string , serviceName:string , pageNumber:number) => {
        SetIsLoading(true);
        try{
           const result = await API.get(`NAPGateWay/AccountingsQuery/GetBillByClientService?ClientName=${clientName}&ServiceName=${serviceName}`);
           console.log(result);
           SetIsLoading(false);
         const accountngDataList = result.data.map( ( item: any , index: number ) => ( <div className='col-12 text-center' style={{display: 'flex' , flexDirection : 'row' ,justifyContent : 'between'  , borderBottom : '1px solid #d9d9d9'}}>
                      { !item.isBilled ? <div className='col-1 '><input className="form-check-input  mt-3" type="checkbox"/></div> : <div className='text-center'>حساب شده</div>}
                       <p className='col-1 text-center mx-auto pt-3' >{index + 1}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{new NDate(item.fromDate).yearJalali + '/' + new NDate(item.fromDate).monthJalali + '/' + new NDate(item.fromDate).dayJalali}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{new NDate(item.toDate).yearJalali + '/' + new NDate(item.toDate).monthJalali + '/' + new NDate(item.toDate).dayJalali}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                       <p className='col-2 text-center mx-auto pt-3' >{item.totalCallCountSuccess}</p>
                       <p className='col-2 text-center mx-auto pt-3' >{item.totalCallCountUnSuccess}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{item.description}</p>
                       <p style={{ color : 'white' , cursor : 'pointer' , backgroundColor : 'gray' , borderRadius : '15px'}} className="col-1 mt-3 p-1" onClick={ () => getBillDetail(item.id) }> جزییات</p>

          </div>
            ))
            setAccountingList( accountngDataList );
            setShowTable(true);
            setError('');
        }
        catch( error ){
            setError(' Fetching failed ( server error ) ');
            SetIsLoading(true);
           }
        }


    // my code ... 
    // ======================= //



    const createBill = async ( data:any ) => {
    console.log(data)
    if( data.clientName && data.serviceName && data.fromDate && data.toDate && data.description){
        SetIsLoading(true);
        try{
            await API.post(`NAPGateWay/AccountingsCommand/CreateBill` , data);
            
            AccountingsQuery( clientName , serviceName , 1)
            setShowAddForm(false);
            setFromDate('');
            setToDate('');
            setDescription('');
            setError('');
            setRequiredMessage(false); 
            SetIsLoading(false);
         }
         catch( error ){
             setError(error.response.data[0]);
             SetIsLoading(false);
            }
    }
    if(!data.clientName || !data.serviceName || !data.fromDate || !data.toDate || !data.description)
      setRequiredMessage(true);     
    }

    const getBillDetail = async ( billId : any ) => {
    
      console.log(billId)
      SetIsLoading(true);
      try{
        const result = await API.get(`NAPGateWay/AccountingsQuery/GetBillById?Id=${billId}`);
        console.log(result) 
       
        setBillList(result)
        setShowDetail(true);
        SetIsLoading(false);
     }
     catch( error ){
         setError(' Fetching failed ( server error ) ')
         SetIsLoading(false);
        }
    }



	return (
		
		<React.Fragment>
			<GymLoading loading={props.pushes.loading} />
			<div className="flex-fill p-4" dir='rtl'>
			
			
					<div className="bg-white rounded shadow-sm h-lg-100">
						

                        <div className="flex-grow-1 mt-3 mt-lg-0  p-2 d-flex justify-content-between">

                          <div className="row col-12 d-flex justify-content-between">

                          <div className="col-4 form-group">
                            <label htmlFor="clientName" className="d-flex justify-content-start">{t("clientNamefa")}</label>
                            <Select
                                value={props.clientsName.data.find(x => x.value == clientName)}
                                options={props.clientsName.data}
                                isRtl={true}
                                onChange={(data: any) => setClientName(data.value)}
                                placeholder={t("placeHselect")} />
                           </div>

                        <div className="col-4 form-group">
                            <label htmlFor="serviceName" className="d-flex justify-content-start">{t("serviceNamefa")}</label>
                            <Select
                                value={props.allservicesName.data.find(x => x.value == serviceName)}
                                options={props.allservicesName.data}
                                isRtl={true}
                                onChange={(data: any) => setServiceName(data.value)}
                                placeholder={t("placeHselect")} />
                        </div>
                      

                           <button onClick={() =>  AccountingsQuery( clientName , serviceName , 1 )} disabled={ clientName && serviceName ? false : true} className="col-2 btn btn-sm btn-success my-3 mt-4 shadow-lg">{t("فراخوانی")}</button> 

                         </div>
                        </div>
					</div>

                   { isLoading && <div className="spinner" ><div className="spinnerLoading"><img src={loading} alt="Loading" /></div></div>}
                   { showTable && !error && !showDetail && <div className='TABLE-CONTAINER shadow-lg apearAnimation' style={{ background : '#fafafa' , width : '100%' ,  marginTop : '3rem' , borderRadius : '10px' , border: '1px solid #dbdbdb' }}>

                <div style={{ display : 'flex' , flexDirection : 'row' , width : '100%' , background : '#e8e8e8' , border : '1px solid #c2c2c2' , borderTopLeftRadius : '10px' , borderTopRightRadius : '10px' }}>
                <p className='col-1 text-center pt-2 mx-auto' >انتخاب</p>
                   <p className='col-1 text-center pt-2 mx-auto' >ردیف</p>
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>از تاریخ</p>
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>تا تاریخ</p>
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}> قیمت کل (ریال)</p>
                   <p className='col-2 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>تعداد فراخوانی های درست</p>
                   <p className='col-2 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>تعداد فراخوانی های غلط</p>
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}} >شرح</p> 
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}} >مشاهده</p> 
                </div>
                

                
                { showTable ? accountingList : null }
                { accountingList.length == 0 && <p className='text-center pt-4'>هیچ موردی یافت نشد</p>} 
                { showTable && !error && 
                <div className='d-flex flex-row justify-content-center ltr my-3'>
                     <p style={{cursor : 'pointer'}} onClick={()=>{  let copyState = pageNumber - 1; SetPageNumber(copyState); AccountingsQuery(clientName , serviceName , copyState ) }} className={ `text-center  ${ pageNumber <= 1 ? 'd-none' : 'd-block'} px-5`}> &#8810; </p>
                     {` صفحه  ${pageNumber}`}
                     <p onClick={ () =>{ let copyState = pageNumber + 1; SetPageNumber(copyState); AccountingsQuery(clientName , serviceName , copyState) }} style={{cursor : 'pointer'}} className={`text-lg text-center px-5 ${ accountingList.length < 5 ? 'd-none' : 'd-block'}`}> &#8811; </p>
                </div> 
                }
                
                 </div> }

                { showTable && !error &&  <button onClick={() => setShowAddForm(true)} disabled={ showDetail ? true : false } className="col-1 btn btn-sm btn-primary py-2 my-3 mt-4 shadow-lg apearAnimation">{t("محاصبه جدید +")}</button> }
                { error && <h3 className='text-secondary col-12 text-center text-lg my-5'>{error}</h3>}
      {/* deatil container */}
{/* ============================= */}         
               
                               { showDetail && <>
<button onClick={() => setShowDetail(false)} className="bg-danger mt-3 pt-1 px-2 text-white shadow-lg" style={{borderRadius : '25px' , backgroundColor : '#f56767' , float:'right' , border:'none' , cursor : 'pointer'}}>X</button>

 <div className='TABLE-CONTAINER shadow-lg apearAnimation' style={{ background : '#fafafa' , width : '100%' , borderRadius : '10px' , border: '1px solid #dbdbdb' }}>
<div style={{ display : 'flex' , flexDirection : 'row' , width : '100%' , background : '#e8e8e8' , border : '1px solid #c2c2c2' , borderTopLeftRadius : '10px' , borderTopRightRadius : '10px' }}>
   <p className='col-1 text-center pt-2 mx-auto' >از تاریخ</p>
   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>تا تاریخ</p>
   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}> استفاده کننده </p>
   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>نام سرویس</p>
   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}> قیمت کل (ریال)</p>
   <p className='col-2 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>تعداد فراخوانی های درست</p>
   <p className='col-2 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>تعداد فراخوانی های غلط</p>
   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}} >شرح</p> 
</div>
        
        <div className='col-12 text-center' style={{display: 'flex' , flexDirection : 'row' ,justifyContent : 'between'  , borderBottom : '1px solid #d9d9d9'}}>
         <p className='col-1 text-center mx-auto pt-3' >{new NDate(billList.data.fromDate).yearJalali + '/' + new NDate(billList.data.fromDate).monthJalali + '/' + new NDate(billList.data.fromDate).dayJalali}</p>
         <p className='col-1 text-center mx-auto pt-3' >{new NDate(billList.data.toDate).yearJalali + '/' + new NDate(billList.data.toDate).monthJalali + '/' + new NDate(billList.data.toDate).dayJalali}</p>
         <p className='col-1 text-center mx-auto pt-3' >{billList.data.clientName}</p>
         <p className='col-1 text-center mx-auto pt-3' >{billList.data.serviceName}</p>
         <p className='col-1 text-center mx-auto pt-3' >{billList.data.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
         <p className='col-2 text-center mx-auto pt-3' >{billList.data.totalCallCountSuccess}</p>
         <p className='col-2 text-center mx-auto pt-3' >{billList.data.totalCallCountUnSuccess}</p>
         <p className='col-1 text-center mx-auto pt-3' >{billList.data.description}</p>
        </div>
 </div> 
 </> } 

{/* deatil container */}
{/* ============================= */}     



{/* form container */}
{/* ============================= */}
           { showAddForm && !showDetail &&<div className='d-flex flex-row flex-wrap mt-1 p-2 shadow-lg apearAnimation' style={{ backgroundColor : '#fafafa' , borderRadius : '10px'  }} dir='rtl'>
        
                           <div className="form-group mx-2">
                            <label htmlFor="startTime" className="d-flex justify-content-start">
                                {t("startDate")}
                            </label>
                            <DatePicker setTime={ false }
                                onChange={(value) => { setFromDate(value) }}
                                placeholder={t("placeHDate")} />
                        </div>
                        <div className="form-group mx-2">
                            <label htmlFor="startTime" className="d-flex justify-content-start">
                                {t("endDate")}
                            </label>
                            <DatePicker setTime={false}
                                onChange={(value) => { setToDate(value) }}
                                placeholder={t("placeHDate")} />
                        </div>
                             <div className="input-group col-3 d-flex flex-row">
                             <label htmlFor="description" className="d-flex ">{"شرح :"}</label>
                              <input onChange={(data : any) => setDescription(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="شرح  " aria-describedby="basic-addon1"/>
                             </div>

                             { requiredMessage && <div className='text-center text-danger mt-4'>وارد کردن تمام موارد الزامی است</div>}
                        <div className='col-12 justify-content-center'>   
                            <button onClick={()=> createBill({ clientName : clientName , serviceName : serviceName , fromDate : fromDate , toDate : toDate , description : description})} className="col-1 btn btn-sm btn-primary py-2 my-3 mt-4 shadow-lg ">{"محاصبه"}</button> 
                        </div>


                           </div> }
{/* form container */}
{/* ============================= */}



				
			</div>
			
		</React.Fragment>
	);
}


export default connect(
	(state: IApplicationState) => state.dashboard,
	dashboardActions,
)( Bill  );