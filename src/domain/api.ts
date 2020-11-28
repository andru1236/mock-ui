export interface ISettings {
    enabled: boolean;
    createdOn: string;
}

export interface IRoute {
    path: string;
    method: string;
    response?: any;
}

export interface IParam {
    param: string;
    response: any;
}

export interface IResource {
    method: string;
    response: any;
    params: IParam[];
}

export interface IPath {
    _id: string;
    path: string;
    resources: IResource[];
}

export interface IApiInstance {
    _id?: string;
    name: string;
    port: number;
    routes?: IPath[];
    settings?: ISettings
}