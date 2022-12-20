import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationRoutesDisplayActions } from '../../Actions/FileConfigurationRoutesDisplay/action';
import { IFileConfigurationRoutesDisplayState } from '../../Actions/FileConfigurationRoutesDisplay/model';
import { GridOptions } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { useTranslation } from 'react-i18next';
import NDate from '@nepo/ndate';

type IProps = typeof fileConfigurationRoutesDisplayActions & IFileConfigurationRoutesDisplayState & GridOptions & { fileConfigurationId: number }

const RouteStateGrid = (props: IProps) => {
    const [t] = useTranslation()
    useEffect(() => {
        props.getRouteStateList(props.fileConfigurationId);
    }, [])
    const routeTable: any = props.routeList.data.map((item: any, i: number) => ({
        key: i + 1,
        serviceTitle: item.serviceTitle,
        downstreamPathTemplate: item.downstreamPathTemplate,
        upstreamPathTemplate: item.upstreamPathTemplate,
        isTest: item.isTest,
        serviceTypeTitle: item.serviceTypeTitle
    }));
    const grid: GridOptions = {
        columnDefs: [
            { field: 'key', headerName: t("rowNumb"), sortable: true, flex: 1 },
            { field: 'serviceTitle', headerName: t("serviceTitle"), sortable: true, autoHeight: true, flex: 2 },
            { field: 'downstreamPathTemplate', headerName: t("downstreamPathTemplate"), sortable: true, autoHeight: true, flex: 2 },
            { field: 'upstreamPathTemplate', headerName: t("upstreamPathTemplate"), sortable: true, autoHeight: true, flex: 2 },
            { field: 'isTest', headerName: t("isTest"), sortable: true, autoHeight: true, flex: 2 },
            { field: 'serviceTypeTitle', headerName: t("serviceType"), sortable: true, autoHeight: true, flex: 2 }
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
            noDataToShow: t("noDataToShow"),
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
        <React.Fragment>
            <div className="ag-theme-balham flex-grow-1" style={{ height: "450px" }}>
                <AgGridReact
                    columnDefs={grid.columnDefs}
                    rowData={routeTable}
                    // enableRtl={true}
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
        </React.Fragment>
    )
}
export default connect(
    (state: IApplicationState) => state.fileConfigurationRoutesDisplay,
    fileConfigurationRoutesDisplayActions,
)(RouteStateGrid);