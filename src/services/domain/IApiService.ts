import {IApiInstance} from "../../domain/IApiInstance";
import {IRoute} from "../../domain/IRoute";

export interface IApiService {
  postApis(api: IApiInstance): any;
  getApis(): any;
  putApi(api: IApiInstance): any;
  getApi(apiId: string): any;
  deleteApi(apiId: string): any;
  postRoute(apiId:string, route: IRoute): any;
  purRoute(apiId:string, route: IRoute): any;
  deleteRoute(apiId: string, route: IRoute): any;
  startApi(apiId: string): any;
  stopApi(apiId: string): any;
}