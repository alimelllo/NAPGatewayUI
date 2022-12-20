import React, { useEffect, useState } from 'react';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { IDashboardState } from '../../Actions/Dashboard/model';
import { IApplicationState } from '../../Store/state';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

type IProps = typeof dashboardActions & IDashboardState

const dashboardURL = "http://10.33.202.135:92/healthchecks-ui";

const KibanaPage = (props: IProps) => {
	const [t] = useTranslation()
	useEffect(() => {
		document.title = t("monitoring")
	}, [t])
	return (
		<React.Fragment>
			<div className="flex-fill">
				<div className="p-4">
					<div className="subject d-flex justify-content-between align-items-center">
					<a href={dashboardURL} rel="noreferrer">
  					  لینک بیرونی
  					</a>
					</div>
					<div className="bg-white rounded shadow-sm overflow-hidden h-lg-100">
						<iframe src= {dashboardURL} frameBorder="0" height="2300" width="100%"></iframe>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}


export default connect(
	(state: IApplicationState) => state.dashboard,
	dashboardActions,
)(KibanaPage); 