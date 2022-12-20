import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../Store/state";
import { routeActions } from "../../Actions/Route/action";
import { IRouteState } from "../../Actions/Route/model";
import { useTranslation } from "react-i18next";
import useFormControl from "../../GeneralComponents/GymFormControl/GymFormControl";
import GymModal from "../../GeneralComponents/GymModal/GymModal";
import DatePicker from "../../GeneralComponents/Calendar";
import NDate from "@nepo/ndate";

type IProps = typeof routeActions & IRouteState & { routeId: string };

const RateLimitRuleAdd = (props: IProps) => {
  const [t] = useTranslation();
  const {
    values,
    onChangeHandler,
    onFormSubmit,
    GetError,
    GetValue,
    setValue,
    setValues,
    setInitialValues,
  } = useFormControl({
    fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
    fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
    client_Id: [{ required: true }],
    fromDate: [],
    toDate: [],
    enableRateLimiting: [{ required: true }, { initialValue: false }],
    period: [{ required: true }, { isNumber: true }, { min: 1 }],
    periodTimespan: [{ required: true }, { isNumber: true }, { min: 1 }],
    limit: [{ required: true }, { isNumber: true }, { min: 0 }],
  });
  const [type, setType] = useState<number>(1);
  const typeHandler = (newType: number) => {
    if (type != newType) {
      setType(newType);
      let periodTimespan = 0;
      let period = GetValue("period");
      if (newType == 1) periodTimespan = period;
      else if (newType == 2) periodTimespan = period * 60;
      else if (newType == 3) periodTimespan = period * 60 * 60;
      else if (newType == 4) periodTimespan = period * 60 * 60 * 24;
      setValue("periodTimespan", periodTimespan);
    }
  };
  const periodHandler = (period: number) => {
    let periodTimespan = 0;
    if (type == 1) periodTimespan = period;
    else if (type == 2) periodTimespan = period * 60;
    else if (type == 3) periodTimespan = period * 60 * 60;
    else if (type == 4) periodTimespan = period * 60 * 60 * 24;
    setValues([{ period: String(period) }, { periodTimespan: periodTimespan }]);
  };
  const getPeriod = (period: number) => {
    if (type == 1) return period + "s";
    else if (type == 2) return period + "m";
    else if (type == 3) return period + "h";
    else if (type == 4) return period + "d";
  };
  useEffect(() => {
    setInitialValues(props.rateLimitRuleAdd.item);
  }, [props.rateLimitRuleAdd.item]);
  const formSubmitHandler = () => {
    if (onFormSubmit()) {
      props.addRateLimitRule(
        {
          fileConfigurationId: values.fileConfigurationId,
          fileRouteId: values.fileRouteId,
          client_Id: values.client_Id,
          fromDate: values.fromDate,
          toDate: values.toDate,
          enableRateLimiting: values.enableRateLimiting,
          period: getPeriod(values.period),
          periodTimespan: values.periodTimespan,
          limit: values.limit,
        },
        props.routeId
      );
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
          onClick={() => props.toggleAddRateLimitRuleModal({}, false)}
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
      ModalTitle={t("addRateLimitRule")}
      Visible={props.rateLimitRuleAdd.Visible}
      onCancel={() => props.toggleAddRateLimitRuleModal({}, false)}
      buttons={<Buttons />}
    >
      <div className="form-group">
        <label htmlFor="client_Id">{t("clientId")} </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="client_Id"
          value={GetValue("client_Id")}
          onChange={(e) => onChangeHandler(e)}
          placeholder={t("placeHclientId")}
        />
        <GetError name="client_Id" />
      </div>
      <div className="form-group">
        <label htmlFor="fromDate">{t("fromDate")}</label>
        <DatePicker
          onChange={(value) => setValue("fromDate", value)}
          placeholder={t("placeHDate")}
          min={new NDate().format("YYYY-MM-DD")}
          className={"form-control form-control-sm"}
        />
        <GetError name="fromDate" />
      </div>
      <div className="form-group">
        <label htmlFor="toDate">{t("toDate")}</label>
        <DatePicker
          onChange={(value) => setValue("toDate", value)}
          placeholder={t("placeHDate")}
          min={new NDate(GetValue("fromDate")).format("YYYY-MM-DD")}
          className={"form-control form-control-sm"}
        />
        <GetError name="toDate" />
      </div>
      <div className="row px-3">
        <div className="custom-control custom-checkbox mb-2">
          <input
            type="checkbox"
            className="custom-control-input"
            id="enableRateLimiting"
            checked={GetValue("enableRateLimiting")}
            onChange={(e) => setValue("enableRateLimiting", e.target.checked)}
          />
          <label className="custom-control-label" htmlFor="enableRateLimiting">
            {t("enableRateLimiting")}
          </label>
        </div>
      </div>
      <div className="row justify-content-center my-2">
        <div className="p-2 text-left">
          <button
            type="button"
            className={"btn btn-sm" + (type == 1 ? " btn-success" : "")}
            onClick={() => typeHandler(1)}
          >
            {t("second")}
          </button>
        </div>
        <div className="p-2 text-left">
          <button
            type="button"
            className={"btn btn-sm" + (type == 2 ? " btn-success" : "")}
            onClick={() => typeHandler(2)}
          >
            {t("minute")}
          </button>
        </div>
        <div className="p-2 text-left">
          <button
            type="button"
            className={"btn btn-sm" + (type == 3 ? " btn-success" : "")}
            onClick={() => typeHandler(3)}
          >
            {t("hour")}
          </button>
        </div>
        <div className="p-2 text-left">
          <button
            type="button"
            className={"btn btn-sm" + (type == 4 ? " btn-success" : "")}
            onClick={() => typeHandler(4)}
          >
            {t("day")}
          </button>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="period">{t("period")} </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="period"
          value={GetValue("period")}
          onChange={(e) => periodHandler(Number(e.target.value))}
          placeholder={t("placeHperiod")}
        />
        <GetError name="period" />
      </div>
      <div className="form-group">
        <label htmlFor="periodTimespan">{t("periodTimespan")} </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="periodTimespan"
          value={GetValue("periodTimespan")}
          onChange={(e) => onChangeHandler(e)}
          readOnly
          placeholder={t("placeHperiodTimespan")}
        />
        <GetError name="periodTimespan" />
      </div>
      <div className="form-group">
        <label htmlFor="limit">{t("limit")} </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="limit"
          value={GetValue("limit")}
          onChange={(e) => onChangeHandler(e)}
          placeholder={t("placeHlimit")}
        />
        <GetError name="limit" />
      </div>
    </GymModal>
  );
};

export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(RateLimitRuleAdd);
