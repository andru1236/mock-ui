import { apiServiceRest } from "../../../services";
import { handlerError } from "../../common/handlerError";
import { IParam, IRoute } from "../../../domain/api";

const cleanerResponse = (response) => response.data.data;

export const getOneApi = async (apiId: string) => {
    try {
        return cleanerResponse(await apiServiceRest.getApi(apiId));
    } catch (error) {
        handlerError(error);
    }
};

export const addNewRoute = async (apiId: string, route: IRoute) => {
    try {
        return cleanerResponse(await apiServiceRest.postRoute(apiId, route));
    } catch (error) {
        handlerError(error);
    }
};

export const updateRoute = async (apiId: string, route: IRoute) => {
    try {
        return cleanerResponse(await apiServiceRest.putRoute(apiId, route));
    } catch (error) {
        handlerError(error);
    }
}

export const removeRoute = async (apiId: string, route: IRoute) => {
    try {
        //TODO: Error with return -> res.data.data, research why
        return apiServiceRest.deleteRoute(apiId, route);
    } catch (error) {
        handlerError(error);
    }
};

export const addParamToRoute = async (apiId: string, routeId: string, param: IParam) => {
    try {
        return cleanerResponse(await apiServiceRest.postParams(apiId, routeId, 'GET', param));
    } catch (error) {
        handlerError(error);
    }
};

export const updateParamFromRoute = async (apiId: string, routeId: string, param: IParam) => {
    try {
        return cleanerResponse(await apiServiceRest.putParams(apiId, routeId, 'GET', param))
    } catch (error) {
        handlerError(error);
    }
};

export const removeParamFromRoute = async (apiId: string, routeId: string, param: string) => {
    try {
        return cleanerResponse(await apiServiceRest.deleteParams(apiId, routeId, 'GET', param));
    } catch (error) {
        handlerError(error);
    }
};