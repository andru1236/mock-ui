import { IApiInstance, IParam, IPath, IResource, ISettings } from "../../domain/api";
import { IResponse, TrackingAssignation, TrackingRoute } from "../../domain/response";

export const apisBuilder = (apis: any) => {
  const res: IApiInstance[] = apis.map((api: any) => {
    const routes = api.routes ? pathBuilder(api.routes) : [];
    const settings = api.settings ? settingsBuilder(api.settings) : null;

    const apiObj: IApiInstance = {
      _id: api.id,
      name: api.name,
      port: api.port,
      routes: routes,
      settings: settings
    };

    return apiObj;
  });

  return res;
};

const pathBuilder = (paths: any) => {
  const res: IPath[] = paths.map((path: any) => {
    const resources: IResource[] = path.resources ? resourceBuilder(path.resources) : [];

    const pathObj: IPath = {
      _id: path.id,
      path: path.path,
      resources: resources
    };

    return pathObj;
  });

  return res;
};

const resourceBuilder = (resources: any) => {
  const res: IResource[] = resources.map((resource: any) => {
    const parameters: IParam[] = resource.params ? paramsBuilder(resource.params) : [];

    const resourceObj: IResource = {
      method: resource.method,
      response: resource.response,
      params: parameters
    };

    return resourceObj;
  });

  return res;
};

const paramsBuilder = (params: any) => {
  const res: IParam[] = params.map((param: any) => {
    const paramObj: IParam = {
      param: param.param,
      response: param.response
    };

    return paramObj;
  });

  return res;
};

const settingsBuilder = (settings: any) => {
  const setting: ISettings = {
    enabled: settings.enabled,
    createdOn: settings.createdOn
  };

  return setting;
}

export const responsesBuilder = (responses : any) => {
  const res: IResponse[] = responses.map((response: any) => {
    const tracking: TrackingAssignation[] = response.trackingAssignation ? trackingAssignationBuilder(response.trackingAssignation) : [];

    const responseObj: IResponse = {
      _id: response.id,
      name: response.name,
      response: response.response,
      tracking_assignation: tracking,
      created_on: response.createdOn
    };

    return responseObj;
  });

  return res;
};

const trackingAssignationBuilder = (assignations: any) => {
  const res: TrackingAssignation[] = assignations.map((track: any) => {
    const trackingRoute: TrackingRoute[] = track.routes ? trackingRouteBuilder(track.routes) : [];

    const trackingObj: TrackingAssignation = {
      api_id: track.api ? track.api.id : null,
      routes: trackingRoute
    };

    return trackingObj;
  });

  return res;
};

const trackingRouteBuilder = (trackRoutes: any) => {
  const res: TrackingRoute[] = trackRoutes.map((trackRoute: any) => {
    const trackRouteObj: TrackingRoute = {
      path: trackRoute.path,
      method: trackRoute.method,
      date: trackRoute.date
    };

    return trackRouteObj;
  });

  return res;
}
