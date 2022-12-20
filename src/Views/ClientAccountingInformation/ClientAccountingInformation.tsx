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

const ClientAccountingInformation = ( props: IProps ) => {
	const [t] = useTranslation()
	const userAccessData = {
		show: { roles: ["Operator", "Manager", "Supervisor"], withNoAccessPage: true },
	}

    const [clientName, setClientName] = useState<string>('')
  
    const [serviceType, setServiceType] = useState<string>('all')
    const [getalldata, setGetalldata] = useState<number>(-7);

    const [ showTable , setShowTable ] = useState<boolean>(false); 
    const [ error , setError ] = useState<any>('');
    const [accountingList , setAccountingList ] = useState<any>([]);
    const [ showAddForm , setShowAddForm ] = useState<boolean>(false);

    const [ requiredMessage , setRequiredMessage] = useState<boolean>(false);
    

    const [agentName , SetAgentName ] = useState<string>('');
    const [agentNo , SetAgentNo ] = useState<string>('')
    const [companyName , SetCompanyName ] = useState<string>('')
    const [companyAddress , SetCompanyAddress ] = useState<string>('')
    const [economicNo , SetEconomicNo ] = useState<string>('')
    const [melliCode , SetMelliCode ] = useState<string>('')
    const [postalCode , SetPostalCode ] = useState<string>('')
    const [registerNo , SetRegisterNo ] = useState<string>('')
    const [telNumber , SetTelNumber ] = useState<string>('')
   
    const [ isLoading , SetIsLoading ] = useState<boolean>(false);


	useEffect(() => {
		document.title = t("clientAccountingInformation")
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
    

    const ClientAccountingDetailQuery = async ( clientName:string  ) => {
        SetIsLoading(true);
        try{
           const result = await API.get(`NAPGateWay/AccountingsQuery/GetClientDetailByName?ClientName=${clientName}`);
           console.log(result)
           SetIsLoading(false);
           const accountngDataList = <div className='col-12 text-center' style={{display: 'flex' , flexDirection : 'row' ,justifyContent : 'between'  , borderBottom : '1px solid #d9d9d9'}}>
                       <p className='col-2 text-center mx-auto pt-3' >{result.data.agentName}</p>
                       <p className='col-2 text-center mx-auto pt-3' >{result.data.agentNo}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{result.data.companyName}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{result.data.companyAddress}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{result.data.economicNo}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{result.data.melliCode}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{result.data.postalCode}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{result.data.registerNo}</p>
                       <p className='col-1 text-center mx-auto pt-3' >{result.data.telNumber}</p>
          </div>

            setAccountingList( accountngDataList );
            setShowTable(true);
            setError('');
            SetIsLoading(false);
        }
        catch( error ){
            setError('Fetch Failed ( server error )');
           }
        }


        const createClienAccountingInformation = async ( data:any ) => {

            console.log(data);
            if(data.agentName || data.agentNo || data.companyName || data.companyAddress || data.economicNo || data.melliCode || data.postalCode || data.registerNo || data.telNumber){  
                SetIsLoading(true);
                try{
                    await API.post(`NAPGateWay/AccountingsCommand/CreateClientDetail` , data);
                    ClientAccountingDetailQuery( clientName )
                    SetAgentName('')
                    SetAgentNo('')
                    SetCompanyName('')
                    SetCompanyAddress('')
                    SetEconomicNo('')
                    SetMelliCode('')
                    SetPostalCode('')
                    SetRegisterNo('')
                    SetTelNumber('')
                    setError('');
                    setRequiredMessage(false); 
                    SetIsLoading(false);

                 }
                 catch(err){
                     console.log(err.response)
                     setError(err.response.data[0]);
                     SetIsLoading(false);
                    }
                }
            if(!data.agentName || !data.agentNo || !data.companyName || !data.companyAddress || !data.economicNo || !data.melliCode || !data.postalCode || !data.registerNo || !data.telNumber){  
            setRequiredMessage(true);
            }

        }

    // my code ... 
    // ======================= //





   



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

                      

                           <button onClick={() => { ClientAccountingDetailQuery( clientName  ); setShowAddForm(true)}} disabled={ clientName ? false : true} className="col-2 btn btn-sm btn-success my-3 mt-4 shadow-lg">{t("تعریف مشخصات")}</button> 

                         </div>
                        </div>
					</div>

                    { isLoading && <div className="spinner" ><div className="spinnerLoading"><img src={loading} alt="Loading" /></div></div>}
                    { showTable && !error && <div className='TABLE-CONTAINER shadow-lg apearAnimation' style={{ background : '#fafafa' , width : '100%' ,  marginTop : '3rem' , borderRadius : '10px' , border: '1px solid #dbdbdb' }}>

                <div style={{ display : 'flex' , flexDirection : 'row' , width : '100%' , background : '#e8e8e8' , border : '1px solid #c2c2c2' , borderTopLeftRadius : '10px' , borderTopRightRadius : '10px' }}>
                   <p className='col-2 text-center pt-2 mx-auto'> نام نماینده شرکت</p>
                   <p className='col-2 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>شماره نماینده شرکت </p>
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}> نام شرکت </p>
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>آدرس شرکت</p>
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}}>شماره اقتصادی</p>
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}} >شماره ملی</p>                  
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}} > کد پستی</p> 
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}} > کد ثبت</p> 
                   <p className='col-1 text-center pt-2 mx-auto' style={{ borderRight : '1px solid #d4d4d4'}} >شماره تلفن</p> 

                </div>
                
                { showTable && !error ? accountingList : null }
                
                 </div> }

                { error && <h3 className='text-secondary col-12 text-center text-lg my-5'>{error}</h3>}
     



