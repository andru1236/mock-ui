import { IApiInstance, IParam, IRoute } from "../domain/api";
import { IResponse } from '../domain/response'
import { RestAPI } from "../domain/gateways";

const axios = require('axios');
const { REACT_APP_REST_API_URL } = process.env

export class ApiServiceRest implements RestAPI {
    public readonly BASE_URL = `http://${REACT_APP_REST_API_URL}:5000/api/v1`;
    public readonly END_POINT = '/apis';
    public readonly RESPONSE_END_PODINT = '/responses';
    private axiosInstance: any;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.BASE_URL, headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    postApis(api: IApiInstance) {
        return this.axiosInstance.post(`${this.END_POINT}`, {
            name: api.name,
            port: api.port
        });
    }

    getApis() {
        return this.axiosInstance.get(`${this.END_POINT}`, {})
    }

    deleteApi(apiId: string): any {
        return this.axiosInstance.delete(`${this.END_POINT}/${apiId}`, {});
    }

    deleteRoute(apiId: string, route: IRoute): any {
        return this.axiosInstance.delete(`${this.END_POINT}/${apiId}/routes`, {
            data: {
                path: route.path,
                method: route.method,
            }
        });
    }

    getApi(apiId: string): any {
        return this.axiosInstance.get(`${this.END_POINT}/${apiId}`, {});
    }

    postRoute(apiId: string, route: IRoute): any {
        return this.axiosInstance.post(`${this.END_POINT}/${apiId}/routes`, {
            path: route.path,
            method: route.method,
            response: route.response
        });
    }

    putApi(api: IApiInstance): any {
        return this.axiosInstance.put(`${this.END_POINT}/${api._id}`, {
            name: api.name,
            port: api.port
        });
    }

    startApi(apiId: string): any {
        return this.axiosInstance.post(`${this.END_POINT}/${apiId}/start`, {});
    }

    stopApi(apiId: string): any {
        return this.axiosInstance.post(`${this.END_POINT}/${apiId}/stop`, {});
    }

    putRoute(apiId: string, route: IRoute): any {
        return this.axiosInstance.put(`${this.END_POINT}/${apiId}/routes`, {
            path: route.path,
            method: route.method,
            response: route.response
        });
    }

    postParams(apiId: string, routeId: string, method: string, param: IParam): any {
        return this.axiosInstance.post(`${this.END_POINT}/${apiId}/routes/${routeId}/params`, {
            method: method,
            params: param.param,
            response: param.response
        });
    }

    putParams(apiId: string, routeId: string, method: string, param: IParam): any {
        return this.axiosInstance.put(`${this.END_POINT}/${apiId}/routes/${routeId}/params`, {
            method: method,
            params: param.param,
            response: param.response
        });
    }

    deleteParams(apiId: string, routeId: string, method: string, params: string) {
        return this.axiosInstance.delete(`${this.END_POINT}/${apiId}/routes/${routeId}/params`,
            {
                data: {
                    params: params,
                    method: method
                }
            });
    }

    getResponses(): any {
        return this.axiosInstance.get(`${this.RESPONSE_END_PODINT}`, {})
    }

    getAResponse(responseId: string): any {
        return this.axiosInstance.get(`${this.RESPONSE_END_PODINT}/${responseId}`, {})
    }
    postResponse(response: IResponse): any {
        return this.axiosInstance.post(`${this.RESPONSE_END_PODINT}`, {
            name: response.name,
            response: response.response
        })
    }
    putResponse(response: IResponse): any {
        return this.axiosInstance.put(`${this.RESPONSE_END_PODINT}/${response._id}`, {
            name: response.name,
            response: response.response
        })
    }
    deleteResponse(responseId: string): any {
        return this.axiosInstance.delete(`${this.RESPONSE_END_PODINT}/${responseId}`, {})

    }
    assignResponseToApi(responseId: string, apiId: string, path: string, method: string): any {
        return this.axiosInstance.post(`${this.RESPONSE_END_PODINT}/${responseId}`, {
            api_id: apiId,
            path: path,
            method: method
        })
    }
}
