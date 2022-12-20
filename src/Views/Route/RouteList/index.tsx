import React, { useState } from "react";
import { connect } from "react-redux";
import { routeActions } from "../../../Actions/Route/action";
import { IRouteState } from "../../../Actions/Route/model";
import GymAccessControl from "../../../GeneralComponents/GymAccessControl/GymAccessControl";
import GymDeleteModal from "../../../GeneralComponents/GymDeleteModal/GymDeleteModal";
import GymModal from "../../../GeneralComponents/GymModal/GymModal";
import { IApplicationState } from "../../../Store/state";
import Grid from "./Grid";
import './style.css'
import API from "../../../GeneralComponents/baseURL";
import loading from '../../../assets/loading.svg';
import { Button } from "react-bootstrap";

const userAccessData = {
  remove: { roles: ["Operator", "Manager"] },
};

type IProps = typeof routeActions &
  IRouteState &
 { fileConfigurationId: string };

const RouteList = (props: IProps) => {

  const [ error , setError ] = useState('');
  const [ isLoading , SetIsLoading ] = useState(false);

  const CloneFileRoute = async ( routeId:any ) => {
    SetIsLoading(true);
          try{
             const result = await API.post(`NAPGateWay/FileConfigurationCommand/CloneFileRoute` , { id : routeId });
             props.toggleCopyRouteModal({}, false);
             props.pushAlert({ title: "CloneRoute",
             description: "Route Cloned Successfully",
             variant: "success"})
             SetIsLoading(false);
             setError('');
             props.getRouteList(Number(props.fileConfigurationId) , '')
          }
          catch( error ){
              setError(' Fetching failed ( server error )');
              props.pushAlert({ title: "CloneRoute",
              description: "Route Cloned Failed",
              variant: "danger"});
              SetIsLoading(false);
              props.toggleCopyRouteModal({}, false)
             
             }
  }

  return (
    <>
      <Grid />
      <GymAccessControl data={userAccessData.remove}>
        <GymDeleteModal
          visible={props.routeRemove.Visible}
          onCancel={() => props.toggleRemoveRouteModal({}, false)}
          onAccept={() =>
            props.removeRoute(Number(props.fileConfigurationId))
          }
        />
        <GymModal ModalTitle={"copy"} Visible={props.routeCopy.Visible} onCancel={() => props.toggleCopyRouteModal({}, false)}
               buttons={<>
                <button type="button" className="btn btn-outline-danger" onClick={() =>props.toggleCopyRouteModal({}, false)}>{"no"}</button>
                <button className="btn btn-success px-4 ml-1"onClick={() => { CloneFileRoute(props.routeCopy.item.fileRouteId) }}>{"yes"}</button>
                </>}>
            <div className="modal-body">
                <div className="d-flex flex-column justify-content-center text-center">
                    <span className="mdi mdi-48px mdi-file text-basic"></span>
                    <div className="mt-4">
                        Confirm Copy Route ?
                    </div>
                </div>
            </div>
        </GymModal>
        { isLoading && <div className="spinner" ><div className="spinnerLoading"><img src={loading} alt="Loading" /></div></div>}
      </GymAccessControl>
    </>
  );
};

export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(RouteList);
