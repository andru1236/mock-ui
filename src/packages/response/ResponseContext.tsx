import React, { createContext, useState, useEffect } from "react";
import { IApiInstance, IRoute } from "../../domain/api";
import { IResponse } from "../../domain/response";
import { getApis, getResponses } from './sources/gql';
import { handlerError } from '../common/handlerError'
import { Dimmer, Loader } from "semantic-ui-react";


const nullFn = (...args) => {};

const blankApi: IApiInstance= {
    _id: "",
    name: "",
    port: 0,
    routes: [],
};

const blankResponse ={
    _id: "",
    name: "",
    response: {},
};


export interface ResponseContextProps {
    isLoading?: boolean;
    apis: IApiInstance[];
    setApis(apis): void;
    responses: IResponse[];
    setResponses(responses): void;
    numberItemsToShow: number;
    setNumberItemsToShow(num): void;
    responsesToDisplay: IResponse[] | any;
    setResponsesToDisplay(responses: IResponse[]): void;
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

}

const ResponseContext = createContext<ResponseContextProps>({
    apis: [] as IApiInstance[],
    setApis: nullFn,
    responses: [] as IResponse[],
    setResponses: nullFn,
    numberItemsToShow: 10,
    setNumberItemsToShow: nullFn,
    selectedApi: blankApi,
    selectedResponse: blankResponse,
    responsesToDisplay: [] as IResponse[],
    setResponsesToDisplay: nullFn,

});

export const ResponseProvider = (props: any) => {
    const [isLoading, setIsLoading] = useState(true)
    const [numberItemsToShow, setNumberItemsToShow] = useState(10);
    const [apis, setApis] = useState([]);
    const [responses, setResponses] = useState([]);
    const [responsesToDisplay, setResponsesToDisplay] = useState([]);
    const [selectedApi, setSelectedApi] = useState(blankApi);
    const [selectedResponse, setSelectedResponse] = useState(blankResponse);
    const [selectedRouteToUpdate, selectRouteToUpdate] = useState({path:"", method: ""});

    const selectApi = apiId => setSelectedApi(apis.find(api => api._id === apiId));
    const unSelectApi = () => setSelectedApi(blankApi);

    const selectResponse = responseId => setSelectedResponse(responses.find(response => response._id === responseId));
    const unSelectResponse = () => setSelectedResponse(blankResponse);

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
                setResponsesToDisplay(res.responses.slice(0, numberItemsToShow));
                setIsLoading(false);
            })
            .catch(error => handlerError(error))
    };

    useEffect(() => {
        reloadApis();
        reloadResponses();
    }, []);

    return (
        <ResponseContext.Provider
            value={{
                isLoading,
                apis,
                setApis,
                setResponses,
                responses,
                selectedApi,
                selectedResponse,
                selectedRouteToUpdate,
                selectApi,
                unSelectApi,
                selectResponse,
                unSelectResponse,
                selectRouteToUpdate,
                reloadApis,
                reloadResponses,
                numberItemsToShow,
                setNumberItemsToShow,
                responsesToDisplay,
                setResponsesToDisplay,
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