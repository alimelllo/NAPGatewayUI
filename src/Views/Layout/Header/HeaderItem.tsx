import React from 'react';
import { NavLink } from 'react-router-dom';
import { Translation } from 'react-i18next';

export interface IProps {
    link: string | {
        pathname: string
        state: {
            fromDashboard: boolean
        }
    }
    title: string
    icon: string
}

export interface IState {

}

class HeaderItem extends React.Component<IProps, IState> {

    render() {
        return (
            <li className="nav-item">
                <NavLink className="align-items-center d-flex flex-row flex-md-column nav-link" to={this.props.link} exact activeClassName="active">
                    <span>
                        <span className={"mdi mdi-20px d-block text-center " + this.props.icon}></span>
                        <span className="mr-1">
                            <Translation>
                                {
                                    t => t(this.props.title)
                                }
                            </Translation>
                        </span>
                    </span>
                </NavLink>
            </li>
        );
    }
}

export default HeaderItem;