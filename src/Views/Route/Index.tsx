import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../Store/state";
import { routeActions } from "../../Actions/Route/action";
import { IRouteState } from "../../Actions/Route/model";
import { GridOptions } from "ag-grid-community";
import "../../GeneralComponents/ToggleButton/GymToggleButton.css";
import { useTranslation } from "react-i18next";
import Loading from "../../GeneralComponents/GymLoading/GymLoading";
import GymAlerts from "../../GeneralComponents/GymAlerts/GymAlerts";
import GymAccessControl from "../../GeneralComponents/GymAccessControl/GymAccessControl";
import { RouteComponentProps } from "react-router-dom";
import Create from "./Create";
import Base64ConvertModal from "./Base64ConvertModal";

import RouteList from "./RouteList";
type IProps = typeof routeActions &
  IRouteState &
  GridOptions &
  RouteComponentProps<{ fileconfigurationid: string }>;

const RouteIndex = (props: IProps) => {

  const [ textSearch , SetTextSearch ] = useState('');

  const [t] = useTranslation();
  const userAccessData = {
    show: { roles: ["Operator", "Manager"], withNoAccessPage: true },
    create: { roles: ["Operator", "Manager"] },
    edit: { roles: ["Operator", "Manager"] },
    remove: { roles: ["Operator", "Manager"] },
    editCacheOptions: { roles: ["Operator", "Manager"] },
    editQoSOptions: { roles: ["Operator", "Manager"] },
    editLoadBalancerOptions: { roles: ["Operator", "Manager"] },
    addHostAndPort: { roles: ["Operator", "Manager"] },
    removeHostAndPort: { roles: ["Operator", "Manager"] },
    addRateLimitOptions: { roles: ["Operator", "Manager"] },
    editRateLimitOptions: { roles: ["Operator", "Manager"] },
    removeRateLimitOptions: { roles: ["Operator", "Manager"] },
    addClientWhite: { roles: ["Operator", "Manager"] },
    removeClientWhite: { roles: ["Operator", "Manager"] },
    editAuthenticationOptions: { roles: ["Operator", "Manager"] },
    addAllowedScope: { roles: ["Operator", "Manager"] },
    removeAllowedScope: { roles: ["Operator", "Manager"] },
    editHttpHandlerOptions: { roles: ["Operator", "Manager"] },
    editPreAuthenticationParty: { roles: ["Operator", "Manager"] },
    addPreAuthenticationPartyBody: { roles: ["Operator", "Manager"] },
    removePreAuthenticationPartyBody: { roles: ["Operator", "Manager"] },
    addPreAuthenticationPartyHeader: { roles: ["Operator", "Manager"] },
    removePreAuthenticationPartyHeader: { roles: ["Operator", "Manager"] },
    addDelegatingHandler: { roles: ["Operator", "Manager"] },
    removeDelegatingHandler: { roles: ["Operator", "Manager"] },
    addIPAllowed: { roles: ["Operator", "Manager"] },
    removeIPAllowed: { roles: ["Operator", "Manager"] },
    addIPBlocked: { roles: ["Operator", "Manager"] },
    removeIPBlocked: { roles: ["Operator", "Manager"] },
    setRouteUserNameAndPassword: { roles: ["Operator", "Manager"] },
    addAddHeadersToRequest: { roles: ["Operator", "Manager"] },
    removeAddHeadersToRequest: { roles: ["Operator", "Manager"] },
    addUpstreamHeaderTransform: { roles: ["Operator", "Manager"] },
    removeUpstreamHeaderTransform: { roles: ["Operator", "Manager"] },
    addDownstreamHeaderTransform: { roles: ["Operator", "Manager"] },
    removeDownstreamHeaderTransform: { roles: ["Operator", "Manager"] },
    addAddClaimsToRequest: { roles: ["Operator", "Manager"] },
    removeAddClaimsToRequest: { roles: ["Operator", "Manager"] },
    addRouteClaimsRequirement: { roles: ["Operator", "Manager"] },
    removeRouteClaimsRequirement: { roles: ["Operator", "Manager"] },
    addAddQueriesToRequest: { roles: ["Operator", "Manager"] },
    removeAddQueriesToRequest: { roles: ["Operator", "Manager"] },
    addChangeDownstreamPathTemplate: { roles: ["Operator", "Manager"] },
    removeChangeDownstreamPathTemplate: { roles: ["Operator", "Manager"] },
    addUserPass: { roles: ["Operator", "Manager"] },
    removeUserPass: { roles: ["Operator", "Manager"] },
    routePushHistory: { roles: ["Operator", "Manager"] },
    routeHistory: { roles: ["Operator", "Manager"] },
    routeHistoryBA: { roles: ["Operator", "Manager"] },
  };
  useEffect(() => {
    document.title = t("apigw") + " - " + t("routes");
  }, [t]);
  useEffect(() => {
    props.getRouteList(Number(props.match.params.fileconfigurationid) , textSearch);
    props.getScopeList(Number(props.match.params.fileconfigurationid));
  }, []);

  return (
    <GymAccessControl data={userAccessData.show}>
      <div className="flex-fill">
        <Loading
          loading={
            props.routeList.loading ||
            props.scopeList.loading ||
            props.routeHistoryList.loading ||
            props.routeHistoryBA.loading ||
            props.routePushHistoryList.loading ||
            props.routeCreate.loading ||
            props.routeUpdate.loading ||
            props.routeRemove.loading ||
            props.upstreamHttpMethodRouteKeyAdd.loading ||
            props.upstreamHttpMethodRouteKeyRemove.loading ||
            props.fileCacheOptionsSet.loading ||
            props.qoSOptionsSet.loading ||
            props.loadBalancerOptionsSet.loading ||
            props.hostAndPortAdd.loading ||
            props.hostAndPortRemove.loading ||
            props.rateLimitRuleAdd.loading ||
            props.rateLimitRuleUpdate.loading ||
            props.rateLimitRuleRemove.loading ||
            props.clientWhiteAdd.loading ||
            props.clientWhiteRemove.loading ||
            props.authenticationOptionsSet.loading ||
            props.allowedScopeAdd.loading ||
            props.allowedhelpAdd.loading ||
            props.allowedScopeRemove.loading ||
            props.httpHandlerOptionsSet.loading ||
            props.preAuthenticationPartySet.loading ||
            props.preAuthenticationPartyBodyAdd.loading ||
            props.preAuthenticationPartyBodyRemove.loading ||
            props.preAuthenticationPartyHeaderAdd.loading ||
            props.preAuthenticationPartyHeaderRemove.loading ||
            props.delegatingHandlerAdd.loading ||
            props.delegatingHandlerRemove.loading ||
            props.iPAllowedAdd.loading ||
            props.iPAllowedRemove.loading ||
            props.iPBlockedAdd.loading ||
            props.iPBlockedRemove.loading ||
            props.addHeadersToRequestAdd.loading ||
            props.addHeadersToRequestRemove.loading ||
            props.upstreamHeaderTransformAdd.loading ||
            props.upstreamHeaderTransformRemove.loading ||
            props.downstreamHeaderTransformAdd.loading ||
            props.downstreamHeaderTransformRemove.loading ||
            props.addClaimsToRequestAdd.loading ||
            props.addClaimsToRequestRemove.loading ||
            props.routeClaimsRequirementAdd.loading ||
            props.routeClaimsRequirementRemove.loading ||
            props.addQueriesToRequestAdd.loading ||
            props.addQueriesToRequestRemove.loading ||
            props.changeDownstreamPathTemplateAdd.loading ||
            props.changeDownstreamPathTemplateRemove.loading ||
            props.userPassAdd.loading ||
            props.userPassRemove.loading ||
            props.allowedhelpAdd.loading
          }
        />
        <Base64ConvertModal />
        <GymAccessControl data={userAccessData.create}>
          <Create
            fileConfigurationId={Number(props.match.params.fileconfigurationid)}
          />
        </GymAccessControl>
        <div className="p-4">
          <div className="subject d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{t("routes")}</h5>
            <div>
              <button
                className="btn btn-secondary mr-1"
                onClick={() => window.history.back()}
              >
                <span className="mdi mdi-18px mdi-chevron-left mr-2"></span>
                {t("back")}
              </button>
              <button
                className="btn btn-secondary mr-1"
                onClick={() => props.toggleBase64Modal(true)}
              >
                <span className="mdi mdi-18px mdi-beta mr-2"></span>
                {t("base64")}
              </button>
              <GymAccessControl data={userAccessData.create}>
                <button
                  className="btn btn-info"
                  onClick={() => props.toggleCreateRouteModal(true)}
                >
                  <span className="mdi mdi-18px mdi-plus-circle-outline mr-2"></span>
                  {t("create")}
                </button>
              </GymAccessControl>
            </div>
          </div>
          <div className="d-flex bg-white rounded p-3 shadow-sm flex-grow-1">
            <div
              className="p-4 row"
              style={{ overflowY: "auto", width: "100%" }}
            >
              {props.routeList.data.length == 0 ? (
                props.routeList.loading ? (
                  <div className="d-flex align-items-center text-warning">
                    <span className="mdi mdi-24px mdi-timer-sand"></span>
                    <div 
                      className="font-weight-bold ml-2 mt-1"
                      style={{ fontSize: "large" }}>
                      {t("inProcess")}
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center text-danger">
                    <span className="mdi mdi-24px mdi-alert-outline"></span>
                    <div
                      className="font-weight-bold ml-2 mt-1"
                      style={{ fontSize: "large" }}
                    >
                      {t("noRoutes")}
                    </div>
                  </div>
                )
              ) : (  <div style={{width : '100%' , display : 'flex' , flexDirection : 'column'}}>
                
                  {/* route list section */}
                  <div className=" col-3 d-flex flex-row">
                            <input onChange={(e) => SetTextSearch(e.target.value) } type="text" className="form-control col-12 mt-1 mr-2" placeholder="Search ..." aria-describedby="basic-addon1"/>
                            <button onClick={() => { props.getRouteList(Number(props.match.params.fileconfigurationid) , textSearch);}} className="bg-muted h-25 mt-1 border-0 rounded-pill"><span className="mdi mdi-20px d-block text-center mdi-magnify"></span></button>                  
                  </div>
                  <RouteList
                    fileConfigurationId={ props.match.params.fileconfigurationid }
                  />
               </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <GymAlerts
        alerts={props.alerts}
        clearAlerts={() => props.clearAlerts()}
      />
    </GymAccessControl>
  );
};
export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(RouteIndex);
