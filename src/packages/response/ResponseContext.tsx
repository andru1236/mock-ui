import React, { createContext, useState, useEffect } from "react";
import { IApiInstance } from "../../domain/api";
import { IResponse } from "../../domain/response";
import { getApis, getResponses, removeAResponse } from './sources';
import { handlerError } from '../common/handlerError'
import emmitToastMessage from "../common/emmitToastMessage";

export interface ResponseContextProps {
    apis: IApiInstance[];
    responses: IResponse[];
    selectedApi: any;
    selectedResponse: any;
    selectApi?(apiId: string): void;
    selectResponse?(responseId: string): void;
    reloadApis?(): void;
    reloadResponses?(): void;
    removeResponse?(): void;
}

const ResponseContext = createContext<ResponseContextProps>({
    apis: [] as IApiInstance[],
    responses: [] as IResponse[],
    selectedApi: {
        _id: "",
        name: "",
        routes: {},
    },
    selectedResponse: {
        _id: "",
        name: "",
        response: {},
    },
});

export const ResponseProvider = (props: any) => {
    const [apis, setApis] = useState([]);
    const [responses, setResponses] = useState([]);
    const [selectedApi, setSelectedApi] = useState({
        _id: "",
        name: "",
        routes: [],
    });
    const [selectedResponse, setSelectedResponse] = useState({
        _id: "",
        name: "",
        response: {},
    })

    const selectApi = apiId => setSelectedApi(apis.find(api => api._id === apiId));
    const removeResponse = () => selectedApi._id !== "" ? removeAResponse(selectedApi._id): emmitToastMessage.error('Response no exists', 'First Save the response');
    const selectResponse = responseId => setSelectedResponse(responses.find(response => response._id === responseId));
    const reloadApis = () => getApis().then(res => setApis(res.apis)).catch(error => handlerError(error));
    const reloadResponses = () => getResponses().then(res => setResponses(res.responses)).catch(error => handlerError(error));

    useEffect(() => {
        getResponses().then(res => setResponses(res.responses)).catch(error => handlerError(error));
        getApis().then(res => setApis(res.apis)).catch(error => handlerError(error));
    }, []);

    return (
        <ResponseContext.Provider
            value={{
                apis,
                responses,
                selectedApi,
                selectedResponse,
                selectApi,
                selectResponse,
                removeResponse,
                reloadApis,
                reloadResponses
            }}
        >
            {props.children}
        </ResponseContext.Provider>
    )

};

export const ResponseConsumer = ResponseContext.Consumer;

export const withResponseConsumer = WrappedComponent => props => {
    return (
        <ResponseConsumer>
            {context => {
                return (
                    <WrappedComponent {...props} {...context} />
                )
            }}
        </ResponseConsumer>
    )
};