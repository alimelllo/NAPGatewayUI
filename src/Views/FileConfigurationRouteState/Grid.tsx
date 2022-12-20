import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationRouteStateActions } from '../../Actions/FileConfigurationRouteState/action';
import { IFileConfigurationRouteStateState } from '../../Actions/FileConfigurationRouteState/model';
import { GridOptions } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { useTranslation } from 'react-i18next';
import NDate from '@nepo/ndate';
import GymAccessControl from '../../GeneralComponents/GymAccessControl/GymAccessControl';

type IProps = typeof fileConfigurationRouteStateActions & IFileConfigurationRouteStateState & GridOptions & { fileConfigurationId: number }

const RouteStateGrid = (props: IProps) => {
    const [t] = useTranslation()
    const userAccessData = {
        show: { roles: ["Security", "Manager"], withNoAccessPage: true }
    }
    useEffect(() => {
        props.getRouteStateList(props.fileConfigurationId);
    }, [])
    const routeStateTable: any = props.routeStateList.data.map((item: any) => ({
        key: item.id,
        number: item.id,
        downstreamPathTemplate: item.downstreamPathTemplate,
        managerAccept: item.managerAccept,
        routeState: item.routeState == 0 ?
            t("new")
            :
            item.routeState == 1 ?
                t("pending")
                :
                item.routeState == 2 ?
                    t("ignored")
                    :
                    t("accepted"),
        lastUpdated: new NDate(item.lastUpdated).format("YYYY/MM/DD HH:mm:ss"),
        edit: { managerAccept: item.managerAccept, routeState: item.routeState, data: { fileConfigurationId: props.fileConfigurationId, id: item.id } }
    }));
    const grid: GridOptions = {
        columnDefs: [
            {
                valueGetter: function (params) {
                    return params.node.rowIndex + 1;
                }, headerName: t("rowNumb"), sortable: true, flex: 1
            },
            { field: 'downstreamPathTemplate', headerName: t("downstreamPathTemplate"), sortable: true, autoHeight: true, flex: 2 },
            { field: 'managerAccept', headerName: t("managerAccept"), sortable: true, autoHeight: true, flex: 2 },
            { field: 'routeState', headerName: t("status"), sortable: true, autoHeight: true, flex: 2 },
            { field: 'lastUpdated', headerName: t("lastUpdated"), sortable: true, autoHeight: true, flex: 2 },
            {
                field: 'edit', headerName: t("operation"), lockPinned: true, pinned: 'right',
                cellClass: 'lock-pinned', width: 200, cellRendererFramework: function (params: any) {
                    return <div className="text-center">
                        <a title={t("routeBA")} onClick={() => props.getRouteBA(params.value)}><span className="mdi mdi-24px mdi-eye px-1 text-basic link" title={t("routeBA")} /></a>
                        {/* <a title={t("accept")} onClick={() => props.toggleRouteAcceptedModal(params.value.data, true)}><span className="mdi mdi-24px mdi-check-all px-1 text-basic link" title={t("accept")} /></a>
                        {params.value.routeState != 2 ?
                            <a title={t("ignore")} onClick={() => props.toggleRouteIgnoredModal(params.value.data, true)}><span className="mdi mdi-18px mdi-block-helper px-1 text-basic link" title={t("ignore")} /></a>
                            : ""}
                        {params.value.routeState != 0 ?
                            <a title={t("returnToLastState")} onClick={() => props.toggleRouteToLastStateModal(params.value.data, true)}><span className="mdi mdi-24px mdi-refresh px-1 text-basic link" title={t("returnToLastState")} /></a>
                            : ""} */}
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
        <GymAccessControl data={userAccessData.show}>
            <div className="ag-theme-balham flex-grow-1" style={{ height: "450px" }}>
                <AgGridReact
                    columnDefs={grid.columnDefs}
                    rowData={routeStateTable}
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
        </GymAccessControl>
    )
}
export default connect(
    (state: IApplicationState) => state.fileConfigurationRouteState,
    fileConfigurationRouteStateActions,
)(RouteStateGrid);