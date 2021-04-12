import { gqlService } from "../../services";
import { queries, mutations } from "./gql";
import { handlerError } from "../common/handlerError";
import { IApiInstance, IParam, IPath } from "../../domain/api";
import { apisBuilder } from "../common/builder";
import { addNewRoute, addParamToRoute } from "../routes/gqlSources";

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

export const cloneApi = async (api: IApiInstance) => {
  try {
    const apiName = `Cloned_${api.name}`;
    const mutationOptions = {
      mutation: mutations.createAPI,
      variables: {
        name: apiName,
        port: api.port
      }
    };
    const callback = async (res: any) => {
      let result = res.data ? res.data : null;
      if (api.routes.length > 0) {
        const data = await getApisLength();
        const dataApi = data.apis.filter((o) => { 
          if (o.name.toString() === apiName && o.port === api.port) return o;
        });
        //clone routes
        if (dataApi.length === 1) {
          const clonApi = dataApi[0];

          api.routes.map(async (route:IPath) => {
            const resource = route.resources[0];
            const clonRoute = { path: route.path, method: resource.method, response: resource.response };

            return await addNewRoute(clonApi.id, clonRoute)
              .then(res => {
                // clone route params
                if (resource.params.length > 0) {
                  getApisLength()
                    .then(res => {
                      const oneApi = res.apis.filter((x) => {return x.id == clonApi.id;})[0];
                      if (oneApi.routes) {
                        const dataRoute = oneApi.routes.filter((ro) => {
                          const roResource = ro.resources[0];
                          return JSON.stringify(resource.response) === JSON.stringify(roResource.response)
                        })[0];
                        if (dataRoute) {
                          resource.params.map(async (param) => {
                            const cloneParam: IParam = {
                              param: param.param,
                              response: param.response
                            };

                            await addParamToRoute(clonApi.id, dataRoute.id, cloneParam);
                          });
                        }
                      }
                      result = "Cloned Api, routes and params success.";
                    })
                    .catch(error => handlerError(error));
                }
                result = "Cloned Api and routes success.";
              })
              .catch(error => handlerError(error));
          });
        }
      }

      return result;
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

