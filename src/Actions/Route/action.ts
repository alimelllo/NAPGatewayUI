import { AppAction } from "../../Store/state";
import { RouteActionTypes } from "./actionType";
import { KnownAction } from "./model";
import API from "../../GeneralComponents/baseURL";
import { getRoute } from "../convertData";

export const routeActions = {
  getRouteList:
    (
      fileConfigurationId: number,
      textSearch : string ,
      pageNumber: number = 0,
      pageSize: number = 5000
      
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.RouteFetch });
      try {
        const result = await API.get(
          `/NAPGateWay/FileConfigurationQuery/GetRoutesByFileConfigurationIDByePage?FileConfigurationId=${fileConfigurationId}&TextSearch=${textSearch}&PageNumber=${pageNumber}&PageSize=${pageSize}&NeedTotalCount=true`
        );
        if (result.status == 200) {
          dispatch({
            type: RouteActionTypes.RouteFetchSuccess,
            data: result.data,
          });
        } else if (result.status == 204) {
          dispatch({
            type: RouteActionTypes.RouteFetchSuccess,
            data: [],
          });
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RouteFetchSuccess,
            data: [],
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RouteFetchFailed });
        routeActions.pushCommonAlert("errorFetch")(dispatch, getState);
      }
    },
  getRouteById:
    (routeId: number | string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.RouteIdFetch });
      try {
        const result = await API.get(
          `/NAPGateWay/FileConfigurationQuery/GetRouteByIdQuery?FileRouteId=${routeId}`
        );
        if (result.status == 200) {
          dispatch({
            type: RouteActionTypes.RouteIdSuccess,
            data: result.data,
          });
        } else if (result.status == 204) {
          dispatch({
            type: RouteActionTypes.RouteIdSuccess,
            data: [],
          });
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RouteIdSuccess,
            data: [],
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RouteIdFailed });
        routeActions.pushCommonAlert("errorFetch")(dispatch, getState);
      }
    },

  getScopeList:
    (fileConfigurationId: number): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      // if (getState().route.scopeList.loaded && getState().route.scopeList.fileConfigurationId == fileConfigurationId)
      //   return;
      dispatch({ type: RouteActionTypes.ScopeFetch });
      try {
        const result = await API.get(
          "/NAPGateWay/SSOQuery/GetApiScopes?fileConfigurationId=" +
            fileConfigurationId
        );
        if (result.status == 200) {
          let scopes: any = result.data.map(function (item: any) {
            return {
              value: item.name,
              label: item.name,
            };
          });
          dispatch({
            type: RouteActionTypes.ScopeFetchSuccess,
            data: scopes,
            fileConfigurationId,
          });
        } else if (result.status == 204) {
          dispatch({
            type: RouteActionTypes.ScopeFetchSuccess,
            data: [],
            fileConfigurationId,
          });
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.ScopeFetchFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.ScopeFetchFailed });
        routeActions.pushCommonAlert("errorFetch")(dispatch, getState);
      }
    },

  getRouteHistoryList:
    (fileRouteId: number): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.GetRouteHistory });
      try {
        const result = await API.get(
          "/NAPGateWay/FileConfigurationQuery/GetRouteHistories?FileRouteId=" +
            fileRouteId
        );
        if (result.status == 200) {
          dispatch({
            type: RouteActionTypes.GetRouteHistorySuccess,
            data: result.data,
          });
        } else if (result.status == 204) {
          dispatch({
            type: RouteActionTypes.GetRouteHistorySuccess,
            data: [],
          });
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.GetRouteHistorySuccess,
            data: [],
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.GetRouteHistoryFailed });
        routeActions.pushCommonAlert("errorFetch")(dispatch, getState);
      }
    },
  toggleRouteHistoryModal:
    (Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.GetRouteHistoryModal,
        Visible: Visible,
      });
    },

  getRouteHistoryBA:
    (id: number): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.GetRouteHistoryBA });
      try {
        const result = await API.get(
          "/NAPGateWay/FileConfigurationQuery/GetRouteHistoryBA?Id=" + id
        );
        if (result.status == 200) {
          dispatch({
            type: RouteActionTypes.GetRouteHistoryBASuccess,
            data: {
              befor: result.data.befor ? getRoute(result.data.befor) : {},
              after: getRoute(result.data.after),
            },
          });
        } else if (result.status == 204) {
          dispatch({ type: RouteActionTypes.GetRouteHistoryBAFailed });
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.GetRouteHistoryBAFailed });
        routeActions.pushCommonAlert("errorFetch")(dispatch, getState);
      }
    },
  toggleRouteHistoryBAModal:
    (Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.GetRouteHistoryBAModal,
        Visible: Visible,
      });
    },

  getRoutePushHistoryList:
    (fileRouteId: number): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.GetRoutePushHistory });
      try {
        const result = await API.get(
          "/NAPGateWay/FileConfigurationQuery/GetRoutePushHistoryByRouteId?fileRouteId=" +
            fileRouteId
        );
        if (result.status == 200) {
          dispatch({
            type: RouteActionTypes.GetRoutePushHistorySuccess,
            data: result.data,
          });
        } else if (result.status == 204) {
          dispatch({
            type: RouteActionTypes.GetRoutePushHistorySuccess,
            data: [],
          });
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.GetRoutePushHistorySuccess,
            data: [],
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.GetRoutePushHistoryFailed });
        routeActions.pushCommonAlert("errorFetch")(dispatch, getState);
      }
    },
  toggleRoutePushHistoryModal:
    (Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.GetRoutePushHistoryModal,
        Visible: Visible,
      });
    },

  saveRoute:
    (data: any): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.RouteCreate });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddFileRoute",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RouteCreateSuccess });
          routeActions.getRouteList(data.fileConfigurationId , '')(
            dispatch,
            getState
          );
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RouteCreateFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RouteCreateFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleCreateRouteModal:
    (Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.RouteCreateModal, Visible: Visible });
    },

  updateRoute:
    (data: any, routeId: string | number): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.RouteUpdate });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/UpdateFileRoute",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RouteUpdateSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RouteUpdateFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RouteUpdateFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleUpdateRouteModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RouteUpdateModal,
        item,
        Visible: Visible,
      });
    },

  removeRoute: (fileConfigurationId:number): AppAction<KnownAction> => async (dispatch, getState) => {
    console.log(fileConfigurationId);
    
    let data = getState().route.routeRemove.item;
    dispatch({ type: RouteActionTypes.RouteRemove });
    try {
      const result = await API.delete(
        "/NAPGateWay/FileConfigurationCommand/RemoveFileRoute?fileConfigurationId=" +
          data.fileConfigurationId +
          "&fileRouteId=" +
          data.fileRouteId
      );
      if (result.status == 201) {
        dispatch({ type: RouteActionTypes.RouteRemoveSuccess });
        routeActions.getRouteList(fileConfigurationId , '')(dispatch, getState);
        routeActions.pushCommonAlert("200")(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: RouteActionTypes.RouteRemoveFailed });
        routeActions.pushCommonAlert("401")(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: RouteActionTypes.RouteRemoveFailed });
      routeActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleRemoveRouteModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RouteRemoveModal,
        item,
        Visible: Visible,
      });
    },

    toggleCopyRouteModal:
    (item: any, Visible: boolean): AppAction<any> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RouteCopyModal,
        item,
        Visible: Visible,
      });
    },

  addUpstreamHttpMethodRouteKey:
    (data: any, routeId: string | number): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddUpstreamHttpMethodRouteKey });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddUpstreamHttpMethodRouteKey",
          data
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.AddUpstreamHttpMethodRouteKeySuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.AddUpstreamHttpMethodRouteKeyFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.AddUpstreamHttpMethodRouteKeyFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  removeUpstreamHttpMethodRouteKey:
    (data: any, routeId: string | number): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.RemoveUpstreamHttpMethodRouteKey });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveUpstreamHttpMethodRouteKey?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&method=" +
            data.method
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.RemoveUpstreamHttpMethodRouteKeySuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RemoveUpstreamHttpMethodRouteKeyFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.RemoveUpstreamHttpMethodRouteKeyFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },

  setFileCacheOptions:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.SetFileCacheOptions });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/SetFileCacheOptions",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.SetFileCacheOptionsSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.SetFileCacheOptionsFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.SetFileCacheOptionsFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleSetFileCacheOptionsModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.SetFileCacheOptionsModal,
        item,
        Visible: Visible,
      });
    },

  setQoSOptions:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.SetQoSOptions });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/SetQoSOptions",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.SetQoSOptionsSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.SetQoSOptionsFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.SetQoSOptionsFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleSetQoSOptionsModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.SetQoSOptionsModal,
        item,
        Visible: Visible,
      });
    },

  setLoadBalancerOptions:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.SetLoadBalancerOptions });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/SetLoadBalancerOptions",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.SetLoadBalancerOptionsSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.SetLoadBalancerOptionsFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.SetLoadBalancerOptionsFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleSetLoadBalancerOptionsModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.SetLoadBalancerOptionsModal,
        item,
        Visible: Visible,
      });
    },

  addHostAndPort:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddHostAndPort });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddHostAndPort",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddHostAndPortSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddHostAndPortFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddHostAndPortFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddHostAndPortModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddHostAndPortModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeHostAndPort:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.hostAndPortRemove.item;
      dispatch({ type: RouteActionTypes.RemoveHostAndPort });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveHostAndPort?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&fileHostAndPortId=" +
            data.fileHostAndPortId
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveHostAndPortSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveHostAndPortFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveHostAndPortFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveHostAndPortModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveHostAndPortModal,
        item,
        Visible: Visible,
      });
    },

  addRateLimitRule:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddRateLimitRule });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddRateLimitOptions",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddRateLimitRuleSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddRateLimitRuleFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddRateLimitRuleFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddRateLimitRuleModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddRateLimitRuleModal,
        item,
        Visible: Visible,
      });
    },

  updateRateLimitRule:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.UpdateRateLimitRule });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/UpdateRateLimitOptions",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.UpdateRateLimitRuleSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.UpdateRateLimitRuleFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.UpdateRateLimitRuleFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleUpdateRateLimitRuleModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.UpdateRateLimitRuleModal,
        item,
        Visible: Visible,
      });
    },

  removeRateLimitRule:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.rateLimitRuleRemove.item;
      dispatch({ type: RouteActionTypes.RemoveRateLimitRule });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveRateLimitOptions?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&fileRateLimitRuleId=" +
            data.fileRateLimitRuleId
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveRateLimitRuleSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveRateLimitRuleFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveRateLimitRuleFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveRateLimitRuleModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveRateLimitRuleModal,
        item,
        Visible: Visible,
      });
    },

  toggleClientWhiteListModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.ClientWhiteModal,
        item,
        Visible: Visible,
      });
    },

  addClientWhite:
    (data: any): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddClientWhite });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddClientWhite",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddClientWhiteSuccess });
          routeActions.getRouteList(data.fileConfigurationId , '')(
            dispatch,
            getState
          );
          var newItem = getState().route.clientWhiteModal.item;
          newItem.clientWhitelist.push({
            id: result.data,
            fileRateLimitRuleId: data.fileRateLimitRuleId,
            client: data.client,
          });
          dispatch({
            type: RouteActionTypes.ClientWhiteModal,
            item: newItem,
            Visible: true,
          });
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddClientWhiteFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddClientWhiteFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  removeClientWhite:
    (): AppAction<KnownAction> => async (dispatch, getState) => {
      let data = getState().route.clientWhiteRemove.item;
      dispatch({ type: RouteActionTypes.RemoveClientWhite });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveClientWhite?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&fileRateLimitRuleId=" +
            data.fileRateLimitRuleId +
            "&client=" +
            data.client
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveClientWhiteSuccess });
          routeActions.getRouteList(data.fileConfigurationId , '')(
            dispatch,
            getState
          );
          var newItem = getState().route.clientWhiteModal.item;
          var index = newItem.clientWhitelist.findIndex(
            (x: any) => x.id == result.data
          );
          if (index > -1) {
            newItem.clientWhitelist.splice(index, 1);
            dispatch({
              type: RouteActionTypes.ClientWhiteModal,
              item: newItem,
              Visible: true,
            });
          }
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveClientWhiteFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveClientWhiteFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveClientWhiteModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveClientWhiteModal,
        item,
        Visible: Visible,
      });
    },

  setAuthenticationOptions:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.SetAuthenticationOptions });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/SetAuthenticationOptions",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.SetAuthenticationOptionsSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.SetAuthenticationOptionsFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.SetAuthenticationOptionsFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleSetAuthenticationOptionsModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.SetAuthenticationOptionsModal,
        item,
        Visible: Visible,
      });
    },

  addAllowedScope:
    (data: any): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddAllowedScope });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddAllowedScope",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddAllowedScopeSuccess });
          routeActions.getRouteList(data.fileConfigurationId , '')(
            dispatch,
            getState
          );
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddAllowedScopeFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddAllowedScopeFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },

  addHelpHandle:
    (data: any,routeId:string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      console.log({data});
      
      dispatch({ type: RouteActionTypes.AddHelp });
      try {
        const formData = new FormData();
        formData.append("FormFile", data.fileSelected);
        formData.append("Content", data.content);
        formData.append("fileConfigurationId", data.fileConfigurationId);
        formData.append("fileRouteId", data.fileRouteId);

        const result = await API.post(
          "/NAPGateWay/FileConfigurationCommand/Addhelp",
          formData
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddHelpSuccess });
          routeActions.getRouteById(routeId)(
            dispatch,
            getState
          );
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddHelpFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddHelpFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },

  removeAllowedScope:
    (): AppAction<KnownAction> => async (dispatch, getState) => {
      let data = getState().route.allowedScopeRemove.item;
      dispatch({ type: RouteActionTypes.RemoveAllowedScope });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveAllowedScope?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&scope=" +
            data.scope
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveAllowedScopeSuccess });
          routeActions.getRouteList(data.fileConfigurationId , '')(
            dispatch,
            getState
          );
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveAllowedScopeFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveAllowedScopeFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveAllowedScopeModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveAllowedScopeModal,
        item,
        Visible: Visible,
      });
    },

  addDelegatingHandler:
    (data: any): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddDelegatingHandler });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddDelegatingHandler",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddDelegatingHandlerSuccess });
          routeActions.getRouteList(data.fileConfigurationId , '')(
            dispatch,
            getState
          );
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddDelegatingHandlerFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddDelegatingHandlerFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  removeDelegatingHandler:
    (): AppAction<KnownAction> => async (dispatch, getState) => {
      let data = getState().route.delegatingHandlerRemove.item;
      dispatch({ type: RouteActionTypes.RemoveDelegatingHandler });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveDelegatingHandler?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&handler=" +
            data.handler
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveDelegatingHandlerSuccess });
          routeActions.getRouteList(data.fileConfigurationId , '')(
            dispatch,
            getState
          );
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveDelegatingHandlerFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveDelegatingHandlerFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveDelegatingHandlerModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveDelegatingHandlerModal,
        item,
        Visible: Visible,
      });
    },

  setHttpHandlerOptions:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.SetHttpHandlerOptions });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/SetHttpHandlerOptions",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.SetHttpHandlerOptionsSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.SetHttpHandlerOptionsFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.SetHttpHandlerOptionsFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleSetHttpHandlerOptionsModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.SetHttpHandlerOptionsModal,
        item,
        Visible: Visible,
      });
    },

  setPreAuthenticationParty:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.SetPreAuthenticationParty });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/SetPreAuthenticationParty",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.SetPreAuthenticationPartySuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.SetPreAuthenticationPartyFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.SetPreAuthenticationPartyFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleSetPreAuthenticationPartyModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.SetPreAuthenticationPartyModal,
        item,
        Visible: Visible,
      });
    },

  addPreAuthenticationPartyBody:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddPreAuthenticationPartyBody });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddPreAuthenticationPartyBody",
          data
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.AddPreAuthenticationPartyBodySuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.AddPreAuthenticationPartyBodyFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.AddPreAuthenticationPartyBodyFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddPreAuthenticationPartyBodyModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddPreAuthenticationPartyBodyModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removePreAuthenticationPartyBody:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.preAuthenticationPartyBodyRemove.item;
      dispatch({ type: RouteActionTypes.RemovePreAuthenticationPartyBody });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemovePreAuthenticationPartyBody?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.RemovePreAuthenticationPartyBodySuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RemovePreAuthenticationPartyBodyFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.RemovePreAuthenticationPartyBodyFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemovePreAuthenticationPartyBodyModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemovePreAuthenticationPartyBodyModal,
        item,
        Visible: Visible,
      });
    },

  addPreAuthenticationPartyHeader:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddPreAuthenticationPartyHeader });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddPreAuthenticationPartyHeader",
          data
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.AddPreAuthenticationPartyHeaderSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.AddPreAuthenticationPartyHeaderFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.AddPreAuthenticationPartyHeaderFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddPreAuthenticationPartyHeaderModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddPreAuthenticationPartyHeaderModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removePreAuthenticationPartyHeader:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.preAuthenticationPartyHeaderRemove.item;
      dispatch({ type: RouteActionTypes.RemovePreAuthenticationPartyHeader });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemovePreAuthenticationPartyHeader?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.RemovePreAuthenticationPartyHeaderSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RemovePreAuthenticationPartyHeaderFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.RemovePreAuthenticationPartyHeaderFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemovePreAuthenticationPartyHeaderModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemovePreAuthenticationPartyHeaderModal,
        item,
        Visible: Visible,
      });
    },

  addIPAllowed:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddIPAllowed });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddIPAllowed",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddIPAllowedSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddIPAllowedFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddIPAllowedFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  removeIPAllowed:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.iPAllowedRemove.item;
      dispatch({ type: RouteActionTypes.RemoveIPAllowed });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveIPAllowed?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&ip=" +
            data.ip
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveIPAllowedSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveIPAllowedFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveIPAllowedFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveIPAllowedModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveIPAllowedModal,
        item,
        Visible: Visible,
      });
    },

  Helpdownloadfile:
    (
      fileRouteId: number
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddHelp});
      try {
        const result = await API.get(
          "/NAPGateWay/FileConfigurationQuery/DownloadFile?fileRouteId=" +
            fileRouteId
        );

        if (result.status == 200) {
          //  const linkSource = 'data:${image/png;};base64,${result.data.helpDocument}';
          const downloadLink = document.createElement("a");

          downloadLink.href =
            "data:application/pdf;base64," + result.data.helpDocument; //Image Base64 Goes here
          downloadLink.download = result.data.filename;
          downloadLink.click();

          dispatch({ type: RouteActionTypes.AddHelpSuccess });

          // routeActions.getRouteList(fileConfigurationId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddHelpFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddHelpFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },

  addIPBlocked:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddIPBlocked });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddIPBlocked",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddIPBlockedSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddIPBlockedFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddIPBlockedFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  removeIPBlocked:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.iPBlockedRemove.item;
      dispatch({ type: RouteActionTypes.RemoveIPBlocked });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveIPBlocked?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&ip=" +
            data.ip
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveIPBlockedSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveIPBlockedFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveIPBlockedFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveIPBlockedModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveIPBlockedModal,
        item,
        Visible: Visible,
      });
    },

  setRouteUserNameAndPassword:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.SetRouteUserNameAndPassword });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/SetRouteUserNameAndPassword",
          data
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.SetRouteUserNameAndPasswordSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.SetRouteUserNameAndPasswordFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.SetRouteUserNameAndPasswordFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleSetRouteUserNameAndPasswordModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.SetRouteUserNameAndPasswordModal,
        item,
        Visible: Visible,
      });
    },

  addUserPass:
    (data: any): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddUserPass });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddUserPass",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddUserPassSuccess });
          routeActions.getRouteList(data.fileConfigurationId , '')(
            dispatch,
            getState
          );
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddUserPassFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddUserPassFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddUserPassModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddUserPassModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeUserPass: (): AppAction<KnownAction> => async (dispatch, getState) => {
    let data = getState().route.userPassRemove.item;
    dispatch({ type: RouteActionTypes.RemoveUserPass });
    try {
      const result = await API.delete(
        "/NAPGateWay/FileConfigurationCommand/RemoveUserPass?fileConfigurationId=" +
          data.fileConfigurationId +
          "&fileRouteId=" +
          data.fileRouteId +
          "&userPassId=" +
          data.userPassId
      );
      if (result.status == 201) {
        dispatch({ type: RouteActionTypes.RemoveUserPassSuccess });
        routeActions.getRouteList(data.fileConfigurationId , '')(dispatch, getState);
        routeActions.pushCommonAlert("200")(dispatch, getState);
      } else if (result.status == 401) {
        dispatch({ type: RouteActionTypes.RemoveUserPassFailed });
        routeActions.pushCommonAlert("401")(dispatch, getState);
      }
    } catch (error) {
      dispatch({ type: RouteActionTypes.RemoveUserPassFailed });
      routeActions.showRequestErrors(error)(dispatch, getState);
    }
  },
  toggleRemoveUserPassModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveUserPassModal,
        item,
        Visible: Visible,
      });
    },

  addAddHeadersToRequest:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddAddHeadersToRequest });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddAddHeadersToRequest",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddAddHeadersToRequestSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddAddHeadersToRequestFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddAddHeadersToRequestFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddAddHeadersToRequestModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddAddHeadersToRequestModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeAddHeadersToRequest:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.addHeadersToRequestRemove.item;
      dispatch({ type: RouteActionTypes.RemoveAddHeadersToRequest });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveAddHeadersToRequest?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveAddHeadersToRequestSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveAddHeadersToRequestFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveAddHeadersToRequestFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveAddHeadersToRequestModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveAddHeadersToRequestModal,
        item,
        Visible: Visible,
      });
    },

  addUpstreamHeaderTransform:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddUpstreamHeaderTransform });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddUpstreamHeaderTransform",
          data
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.AddUpstreamHeaderTransformSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddUpstreamHeaderTransformFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddUpstreamHeaderTransformFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddUpstreamHeaderTransformModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddUpstreamHeaderTransformModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeUpstreamHeaderTransform:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.upstreamHeaderTransformRemove.item;
      dispatch({ type: RouteActionTypes.RemoveUpstreamHeaderTransform });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveUpstreamHeaderTransform?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.RemoveUpstreamHeaderTransformSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RemoveUpstreamHeaderTransformFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.RemoveUpstreamHeaderTransformFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveUpstreamHeaderTransformModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveUpstreamHeaderTransformModal,
        item,
        Visible: Visible,
      });
    },

  addDownstreamHeaderTransform:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddDownstreamHeaderTransform });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddDownstreamHeaderTransform",
          data
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.AddDownstreamHeaderTransformSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.AddDownstreamHeaderTransformFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddDownstreamHeaderTransformFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddDownstreamHeaderTransformModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddDownstreamHeaderTransformModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeDownstreamHeaderTransform:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.downstreamHeaderTransformRemove.item;
      dispatch({ type: RouteActionTypes.RemoveDownstreamHeaderTransform });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveDownstreamHeaderTransform?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.RemoveDownstreamHeaderTransformSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RemoveDownstreamHeaderTransformFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.RemoveDownstreamHeaderTransformFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveDownstreamHeaderTransformModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveDownstreamHeaderTransformModal,
        item,
        Visible: Visible,
      });
    },

  addAddClaimsToRequest:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddAddClaimsToRequest });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddAddClaimsToRequest",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddAddClaimsToRequestSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddAddClaimsToRequestFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddAddClaimsToRequestFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddAddClaimsToRequestModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddAddClaimsToRequestModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeAddClaimsToRequest:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.addClaimsToRequestRemove.item;
      dispatch({ type: RouteActionTypes.RemoveAddClaimsToRequest });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveAddClaimsToRequest?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveAddClaimsToRequestSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveAddClaimsToRequestFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveAddClaimsToRequestFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveAddClaimsToRequestModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveAddClaimsToRequestModal,
        item,
        Visible: Visible,
      });
    },

  addRouteClaimsRequirement:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddRouteClaimsRequirement });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddRouteClaimsRequirement",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddRouteClaimsRequirementSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddRouteClaimsRequirementFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddRouteClaimsRequirementFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddRouteClaimsRequirementModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddRouteClaimsRequirementModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeRouteClaimsRequirement:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.routeClaimsRequirementRemove.item;
      dispatch({ type: RouteActionTypes.RemoveRouteClaimsRequirement });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveRouteClaimsRequirement?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.RemoveRouteClaimsRequirementSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RemoveRouteClaimsRequirementFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveRouteClaimsRequirementFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveRouteClaimsRequirementModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveRouteClaimsRequirementModal,
        item,
        Visible: Visible,
      });
    },

  addAddQueriesToRequest:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddAddQueriesToRequest });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddAddQueriesToRequest",
          data
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.AddAddQueriesToRequestSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.AddAddQueriesToRequestFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.AddAddQueriesToRequestFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddAddQueriesToRequestModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddAddQueriesToRequestModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeAddQueriesToRequest:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.addQueriesToRequestRemove.item;
      dispatch({ type: RouteActionTypes.RemoveAddQueriesToRequest });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveAddQueriesToRequest?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({ type: RouteActionTypes.RemoveAddQueriesToRequestSuccess });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({ type: RouteActionTypes.RemoveAddQueriesToRequestFailed });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({ type: RouteActionTypes.RemoveAddQueriesToRequestFailed });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveAddQueriesToRequestModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveAddQueriesToRequestModal,
        item,
        Visible: Visible,
      });
    },

  addChangeDownstreamPathTemplate:
    (data: any, routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.AddChangeDownstreamPathTemplate });
      try {
        const result = await API.put(
          "/NAPGateWay/FileConfigurationCommand/AddChangeDownstreamPathTemplate",
          data
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.AddChangeDownstreamPathTemplateSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.AddChangeDownstreamPathTemplateFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.AddChangeDownstreamPathTemplateFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleAddChangeDownstreamPathTemplateModal:
    (
      fileConfigurationId: number,
      fileRouteId: number,
      Visible: boolean
    ): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.AddChangeDownstreamPathTemplateModal,
        fileConfigurationId,
        fileRouteId,
        Visible: Visible,
      });
    },

  removeChangeDownstreamPathTemplate:
    (routeId: string): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      let data = getState().route.changeDownstreamPathTemplateRemove.item;
      dispatch({ type: RouteActionTypes.RemoveChangeDownstreamPathTemplate });
      try {
        const result = await API.delete(
          "/NAPGateWay/FileConfigurationCommand/RemoveChangeDownstreamPathTemplate?fileConfigurationId=" +
            data.fileConfigurationId +
            "&fileRouteId=" +
            data.fileRouteId +
            "&id=" +
            data.id
        );
        if (result.status == 201) {
          dispatch({
            type: RouteActionTypes.RemoveChangeDownstreamPathTemplateSuccess,
          });
          routeActions.getRouteById(routeId)(dispatch, getState);
          routeActions.pushCommonAlert("200")(dispatch, getState);
        } else if (result.status == 401) {
          dispatch({
            type: RouteActionTypes.RemoveChangeDownstreamPathTemplateFailed,
          });
          routeActions.pushCommonAlert("401")(dispatch, getState);
        }
      } catch (error) {
        dispatch({
          type: RouteActionTypes.RemoveChangeDownstreamPathTemplateFailed,
        });
        routeActions.showRequestErrors(error)(dispatch, getState);
      }
    },
  toggleRemoveChangeDownstreamPathTemplateModal:
    (item: any, Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.RemoveChangeDownstreamPathTemplateModal,
        item,
        Visible: Visible,
      });
    },

  toggleBase64Modal:
    (Visible: boolean): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({ type: RouteActionTypes.Base64Modal, Visible });
    },

  pushAlert:
    (alert: {
      title: string;
      description: string;
      variant:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark";
      dismissTime?: number;
    }): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: RouteActionTypes.PushAlert,
        alert,
      });
    },
  clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
    dispatch({ type: RouteActionTypes.ClearAlerts });
  },
  showRequestErrors:
    (error: any): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      if (error.response.data && error.response.data.length > 0) {
        let errors = "";
        for (var i = 0; i < error.response.data.length; i++)
          errors += (errors == "" ? "" : "\n") + error.response.data[i];
        routeActions.pushAlert({
          title: "information",
          description: errors,
          variant: "danger",
        })(dispatch, getState);
      } else {
        routeActions.pushAlert({
          title: "error",
          description: "UnSuccessfulOperation",
          variant: "danger",
        })(dispatch, getState);
      }
    },
  pushCommonAlert:
    (type: "200" | "204" | "401" | "errorFetch"): AppAction<KnownAction> =>
    async (dispatch, getState) => {
      switch (type) {
        case "200":
          routeActions.pushAlert({
            title: "information",
            description: "SuccessfulOperation",
            variant: "success",
          })(dispatch, getState);
          break;
        case "204":
          routeActions.pushAlert({
            title: "error",
            description: "DataInNotFound",
            variant: "warning",
          })(dispatch, getState);
          break;
        case "401":
          routeActions.pushAlert({
            title: "error",
            description: "UnauthorizedError",
            variant: "warning",
          })(dispatch, getState);
          break;
        case "errorFetch":
          routeActions.pushAlert({
            title: "error",
            description: "UnSuccessfetchData",
            variant: "warning",
          })(dispatch, getState);
          break;
      }
    },
};
