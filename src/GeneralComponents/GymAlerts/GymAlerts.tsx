import React, { useEffect, useState } from 'react';
import '../GymAlerts/GymAlerts.css'
import GymAlert from './GymAlert';

export interface IProps {
    alerts: any[]
    clearAlerts: () => void
}

const GymAlerts = (props: IProps) => {
    const [alerts, setAlerts] = useState<{ key: number, alert: any }[]>([])
    const [, updateState] = React.useState({});
    const forceUpdate = React.useCallback(() => updateState({}), []);
    useEffect(() => {
        let newalerts = alerts;
        if (props.alerts.length > 0) {
            for (var i = 0; i < props.alerts.length; i++) {
                let key = Math.random() * 10000;
                newalerts.push({
                    key: key,
                    alert: <GymAlert alert={props.alerts[i]} comKey={key} onClose={removeAlert} />
                });
            }
            props.clearAlerts();
        }
        setAlerts(newalerts);
    }, [props.alerts])
    const removeAlert = (key: number) => {
        let newalerts = alerts;
        newalerts.splice(newalerts.findIndex(x => x.key == key), 1);
        setAlerts(newalerts);
        forceUpdate();
    }
    return (
        <React.Fragment>
        {alerts.length > 0 ?
            <div className="GymNotify">
                {
                    alerts.map((alert: any) => {
                        return (alert.alert)
                    })
                }
            </div>
        :""}
        </React.Fragment>
    );

}

export default GymAlerts;