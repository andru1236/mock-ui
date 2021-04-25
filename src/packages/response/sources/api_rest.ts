import { apiServiceRest } from "../../../services";
import emmitToastMessage from "../../common/emmitToastMessage";
import { handlerError } from "../../common/handlerError";

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

export const assignResponseToApi = async (responseId, apiId, path, method, success_message = false) => {
    try {
        const result = cleanerResponse(await apiServiceRest.assignResponseToApi(responseId, apiId, path, method));
        if(success_message !== false){
            emmitToastMessage.success('Succesful', 'Response was assigned properly');
        }
        
    } catch (error) {
        handlerError(error);
    }
}

