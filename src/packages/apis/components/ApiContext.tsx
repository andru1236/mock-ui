import React, { createContext, Fragment, useEffect, useState } from "react";

import { IApiInstance } from "../../../domain/api";
import { createApi, removeApi, getApis, updateApi, startApi, stopApi, getApisLength, cloneApi } from "../gqlSources";
import { handlerError } from "../../common/handlerError";
import { Dimmer, Loader } from "semantic-ui-react";
const { REACT_APP_PAGE_LIMIT } = process.env;
const PAGE_LIMIT = parseInt(REACT_APP_PAGE_LIMIT);

// PROPS TO PASS
export interface ApiContextProps {
    isLoading: boolean;
    apis: IApiInstance[];
    selectedApi: IApiInstance;

    selectApi (apiId: string): void;
    reloadApis (): void;
    reloadApisWithFilter (filter): void;
    createApi (newApi): void;
    updateApi (api): void;
    removeApi (apiId): void;
    startApi (apiId): void;
    stopApi (apiId): void;
    cloneSelectedApi (api): void;
    setConfigPage(config): void;
    setNumberPages(flag): void;
    configPage: any;
    numberPages: any;
    apisLength: any;
    isSearchMode: boolean;
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
    reloadApisWithFilter: (filter) => {},
    createApi,
    updateApi,
    removeApi,
    startApi,
    stopApi,
    cloneSelectedApi: (api) => {},
    setConfigPage: (config) => {},
    setNumberPages: (flag) => {},
    configPage: { active:0, next:0 },
    numberPages:0,
    apisLength: 0,
    isSearchMode: false
});

// COMPONENTS
export const ApiProvider = (props: any) => {
    const [isLoading, setIsLoading] = useState(true)
    const [apis, setApis] = useState([]);
    const [apisLength, setApisLength] = useState(0);
    const [configPage, setConfigPage] = useState({ active:1, next:0 });
    const [numberPages, setNumberPages] = useState(configPage.active);
    const [isSearchMode, setSearchMode] = useState(false);
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

    const reloadApisWithFilter = (filter) => {
        if (filter.length > 0) {
            setIsLoading(true);
            setApis(filter);
            setSearchMode(true);
            setIsLoading(false);
        }
        else {
            reloadApis();
        }
    };

    const cloneSelectedApi = async (api:any) => {
        await cloneApi(api);
        setIsLoading(true);
        reloadApis();
    }

    const reloadApisLength = () => {
        getApisLength().then(res => {
            setApisLength(res.length);
            let numPages = ((apisLength % PAGE_LIMIT) == 0) ? 
                apisLength / PAGE_LIMIT : 
                (apisLength / PAGE_LIMIT) - ((apisLength % PAGE_LIMIT)/PAGE_LIMIT) + 1;
            setNumberPages(numPages)
        })
        .catch(error => handlerError(error));
    }

    const reloadApis = () => {
        setIsLoading(true);
        setSearchMode(false);
        getApis(configPage.next).then(res => {
            setApis(res.apis);
            reloadApisLength();
            setIsLoading(false);
        })
        .catch(error => handlerError(error));
    };
    const selectApi = (apiId) => setSelectedApi(apis.find(api => api._id === apiId));

    useEffect(() => {
        setIsLoading(true);
        getApis(configPage.next)
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
            stopApi,
            cloneSelectedApi,
            setConfigPage,
            setNumberPages,
            configPage,
            numberPages,
            apisLength,
            isSearchMode,
            reloadApisWithFilter
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