import React, { createContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { IApiInstance, IParam, IRoute } from "../../../domain/api";
import {
    getOneApi,
    addNewRoute,
    updateRoute,
    removeRoute,
    addParamToRoute,
    updateParamFromRoute,
    removeParamFromRoute
} from '../sources';

import { handlerError } from "../../common/HandlerError";


export interface PathContextProps {
    selectedApi: IApiInstance | any;
    getOneApi (apiId: string): void;
    addNewRoute (apiId: string, route: IRoute): void;
    updateRoute (apiId: string, route: IRoute): void;
    removeRoute (apiId: string, route: IRoute): void;
    addParamToRoute (apiId: string, routeId: string, param: IParam): void;
    updateParamFromRoute (apiId: string, routeId: string, param: IParam): void;
    removeParamFromRoute (apiId: string, routeId: string, param: string): void;
    reloadSelectedApi (): void
}

const PathContext = createContext<PathContextProps>({
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
    getOneApi,
    addNewRoute,
    updateRoute,
    removeRoute,
    addParamToRoute,
    updateParamFromRoute,
    removeParamFromRoute,
    reloadSelectedApi: () => {}
});

const _PathProvider = ({ match, children }: any) => {

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

    const reloadSelectedApi = () => {
        getOneApi(match.params.apiId).then(res => setSelectedApi(res)).catch(error => handlerError(error));
    };

    useEffect(() => {
        reloadSelectedApi();
    }, [])

    return (
        <PathContext.Provider
            value={ {
                selectedApi,
                reloadSelectedApi,
                getOneApi,
                addNewRoute,
                updateRoute,
                removeRoute,
                addParamToRoute,
                updateParamFromRoute,
                removeParamFromRoute
            } }
        >
            { children }
        </PathContext.Provider>
    )
};

export const PathProvider = withRouter(_PathProvider);

export const PathConsumer = PathContext.Consumer;

export const withPathConsumer = WrappedComponent => props => {
    return (
        <PathConsumer>
            { context => <WrappedComponent { ...props } { ...context }/> }
        </PathConsumer>
    )
};

