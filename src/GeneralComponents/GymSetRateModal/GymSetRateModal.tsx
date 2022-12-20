import React, { useState } from 'react';
import GymModal from '../GymModal/GymModal';
import { useTranslation } from 'react-i18next';

export interface IProps {
    title: string
    visible: boolean
    onAccept: (score: number) => void
    onCancel: () => void
}

const GymSetRateModal = (props: IProps) => {
    const [t] = useTranslation()
    const [score, setScore] = useState<number>(0)
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-danger" onClick={() => props.onCancel()}>{t("return")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={() => props.onAccept(score)}>{t("save")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t(props.title)} Visible={props.visible} onCancel={() => props.onCancel()} buttons={<Buttons />}>
            <div className="modal-body">
                {t("setScoreDesc")}
                <div className="row justify-content-between mt-5">
                    <div className="col-3">
                        {score}
                    </div>
                    <div className="col-9">
                        <div className="row goldRate">
                            <span className={score >= 1 ? "mdi mdi-24px mdi-star" : "mdi mdi-24px mdi-star-outline"} onClick={() => setScore(1)} />
                            <span className={score >= 2 ? "mdi mdi-24px mdi-star" : "mdi mdi-24px mdi-star-outline"} onClick={() => setScore(2)} />
                            <span className={score >= 3 ? "mdi mdi-24px mdi-star" : "mdi mdi-24px mdi-star-outline"} onClick={() => setScore(3)} />
                            <span className={score >= 4 ? "mdi mdi-24px mdi-star" : "mdi mdi-24px mdi-star-outline"} onClick={() => setScore(4)} />
                            <span className={score >= 5 ? "mdi mdi-24px mdi-star" : "mdi mdi-24px mdi-star-outline"} onClick={() => setScore(5)} />
                        </div>
                    </div>
                </div>

            </div>
        </GymModal>
    );
}
export default GymSetRateModal;