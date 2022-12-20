import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../Store/state';
import { fileConfigurationActions } from '../../Actions/FileConfiguration/action';
import { IFileConfigurationState } from '../../Actions/FileConfiguration/model';
import { GridOptions } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type IProps = typeof fileConfigurationActions & IFileConfigurationState & GridOptions

const FileConfigurationGrid = (props: IProps) => {
    const [t] = useTranslation()
    // useEffect(() => {
    //     props.getFileConfigurationList();
    // }, [])
    const fileConfigurationPriceTable: any = props.fileConfigurationList.data.map((item: any) => ({
        key: item.id,
        number: item.id,
        title: item.title,
        description: item.description,
        edit: item
    }));
    const grid: GridOptions = {
        columnDefs: [
            {
                valueGetter: function (params) {
                    return params.node.rowIndex + 1;
                }, headerName: t("rowNumb"), sortable: true, flex: 1
            },
            {field: 'title', headerName: t("title"), sortable: true, autoHeight: true, flex: 2},
            {field: 'description', headerName: t("description"), sortable: true, autoHeight: true, flex: 2},
            {
                field: 'edit', headerName: t("operation"), lockPinned: true, pinned: 'right',
                cellClass: 'lock-pinned', width: 200, cellRendererFramework: function (params: any) {
                    return <div className="text-center">
                        <a title={t("edit")} onClick={() => props.toggleUpdateFileConfigurationModal(params.value, true)}><span className="mdi mdi-24px mdi-pencil px-1 text-basic" title={t("edit")} /></a>
                        <Link title={t("routes")} to={"/Routes/" + params.value.id}> <span className="mdi mdi-24px mdi-lan px-1 text-basic" title={t("routes")} /></Link>
                        <Link title={t("globalConfiguration")} to={"/GlobalConfiguration/" + params.value.id}> <span className="mdi mdi-24px mdi-memory px-1 text-basic" title={t("globalConfiguration")} /></Link>
                        <Link title={t("highAvailabilities")} to={"/HighAvailabilities/" + params.value.id}> <span className="mdi mdi-24px mdi-nfc-tap px-1 text-basic" title={t("highAvailabilities")} /></Link>
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
        <React.Fragment>
            <div className="ag-theme-balham flex-grow-1" style={{ height: "450px" }}>
                <AgGridReact
                    columnDefs={grid.columnDefs}
                    rowData={fileConfigurationPriceTable}
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
    (state: IApplicationState) => state.fileConfiguration,
    fileConfigurationActions,
)(FileConfigurationGrid);