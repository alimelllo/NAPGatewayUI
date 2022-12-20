import React from 'react';
import '../Modal/Modal.css';
import { useTranslation } from 'react-i18next';

export interface IProps {
    rate: number
    raters?: number
    withRaters?: boolean
}

const GymRate = (props: IProps) => {
    const [t] = useTranslation()
    return (
        <React.Fragment>
            <div className={"row justify-content-" + (props.withRaters ? "around" : "center")} title={String(props.rate)}>
                <div className="row justify-content-center rate">
                    <span className={props.rate >= 1 ? "mdi mdi-star" : "mdi mdi-star-outline"} />
                    <span className={props.rate >= 2 ? "mdi mdi-star" : "mdi mdi-star-outline"} />
                    <span className={props.rate >= 3 ? "mdi mdi-star" : "mdi mdi-star-outline"} />
                    <span className={props.rate >= 4 ? "mdi mdi-star" : "mdi mdi-star-outline"} />
                    <span className={props.rate >= 5 ? "mdi mdi-star" : "mdi mdi-star-outline"} />
                </div>
                {props.withRaters ?
                    <div className="row justify-content-center">
                        <span className="">{props.withRaters ? props.raters + t("personUnit") : props.rate}</span>
                    </div>
                    : ""}
            </div>
        </React.Fragment >
    );
}

export default GymRate;