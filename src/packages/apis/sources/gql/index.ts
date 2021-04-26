import { queries } from "./queries";
import { mutations } from "./mutations";
import { gql_client } from "../../../../services";
import { handlerError } from "../../../common/handlerError";
import { apisBuilder } from "../../../common/builder";
import { IApiInstance } from "../../../../domain/api";
import { addNewRoute, addParamToRoute } from "../../../routes/sources/gql";
import emmitToastMessage from "../../../common/emmitToastMessage";

const cleanerResponse = (response) => response.data;

export const getApis = async (limit = null, next = null) => {
  try {
    const queryOptions = {
      query: queries.getApis,
      variables: {
        limit: limit,
        next: next,
      },
    };

    const response = await gql_client.executeQuery(queryOptions);
    const listOfApis = response?.data?.apis
      ? apisBuilder(response.data.apis)
      : [];
    return { apis: listOfApis };
  } catch (error) {
    handlerError(error);
  }
};

export const getApisLength = async () => {
  try {
    const queryOptions = {
      query: queries.listApis,
    };

    const response = await gql_client.executeQuery(queryOptions);
    const data = response?.data?.apis ? response.data.apis : [];
    return { length: data.length, apis: data };
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
        port: newApi.port,
      },
    };
    const response = await gql_client.executeMutation(
      mutationOptions,
      cleanerResponse
    );
    emmitToastMessage.success("Create new api sucessfull", "");
    return response;
  } catch (error) {
    handlerError(error);
  }
};

export const cloneApiV2 = async (apiId: String) => {
  try {
    const apiToClone: IApiInstance = (
      await gql_client.executeQuery(
        {
          query: queries.searchOneApi,
          variables: { apiId },
        },
        cleanerResponse
      )
    ).api; // TODO: I dont like this way to handle, refactor this

    const nameOfnewApi = await generateUniqueCloneName(apiToClone.name);
    await createApi({ name: nameOfnewApi, port: apiToClone.port });

    const allApisWithIdAndName = await gql_client.executeQuery(
      {
        query: queries.getAllApisByName,
        variables: {},
      },
      cleanerResponse
    );

    const idOfNewApi = allApisWithIdAndName.apis.find(
      (api) => api.name === nameOfnewApi
    ).id; // TODO: Refactor this

    apiToClone.routes.map(async (route) => {
      route.resources.map(async (resource) => {
        await addNewRoute(idOfNewApi, {
          path: route.path,
          method: resource.method,
          response: resource.response,
        });
        // Problems with the backend repository
        await new Promise((resolve) => setTimeout(resolve, 250));

        if (resource.method === "GET" && resource.params.length) {
          resource.params.map(async (param) => {
            await addParamToRoute(idOfNewApi, route._id, param);
            // Problems with the backend repository
            await new Promise((resolve) => setTimeout(resolve, 250));
          });
        }
      });
    });
  } catch (error) {
    handlerError(error);
    throw error;
  }
};

const generateUniqueCloneName = async (name: string) => {
  let cloneName = `Cloned_${name}_${new Date().toUTCString()}`;
  return cloneName;
};

export const updateApi = async (api: IApiInstance) => {
  try {
    const mutationOptions = {
      mutation: mutations.updateAPI,
      variables: {
        apiId: api._id,
        name: api.name,
        port: api.port,
      },
    };
    const response = await gql_client.executeMutation(mutationOptions);
    return response.data ? response.data : null;
  } catch (error) {
    handlerError(error);
  }
};

export const removeApi = async (apiId: string) => {
  try {
    const mutationOptions = {
      mutation: mutations.removeAPI,
      variables: {
        apiId: apiId,
      },
    };
    const response = await gql_client.executeMutation(mutationOptions);
    return response.data ? response.data : null;
  } catch (error) {
    handlerError(error);
  }
};

export const startApi = async (apiId: string) => {
  try {
    const mutationOptions = {
      mutation: mutations.startAPI,
      variables: {
        apiId: apiId,
      },
    };

    const response = await gql_client.executeMutation(mutationOptions);
    return response.data ? response.data : null;
  } catch (error) {
    handlerError(error);
  }
};

export const stopApi = async (apiId: string) => {
  try {
    const mutationOptions = {
      mutation: mutations.stopAPI,
      variables: {
        apiId: apiId,
      },
    };

    const response = await gql_client.executeMutation(mutationOptions);
    return response.data ? response.data : null;
  } catch (error) {
    handlerError(error);
  }
};

export const countApis = async () => {
  try {
    const opts = {
      query: queries.countAllApis,
    };
    const response = await gql_client.executeQuery(opts);
    return response.data.countApis;
  } catch (error) {
    handlerError(error);
  }
};
