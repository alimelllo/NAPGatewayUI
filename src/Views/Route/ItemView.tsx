import React from 'react';
import { useTranslation } from 'react-i18next';

export interface IProps {
    label: string;
    value: string;
}
const ItemView = (props: IProps) => {
    const [t] = useTranslation()
    return (
        <div className="form-group row">
            <label className="col-sm-6 col-xl-5 col-form-label">{t(props.label)}</label>
            <div className="col">
                <input className="form-control form-control-sm form-control-plaintext" type="text" value={props.value == undefined ? "" : props.value}/>
            </div>
        </div>
    );
}

export default ItemView;