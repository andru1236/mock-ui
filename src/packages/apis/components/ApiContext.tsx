import React, { createContext, useEffect, useState } from "react";

import { IApiInstance } from "../../../domain/api";
import { createApi, removeApi, getApis, updateApi, startApi, stopApi } from "../sources";

// PROPS TO PASS
export interface ApiContextProps {
    apis: IApiInstance[] | any[];
    selectedApi: IApiInstance;

    selectApi (apiId: string): void;
    reloadApis (): void;
    createApi (newApi): void;
    updateApi (api): void;
    removeApi (apiId): void;
    startApi (apiId): void;
    stopApi (apiId): void;
}

// CONTEXT
const ApiContext = createContext<ApiContextProps>({
    apis: [],
    selectedApi: {
        _id: "",
        name: "",
        port: 0,
        routes: [],
        settings: {
            enabled: false,
            createdOn: '',
        }
    },
    selectApi: (apiId: string) => apiId,
    reloadApis: () => {},
    createApi,
    updateApi,
    removeApi,
    startApi,
    stopApi
});

// COMPONENTS
export const ApiProvider = (props: any) => {
    const [apis, setApis] = useState([]);
    const [selectedApi, setSelectedApi] = useState({
        _id: "",
        name: "",
        port: 0,
        routes: [],
        settings: {
            enabled: false,
            createdOn: '',
        }
    });

    const reloadApis = () => getApis().then(res => setApis(res.data.data.apis));
    const selectApi = (apiId) => setSelectedApi(apis.find(api => api._id === apiId));


    useEffect(() => {
        getApis().then(res => setApis(res.data.data.apis));
    }, [])

    return (
        <ApiContext.Provider
            value={ {
                apis,
                selectedApi,
                reloadApis,
                selectApi,
                createApi,
                updateApi,
                removeApi,
                startApi,
                stopApi
            } }
        >
            { props.children }
        </ApiContext.Provider>
    )
}

export const ApiConsumer = ApiContext.Consumer;

export const withApiConsumer = WrappedComponent => props => {
    return (
        <ApiConsumer>
            { context => <WrappedComponent { ...props } { ...context }/> }
        </ApiConsumer>
    )
}