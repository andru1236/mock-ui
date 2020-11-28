import React, { createContext, Fragment, useEffect, useState } from "react";

import { IApiInstance } from "../../../domain/api";
import { createApi, removeApi, getApis, updateApi, startApi, stopApi } from "../sources";
import { handlerError } from "../../common/handlerError";
import { Dimmer, Loader } from "semantic-ui-react";

// PROPS TO PASS
export interface ApiContextProps {
    isLoading: boolean;
    apis: IApiInstance[];
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
    isLoading: false,
    apis: [] as IApiInstance[],
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
    const [isLoading, setIsLoading] = useState(true)
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

    const reloadApis = () => {
        setIsLoading(true)
        getApis().then(res => {
            setApis(res.apis);
            setIsLoading(false);
        });
    };
    const selectApi = (apiId) => setSelectedApi(apis.find(api => api._id === apiId));

    useEffect(() => {
        setIsLoading(true);
        getApis()
          .then(res => {
              setApis(res.apis);
              setIsLoading(false);
          })
          .catch(error => handlerError(error));
    }, [])

    return (
      <ApiContext.Provider
        value={ {
            isLoading,
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
          { context => {
              return (
                <Fragment>
                    <Dimmer active={ context.isLoading } inverted={ true }>
                        <Loader inverted={ true }>Loading</Loader>
                    </Dimmer>
                    <WrappedComponent { ...props } { ...context }/>
                </Fragment>
              )
          } }
      </ApiConsumer>
    )
}