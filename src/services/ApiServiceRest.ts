import {IApiService} from "./domain/IApiService";
import {IApiInstance} from "../domain/IApiInstance";
import {IRoute} from "../domain/IRoute";

const axios = require('axios');

export class ApiServiceRest implements IApiService{
    public readonly BASE_URL = 'http://localhost:5000/api/v1';
    public readonly END_POINT = '/apis';
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
}
