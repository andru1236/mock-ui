import { IApiInstance, IRoute, IParam } from "./api";
import { IResponse } from './response'

export interface RestAPI {
    postApis(api: IApiInstance): any;
    getApis(): any;
    putApi(api: IApiInstance): any;
    getApi(apiId: string): any;
    deleteApi(apiId: string): any;
    postRoute(apiId: string, route: IRoute): any;
    putRoute(apiId: string, route: IRoute): any;
    deleteRoute(apiId: string, route: IRoute): any;
    startApi(apiId: string): any;
    stopApi(apiId: string): any;
    postParams(apiId: string, routeId: string, method: string, param: IParam): any 
    putParams(apiId: string, routeId: string, method: string, param: IParam): any
    deleteParams(apiId: string, routeId: string, method: string, params: string) 
    getResponses(): any;
    getAResponse(responseId: string): any;
    postResponse(response: IResponse): any;
    putResponse(response: IResponse): any;
    deleteResponse(responseId: string): any;
    assignResponseToApi(responseId: string, apiId:string, path:string, method:string): any;
}