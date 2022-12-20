import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { useTranslation } from "react-i18next";
import { IApplicationState } from "../../../Store/state";
import { routeActions } from "../../../Actions/Route/action";
import { IRouteState } from "../../../Actions/Route/model";
import { Link } from "react-router-dom";
import GymAccessControl from "../../../GeneralComponents/GymAccessControl/GymAccessControl";
import OperationButton from "../../../GeneralComponents/OperationButton/OperationButton";

type IProps = typeof routeActions & IRouteState;
const userAccessData = {
  remove: { roles: ["Operator", "Manager"] },
};
const Grid = (props: IProps) => {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const route = path[2];

  const [t] = useTranslation();
  const { data } = props.routeList.data;
  const routeListTable: any =
    data &&
    data.map((item: any) => ({
      key: item.id,
      number: item.id,
      serviceTitle: item.serviceTitle,
      upstreamPathTemplate: item.upstreamPathTemplate,
      downstreamPathTemplate: item.downstreamPathTemplate,
      serviceTypeTitle: item.serviceTypeTitle,
      show: item,
    }));
  const grid: GridOptions = {
    columnDefs: [
      {
        valueGetter: function (params) {
          return params.node.rowIndex + 1;
        },
        headerName: "rowNumb",
        sortable: true,
        flex: 1,
      },
      {
        field: "serviceTitle",
        headerName: "service title",
        sortable: true,
        autoHeight: true,
        flex: 2,
      },
      {
        field: "serviceTypeTitle",
        headerName: "service type",
        sortable: true,
        autoHeight: true,
        flex: 2,
      },
      {
        field: "upstreamPathTemplate",
        headerName: "upstream",
        sortable: true,
        autoHeight: true,
        flex: 2,
      },
      {
        field: "downstreamPathTemplate",
        headerName: "downstream",
        sortable: true,
        autoHeight: true,
        flex: 2,
      },
      {
        field: "show",
        headerName: "operation",
        lockPinned: true,
        pinned: "right",
        cellClass: "lock-pinned",
        width: 200,
        cellRendererFramework: function (params: any) {
          return (
            <div className="grid">
              <Link
                title="detail"
                to={`/Routes/${route}/Detail/${params.value.id}`}
              >
                <span
                  className="mdi mdi-24px mdi-eye px-1 text-basic"
                  title="show"
                />
              </Link>
              <GymAccessControl data={userAccessData.remove}>
                <OperationButton
                  iconName="delete"
                  title="remove"
                  iconColor="red"
                  onClickHandler={() =>
                    props.toggleRemoveRouteModal(
                      {
                        fileRouteId: params.value.id,
                      },
                      true
                    )
                  }
                />
              </GymAccessControl>
              <OperationButton
                iconName="download"
                title="download"
                iconColor="blue"
                onClickHandler={() =>
                  props.Helpdownloadfile(Number(params.value.id))
                }
                // disabled={!params.value.fileHelp}
              />
               <a onClick={() => {  props.toggleCopyRouteModal(
                      {
                        fileRouteId: params.value.id,
                      },
                      true
                    ); console.log(params.value.id) }}>
                <span
                  className="mdi mdi-24px mdi-file px-1 text-basic"
                  title="clone"/>
              </a>
            </div>
          );
        },
      },
    ],
    defaultColDef: {
      sortable: true,
      resizable: true,
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
    rowSelection: "single",
    animateRows: true,
    rowHeight: 100,
  };
  const onGridReady = (params: any) => {
    var gridColumnApi = params.columnApi;
    gridColumnApi.autoSizeColumns();
  };
  return (
    <div className="ag-theme-balham flex-grow-1" style={{ height: "450px" }}>
      <AgGridReact
        columnDefs={grid.columnDefs}
        rowData={routeListTable}
        // enableRtl={true}
        pagination={true}
        paginationPageSize={10}
        enableRangeSelection={true}
        sideBar={true}
        suppressDragLeaveHidesColumns={true}
        autoHeight={true}
        animateRows={true}
        onGridReady={onGridReady}
        localeText={grid.localeText}
      />
    </div>
  );
};
export default connect(
  (state: IApplicationState) => state.route,
  routeActions
)(Grid);
