import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../Store/state";
import { routeActions } from "../../Actions/Route/action";
import { IRouteState } from "../../Actions/Route/model";
import { useTranslation } from "react-i18next";
import useFormControl from "../../GeneralComponents/GymFormControl/GymFormControl";
import GymModal from "../../GeneralComponents/GymModal/GymModal";

type IProps = typeof routeActions & IRouteState & { routeId: string };
const UserPassSet = (props: IProps) => {
  const [t] = useTranslation();
  const {
    values,
    onChangeHandler,
    onFormSubmit,
    GetError,
    GetValue,
    setInitialValues,
  } = useFormControl({
    fileConfigurationId: [{ required: true }, { isNumber: true }, { min: 1 }],
    fileRouteId: [{ required: true }, { isNumber: true }, { min: 1 }],
    userName: [],
    password: [],
  });
  useEffect(() => {
    if (props.routeUserNameAndPasswordSet.Visible)
      setInitialValues(props.routeUserNameAndPasswordSet.item);
  }, [props.routeUserNameAndPasswordSet.Visible]);
  const formSubmitHandler = () => {
    if (onFormSubmit()) {
      props.setRouteUserNameAndPassword(values, props.routeId);
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
          onClick={() =>
            props.toggleSetRouteUserNameAndPasswordModal({}, false)
          }
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
      ModalTitle={t("setUserPass")}
      Visible={props.routeUserNameAndPasswordSet.Visible}
      onCancel={() => props.toggleSetRouteUserNameAndPasswordModal({}, false)}
      buttons={<Buttons />}
    >
      <div className="form-group">
        <label htmlFor="userName">{t("userName")} </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="userName"
          value={GetValue("userName")}
          onChange={(e) => onChangeHandler(e)}
          placeholder={t("placeHuserName")}
        />
        <GetError name="userName" />
      </div>
      <div className="form-group">
        <label htmlFor="password">{t("passWord")} </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="password"
          value={GetValue("password")}
          onChange={(e) => onChangeHandler(e)}
          placeholder={t("placeHpassWord")}
        />
        <GetError name="password" />
      </div>
    </GymModal>
  );
};

export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(UserPassSet);
