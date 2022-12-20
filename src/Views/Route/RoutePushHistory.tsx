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

const RoutePushHistory = (props: IProps) => {
    const [t] = useTranslation()
    const routePushHistoryTable: any = props.routePushHistoryList.data.map((item: any) => ({
        key: item.id,
        title: item.title,
        dateTime: new NDate(item.dateTime).format("YYYY/MM/DD HH:mm:ss")
    }));

    const grid: GridOptions = {
        columnDefs: [
            {
                valueGetter: function (params) {
                    return params.node.rowIndex + 1;
                }
                , headerName: t("rowNumb"), sortable: true, flex: 1
            },
            {
                field: 'title', headerName: t("highAvailabilities"), sortable: true, autoHeight: true, flex: 2
            },
            {
                field: 'dateTime', headerName: t("date"), sortable: true, autoHeight: true, flex: 2
            }
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
        <GymModal ModalTitle={t("routePushHistory")} size={"modal-xl"} Visible={props.routePushHistoryList.Visible} onCancel={() => props.toggleRoutePushHistoryModal(false)}>
            <div className="ag-theme-balham" style={{ height: "300px" }}>
                <AgGridReact
                    columnDefs={grid.columnDefs}
                    rowData={routePushHistoryTable}
                    pagination={true}
                    paginationPageSize="10"
                    enableRangeSelection={true}
                    sideBar={true}
                    suppressDragLeaveHidesColumns={true}
                    autoHeight={true}
                    animateRows={true}
                    localeText={grid.localeText}/>
            </div>
        </GymModal>
    )
}
export default connect(
    (state: IApplicationState) => state.route,
    routeActions,
)(RoutePushHistory);