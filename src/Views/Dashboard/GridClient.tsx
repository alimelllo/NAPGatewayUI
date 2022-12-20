import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { dashboardActions } from '../../Actions/Dashboard/action'
import { IDashboardState } from '../../Actions/Dashboard/model';
import { IFileConfigurationRouteStateState } from '../../Actions/FileConfigurationRouteState/model';
import { GridOptions } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { useTranslation } from 'react-i18next';
import NDate from '@nepo/ndate';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';

type IProps = typeof dashboardActions & IDashboardState & GridOptions

const GridClient = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Operator", "Manager"], withNoAccessPage: true }
    }
    const routeStateTable: any = props.servicesName.dataNotAll.map((item: any) => ({
        label: item.label,
        value: item.value
    }));
    const grid: GridOptions = {
        columnDefs: [
            {
                valueGetter: function (params) {
                    return params.node.rowIndex + 1;
                }, headerName: t("rowNumb"), sortable: true, flex: 0.5
            },
            { field: 'label', headerName: t("label"), sortable: true, autoHeight: true, flex: 4 },
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
            noDataToShow: t("noData"),
        },
        rowSelection: 'single',
        animateRows: true,
        rowHeight: 100,
    }
    const onGridReady = (params: any) => {
        var gridColumnApi = params.columnApi;
        gridColumnApi.autoSizeColumns();
    }
    return (
        <GymAccessControl data={userAccessData.show}>
            <div className="ag-theme-balham flex-grow-1" style={{ height: "350px" }}>
                <AgGridReact
                    columnDefs={grid.columnDefs}
                    rowData={routeStateTable}
                    enableRtl={true}
                    pagination={true}
                    paginationPageSize="10"
                    enableRangeSelection={true}
                    sideBar={true}
                    suppressDragLeaveHidesColumns={true}
                    autoHeight={true}
                    animateRows={true}
                    onGridReady={onGridReady}
                    localeText={grid.localeText}
                />
            </div>
        </GymAccessControl>
    )
}
export default connect(
    (state: IApplicationState) => state.dashboard,
    dashboardActions,
)(GridClient);