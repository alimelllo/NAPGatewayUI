import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { useTranslation } from 'react-i18next';
import GymModal from '../../GeneralComponents/GymModal/GymModal';

type IProps = typeof routeActions & IRouteState

const Base64ConvertModal = (props: IProps) => {
    const [t] = useTranslation()
    const [text, setText] = useState<string>("")
    const [base64, setBase64] = useState<string>("")
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-secondary" onClick={() => props.toggleBase64Modal(false)}>{t("cancel")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t("base64Convert")} Visible={props.base64.Visible} onCancel={() => props.toggleBase64Modal(false)} buttons={<Buttons />}>
            <div className="form-group">
                <label htmlFor="text">{t("text")}  </label>
                <textarea className="form-control form-control-sm"
                    name="text"
                    value={text}
                    onChange={(e) => {setText(e.target.value); setBase64(btoa(e.target.value));}}
                    placeholder={t("placeHtext")} />
            </div>
            <div className="form-group">
                <label htmlFor="base64">{t("base64")} </label>
                <textarea className="form-control form-control-sm"
                    name="base64"
                    value={base64}
                    readOnly
                    placeholder={t("base64")} />
            </div>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(Base64ConvertModal);