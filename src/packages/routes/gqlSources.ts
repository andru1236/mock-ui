import { gqlService } from "../../services";
import { queries, mutations } from "./gql";
import { handlerError } from "../common/handlerError";
import { apisBuilder } from "../common/builder";
import { IParam, IRoute } from "../../domain/api";

export const getOneApi = async (apiId: string) => {
  try {
    const queryOptions = {
      query: queries.getApiById,
      variables: {
        apiId: apiId
      }
    };
    const callback = (res: any) => {
      const data = (res?.data?.api) ? apisBuilder([res.data.api]) : [];
      return data[0];
    };

    return await gqlService.executeQuery(queryOptions, callback);
  } catch (error) {
    handlerError(error);
  }
};

export const addNewRoute = async (apiId: string, route: IRoute) => {
  try {
    const mutationOptions = {
      mutation: mutations.createRoute,
      variables: {
        apiId: apiId,
        path: route.path,
        method: route.method,
        response: route.response
      }
    };
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
    handlerError(error);
  }
};

export const updateRoute = async (apiId: string, route: IRoute) => {
  try {
    const mutationOptions = {
      mutation: mutations.updateRoute,
      variables: {
        apiId: apiId,
        path: route.path,
        method: route.method,
        response: route.response
      }
    };
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
    handlerError(error);
  }
}

export const removeRoute = async (apiId: string, route: IRoute) => {
  try {
    const mutationOptions = {
      mutation: mutations.removeRoute,
      variables: {
        apiId: apiId,
        path: route.path,
        method: route.method
      }
    };
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
    handlerError(error);
  }
};

export const addParamToRoute = async (apiId: string, routeId: string, param: IParam) => {
  try {
    const mutationOptions = {
      mutation: mutations.createParams,
      variables: {
        apiId: apiId,
        routeId: routeId,
        method: 'GET',
        param: param.param,
        response: param.response
      }
    };
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
    handlerError(error);
  }
};

export const updateParamFromRoute = async (apiId: string, routeId: string, param: IParam) => {
  try {
    const mutationOptions = {
      mutation: mutations.updateParams,
      variables: {
        apiId: apiId,
        routeId: routeId,
        method: 'GET',
        param: param.param,
        response: param.response
      }
    };
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
    handlerError(error);
  }
};

export const removeParamFromRoute = async (apiId: string, routeId: string, param: string) => {
  try {
    const mutationOptions = {
      mutation: mutations.removeParams,
      variables: {
        apiId: apiId,
        routeId: routeId,
        method: 'GET',
        param: param
      }
    };
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
    handlerError(error);
  }
};