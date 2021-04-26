import { gql_client } from "../../../../services";
import { mutations } from "./mutations";
import { queries } from "./queries";

import { IResponse } from "../../../../domain/response";
import { handlerError } from "../../../common/handlerError";
import emmitToastMessage from "../../../common/emmitToastMessage";
import { apisBuilder, responsesBuilder } from "../../../common/builder";


export const getApis = async (limit= null ,next:any = null) => {
    try {
        const queryOptions = {
            query: queries.getApis,
            variables: {
                limit: limit,
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


export const getResponses = async (limit=null, next:any= null) => {
    try {
        const queryOptions = {
            query: queries.getResponses,
            variables: {
                limit: limit,
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
        emmitToastMessage.success("Create Response", JSON.stringify(gqlResponse));
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
        emmitToastMessage.success("Update Response", JSON.stringify(gqlResponse.data));
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
        emmitToastMessage.success("Update Response", JSON.stringify(response.data));
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
        emmitToastMessage.success("Assignation success!", JSON.stringify(response.data));
        return response.data ? response.data : null;
    } catch (error) {
        handlerError(error);
    }
};
