import React, { createContext, useState, useEffect } from "react";
import { IApiInstance, IRoute } from "../../domain/api";
import { IResponse } from "../../domain/response";
import { getApis, getResponses, removeAResponse, getApisLength, getResponsesLength, exportResponseAsJson } from './gqlSources';
import { handlerError } from '../common/handlerError'
import { Dimmer, Loader } from "semantic-ui-react";
import emmitToastMessage from "../common/emmitToastMessage";

export interface ResponseContextProps {
    isLoading?: boolean;
    apis: IApiInstance[];
    responses: IResponse[];
    selectedApi: any;
    selectedResponse: any;
    selectedRouteToUpdate?: IRoute;
    selectRouteToUpdate?(route: IRoute): any;
    selectApi?(apiId: string): void;
    unSelectApi?(): void;
    selectResponse?(responseId: string): void;
    unSelectResponse?(): void;
    reloadApis?(): void;
    reloadResponses?(): void;
    removeResponse?(): void;
    exportResponseAsJson?(fileName:any, response:any): void;
    setApiPage(config): void;
    setConfigPage(config): void;
    configApiPage: any;
    configPage: any;
    apisLength: any;
    responsesLength: any;
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
    setApiPage: (config) => {},
    setConfigPage: (config) => {},
    configApiPage: { active:0, next:0 },
    configPage: { active:0, next:0 },
    apisLength: 0,
    responsesLength: 0,
});

export const ResponseProvider = (props: any) => {
    const [isLoading, setIsLoading] = useState(true)
    const [apis, setApis] = useState([]);
    const [responses, setResponses] = useState([]);
    const [apisLength, setApisLength] = useState(0);
    const [responsesLength, setResponseLength] = useState(0);
    const [configPage, setConfigPage] = useState({ active:1, next:0 });
    const [configApiPage, setApiPage] = useState({ active:1, next:0 });
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

    const [selectedRouteToUpdate, selectRouteToUpdate] = useState({path:"", method: ""});

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
        getApis(configApiPage.next)
            .then(res => {
                setApis(res.apis);
                setIsLoading(false);
            })
            .catch(error => handlerError(error))
    };

    const reloadResponses = () => {
        setIsLoading(true);
        getResponses(configPage.next)
            .then(res => {
                setResponses(res.responses);
                setIsLoading(false);
            })
            .catch(error => handlerError(error))
    };

    useEffect(() => {
        setIsLoading(true);
        getResponses(configPage.next)
            .then(res => {
                setResponses(res.responses)
            })
            .catch(error => handlerError(error));
        getApis(configApiPage.next)
            .then(res => {
                setApis(res.apis);
                setIsLoading(false);
            })
            .catch(error => handlerError(error));
        getApisLength()
            .then(res => {
                setApisLength(res.length);
            })
            .catch(error => handlerError(error));
        getResponsesLength()
            .then(res => {
                setResponseLength(res.length);
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
                selectedRouteToUpdate,
                selectApi,
                unSelectApi,
                selectResponse,
                unSelectResponse,
                selectRouteToUpdate,
                removeResponse,
                exportResponseAsJson,
                reloadApis,
                reloadResponses,
                setApiPage,
                setConfigPage,
                configApiPage,
                configPage,
                apisLength,
                responsesLength
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