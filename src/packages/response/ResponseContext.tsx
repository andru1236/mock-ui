import React, { createContext, useState, useEffect } from "react";
import { IApiInstance } from "../../domain/api";
import { IResponse } from "../../domain/response";
import { getApis, getResponses, removeAResponse } from './sources';
import { handlerError } from '../common/handlerError'
import { Dimmer, Loader } from "semantic-ui-react";
import emmitToastMessage from "../common/emmitToastMessage";

export interface ResponseContextProps {
    isLoading?: boolean;
    apis: IApiInstance[];
    responses: IResponse[];
    selectedApi: any;
    selectedResponse: any;
    selectApi?(apiId: string): void;
    unSelectApi?(): void;
    selectResponse?(responseId: string): void;
    unSelectResponse?(): void;
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
    const [isLoading, setIsLoading] = useState(true)
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
    const unSelectApi = () => setSelectedApi({
        _id: "",
        name: "",
        routes: [],
    });

    const removeResponse = () => {
        selectedResponse._id !== "" ?
            removeAResponse(selectedResponse._id)
            : emmitToastMessage.error('Response no exists', 'First Save the response');
        // WHY double render??
        reloadResponses();
        reloadResponses();
    };
    const selectResponse = responseId => setSelectedResponse(responses.find(response => response._id === responseId));
    const unSelectResponse = () => setSelectedResponse({ _id: "", name: "", response: {} })

    const reloadApis = () => {
        setIsLoading(true);
        getApis()
            .then(res => {
                setApis(res.apis);
                setIsLoading(false);
            })
            .catch(error => handlerError(error))
    };

    const reloadResponses = () => {
        setIsLoading(true);
        getResponses()
            .then(res => {
                setResponses(res.responses);
                setIsLoading(false);
            })
            .catch(error => handlerError(error))
    };

    useEffect(() => {
        setIsLoading(true);
        getResponses().then(res => setResponses(res.responses)).catch(error => handlerError(error));
        getApis()
            .then(res => {
                setApis(res.apis);
                setIsLoading(false);
            })
            .catch(error => handlerError(error));
    }, []);

    return (
        <ResponseContext.Provider
            value={{
                isLoading,
                apis,
                responses,
                selectedApi,
                selectedResponse,
                selectApi,
                unSelectApi,
                selectResponse,
                unSelectResponse,
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
                    <>
                        <Dimmer active={context.isLoading} inverted={true}>
                            <Loader inverted={true}>Loading</Loader>
                        </Dimmer>
                        <WrappedComponent {...props} {...context} />
                    </>
                )
            }}
        </ResponseConsumer>
    )
};