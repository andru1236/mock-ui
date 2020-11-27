import { IApiInstance, IRoute } from "./api";

export interface RestAPI {
    postApis (api: IApiInstance): any;
    getApis (): any;
    putApi (api: IApiInstance): any;
    getApi (apiId: string): any;
    deleteApi (apiId: string): any;
    postRoute (apiId: string, route: IRoute): any;
    putRoute (apiId: string, route: IRoute): any;
    deleteRoute (apiId: string, route: IRoute): any;
    startApi (apiId: string): any;
    stopApi (apiId: string): any;
}