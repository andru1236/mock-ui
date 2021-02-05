import { apiServiceRest } from "../../services";
import { handlerError } from "../common/handlerError";

const cleanerResponse = (response) => response.data.data;

export const getApis = async () => {
    try {
        return cleanerResponse(await apiServiceRest.getApis());
    } catch (error) {
        handlerError(error);
    }
};

export const getResponses = async () => {
    try {
        return cleanerResponse(await apiServiceRest.getResponses());
    } catch (error) {
        handlerError(error);
    }
}

export const createAResponse = async (response) => {
    try {
        return cleanerResponse(await apiServiceRest.postResponse(response));
    } catch (error) {
        handlerError(error);
    }
}

export const updateResponse = async (response) => {
    try {
        return cleanerResponse(await apiServiceRest.putResponse(response));
    } catch (error) {
        handlerError(error);
    }
}

export const removeAResponse = async (responseId) => {
    try {
        return cleanerResponse(await apiServiceRest.deleteResponse(responseId));
    } catch (error) {
        handlerError(error);
    }
}

export const aasignResponseToApi = async (responseId, apiId, path, method) => {
    try {
        return cleanerResponse(await apiServiceRest.assignResponseToApi(responseId, apiId, path, method));
    } catch (error) {
        handlerError(error);
    }
}