{/* form container */}
{/* ============================= */}
           { showAddForm && !isLoading && <div className='d-flex flex-row flex-wrap mt-1 p-2 shadow-lg apearAnimation mt-5' style={{ backgroundColor : '#fafafa' , borderRadius : '10px'  }} dir='rtl'>
        
                           
                             <div className="input-group col-4 d-flex flex-row mt-3">
                             <label htmlFor="description" className="d-flex ">{"نام شرکت :"}</label>
                              <input value={companyName} onChange={(data : any) => SetCompanyName(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="نام شرکت :  " aria-describedby="basic-addon1"/>
                             </div>
                             
                             <div className="input-group col-4 d-flex flex-row mt-3">
                             <label htmlFor="description" className="d-flex ">{"آدرس شرکت :"}</label>
                              <input value={companyAddress} onChange={(data : any) => SetCompanyAddress(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="آدرس شرکت :  " aria-describedby="basic-addon1"/>
                             </div>
                             
                             <div className="input-group col-4 d-flex flex-row mt-3">
                             <label htmlFor="description" className="d-flex ">{"تلفن :"}</label>
                              <input value={telNumber} onChange={(data : any) => SetTelNumber(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="تلفن :  " aria-describedby="basic-addon1"/>
                             </div>
                             
                             <div className="input-group col-4 d-flex flex-row mt-5">
                             <label htmlFor="description" className="d-flex ">{"نماینده شرکت :"}</label>
                              <input value={agentName} onChange={(data : any) => SetAgentName(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="نماینده شرکت :  " aria-describedby="basic-addon1"/>
                             </div>
                             
                          
                              <div className="input-group col-4 d-flex flex-row mt-5">
                             <label htmlFor="description" className="d-flex ">{"کد ملی :"}</label>
                              <input value={melliCode} onChange={(data : any) => SetMelliCode(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="کد ملی :  " aria-describedby="basic-addon1"/>
                             </div>
                             
                            
                             
                             <div className="input-group col-4 d-flex flex-row mt-5">
                             <label htmlFor="description" className="d-flex ">{"کد ثبت :"}</label>
                              <input value={registerNo} onChange={(data : any) => SetRegisterNo(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="کد ثبت :  " aria-describedby="basic-addon1"/>
                             </div>

                             <div className="input-group col-4 d-flex flex-row mt-5">
                             <label htmlFor="description" className="d-flex ">{" شماره اقتصادی :"}</label>
                              <input value={economicNo} onChange={(data : any) => SetEconomicNo(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="شماره اقتصادی :  " aria-describedby="basic-addon1"/>
                             </div>

                             <div className="input-group col-4 d-flex flex-row mt-5">
                             <label htmlFor="description" className="d-flex ">{"کد پستی :"}</label>
                              <input value={postalCode} onChange={(data : any) => SetPostalCode(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="کد پستی :  " aria-describedby="basic-addon1"/>
                             </div>

                             <div className="input-group col-4 d-flex flex-row mt-5">
                             <label htmlFor="description" className="d-flex ">{" شماره نماینده :"}</label>
                              <input value={agentNo} onChange={(data : any) => SetAgentNo(data.target.value) } type="text" className="form-control col-12 mt-4 mr-2" placeholder="شماره نماینده :  " aria-describedby="basic-addon1"/>
                             </div>

                             { requiredMessage && <div className='text-center text-danger'>وارد کردن تمام موارد الزامی است</div>}
                        <div className='col-12 justify-content-center mt-3'>   
                            <button onClick={()=> createClienAccountingInformation({clientName:clientName, melliCode : melliCode , companyName : companyName , companyAddress : companyAddress, telNumber : telNumber , agentName : agentName , agentNo : agentNo , postalCode : postalCode , registerNo : registerNo , economicNo : economicNo , })} className="col-1 btn btn-sm btn-primary py-2 my-3 mt-4 shadow-lg ">{"تعریف"}</button> 
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
)( ClientAccountingInformation );