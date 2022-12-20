import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderItem from './HeaderItem'
import { Link } from 'react-router-dom';
import { IApplicationState } from '../../../Store/state';
import { connect } from 'react-redux';
import LogOut from './LogOut';
import { dashboardActions } from '../../../Actions/Dashboard/action';
import { IDashboardState } from '../../../Actions/Dashboard/model';
import GymAccessControl from '../../../GeneralComponents/GymAccessControl/GymAccessControl';
import { NavLink } from 'react-router-dom';

type IProps = typeof dashboardActions & IDashboardState & { isConnected: boolean }

const Header = (props: IProps) => {
	const [t] = useTranslation()
	const userAccessData = {
		gateways: { roles: ["Operator", "Manager", "Supervisor"] },
		routeStates: { roles: ["Manager", "Security"] }
	}
	return (
		<React.Fragment>

			<nav className="navbar navbar-expand-md navbar-dark bg-dark p-0 fixed-top">

				<button className="navbar-toggler border-0" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="mdi mdi-24px mdi-menu"></span>
				</button>
				<Link to="/" className="navbar-brand bg-white d-inline-block p-2 m-0">
					<img src="content/images/logo-transparent.png" width="40" alt="Club Logo" />
				</Link>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav">
						{props.userClaims.roles.some(x => x.toLocaleLowerCase() == props.userClaims.kibanaUser.toLocaleLowerCase()) ?
							<HeaderItem link="/Reports" title="kibanaPage" icon="mdi-monitor-dashboard" />
							:
							<React.Fragment>

								<GymAccessControl data={userAccessData.gateways}>
									<HeaderItem link="/FileConfigurations" title="fileConfigurations" icon="mdi-radio-tower" />
								</GymAccessControl>
								<GymAccessControl data={userAccessData.routeStates}>
									<HeaderItem link="/FileConfigurationRouteState" title="routeStates" icon="mdi-flip-to-back" />
								</GymAccessControl>
								<GymAccessControl data={userAccessData.gateways}>
									<HeaderItem link="/Dashboard" title="dashboard" icon="mdi-monitor-dashboard" />
								</GymAccessControl>
								<div className="dropdown">
								<a className="align-items-center dropdown-toggle d-flex flex-row flex-md-column nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span>
                                     <span className="mdi mdi-20px d-block text-center mdi-blur"></span>
                                     <span className="mr-1">گزارشات مالی</span>
                                    </span>
                                  </a>

                                  <div className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuLink">
                                   <NavLink to='/Accounting'><a className="dropdown-item text-basic " href="#">مالی</a></NavLink>
								   <NavLink to='/Bill'><a className="dropdown-item text-basic" href="#">صورت حساب</a></NavLink>
                                   <NavLink to='/ClientAccountingInformation'><a className="dropdown-item text-basic" href="#">مشخصات مالی استفاده کننده</a></NavLink>
                                  </div>
                                </div>
								<GymAccessControl data={userAccessData.gateways}>
									<HeaderItem link="/Reports" title="reports" icon="mdi-flip-to-back" />
								</GymAccessControl>
								<GymAccessControl data={userAccessData.gateways}>
									<HeaderItem link="/Monitoring" title="monitoring" icon="mdi-flip-to-back" />
								</GymAccessControl>


							</React.Fragment>
						}
					</ul>

					<div className="d-flex align-items-center justify-content-center mb-2 mb-md-0 ml-auto mr-2 nav-icons">
						{!props.isConnected ?
							// <LogIn />
							""
							:
							<LogOut />
						}
					</div>

				</div>

			</nav>

		</React.Fragment>
	);

}

export default connect(
	(state: IApplicationState) => state.dashboard,
	dashboardActions,
)(Header);