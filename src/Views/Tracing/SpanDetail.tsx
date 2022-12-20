import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { tracingActions } from '../../Actions/Tracing/action';
import { ITracingState } from '../../Actions/Tracing/model';
import { useTranslation } from 'react-i18next';
import GymModal from '../../GeneralComponents/GymModal/GymModal';
import NDate from '@nepo/ndate';

type IProps = typeof tracingActions & ITracingState

const SpanDetail = (props: IProps) => {
    const [t] = useTranslation()
    return (
        <GymModal ModalTitle={t("span1")} size={"modal-xl"} Visible={props.spanDetail.Visible} onCancel={() => props.toggleSpanDetailModal(false)}>
            <span className="badge badge-secondary p-1 mx-2">{props.spanDetail.data.serviceName}</span>
            <span className="badge badge-secondary p-1 mx-2">{String(props.spanDetail.data.duration / 1000) + "  ms"}</span>
            <table className="table table-striped table-sm mt-4">
                <thead>
                    <tr>
                        <th scope="col" style={{ textAlign: "center" }} className="font-weight-bold">{t("time1")}</th>
                        <th scope="col" style={{ textAlign: "center" }} className="font-weight-bold">{t("event1")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.spanDetail.data.logs ? props.spanDetail.data.logs.map((log: any) => {
                            return (
                                <tr>
                                    <td className="font-weight-bold align-middle">{new NDate(log.timestamp).formatJalali("YYYY/MM/DD HH:mm:ss")}</td>
                                    <td className="align-middle">{log.fields[0].value}</td>
                                </tr>
                            )
                        })
                            : ""
                    }
                </tbody>
            </table>
            <table className="table table-striped table-sm mt-4">
                <thead>
                    <tr>
                        <th scope="col" style={{ textAlign: "center" }} className="font-weight-bold">{t("tagKey1")}</th>
                        <th scope="col" style={{ textAlign: "center" }} className="font-weight-bold">{t("value1")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.spanDetail.data.tags ? props.spanDetail.data.tags.map((tag: any) => {
                            return (
                                <tr>
                                    <td className="font-weight-bold align-middle" style={{ textAlign: "center" }}>{tag.key}</td>
                                    <td className="align-middle" style={{ textAlign: "center" }}>{tag.value}</td>
                                </tr>
                            )
                        })
                            : ""
                    }
                </tbody>
            </table>
            <table className="table table-striped table-sm mt-4">
                <thead>
                    <tr>
                        <th scope="col" className="font-weight-bold" style={{ textAlign: "center" }}>{t("reference1")}</th>
                        <th scope="col" className="font-weight-bold" style={{ textAlign: "center" }}>{t("parentId1")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.spanDetail.data.references ? props.spanDetail.data.references.map((tag: any) => {
                            return (
                                <tr>
                                    <td className="font-weight-bold align-middle" style={{ textAlign: "center" }}>{tag.reference}</td>
                                    <td className="align-middle" style={{ textAlign: "center" }}>{tag.parentId}</td>
                                </tr>
                            )
                        })
                            : ""
                    }
                </tbody>
            </table>
        </GymModal>
    )
}

export default connect(
    (state: IApplicationState) => state.tracing,
    tracingActions,
)(SpanDetail);