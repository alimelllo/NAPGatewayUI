import React from 'react';
import GymModal from '../GymModal/GymModal';
import { useTranslation } from 'react-i18next';

export interface IProps {
    title: string
    description: string
    visible: boolean
    onAccept: () => void
    onCancel: () => void
}

const GymQuestionModal = (props: IProps) => {
    const [t] = useTranslation()
    const Buttons = () => {
        return <React.Fragment>
            <button type="button" className="btn btn-outline-danger" onClick={() => props.onCancel()}>{t("no")}</button>
            <button className="btn btn-success px-4 ml-1" onClick={() => props.onAccept()}>{t("yes")}</button>
        </React.Fragment>
    }
    return (
        <GymModal ModalTitle={t(props.title)} Visible={props.visible} onCancel={() => props.onCancel()} buttons={<Buttons />}>
            <div className="modal-body">
                <div className="d-flex flex-column justify-content-center text-center">
                    <span className="mdi mdi-48px mdi-help-circle text-danger"></span>
                    <div className="mt-4">
                        {t(props.description)}
                    </div>
                </div>
            </div>
        </GymModal>
    );
}
export default GymQuestionModal;