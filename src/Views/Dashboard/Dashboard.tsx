import React, { useEffect, useState } from 'react';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IDashboardState } from '../../Actions/Dashboard/model';
import { IApplicationState } from '../../Store/state';
import { connect } from 'react-redux';
import { useTranslation, Translation } from 'react-i18next';
import GymAlerts from '../../GeneralComponents/GymAlerts/GymAlerts';
import PushesReport from './PushesReport';
import GymLoading from '../../GeneralComponents/GymLoading/GymLoading';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';

type IProps = typeof dashboardActions & IDashboardState

const Dashboard = (props: IProps) => {
	const [t] = useTranslation()
	const userAccessData = {
		show: { roles: ["Operator", "Manager", "Supervisor"], withNoAccessPage: true },
	}
	useEffect(() => {
		document.title = t("dashboard")
	}, [t])
	return (
		// <GymAccessControl data={userAccessData.show}>
		<React.Fragment>
			<GymLoading loading={props.pushes.loading} />
			<div className="flex-fill">
				<div className="p-4">
					<div className="subject d-flex justify-content-between align-items-center">
						 
					</div>
					<div className="bg-white rounded shadow-sm overflow-hidden h-lg-100">
						<PushesReport />
					</div>
				</div>
			</div>
			<GymAlerts
				alerts={props.alerts}
				clearAlerts={() => props.clearAlerts()} />
		</React.Fragment>
		// </GymAccessControl>
	);
}


export default connect(
	(state: IApplicationState) => state.dashboard,
	dashboardActions,
)(Dashboard);