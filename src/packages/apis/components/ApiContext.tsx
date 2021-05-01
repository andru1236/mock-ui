import React, { createContext, Fragment, useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

import { IApiInstance } from "../../../domain/api";
import { getApis } from "../sources/gql";
import { handlerError } from "../../common/handlerError";


// PROPS TO PASS
export interface ApiContextProps {
    isLoading: boolean;
    apis: IApiInstance[];
    setApis(apis: IApiInstance[]): void;
    selectedApi: IApiInstance;
    selectApi(apiId: string): void;
    reloadApis(): void;
    apisToDisplay: IApiInstance[];
    setApisToDisplay(apis: IApiInstance[]): void;
    numberOfApisToShow: number;
    setNumberOfApisToShow(num: number): void;
}

// CONTEXT
const ApiContext = createContext<ApiContextProps>({
    isLoading: false,
    apis: [] as IApiInstance[],
    setApis: (apis: IApiInstance[]) => { },
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
    reloadApis: () => { },
    apisToDisplay: [] as IApiInstance[],
    setApisToDisplay: (apis: IApiInstance[]) => { },
    numberOfApisToShow: 15,
    setNumberOfApisToShow: (num) => { },
});

// COMPONENTS
export const ApiProvider = (props: any) => {
    const [isLoading, setIsLoading] = useState(true)
    const [apis, setApis] = useState([]);
    const [apisToDisplay, setApisToDisplay] = useState([]);
    const [numberOfApisToShow, setNumberOfApisToShow] = useState(15);
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

    const reloadApis = () => {
        setIsLoading(true);
        getApis().then(res => {
            setApis(res.apis);
            setApisToDisplay(res.apis.slice(0, numberOfApisToShow));
            setIsLoading(false);
        })
            .catch(error => handlerError(error));
    };

    const selectApi = (apiId) => setSelectedApi(apis.find(api => api._id === apiId));

    useEffect(() => {
        setIsLoading(true);
        getApis()
            .then(res => {
                setApis(res.apis);
                setApisToDisplay(res.apis.slice(0, numberOfApisToShow));
                setIsLoading(false);
            })
            .catch(error => handlerError(error));
    }, [])

    return (
        <ApiContext.Provider
            value={{
                isLoading,
                apis,
                setApis,
                selectedApi,
                selectApi,
                reloadApis,
                apisToDisplay,
                setApisToDisplay,
                numberOfApisToShow,
                setNumberOfApisToShow,
            }}
        >
            { props.children}
        </ApiContext.Provider>
    )
}

export const ApiConsumer = ApiContext.Consumer;

export const withApiConsumer = WrappedComponent => props => {
    return (
        <ApiConsumer>
            { context => {
                return (
                    <Fragment>
                        <Dimmer active={context.isLoading} inverted={true}>
                            <Loader inverted={true}>Loading</Loader>
                        </Dimmer>
                        <WrappedComponent {...props} {...context} />
                    </Fragment>
                )
            }}
        </ApiConsumer>
    )
}