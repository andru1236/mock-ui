import React, { createContext, Fragment, useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

import { IApiInstance } from "../../../domain/api";
import { getApis, getApisLength } from "../sources/gql";
import { handlerError } from "../../common/handlerError";


const { REACT_APP_PAGE_LIMIT } = process.env;
const PAGE_LIMIT = parseInt(REACT_APP_PAGE_LIMIT);


// PROPS TO PASS
export interface ApiContextProps {
    isLoading: boolean;
    apis: IApiInstance[];
    setApis(apis: IApiInstance[]): void;
    selectedApi: IApiInstance;
    selectApi (apiId: string): void;
    reloadApis (): void;
    setConfigPage(config): void;
    setNumberPages(flag): void;
    configPage: any;
    numberPages: any;
    apisLength: any;
}

// CONTEXT
const ApiContext = createContext<ApiContextProps>({
    isLoading: false,
    apis: [] as IApiInstance[],
    setApis: (apis: IApiInstance[]) => {},
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
    setConfigPage: (config) => {},
    setNumberPages: (flag) => {},
    configPage: { active:0, next:0 },
    numberPages:0,
    apisLength: 0,
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

    const [apisLength, setApisLength] = useState(0);
    const [configPage, setConfigPage] = useState({ active:1, next:0 });
    const [numberPages, setNumberPages] = useState(configPage.active);

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
            setApis,
            selectedApi,
            reloadApis,
            selectApi,
            setConfigPage,
            setNumberPages,
            configPage,
            numberPages,
            apisLength,
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