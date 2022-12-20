import NDate from "@nepo/ndate";
import { GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Select from "react-select";
import { routeActions } from "../../../Actions/Route/action";
import { IRouteState } from "../../../Actions/Route/model";
import GymAccessControl from "../../../GeneralComponents/GymAccessControl/GymAccessControl";
import { IApplicationState } from "../../../Store/state";
import ItemView from "../ItemView";
import Edit from "../Edit";
import GymAlerts from "../../../GeneralComponents/GymAlerts/GymAlerts";
import GymDeleteModal from "../../../GeneralComponents/GymDeleteModal/GymDeleteModal";
import EditCacheOptions from "../EditCacheOptions";
import EditQoSOptions from "../EditQoSOptions";
import EditLoadBalancerOptions from "../EditLoadBalancerOptions";
import AddRateLimitRule from "../AddRateLimitRule";
import EditAuthenticationOptions from "../EditAuthenticationOptions";
import EditHttpHandlerOptions from "../EditHttpHandlerOptions";
import EditPreAuthenticationParty from "../EditPreAuthenticationParty";
import AddPreAuthenticationPartyBodyModal from "../AddPreAuthenticationPartyBodyModal";
import AddPreAuthenticationPartyHeaderModal from "../AddPreAuthenticationPartyHeaderModal";
import AddHostAndPortModal from "../AddHostAndPortModal";
import SetUserPassModal from "../SetUserPassModal";
import AddAddHeadersToRequestModal from "../AddAddHeadersToRequestModal";
import AddUpstreamHeaderTransformModal from "../AddUpstreamHeaderTransformModal";
import AddDownstreamHeaderTransformModal from "../AddDownstreamHeaderTransformModal";
import AddAddClaimsToRequestModal from "../AddAddClaimsToRequestModal";
import AddRouteClaimsRequirementModal from "../AddRouteClaimsRequirementModal";
import AddAddQueriesToRequestModal from "../AddAddQueriesToRequestModal";
import AddChangeDownstreamPathTemplateModal from "../AddChangeDownstreamPathTemplateModal";
import ClientWhitelistModal from "../ClientWhitelistModal";
import RoutePushHistory from "../RoutePushHistory";
import RouteHistory from "../RouteHistory";
import RouteHistoryBA from "../RouteHistoryBA";
import AddUserPassModal from "../AddUserPassModal";
import EditRateLimitRule from "../UpdateRateLimitRule";
import GymLoading from "../../../GeneralComponents/GymLoading/GymLoading";
import TextEditor from "../../../GeneralComponents/TextEditor/TextEditor";

type IProps = typeof routeActions &
  IRouteState &
  GridOptions &
  RouteComponentProps<{ routeId: string }>;

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

const httpMethods = ["Get", "Post", "Put", "Delete", "Options", "Patch"];

const RouteDetails = (props: IProps) => {
  const [t] = useTranslation();
  const { routeId } = props.match.params;

  useEffect(() => {
    props.getRouteById(Number(routeId));
  }, [routeId]);

  const [ipAllowed, setIpAllowed] = useState<string>("");
  const [ipAllowedCheck, setIpAllowedCheck] = useState<boolean>(false);
  const [scope, setScope] = useState<string>("");
  const [fileSelected, setFileSelected] = useState();
  const [ipBlocked, setIpBlocked] = useState<string>("");
  const [ipBlockedCheck, setIpBlockedCheck] = useState<boolean>(false);

  const addAllowedScopeClickHandler = (fileRouteId: number) => {
    if (scope != "") {
      props.addAllowedScope({
        fileConfigurationId: Number(routeId),
        fileRouteId: fileRouteId,
        scope: scope,
      });
      setScope("");
    } else
      props.pushAlert({
        title: t("userError"),
        description: t("DataIsIncomplete"),
        variant: "warning",
      });
  };

  const saveFileSelected = (e: any) => {
    //in case you wan to print the file selected

    setFileSelected(e.target.files[0]);
  };

  const addIpAllowedHandleKeyPress = (e: any, fileRouteId: number) => {
    if (e.key === "Enter") {
      if (ipAllowed != "" && ipAllowedCheck) {
        props.addIPAllowed(
          {
            fileConfigurationId: Number(routeId),
            fileRouteId: fileRouteId,
            ip: ipAllowed,
          },
          routeId
        );
        setIpAllowed("");
      } else
        props.pushAlert({
          title: t("userError"),
          description: t("DataIsIncomplete"),
          variant: "warning",
        });
    }
  };

  const addIpAllowedClickHandler = (fileRouteId: number) => {
    if (ipAllowed != "" && ipAllowedCheck) {
      props.addIPAllowed(
        {
          fileConfigurationId: Number(routeId),
          fileRouteId: fileRouteId,
          ip: ipAllowed,
        },
        routeId
      );
      setIpAllowed("");
    } else
      props.pushAlert({
        title: t("userError"),
        description: t("DataIsIncomplete"),
        variant: "warning",
      });
  };

  const addIpBlockedHandleKeyPress = (e: any, fileRouteId: number) => {
    if (e.key === "Enter") {
      if (ipBlocked != "" && ipBlockedCheck) {
        props.addIPBlocked(
          {
            fileConfigurationId: Number(routeId),
            fileRouteId: fileRouteId,
            ip: ipBlocked,
          },
          routeId
        );
        setIpBlocked("");
      } else
        props.pushAlert({
          title: t("userError"),
          description: t("DataIsIncomplete"),
          variant: "warning",
        });
    }
  };

  const addIpBlockedClickHandler = (fileRouteId: number) => {
    if (ipBlocked != "" && ipBlockedCheck) {
      props.addIPBlocked(
        {
          fileConfigurationId: Number(routeId),
          fileRouteId: fileRouteId,
          ip: ipBlocked,
        },
        routeId
      );
      setIpBlocked("");
    } else
      props.pushAlert({
        title: t("userError"),
        description: t("DataIsIncomplete"),
        variant: "warning",
      });
  };

  const addHelpHandle = (fileRouteId: number, EditorName: string) => {
    //const mycontentEditor = tinymce.get(EditorName);
    const mycontentEditor = null ;
    console.log({ mycontentEditor });

    if (mycontentEditor == null) {
    }

    props.addHelpHandle(
      {
        fileConfigurationId: 1,
        fileRouteId: fileRouteId,
        content: mycontentEditor,
        fileSelected,
      },
      routeId
    );
  };

   useEffect(() => {
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;
    setIpAllowedCheck(ipRegex.test(ipAllowed));
  }, [ipAllowed]);
  useEffect(() => {
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;
    setIpBlockedCheck(ipRegex.test(ipBlocked));
  }, [ipBlocked]);

  const { data } = props.route;

  const newData = [data];

  return (
    <>
      <div className="col-12">
        <GymLoading
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
        <div className="tab-content" id="nav-tabContent">
          {newData &&
            newData.map((route: any, i: number) => {
              return (
                <div
                  className={"tab-pane fade" + (i == 0 ? " show active" : "")}
                  id={"list-" + route.id}
                  role="tabpanel"
                  aria-labelledby={"list-" + route.id + "-list"}
                >
                  <div className="card" style={{ width: "100%" }}>
                    <div className="card-header px-4 py-2">
                      <div className="row justify-content-between align-items-center">
                        <label
                          className="text-info mb-0"
                          style={{ fontSize: "large" }}
                        >
                          {route.serviceTitle
                            ? route.serviceTitle
                            : route.downstreamPathTemplate}
                        </label>
                        <div>
                          <button
                            className="btn btn-secondary mr-1"
                            onClick={() => window.history.back()}
                          >
                            <span className="mdi mdi-18px mdi-chevron-left mr-2"></span>
                            {t("back")}
                          </button>
                          <GymAccessControl data={userAccessData.edit}>
                            <button
                              className="btn btn-info mr-1"
                              onClick={() => {
                                props.toggleUpdateRouteModal(route, true);
                              }}
                            >
                              <span className="mdi mdi-18px mdi-pencil mr-1"></span>
                              {t("edit")}
                            </button>
                          </GymAccessControl>
                          <GymAccessControl data={userAccessData.routeHistory}>
                            <button
                              className="btn btn-warning"
                              onClick={() =>
                                props.getRouteHistoryList(route.id)
                              }
                            >
                              <span className="mdi mdi-18px mdi-history mr-1"></span>
                              {t("routeHistory")}
                            </button>
                          </GymAccessControl>
                          <GymAccessControl
                            data={userAccessData.routePushHistory}
                          >
                            <button
                              className="btn btn-primary ml-1"
                              onClick={() =>
                                props.getRoutePushHistoryList(route.id)
                              }
                            >
                              <span className="mdi mdi-18px mdi-history mr-1"></span>
                              {t("routePushHistory")}
                            </button>
                          </GymAccessControl>
                        </div>
                      </div>
                    </div>
                    <ul
                      className="nav nav-tabs nav-tabs--outbox p-0 m-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id={route.id + "-tab"}
                          data-toggle="tab"
                          href={"#tab" + route.id}
                          role="tab"
                          aria-controls={"tab" + route.id}
                          aria-selected="true"
                        >
                          {t("main")}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id={route.id + "-tabPolicy"}
                          data-toggle="tab"
                          href={"#tabPolicy" + route.id}
                          role="tab"
                          aria-controls={"tabPolicy" + route.id}
                          aria-selected="false"
                        >
                          {t("policyOptions")}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id={route.id + "-tabOther"}
                          data-toggle="tab"
                          href={"#tabOther" + route.id}
                          role="tab"
                          aria-controls={"tabOther" + route.id}
                          aria-selected="false"
                        >
                          {t("otherOptions")}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id={route.id + "-tabSecurityOptions"}
                          data-toggle="tab"
                          href={"#tabSecurityOptions" + route.id}
                          role="tab"
                          aria-controls={"tabSecurityOptions" + route.id}
                          aria-selected="false"
                        >
                          {t("securityOptions")}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id={route.id + "-tabHelpContents"}
                          data-toggle="tab"
                          href={"#tabHelpContents" + route.id}
                          role="tab"
                          aria-controls={"tabHelpContents" + route.id}
                          aria-selected="false"
                        >
                          {t("HelpContents")}
                        </a>
                      </li>
                      {/* <li className="nav-item">
                                                                        <a className="nav-link" id={route.id + "-tabUserPasses"} data-toggle="tab" href={"#tabUserPasses" + route.id} role="tab"
                                                                            aria-controls={"tabUserPasses" + route.id} aria-selected="false">{t("userPasses")}</a>
                                                                    </li> */}
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id={"tab" + route.id}
                        role="tabpanel"
                        aria-labelledby={route.id + "-tab"}
                      >
                        <div className="d-flex p-2" style={{ width: "100%" }}>
                          <div className="col-6 border py-2">
                            <ItemView
                              label="downstreamPathTemplate"
                              value={route.downstreamPathTemplate}
                            />
                            <ItemView
                              label="upstreamPathTemplate"
                              value={route.upstreamPathTemplate}
                            />
                            <ItemView
                              label="downstreamHttpMethod"
                              value={route.downstreamHttpMethod}
                            />
                            <ItemView
                              label="requestIdKey"
                              value={route.requestIdKey}
                            />
                            <ItemView
                              label="routeIsCaseSensitive"
                              value={route.routeIsCaseSensitive}
                            />
                            <ItemView
                              label="serviceTitle"
                              value={route.serviceTitle}
                            />
                            <ItemView
                              label="serviceName"
                              value={route.serviceName}
                            />
                            <ItemView
                              label="serviceNamespace"
                              value={route.serviceNamespace}
                            />
                            <ItemView
                              label="downstreamScheme"
                              value={route.downstreamScheme}
                            />
                            <ItemView
                              label="upstreamHost"
                              value={route.upstreamHost}
                            />
                            <ItemView label="key" value={route.key} />
                            <ItemView label="priority" value={route.priority} />
                            <ItemView label="timeout" value={route.timeout} />
                            <ItemView
                              label="dangerousAcceptAnyServerCertificateValidator"
                              value={
                                route.dangerousAcceptAnyServerCertificateValidator
                              }
                            />
                            <ItemView
                              label="downstreamHttpVersion"
                              value={route.downstreamHttpVersion}
                            />
                            <ItemView label="isTest" value={route.isTest} />
                            <ItemView
                              label="serviceType"
                              value={route.serviceTypeTitle}
                            />
                            <div className="form-group row">
                              <label className="col-sm-6 col-xl-5 col-form-label">
                                {t("status")}
                              </label>
                              <div className="col">
                                <input
                                  className={
                                    "form-control form-control-sm form-control-plaintext " +
                                    (route.routeState == 0
                                      ? "text-secondary"
                                      : route.routeState == 1
                                      ? "text-warning"
                                      : route.routeState == 2
                                      ? "text-danger"
                                      : "text-success")
                                  }
                                  type="text"
                                  value={String(
                                    route.routeState == 0
                                      ? t("new")
                                      : route.routeState == 1
                                      ? t("pending")
                                      : route.routeState == 2
                                      ? t("ignored")
                                      : t("accepted")
                                  )}
                                />
                              </div>
                            </div>
                            <ItemView
                              label="lastUpdated"
                              value={new NDate(route.lastUpdated).format(
                                "YYYY/MM/DD HH:mm:ss"
                              )}
                            />
                          </div>
                          <div className="col-6">
                            <div className="d-flex flex-column ml-1">
                              <div className="d-flex flex-column border p-2">
                                <label className="text-info">
                                  {t("upstreamHttpMethods")}
                                </label>
                                <div className="d-flex mt-3">
                                  {httpMethods.map((method: any) => {
                                    return (
                                      <React.Fragment>
                                        {route.upstreamHttpMethods &&
                                        route.upstreamHttpMethods.some(
                                          (x: any) =>
                                            x.method.toLocaleLowerCase() ==
                                            method.toLocaleLowerCase()
                                        ) ? (
                                          <span
                                            className="badge badge-success mr-1 p-2 link"
                                            onClick={() =>
                                              props.removeUpstreamHttpMethodRouteKey(
                                                {
                                                  fileConfigurationId:
                                                    Number(routeId),
                                                  fileRouteId: route.id,
                                                  method: method,
                                                },
                                                routeId
                                              )
                                            }
                                          >
                                            {method}
                                          </span>
                                        ) : (
                                          <span
                                            className="badge badge-danger mr-1 p-2 link"
                                            onClick={() =>
                                              props.addUpstreamHttpMethodRouteKey(
                                                {
                                                  fileConfigurationId:
                                                    Number(routeId),
                                                  fileRouteId: route.id,
                                                  method: method,
                                                },
                                                routeId
                                              )
                                            }
                                          >
                                            {method}
                                          </span>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="d-flex flex-column border p-2 mt-1">
                                <div className="d-flex justify-content-between">
                                  <label className="text-info mb-3">
                                    {t("hostAndPorts")}
                                  </label>
                                  <span
                                    title={t("add")}
                                    className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                    onClick={() =>
                                      props.toggleAddHostAndPortModal(
                                        Number(routeId),
                                        route.id,
                                        true
                                      )
                                    }
                                  ></span>
                                </div>
                                <div
                                  className="ag-theme-balham"
                                  style={{ height: "200px" }}
                                >
                                  <AgGridReact
                                    columnDefs={[
                                      {
                                        field: "host",
                                        headerName: t("host"),
                                        flex: 2,
                                      },
                                      {
                                        field: "port",
                                        headerName: t("port"),
                                        flex: 2,
                                      },
                                      {
                                        field: "remove",
                                        headerName: t("operation"),
                                        lockPinned: true,
                                        pinned: "right",
                                        cellClass: "lock-pinned",
                                        width: 70,
                                        cellRendererFramework: function (
                                          params: any
                                        ) {
                                          return (
                                            <div className="btn-group">
                                              <button
                                                title={t("remove")}
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() =>
                                                  props.toggleRemoveHostAndPortModal(
                                                    params.value,
                                                    true
                                                  )
                                                }
                                              >
                                                <span className="mdi mdi-18px mdi-delete" />
                                              </button>
                                            </div>
                                          );
                                        },
                                      },
                                    ]}
                                    rowData={
                                      route.downstreamHostAndPorts
                                        ? route.downstreamHostAndPorts.map(
                                            (item: any) => ({
                                              host: item.host,
                                              port: item.port,
                                              remove: {
                                                fileConfigurationId:
                                                  Number(routeId),
                                                fileRouteId: item.fileRouteId,
                                                fileHostAndPortId: item.id,
                                              },
                                            })
                                          )
                                        : []
                                    }
                                    sideBar={true}
                                    suppressDragLeaveHidesColumns={true}
                                    autoHeight={true}
                                    animateRows={true}
                                    localeText={{
                                      page: t("pagination"),
                                      to: t("to"),
                                      of: t("of"),
                                      first: t("first"),
                                      previous: t("previous"),
                                      next: t("next"),
                                      last: t("last"),
                                      noRowsToShow: t("noRowsToShow"),
                                    }}
                                    onGridReady={(params: any) => {
                                      var gridColumnApi = params.columnApi;
                                      gridColumnApi.autoSizeColumns();
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="d-flex flex-column border p-2 mt-1">
                                <div className="d-flex justify-content-between">
                                  <label className="text-info mb-3">
                                    {t("qoSOptions")}
                                  </label>
                                  <span
                                    title={t("edit")}
                                    className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                    onClick={() =>
                                      props.toggleSetQoSOptionsModal(
                                        {
                                          fileConfigurationId: Number(routeId),
                                          fileRouteId: route.id,
                                          exceptionsAllowedBeforeBreaking:
                                            route.qoSOptions
                                              .exceptionsAllowedBeforeBreaking,
                                          durationOfBreak:
                                            route.qoSOptions.durationOfBreak,
                                          timeoutValue:
                                            route.qoSOptions.timeoutValue,
                                        },
                                        true
                                      )
                                    }
                                  ></span>
                                </div>
                                <ItemView
                                  label="exceptionsAllowedBeforeBreaking"
                                  value={
                                    route?.qoSOptions
                                      ?.exceptionsAllowedBeforeBreaking
                                  }
                                />
                                <ItemView
                                  label="durationOfBreak"
                                  value={route?.qoSOptions?.durationOfBreak}
                                />
                                <ItemView
                                  label="timeoutValue"
                                  value={route?.qoSOptions?.timeoutValue}
                                />
                              </div>
                              <div className="d-flex flex-column border p-2 mt-1">
                                <div className="d-flex justify-content-between">
                                  <label className="text-info mb-3">
                                    {t("loadBalancerOptions")}
                                  </label>
                                  <span
                                    title={t("edit")}
                                    className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                    onClick={() =>
                                      props.toggleSetLoadBalancerOptionsModal(
                                        {
                                          fileConfigurationId: Number(routeId),
                                          fileRouteId: route.id,
                                          type: route.loadBalancerOptions.type,
                                          key: route.loadBalancerOptions.key,
                                          expiry:
                                            route.loadBalancerOptions.expiry,
                                        },
                                        true
                                      )
                                    }
                                  ></span>
                                </div>
                                <ItemView
                                  label="type"
                                  value={route.loadBalancerOptions?.type}
                                />
                                <ItemView
                                  label="key"
                                  value={route.loadBalancerOptions?.key}
                                />
                                <ItemView
                                  label="expiry"
                                  value={route.loadBalancerOptions?.expiry}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id={"tabPolicy" + route.id}
                        role="tabpanel"
                        aria-labelledby={route.id + "-tabPolicy"}
                      >
                        <div className="d-flex p-2" style={{ width: "100%" }}>
                          <div
                            className="d-flex flex-column border p-2 mt-1"
                            style={{ width: "100%" }}
                          >
                            <div className="d-flex justify-content-between">
                              <label className="text-info mb-3">
                                {t("rateLimitOptions")}
                              </label>
                              <span
                                title={t("add")}
                                className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                onClick={() =>
                                  props.toggleAddRateLimitRuleModal(
                                    {
                                      fileConfigurationId: Number(routeId),
                                      fileRouteId: route.id,
                                    },
                                    true
                                  )
                                }
                              ></span>
                            </div>
                            <div
                              className="ag-theme-balham"
                              style={{ height: "200px" }}
                            >
                              <AgGridReact
                                columnDefs={[
                                  {
                                    field: "client_Id",
                                    headerName: t("clientId"),
                                    flex: 2,
                                  },
                                  {
                                    field: "fromDate",
                                    headerName: t("fromDate"),
                                    flex: 2,
                                  },
                                  {
                                    field: "toDate",
                                    headerName: t("toDate"),
                                    flex: 2,
                                  },
                                  {
                                    field: "enableRateLimiting",
                                    headerName: t("enableRateLimiting"),
                                    flex: 2,
                                  },
                                  {
                                    field: "period",
                                    headerName: t("period"),
                                    flex: 2,
                                  },
                                  {
                                    field: "periodTimespan",
                                    headerName: t("periodTimespan"),
                                    flex: 2,
                                  },
                                  {
                                    field: "limit",
                                    headerName: t("limit"),
                                    flex: 2,
                                  },
                                  {
                                    field: "operation",
                                    headerName: t("operation"),
                                    lockPinned: true,
                                    pinned: "right",
                                    cellClass: "lock-pinned",
                                    width: 130,
                                    cellRendererFramework: function (
                                      params: any
                                    ) {
                                      return (
                                        <div className="btn-group">
                                          <button
                                            title={t("edit")}
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() =>
                                              props.toggleUpdateRateLimitRuleModal(
                                                params.value.edit,
                                                true
                                              )
                                            }
                                          >
                                            <span className="mdi mdi-18px mdi-pencil" />
                                          </button>
                                          <button
                                            title={t("remove")}
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() =>
                                              props.toggleRemoveRateLimitRuleModal(
                                                params.value.remove,
                                                true
                                              )
                                            }
                                          >
                                            <span className="mdi mdi-18px mdi-delete" />
                                          </button>
                                          <button
                                            title={t("clientWhiteList")}
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() =>
                                              props.toggleClientWhiteListModal(
                                                params.value.clientWhite,
                                                true
                                              )
                                            }
                                          >
                                            <span className="mdi mdi-18px mdi-eye" />
                                          </button>
                                        </div>
                                      );
                                    },
                                  },
                                ]}
                                rowData={
                                  route.rateLimitOptions
                                    ? route.rateLimitOptions.map(
                                        (item: any) => ({
                                          client_Id: item.client_Id,
                                          fromDate:
                                            item.fromDate !=
                                            "0001-01-01T00:00:00"
                                              ? new NDate(item.fromDate).format(
                                                  "YYYY/MM/DD"
                                                )
                                              : "",
                                          toDate:
                                            item.toDate != "0001-01-01T00:00:00"
                                              ? new NDate(item.toDate).format(
                                                  "YYYY/MM/DD"
                                                )
                                              : "",
                                          enableRateLimiting:
                                            item.enableRateLimiting,
                                          period: item.period,
                                          periodTimespan: item.periodTimespan,
                                          limit: item.limit,
                                          operation: {
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              fileRateLimitRuleId: item.id,
                                            },
                                            edit: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              fileRateLimitRuleId: item.id,
                                              client_Id: item.client_Id,
                                              fromDate:
                                                item.fromDate !=
                                                "0001-01-01T00:00:00"
                                                  ? item.fromDate
                                                  : "",
                                              toDate:
                                                item.toDate !=
                                                "0001-01-01T00:00:00"
                                                  ? item.toDate
                                                  : "",
                                              enableRateLimiting:
                                                item.enableRateLimiting,
                                              period: item.period,
                                              periodTimespan:
                                                item.periodTimespan,
                                              limit: item.limit,
                                            },
                                            clientWhite: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              fileRateLimitRuleId: item.id,
                                              clientWhitelist:
                                                item.clientWhitelist,
                                            },
                                          },
                                        })
                                      )
                                    : []
                                }
                                sideBar={true}
                                suppressDragLeaveHidesColumns={true}
                                autoHeight={true}
                                animateRows={true}
                                localeText={{
                                  page: t("pagination"),
                                  to: t("to"),
                                  of: t("of"),
                                  first: t("first"),
                                  previous: t("previous"),
                                  next: t("next"),
                                  last: t("last"),
                                  noRowsToShow: t("noRowsToShow"),
                                }}
                                onGridReady={(params: any) => {
                                  var gridColumnApi = params.columnApi;
                                  gridColumnApi.autoSizeColumns();
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id={"tabOther" + route.id}
                        role="tabpanel"
                        aria-labelledby={route.id + "-tabOther"}
                      >
                        <div className="row p-2" style={{ width: "100%" }}>
                          <div className="col-6">
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("httpHandlerOptions")}
                                </label>
                                <span
                                  title={t("edit")}
                                  className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleSetHttpHandlerOptionsModal(
                                      {
                                        fileConfigurationId: Number(routeId),
                                        fileRouteId: route.id,
                                        allowAutoRedirect:
                                          route.httpHandlerOptions
                                            .allowAutoRedirect,
                                        useCookieContainer:
                                          route.httpHandlerOptions
                                            .useCookieContainer,
                                        useTracing:
                                          route.httpHandlerOptions.useTracing,
                                        useProxy:
                                          route.httpHandlerOptions.useProxy,
                                        maxConnectionsPerServer:
                                          route.httpHandlerOptions
                                            .maxConnectionsPerServer,
                                      },
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <ItemView
                                label="allowAutoRedirect"
                                value={
                                  route.httpHandlerOptions?.allowAutoRedirect
                                }
                              />
                              <ItemView
                                label="useCookieContainer"
                                value={
                                  route.httpHandlerOptions?.useCookieContainer
                                }
                              />
                              <ItemView
                                label="useTracing"
                                value={route.httpHandlerOptions?.useTracing}
                              />
                              <ItemView
                                label="useProxy"
                                value={route.httpHandlerOptions?.useProxy}
                              />
                              <ItemView
                                label="maxConnectionsPerServer"
                                value={
                                  route.httpHandlerOptions
                                    ?.maxConnectionsPerServer
                                }
                              />
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("preAuthenticationParty")}
                                </label>
                                <span
                                  title={t("edit")}
                                  className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleSetPreAuthenticationPartyModal(
                                      {
                                        fileConfigurationId: Number(routeId),
                                        fileRouteId: route.id,
                                        url: route.preAuthenticationParty?.url,
                                        requestType:
                                          route.preAuthenticationParty
                                            ?.requestType,
                                        resultField:
                                          route.preAuthenticationParty
                                            ?.resultField,
                                        responseType:
                                          route.preAuthenticationParty
                                            ?.responseType,
                                        keyName:
                                          route.preAuthenticationParty?.keyName,
                                        keyPosition:
                                          route.preAuthenticationParty
                                            ?.keyPosition,
                                      },
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <ItemView
                                label="url"
                                value={route.preAuthenticationParty?.url}
                              />
                              <ItemView
                                label="requestType"
                                value={
                                  route.preAuthenticationParty?.requestType
                                }
                              />
                              <ItemView
                                label="resultField"
                                value={
                                  route.preAuthenticationParty?.resultField
                                }
                              />
                              <ItemView
                                label="responseType"
                                value={
                                  route.preAuthenticationParty?.responseType
                                }
                              />
                              <ItemView
                                label="keyName"
                                value={route.preAuthenticationParty?.keyName}
                              />
                              <ItemView
                                label="keyPosition"
                                value={
                                  route.preAuthenticationParty?.keyPosition
                                }
                              />
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("addHeadersToRequest")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddAddHeadersToRequestModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemoveAddHeadersToRequestModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.addHeadersToRequests
                                      ? route.addHeadersToRequests.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("downstreamHeaderTransform")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddDownstreamHeaderTransformModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemoveDownstreamHeaderTransformModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.downstreamHeaderTransforms
                                      ? route.downstreamHeaderTransforms.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("routeClaimsRequirement")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddRouteClaimsRequirementModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemoveRouteClaimsRequirementModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.routeClaimsRequirements
                                      ? route.routeClaimsRequirements.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("changeDownstreamPathTemplate")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddChangeDownstreamPathTemplateModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemoveChangeDownstreamPathTemplateModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.changeDownstreamPathTemplates
                                      ? route.changeDownstreamPathTemplates.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("cacheOptions")}
                                </label>
                                <span
                                  title={t("edit")}
                                  className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleSetFileCacheOptionsModal(
                                      {
                                        fileConfigurationId: Number(routeId),
                                        fileRouteId: route.id,
                                        ttlSeconds:
                                          route.cacheOptions?.ttlSeconds,
                                        region: route.cacheOptions?.region,
                                      },
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <ItemView
                                label="ttlSeconds"
                                value={route.cacheOptions?.ttlSeconds}
                              />
                              <ItemView
                                label="region"
                                value={route.cacheOptions?.region}
                              />
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("authenticationOptions")}
                                </label>
                                <span
                                  title={t("edit")}
                                  className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleSetAuthenticationOptionsModal(
                                      {
                                        fileConfigurationId: Number(routeId),
                                        fileRouteId: route.id,
                                        authenticationProviderKey:
                                          route.authenticationOptions
                                            ?.authenticationProviderKey,
                                      },
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <ItemView
                                label="authenticationProviderKey"
                                value={
                                  route.authenticationOptions
                                    ?.authenticationProviderKey
                                }
                              />
                              <div className="form-group">
                                <label htmlFor="allowedScope">
                                  {t("allowedScopes")}{" "}
                                </label>
                                <div className="d-flex justify-content-between">
                                  <div
                                    className="col-11 mr-1"
                                    style={{
                                      paddingLeft: "0",
                                      paddingRight: "0",
                                    }}
                                  >
                                    <Select
                                      options={props.scopeList.data}
                                      value={props.scopeList.data.find(
                                        (x) => x.value == scope
                                      )}
                                      // isMulti={true}
                                      // isRtl={true}
                                      onChange={(data: any) =>
                                        setScope(data.value)
                                      }
                                      placeholder={t("placeHallowedScope")}
                                    />
                                  </div>
                                  <div
                                    className="col-1"
                                    style={{
                                      paddingLeft: "0",
                                      paddingRight: "0",
                                    }}
                                  >
                                    <button
                                      title={t("add")}
                                      className="btn btn-sm btn-outline-secondary"
                                      style={{ height: "100%" }}
                                      onClick={() =>
                                        addAllowedScopeClickHandler(route.id)
                                      }
                                    >
                                      <span className="mdi mdi-18px mdi-plus" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2 px-3">
                                {route.authenticationOptions?.allowedScopes.map(
                                  (scope: any) => {
                                    return (
                                      <span className="badge badge-success mr-1 p-2 mt-1">
                                        <span
                                          className="mdi mdi-18px mdi-delete link mr-2"
                                          onClick={() =>
                                            props.toggleRemoveAllowedScopeModal(
                                              {
                                                fileConfigurationId:
                                                  Number(routeId),
                                                fileRouteId: route.id,
                                                scope: scope.scope,
                                              },
                                              true
                                            )
                                          }
                                        />
                                        {scope.scope}
                                      </span>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("preAuthenticationPartyBody")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddPreAuthenticationPartyBodyModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemovePreAuthenticationPartyBodyModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.preAuthenticationPartyBodies
                                      ? route.preAuthenticationPartyBodies.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("preAuthenticationPartyHeader")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddPreAuthenticationPartyHeaderModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemovePreAuthenticationPartyHeaderModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.preAuthenticationPartyHeaders
                                      ? route.preAuthenticationPartyHeaders.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("upstreamHeaderTransform")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddUpstreamHeaderTransformModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemoveUpstreamHeaderTransformModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.upstreamHeaderTransforms
                                      ? route.upstreamHeaderTransforms.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("addClaimsToRequest")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddAddClaimsToRequestModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemoveAddClaimsToRequestModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.addClaimsToRequests
                                      ? route.addClaimsToRequests.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("addQueriesToRequest")}
                                </label>
                                <span
                                  title={t("add")}
                                  className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleAddAddQueriesToRequestModal(
                                      Number(routeId),
                                      route.id,
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <div
                                className="ag-theme-balham"
                                style={{ height: "200px" }}
                              >
                                <AgGridReact
                                  columnDefs={[
                                    {
                                      field: "key",
                                      headerName: t("key"),
                                      flex: 2,
                                    },
                                    {
                                      field: "value",
                                      headerName: t("value"),
                                      flex: 2,
                                    },
                                    {
                                      field: "remove",
                                      headerName: t("operation"),
                                      lockPinned: true,
                                      pinned: "right",
                                      cellClass: "lock-pinned",
                                      width: 70,
                                      cellRendererFramework: function (
                                        params: any
                                      ) {
                                        return (
                                          <div className="btn-group">
                                            <button
                                              title={t("remove")}
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() =>
                                                props.toggleRemoveAddQueriesToRequestModal(
                                                  params.value,
                                                  true
                                                )
                                              }
                                            >
                                              <span className="mdi mdi-18px mdi-delete" />
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  rowData={
                                    route.addQueriesToRequests
                                      ? route.addQueriesToRequests.map(
                                          (item: any) => ({
                                            key: item.key,
                                            value: item.value,
                                            remove: {
                                              fileConfigurationId:
                                                Number(routeId),
                                              fileRouteId: item.fileRouteId,
                                              id: item.id,
                                            },
                                          })
                                        )
                                      : []
                                  }
                                  sideBar={true}
                                  suppressDragLeaveHidesColumns={true}
                                  autoHeight={true}
                                  animateRows={true}
                                  localeText={{
                                    page: t("pagination"),
                                    to: t("to"),
                                    of: t("of"),
                                    first: t("first"),
                                    previous: t("previous"),
                                    next: t("next"),
                                    last: t("last"),
                                    noRowsToShow: t("noRowsToShow"),
                                  }}
                                  onGridReady={(params: any) => {
                                    var gridColumnApi = params.columnApi;
                                    gridColumnApi.autoSizeColumns();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id={"tabSecurityOptions" + route.id}
                        role="tabpanel"
                        aria-labelledby={route.id + "-tabSecurityOptions"}
                      >
                        <div className="d-flex p-2" style={{ width: "100%" }}>
                          <div className="col-6">
                            <div className="d-flex flex-column border p-2">
                              <label className="text-info mb-3">
                                {t("ipAllowedList")}
                              </label>
                              <div className="d-flex position-relative">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder={t("placeHipAllowed")}
                                  onKeyUp={(e) =>
                                    addIpAllowedHandleKeyPress(e, route.id)
                                  }
                                  value={ipAllowed}
                                  onChange={(e) => setIpAllowed(e.target.value)}
                                />
                                <span
                                  className="mdi mdi-18px mdi-plus btn btn-sm text-basic text-nowrap"
                                  style={{
                                    position: "absolute",
                                    marginLeft: "93%",
                                    top: "3px",
                                  }}
                                  onClick={() =>
                                    addIpAllowedClickHandler(route.id)
                                  }
                                />
                              </div>
                              {ipAllowedCheck ? (
                                ""
                              ) : (
                                <div
                                  className="text-danger mt-2 mx-3"
                                  style={{ fontSize: "12px" }}
                                >
                                  <span className="mdi mdi-18px mdi-alert-rhombus-outline mx-1" />
                                  {t("ipInvalid")}
                                </div>
                              )}
                              <div className="row mt-2 px-3">
                                {route.ipAllowedList &&
                                  route.ipAllowedList.map((ip: any) => {
                                    return (
                                      <span className="badge badge-success mr-1 p-2 mt-1">
                                        <span
                                          className="mdi mdi-18px mdi-delete link mr-2"
                                          onClick={() =>
                                            props.toggleRemoveIPAllowedModal(
                                              {
                                                fileConfigurationId:
                                                  Number(routeId),
                                                fileRouteId: route.id,
                                                ip: ip.ip,
                                              },
                                              true
                                            )
                                          }
                                        />
                                        {ip.ip}
                                      </span>
                                    );
                                  })}
                              </div>
                            </div>
                            <div className="d-flex flex-column border p-2 mt-1">
                              <div className="d-flex justify-content-between">
                                <label className="text-info mb-3">
                                  {t("userPass")}
                                </label>
                                <span
                                  title={t("edit")}
                                  className="mdi mdi-18px mdi-pencil btn btn-sm text-basic text-nowrap"
                                  onClick={() =>
                                    props.toggleSetRouteUserNameAndPasswordModal(
                                      {
                                        fileConfigurationId: Number(routeId),
                                        fileRouteId: route.id,
                                        userName: route.userName,
                                        password: route.password,
                                      },
                                      true
                                    )
                                  }
                                ></span>
                              </div>
                              <ItemView
                                label="userName"
                                value={route.userName}
                              />
                              <ItemView
                                label="password"
                                value={route.password}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex flex-column border p-2">
                              <label className="text-info mb-3">
                                {t("ipBlockedList")}
                              </label>
                              <div className="d-flex position-relative">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder={t("placeHipBlocked")}
                                  onKeyUp={(e) =>
                                    addIpBlockedHandleKeyPress(e, route.id)
                                  }
                                  value={ipBlocked}
                                  onChange={(e) => setIpBlocked(e.target.value)}
                                />
                                <span
                                  className="mdi mdi-18px mdi-plus btn btn-sm text-basic text-nowrap"
                                  style={{
                                    position: "absolute",
                                    marginLeft: "93%",
                                    top: "3px",
                                  }}
                                  onClick={() =>
                                    addIpBlockedClickHandler(route.id)
                                  }
                                />
                              </div>
                              {ipBlockedCheck ? (
                                ""
                              ) : (
                                <div
                                  className="text-danger mt-2 mx-3"
                                  style={{ fontSize: "12px" }}
                                >
                                  <span className="mdi mdi-18px mdi-alert-rhombus-outline mx-1" />
                                  {t("ipInvalid")}
                                </div>
                              )}
                              <div className="row mt-2 px-3">
                                {route.ipBlockedList &&
                                  route.ipBlockedList.map((ip: any) => {
                                    return (
                                      <span className="badge badge-danger mr-1 p-2 mt-1">
                                        <span
                                          className="mdi mdi-18px mdi-delete link mr-2"
                                          onClick={() =>
                                            props.toggleRemoveIPBlockedModal(
                                              {
                                                fileConfigurationId:
                                                  Number(routeId),
                                                fileRouteId: route.id,
                                                ip: ip.ip,
                                              },
                                              true
                                            )
                                          }
                                        />
                                        {ip.ip}
                                      </span>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Route Help Contents Section */}
                      <TextEditor
                        fileconfigurationid={routeId}
                        routeData={route}
                      />
                      <div
                        className="tab-pane fade"
                        id={"tabUserPasses" + route.id}
                        role="tabpanel"
                        aria-labelledby={route.id + "-tabUserPasses"}
                      >
                        <div className="d-flex p-2" style={{ width: "100%" }}>
                          <div
                            className="d-flex flex-column border p-2 mt-1"
                            style={{ width: "100%" }}
                          >
                            <div className="d-flex justify-content-between">
                              <label className="text-info mb-3">
                                {t("userPasses")}
                              </label>
                              <span
                                title={t("add")}
                                className="mdi mdi-18px mdi-plus-circle-outline btn btn-sm text-basic text-nowrap"
                                onClick={() =>
                                  props.toggleAddUserPassModal(
                                    Number(routeId),
                                    route.id,
                                    true
                                  )
                                }
                              ></span>
                            </div>
                            <div
                              className="ag-theme-balham"
                              style={{ height: "200px" }}
                            >
                              <AgGridReact
                                columnDefs={[
                                  {
                                    field: "userName",
                                    headerName: t("userName"),
                                    flex: 2,
                                  },
                                  {
                                    field: "passWord",
                                    headerName: t("passWord"),
                                    flex: 2,
                                  },
                                  {
                                    field: "remove",
                                    headerName: t("operation"),
                                    lockPinned: true,
                                    pinned: "right",
                                    cellClass: "lock-pinned",
                                    width: 70,
                                    cellRendererFramework: function (
                                      params: any
                                    ) {
                                      return (
                                        <div className="btn-group">
                                          <button
                                            title={t("remove")}
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() =>
                                              props.toggleRemoveUserPassModal(
                                                params.value,
                                                true
                                              )
                                            }
                                          >
                                            <span className="mdi mdi-18px mdi-delete" />
                                          </button>
                                        </div>
                                      );
                                    },
                                  },
                                ]}
                                rowData={
                                  route.userPasses
                                    ? route.userPasses.map((item: any) => ({
                                        userName: item.userName,
                                        passWord: item.passWord,
                                        remove: {
                                          fileConfigurationId: Number(routeId),
                                          fileRouteId: item.fileRouteId,
                                          userPassId: item.id,
                                        },
                                      }))
                                    : []
                                }
                                sideBar={true}
                                suppressDragLeaveHidesColumns={true}
                                autoHeight={true}
                                animateRows={true}
                                localeText={{
                                  page: t("pagination"),
                                  to: t("to"),
                                  of: t("of"),
                                  first: t("first"),
                                  previous: t("previous"),
                                  next: t("next"),
                                  last: t("last"),
                                  noRowsToShow: t("noRowsToShow"),
                                }}
                                onGridReady={(params: any) => {
                                  var gridColumnApi = params.columnApi;
                                  gridColumnApi.autoSizeColumns();
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Edit botton */}
      <GymAccessControl data={userAccessData.edit}>
        <Edit fileConfigurationId={Number(routeId)} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.editCacheOptions}>
        <EditCacheOptions routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.editQoSOptions}>
        <EditQoSOptions routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.editLoadBalancerOptions}>
        <EditLoadBalancerOptions routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addRateLimitOptions}>
        <AddRateLimitRule routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.editRateLimitOptions}>
        <EditRateLimitRule routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.editAuthenticationOptions}>
        <EditAuthenticationOptions routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.editHttpHandlerOptions}>
        <EditHttpHandlerOptions routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.editPreAuthenticationParty}>
        <EditPreAuthenticationParty routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addPreAuthenticationPartyBody}>
        <AddPreAuthenticationPartyBodyModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addPreAuthenticationPartyHeader}>
        <AddPreAuthenticationPartyHeaderModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addHostAndPort}>
        <AddHostAndPortModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.setRouteUserNameAndPassword}>
        <SetUserPassModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addAddHeadersToRequest}>
        <AddAddHeadersToRequestModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addUpstreamHeaderTransform}>
        <AddUpstreamHeaderTransformModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addDownstreamHeaderTransform}>
        <AddDownstreamHeaderTransformModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addAddClaimsToRequest}>
        <AddAddClaimsToRequestModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addRouteClaimsRequirement}>
        <AddRouteClaimsRequirementModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addAddQueriesToRequest}>
        <AddAddQueriesToRequestModal routeId={routeId} />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addChangeDownstreamPathTemplate}>
        <AddChangeDownstreamPathTemplateModal routeId={routeId} />
      </GymAccessControl>
      <ClientWhitelistModal />
      <GymAccessControl data={userAccessData.routePushHistory}>
        <RoutePushHistory />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.routeHistory}>
        <RouteHistory />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.routeHistoryBA}>
        <RouteHistoryBA />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeHostAndPort}>
        <GymDeleteModal
          visible={props.hostAndPortRemove.Visible}
          onCancel={() => props.toggleRemoveHostAndPortModal({}, false)}
          onAccept={() => props.removeHostAndPort(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeRateLimitOptions}>
        <GymDeleteModal
          visible={props.rateLimitRuleRemove.Visible}
          onCancel={() => props.toggleRemoveRateLimitRuleModal({}, false)}
          onAccept={() => props.removeRateLimitRule(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeClientWhite}>
        <GymDeleteModal
          visible={props.clientWhiteRemove.Visible}
          onCancel={() => props.toggleRemoveClientWhiteModal({}, false)}
          onAccept={() => props.removeClientWhite()}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeAllowedScope}>
        <GymDeleteModal
          visible={props.allowedScopeRemove.Visible}
          onCancel={() => props.toggleRemoveAllowedScopeModal({}, false)}
          onAccept={() => props.removeAllowedScope()}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeDelegatingHandler}>
        <GymDeleteModal
          visible={props.delegatingHandlerRemove.Visible}
          onCancel={() => props.toggleRemoveDelegatingHandlerModal({}, false)}
          onAccept={() => props.removeDelegatingHandler()}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeIPAllowed}>
        <GymDeleteModal
          visible={props.iPAllowedRemove.Visible}
          onCancel={() => props.toggleRemoveIPAllowedModal({}, false)}
          onAccept={() => props.removeIPAllowed(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeIPBlocked}>
        <GymDeleteModal
          visible={props.iPBlockedRemove.Visible}
          onCancel={() => props.toggleRemoveIPBlockedModal({}, false)}
          onAccept={() => props.removeIPBlocked(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.addUserPass}>
        <AddUserPassModal />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeUserPass}>
        <GymDeleteModal
          visible={props.userPassRemove.Visible}
          onCancel={() => props.toggleRemoveUserPassModal({}, false)}
          onAccept={() => props.removeUserPass()}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeAddHeadersToRequest}>
        <GymDeleteModal
          visible={props.addHeadersToRequestRemove.Visible}
          onCancel={() => props.toggleRemoveAddHeadersToRequestModal({}, false)}
          onAccept={() => props.removeAddHeadersToRequest(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeUpstreamHeaderTransform}>
        <GymDeleteModal
          visible={props.upstreamHeaderTransformRemove.Visible}
          onCancel={() =>
            props.toggleRemoveUpstreamHeaderTransformModal({}, false)
          }
          onAccept={() => props.removeUpstreamHeaderTransform(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeDownstreamHeaderTransform}>
        <GymDeleteModal
          visible={props.downstreamHeaderTransformRemove.Visible}
          onCancel={() =>
            props.toggleRemoveDownstreamHeaderTransformModal({}, false)
          }
          onAccept={() => props.removeDownstreamHeaderTransform(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeAddClaimsToRequest}>
        <GymDeleteModal
          visible={props.addClaimsToRequestRemove.Visible}
          onCancel={() => props.toggleRemoveAddClaimsToRequestModal({}, false)}
          onAccept={() => props.removeAddClaimsToRequest(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeRouteClaimsRequirement}>
        <GymDeleteModal
          visible={props.routeClaimsRequirementRemove.Visible}
          onCancel={() =>
            props.toggleRemoveRouteClaimsRequirementModal({}, false)
          }
          onAccept={() => props.removeRouteClaimsRequirement(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removeAddQueriesToRequest}>
        <GymDeleteModal
          visible={props.addQueriesToRequestRemove.Visible}
          onCancel={() => props.toggleRemoveAddQueriesToRequestModal({}, false)}
          onAccept={() => props.removeAddQueriesToRequest(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl
        data={userAccessData.removeChangeDownstreamPathTemplate}
      >
        <GymDeleteModal
          visible={props.changeDownstreamPathTemplateRemove.Visible}
          onCancel={() =>
            props.toggleRemoveChangeDownstreamPathTemplateModal({}, false)
          }
          onAccept={() => props.removeChangeDownstreamPathTemplate(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl data={userAccessData.removePreAuthenticationPartyBody}>
        <GymDeleteModal
          visible={props.preAuthenticationPartyBodyRemove.Visible}
          onCancel={() =>
            props.toggleRemovePreAuthenticationPartyBodyModal({}, false)
          }
          onAccept={() => props.removePreAuthenticationPartyBody(routeId)}
        />
      </GymAccessControl>
      <GymAccessControl
        data={userAccessData.removePreAuthenticationPartyHeader}
      >
        <GymDeleteModal
          visible={props.preAuthenticationPartyHeaderRemove.Visible}
          onCancel={() =>
            props.toggleRemovePreAuthenticationPartyHeaderModal({}, false)
          }
          onAccept={() => props.removePreAuthenticationPartyHeader(routeId)}
        />
      </GymAccessControl>
      <GymAlerts
        alerts={props.alerts}
        clearAlerts={() => props.clearAlerts()}
      />
    </>
  );
};

export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(RouteDetails);
