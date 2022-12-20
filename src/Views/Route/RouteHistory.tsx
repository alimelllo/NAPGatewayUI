import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { routeActions } from '../../Actions/Route/action';
import { IRouteState } from '../../Actions/Route/model';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { GridOptions } from "ag-grid-community";
import { useTranslation } from 'react-i18next';
import GymModal from '../../GeneralComponents/GymModal/GymModal';
import NDate from '@nepo/ndate';

type IProps = typeof routeActions & IRouteState

const RouteHistory = (props: IProps) => {
    const [t] = useTranslation()
    const routeHistoryTable: any = props.routeHistoryList.data.map((item: any, i: number) => ({
        key: i + 1,
        id: item.id,
        dateTime: new NDate(item.dateTime).format("YYYY/MM/DD HH:mm:ss")
    }));

    const grid: GridOptions = {
        columnDefs: [
            {
                
                field: 'key', headerName: t("rowNumb"), sortable: true, flex: 1
            },
            {
                field: 'dateTime', headerName: t("date"), sortable: true, autoHeight: true, flex: 2
            },
            {
                field: 'id', headerName: t("operation"), lockPinned: true, pinned: 'right',
                cellClass: 'lock-pinned', width: 70, cellRendererFramework: function (params: any) {
                    return <div className="btn-group">
                        <button title={t("view")} className="btn btn-sm btn-outline-secondary"
                            onClick={() => props.getRouteHistoryBA(params.value)}>
                            <span className="mdi mdi-18px mdi-eye" />
                        </button>
                    </div>
                }
            },
        ],
        defaultColDef: {
            sortable: true,
            resizable: true
        },
        localeText: {
            page: t("pagination"),
            to: t("to"),
            of: t("of"),
            first: t("first"),
            previous: t("previous"),
            next: t("next"),
            last: t("last"),
            noRowsToShow: t("noRowsToShow"),
        },
        rowSelection: 'single',
        animateRows: true,
        rowHeight: 100,
    }
    return (
        <GymModal ModalTitle={t("routeHistory")} size={"modal-xl"} Visible={props.routeHistoryList.Visible} onCancel={() => props.toggleRouteHistoryModal(false)}>
            <div className="ag-theme-balham" style={{ height: "300px" }}>
                <AgGridReact
                    columnDefs={grid.columnDefs}
                    rowData={routeHistoryTable}
                    pagination={true}
                    paginationPageSize="10"
                    enableRangeSelection={true}
                    sideBar={true}
                    suppressDragLeaveHidesColumns={true}
                    autoHeight={true}
                    animateRows={true}
                    localeText={grid.localeText} />
            </div>
        </GymModal>
    )
}
export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(RouteHistory);