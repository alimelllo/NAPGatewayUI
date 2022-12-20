import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { dashboardActions } from '../../Actions/Dashboard/action'
import { IApplicationState } from '../../Store/state'
import { connect } from 'react-redux';
import { IDashboardState } from '../../Actions/Dashboard/model';

type IProps = typeof dashboardActions & IDashboardState & { text: string, data: number, color: string }

const CardNumber = (props: IProps) => {
    const [t] = useTranslation()

    useEffect(() => {

    }, [])


    return (
        <div className="card border-danger rounded p-3 m-1" style={{ height: '150px', width: '24%', border: '4px solid red', color: props.color }}>
            <div className="text-center mt-4">
                <span className="font-weight-bold"><h1>{props.data.toLocaleString()}</h1></span>
            </div>
            <div className="text-center mt-1">
                
                
                <span className=""><h6>{props.text}</h6></span>
            </div>
        </div>
    )
}

export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(CardNumber);
