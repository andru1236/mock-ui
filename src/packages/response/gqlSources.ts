import { gqlService } from "../../services";
import { queries, mutations } from "./gql";
import { handlerError } from "../common/handlerError";
import { IResponse } from "../../domain/response";
import { apisBuilder, responsesBuilder } from "../common/builder";

export const getApis = async () => {
  try {
    const queryOptions = {
      query: queries.getApis
    };
    const callback = (res: any) => {
      const data = (res?.data?.apis) ? apisBuilder(res.data.apis) : [];
      console.log(data);
      return { apis: data };
    };

    return await gqlService.executeQuery(queryOptions, callback);
  } catch (error) {
    handlerError(error);
  }
};

export const getResponses = async () => {
  try {
    const queryOptions = {
      query: queries.getResponses
    };
    const callback = (res: any) => {
      const data = (res?.data?.responses) ? responsesBuilder(res.data.responses) : [];
      console.log(data);
      return { responses: data };
    };

    return await gqlService.executeQuery(queryOptions, callback);
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
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
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
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
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
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
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
    const callback = (res: any) => {
      const data = res.data ? res.data : null;
      return data;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
    handlerError(error);
  }
}
