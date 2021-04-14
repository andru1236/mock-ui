import { gqlService } from "../../services";
import { queries, mutations } from "./gql";
import { handlerError } from "../common/handlerError";
import { IResponse } from "../../domain/response";
import { apisBuilder, responsesBuilder } from "../common/builder";
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
    const callback = (res: any) => {
      const data = (res?.data?.apis) ? apisBuilder(res.data.apis) : [];
      return { apis: data };
    };

    return await gqlService.executeQuery(queryOptions, callback);
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
    const callback = (res: any) => {
      const data = (res?.data?.responses) ? responsesBuilder(res.data.responses) : [];
      return { responses: data };
    };

    return await gqlService.executeQuery(queryOptions, callback);
  } catch (error) {
    handlerError(error);
  }
}

export const getApisLength = async () => {
  try {
    const queryOptions = {
      query: queries.listApis
    };
    const callback = (res: any) => {
      const data = (res?.data?.apis) ? res.data.apis : [];
      return { length: data.length, apis:data };
    };

    return await gqlService.executeQuery(queryOptions, callback);
  } catch (error) {
    handlerError(error);
  }
};

export const getResponsesLength = async () => {
  try {
    const queryOptions = {
      query: queries.listResponses
    };
    const callback = (res: any) => {
      const data = (res?.data?.responses) ? res.data.responses : [];
      return { length: data.length, responses: data };
    };

    return await gqlService.executeQuery(queryOptions, callback);
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

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
    handlerError(error);
  }
}