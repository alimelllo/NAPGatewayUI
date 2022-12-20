import React from 'react';
import './GymLoading.css'
import loading from '../../assets/loading.svg'
export interface IProps {
    loading: boolean;
    title?: string;
}

export interface IState {

}

class GymLoading extends React.Component<IProps, IState> {
    state = { visible: false }
    render() {
        return (
            <React.Fragment>
                {
                    this.props.loading ?
                        <div className="spinner" >
                            <div className="spinnerLoading"><img src={loading} alt="Loading" />
                                {this.props.title ?
                                    <div>
                                        {this.props.title}
                                    </div>
                                    : ""}
                            </div>
                            {this.props.children}
                        </div>
                        : ""
                }
            </React.Fragment>
        );
    }
}

export default GymLoading;