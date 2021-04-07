import { gqlService } from "../../services";
import { queries, mutations } from "./gql";
import { handlerError } from "../common/handlerError";
import { IApiInstance } from "../../domain/api";
import { apisBuilder } from "../common/builder";
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

export const createApi = async (newApi: IApiInstance) => {
  try {
    const mutationOptions = {
      mutation: mutations.createAPI,
      variables: {
        name: newApi.name,
        port: newApi.port
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

export const updateApi = async (api: IApiInstance) => {
  try {
    const mutationOptions = {
      mutation: mutations.updateAPI,
      variables: {
        apiId: api._id,
        name: api.name,
        port: api.port
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

export const removeApi = async (apiId: string) => {
  try {
    const mutationOptions = {
      mutation: mutations.removeAPI,
      variables: {
        apiId: apiId
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

export const startApi = async (apiId: string) => {
  try {
    const mutationOptions = {
      mutation: mutations.startAPI,
      variables: {
        apiId: apiId
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

export const stopApi = async (apiId: string) => {
  try {
    const mutationOptions = {
      mutation: mutations.stopAPI,
      variables: {
        apiId: apiId
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

