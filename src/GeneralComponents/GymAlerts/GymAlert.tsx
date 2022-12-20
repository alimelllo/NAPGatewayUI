import React, { useEffect } from 'react';
import '../GymAlerts/GymAlerts.css'
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-bootstrap';

export interface IProps {
    alert: any,
    comKey: number,
    onClose: (key1: number) => void
}

const GymAlert = (props: IProps) => {
    const [t] = useTranslation()
    useEffect(() => {
        if (props.alert.dismissTime){
            if(props.alert.dismissTime > -1) {
                setTimeout(() => {
                    props.onClose(props.comKey);
                }, props.alert.dismissTime);
            }
        }else{
            setTimeout(() => {
                props.onClose(props.comKey);
            }, 5000);
        }
    }, [])
    const GetIcon = () => {
        switch (props.alert.variant) {
            case 'success':
                return <span className="mdi mdi-18px mdi-checkbox-marked-circle-outline"></span>
            case 'danger':
                return <span className="mdi mdi-18px mdi-alert-circle-outline"></span>
            case 'warning':
                return <span className="mdi mdi-18px mdi-alert-outline"></span>
            case 'info':
                return <span className="mdi mdi-18px mdi-information-outline"></span>
            default:
                return <span className="mdi mdi-18px mdi-information-outline"></span>
        }
    }
    return (
        <Alert className="GymAlert" variant={props.alert.variant} onClose={() => props.onClose(props.comKey)} dismissible>
            {props.alert.title ? <div className="alert-heading h6">{t(props.alert.title)}</div> : ""}
            <div className="row">
                <GetIcon />
                <p className="mx-2">{t(props.alert.description).split('\n').map(i => {
                    return <React.Fragment>{i}<br /></React.Fragment>
                })}</p>
            </div>
        </Alert>
    );
}

export default GymAlert;