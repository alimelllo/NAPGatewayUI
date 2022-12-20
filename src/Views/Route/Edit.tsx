import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../Store/state";
import { routeActions } from "../../Actions/Route/action";
import { IRouteState } from "../../Actions/Route/model";
import { useTranslation } from "react-i18next";
import useFormControl from "../../GeneralComponents/GymFormControl/GymFormControl";
import GymModal from "../../GeneralComponents/GymModal/GymModal";
import Select from "react-select";

type IProps = typeof routeActions &
  IRouteState & { fileConfigurationId: number };

const RouteUpdate = (props: IProps) => {
  const [t] = useTranslation();
  const {
    values,
    onChangeHandler,
    onFormSubmit,
    GetError,
    GetValue,
    setValue,
    setInitialValues,
  } = useFormControl({
    fileConfigurationId: [
      { required: true },
      { isNumber: true },
      { min: 1 },
      { initialValue: props.fileConfigurationId },
    ],
    id: [{ required: true }, { isNumber: true }, { min: 1 }],
    downstreamPathTemplate: [
      { required: true },
      { minLength: 2 },
      { maxLength: 250 },
    ],
    upstreamPathTemplate: [
      { required: true },
      { minLength: 2 },
      { maxLength: 250 },
    ],
    downstreamHttpMethod: [],
    requestIdKey: [],
    routeIsCaseSensitive: [{ required: true }, { initialValue: false }],
    serviceTitle: [],
    serviceName: [],
    serviceNamespace: [],
    downstreamScheme: [
      { required: true },
      { minLength: 2 },
      { maxLength: 250 },
    ],
    upstreamHost: [],
    key: [],
    priority: [{ required: true }, { isNumber: true }, { min: 0 }],
    timeout: [{ required: true }, { isNumber: true }, { min: 0 }],
    dangerousAcceptAnyServerCertificateValidator: [
      { required: true },
      { initialValue: false },
    ],
    isTest: [{ required: true }, { initialValue: false }],
    serviceType: [
      { required: true },
      { isNumber: true },
      { min: 1 },
      { max: 3 },
      { initialValue: 1 },
    ],
    downstreamHttpVersion: [],
  });
  var downstreamSchemes = [
    { value: "http", label: "http" },
    { value: "https", label: "https" },
    { value: "ws", label: "ws" },
    { value: "wss", label: "wss" },
    { value: "ftp", label: "ftp" },
  ];
  var httpMethods = [
    { value: "", label: t("placeHselect") },
    { value: "Get", label: "Get" },
    { value: "Post", label: "Post" },
    { value: "Put", label: "Put" },
    { value: "Delete", label: "Delete" },
    { value: "Options", label: "Options" },
    { value: "Patch", label: "Patch" },
  ];
  var serviceTypes = [
    { value: 1, label: t("internal") },
    { value: 2, label: "External" },
    { value: 3, label: "Both" },
  ];
  useEffect(() => {
    setInitialValues(props.routeUpdate.item);
  }, [props.routeUpdate.item]);

  const formSubmitHandler = () => {
    if (onFormSubmit()) {
      props.updateRoute(values, props.fileConfigurationId);
    } else
      props.pushAlert({
        title: t("userError"),
        description: t("DataIsIncomplete"),
        variant: "warning",
      });
  };
  const Buttons = () => {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => props.toggleUpdateRouteModal({}, false)}
        >
          {t("cancel")}
        </button>
        <button
          className="btn btn-success px-4 ml-1"
          onClick={formSubmitHandler}
        >
          {t("save")}
        </button>
      </React.Fragment>
    );
  };
  return (
    <GymModal
      ModalTitle={t("update")}
      size="modal-xl"
      Visible={props.routeUpdate.Visible}
      onCancel={() => props.toggleUpdateRouteModal({}, false)}
      buttons={<Buttons />}
    >
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="downstreamPathTemplate">
            {t("downstreamPathTemplate")}{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="downstreamPathTemplate"
            value={GetValue("downstreamPathTemplate")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHdownstreamPathTemplate")}
          />
          <GetError name="downstreamPathTemplate" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="upstreamPathTemplate">
            {t("upstreamPathTemplate")}{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="upstreamPathTemplate"
            value={GetValue("upstreamPathTemplate")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHupstreamPathTemplate")}
          />
          <GetError name="upstreamPathTemplate" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="downstreamHttpMethod">
            {t("downstreamHttpMethod")}
          </label>
          <Select
            id="downstreamHttpMethod"
            value={
              httpMethods.find(
                (x) => x.value == GetValue("downstreamHttpMethod")
              )
                ? httpMethods.find(
                    (x) => x.value == GetValue("downstreamHttpMethod")
                  )
                : null
            }
            options={httpMethods}
            name="downstreamHttpMethod"
            onChange={(data: any) =>
              setValue("downstreamHttpMethod", data.value)
            }
          />
          <GetError name="downstreamHttpMethod" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="serviceType">{t("serviceType")}</label>
          <Select
            id="serviceType"
            value={serviceTypes.find((x) => x.value == GetValue("serviceType"))}
            options={serviceTypes}
            name="serviceType"
            onChange={(data: any) => setValue("serviceType", data.value)}
          />
          <GetError name="serviceType" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="requestIdKey">{t("requestIdKey")} </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="requestIdKey"
            value={GetValue("requestIdKey")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHrequestIdKey")}
          />
          <GetError name="requestIdKey" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="serviceTitle">{t("serviceTitle")} </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="serviceTitle"
            value={GetValue("serviceTitle")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHserviceTitle")}
          />
          <GetError name="serviceTitle" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="serviceName">{t("serviceName")} </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="serviceName"
            value={GetValue("serviceName")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHserviceName")}
          />
          <GetError name="serviceName" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="serviceNamespace">{t("serviceNamespace")} </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="serviceNamespace"
            value={GetValue("serviceNamespace")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHserviceNamespace")}
          />
          <GetError name="serviceNamespace" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="downstreamScheme">{t("downstreamScheme")}</label>
          <Select
            id="downstreamScheme"
            value={downstreamSchemes.find(
              (x) => x.value == GetValue("downstreamScheme")
            )}
            options={downstreamSchemes}
            name="downstreamScheme"
            onChange={(data: any) => setValue("downstreamScheme", data.value)}
          />
          <GetError name="downstreamScheme" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="upstreamHost">{t("upstreamHost")} </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="upstreamHost"
            value={GetValue("upstreamHost")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHupstreamHost")}
          />
          <GetError name="upstreamHost" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="key">{t("key")} </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="key"
            value={GetValue("key")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHkey")}
          />
          <GetError name="key" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="priority">{t("priority")} </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="priority"
            value={GetValue("priority")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHpriority")}
          />
          <GetError name="priority" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="timeout">{t("timeout")} </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="timeout"
            value={GetValue("timeout")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHtimeout")}
          />
          <GetError name="timeout" />
        </div>
        <div className="form-group col-6">
          <label htmlFor="downstreamHttpVersion">
            {t("downstreamHttpVersion")}{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            name="downstreamHttpVersion"
            value={GetValue("downstreamHttpVersion")}
            onChange={(e) => onChangeHandler(e)}
            placeholder={t("placeHdownstreamHttpVersion")}
          />
          <GetError name="downstreamHttpVersion" />
        </div>
        <div className="col-6">
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="routeIsCaseSensitive"
              checked={GetValue("routeIsCaseSensitive")}
              onChange={(e) =>
                setValue("routeIsCaseSensitive", e.target.checked)
              }
            />
            <label
              className="custom-control-label"
              htmlFor="routeIsCaseSensitive"
            >
              {t("routeIsCaseSensitive")}
            </label>
          </div>
        </div>
        <div className="col-6">
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="dangerousAcceptAnyServerCertificateValidator"
              checked={GetValue("dangerousAcceptAnyServerCertificateValidator")}
              onChange={(e) =>
                setValue(
                  "dangerousAcceptAnyServerCertificateValidator",
                  e.target.checked
                )
              }
            />
            <label
              className="custom-control-label"
              htmlFor="dangerousAcceptAnyServerCertificateValidator"
            >
              {t("dangerousAcceptAnyServerCertificateValidator")}
            </label>
          </div>
        </div>
        <div className="col-6">
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="isTest"
              checked={GetValue("isTest")}
              onChange={(e) => setValue("isTest", e.target.checked)}
            />
            <label className="custom-control-label" htmlFor="isTest">
              {t("isTest")}
            </label>
          </div>
        </div>
      </div>
    </GymModal>
  );
};

export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(RouteUpdate);
