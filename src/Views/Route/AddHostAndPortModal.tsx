import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../Store/state";
import { routeActions } from "../../Actions/Route/action";
import { IRouteState } from "../../Actions/Route/model";
import { useTranslation } from "react-i18next";
import useFormControl from "../../GeneralComponents/GymFormControl/GymFormControl";
import GymModal from "../../GeneralComponents/GymModal/GymModal";

type IProps = typeof routeActions &
  IRouteState & {
    routeId: string;
  };

const HostAndPortAdd = (props: IProps) => {
  const [t] = useTranslation();
  const {
    values,
    onChangeHandler,
    onFormSubmit,
    GetError,
    GetValue,
    setValues,
  } = useFormControl({
    fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
    fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
    host: [{ required: true }],
    port: [{ isNumber: true }, { min: 0 }],
  });
  useEffect(() => {
    if (props.hostAndPortAdd.Visible)
      setValues([
        { fileConfigurationId: props.hostAndPortAdd.fileConfigurationId },
        { fileRouteId: props.hostAndPortAdd.fileRouteId },
      ]);
  }, [props.hostAndPortAdd.Visible]);
  const formSubmitHandler = () => {
    if (onFormSubmit()) {
      props.addHostAndPort(values, props.routeId);
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
          onClick={() => props.toggleAddHostAndPortModal(0, 0, false)}
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
      ModalTitle={t("addHostAndPort")}
      Visible={props.hostAndPortAdd.Visible}
      onCancel={() => props.toggleAddHostAndPortModal(0, 0, false)}
      buttons={<Buttons />}
    >
      <div className="form-group">
        <label htmlFor="host">{t("host")} </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="host"
          value={GetValue("host")}
          onChange={(e) => onChangeHandler(e)}
          placeholder={t("placeHhost")}
        />
        <GetError name="host" />
      </div>
      <div className="form-group">
        <label htmlFor="port">{t("port")} </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="port"
          value={GetValue("port")}
          onChange={(e) => onChangeHandler(e)}
          placeholder={t("placeHport")}
        />
        <GetError name="port" />
      </div>
    </GymModal>
  );
};

export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(HostAndPortAdd);
