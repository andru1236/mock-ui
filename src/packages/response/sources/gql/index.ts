import { gql_client } from "../../../../services";
import { mutations } from "./mutations";
import { queries } from "./queries";

import { IResponse } from "../../../../domain/response";

import { handlerError } from "../../../common/handlerError";
import { apisBuilder, responsesBuilder } from "../../../common/builder";


const { REACT_APP_PAGE_LIMIT } = process.env;


export const getApis = async (next:any) => {
    try {
        const queryOptions = {
            query: queries.getApis,
            variables: {
                limit: parseInt(REACT_APP_PAGE_LIMIT),
                next: next
            }
        };
        const response = await gql_client.executeQuery(queryOptions);
        const data = response?.data?.apis ? apisBuilder(response.data.apis) : [];
        return { apis: data };

    } catch (error) {
        handlerError(error);
    }
};


export const getResponses = async (next:any) => {
    try {
        const queryOptions = {
            query: queries.getResponses,
            variables: {
                limit: parseInt(REACT_APP_PAGE_LIMIT),
                next: next
            }
        };

        const response = await gql_client.executeQuery(queryOptions);
        const data = (response?.data?.responses) ? responsesBuilder(response.data.responses) : [];
        return { responses: data };

    } catch (error) {
        handlerError(error);
    }
}

export const getApisLength = async () => {
    try {
        const queryOptions = {
            query: queries.listApis
        };

        const response = await gql_client.executeQuery(queryOptions);
        const data = (response?.data?.apis) ? response.data.apis : [];
        return { length: data.length, apis:data };

    } catch (error) {
        handlerError(error);
    }
};


export const getResponsesLength = async () => {
    try {
        const queryOptions = {
            query: queries.listResponses
        };
        const response = await gql_client.executeQuery(queryOptions);
        const data = (response?.data?.responses) ? response.data.responses : [];
        return { length: data.length, responses: data };
    } catch (error) {
        handlerError(error);
    }
};


export const createAResponse = async (response: IResponse) => {
    try {
        const mutationOptions = {
            mutation: mutations.createResponse,
            variables: {
                name: response.name,
                response: response.response
            }
        };
        const gqlResponse = await gql_client.executeMutation(mutationOptions);
        return gqlResponse.data ? gqlResponse.data : null;

    } catch (error) {
        handlerError(error);
    }
}


export const updateResponse = async (response: IResponse) => {
    try {
        const mutationOptions = {
            mutation: mutations.updateResponse,
            variables: {
                responseId: response._id,
                name: response.name,
                response: response.response
            }
        };
        const gqlResponse = await gql_client.executeMutation(mutationOptions);
        return gqlResponse.data ? gqlResponse.data : null;
    } catch (error) {
        handlerError(error);
    }
}


export const removeAResponse = async (responseId: any) => {
    try {
        const mutationOptions = {
            mutation: mutations.removeResponse,
            variables: {
                responseId: responseId
            }
        };
        const response = await gql_client.executeMutation(mutationOptions);
        return response.data ? response.data : null;
    } catch (error) {
        handlerError(error);
    }
}


export const assignResponseToApi = async (responseId: any, apiId: any, path: any, method: any, success_message = false) => {
    try {
        const mutationOptions = {
            mutation: mutations.assignResponseToApi,
            variables: {
                responseId: responseId,
                apiId: apiId,
                path: path,
                method: method
            }
        };
        const response = await gql_client.executeMutation(mutationOptions);
        return response.data ? response.data : null;
    } catch (error) {
        handlerError(error);
    }
}

export const exportResponseAsJson = async (fileName:any, response:any) => {
    try {
        const mutationOptions = {
            mutation: mutations.exportResponseAsJson,
            variables: {
                fileName: fileName,
                response: response
            }
        };
        const callback = (res: any) => {
            const data = res.data ? res.data : null;
            return data;
        };

        return await gql_client.executeMutation(mutationOptions, callback);
    } catch (error) {
        handlerError(error);
    }
}
