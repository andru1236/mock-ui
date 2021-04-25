// DEPRECATED

import { apiServiceRest } from "../../../services";
import { IApiInstance } from "../../../domain/api";
import { handlerError } from "../../common/handlerError";


const cleanerResponse = (response) => response.data.data;

export const getApis = async () => {
    try {
        return cleanerResponse(await apiServiceRest.getApis());
    } catch (error) {
        handlerError(error);
    }
};


export const createApi = async (newApi: IApiInstance) => {
    try {
        return cleanerResponse(await apiServiceRest.postApis(newApi));
    } catch (error) {
        handlerError(error);
    }
}

export const updateApi = async (api: IApiInstance) => {
    try {
        return cleanerResponse(await apiServiceRest.putApi(api));
    } catch (error) {
        handlerError(error);
    }
}

export const removeApi = async (apiId: string) => {
    try {
        return cleanerResponse(await apiServiceRest.deleteApi(apiId));
    } catch (error) {
        handlerError(error);
    }
}

export const startApi = async (apiId: string) => {
    try {
        return cleanerResponse(await apiServiceRest.startApi(apiId));
    } catch (error) {
        handlerError(error);
    }
}

export const stopApi = async (apiId: string) => {
    try {
        return cleanerResponse(await apiServiceRest.stopApi(apiId));
    } catch (error) {
        handlerError(error);
    }
}

