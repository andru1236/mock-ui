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
    const apiName = await generateUniqueCloneName(api.name);
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
          if (clonApi) {
            api.routes.map(async (route:IPath) => {
              return await cloneApiRoute(clonApi.id, route);
            });
          }
        }
      }

      return result;
    };

    return await gqlService.executeMutation(mutationOptions, callback);
  } catch (error) {
      handlerError(error);
  }
}

const cloneApiRoute = async (clonApiId:string, route:IPath) => {
  const resource = route.resources[0];
  const clonRoute = { path: route.path, method: resource.method, response: resource.response };

  return await addNewRoute(clonApiId, clonRoute).then(async (o) => {
      if (resource.params.length > 0) {
        return await getApisLength()
          .then(res => {
            const oneApi = res.apis.filter((x) => {return x.id == clonApiId;})[0];
            if (oneApi.routes) {
              const dataRoute = oneApi.routes.filter((ro) => {
                const roResource = ro.resources[0];
                return JSON.stringify(resource.response) === JSON.stringify(roResource.response)
              })[0];

              // clone route params
              if (dataRoute) {
                resource.params.map(async (param) => {
                  const cloneParam: IParam = {
                    param: param.param,
                    response: param.response
                  };

                  return await addParamToRoute(clonApiId, dataRoute.id, cloneParam);
                });
              }
            }
          })
          .catch(error => {
            handlerError(error);
            throw error;
          });
      }
    })
    .catch(error => {
      handlerError(error);
      throw error;
    });
}

const generateUniqueCloneName = async (name: string) => {
  let cloneName = `Cloned_${name}`;
  const data = await getApisLength();
  const existsApi = data.apis.filter((o) => { return o.name.toString() === cloneName; })[0];

  if (existsApi) {
    cloneName = await generateUniqueCloneName(cloneName);
  }

  return cloneName;
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

