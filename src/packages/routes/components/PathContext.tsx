import React, { createContext, Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {IApiInstance, IPath } from "../../../domain/api";
import { Dimmer, Loader } from "semantic-ui-react";
import { getOneApi } from '../sources/gql';
import { handlerError } from "../../common/handlerError";

const defaultApi: IApiInstance = {
    _id: "",
    name: "",
    port: 0,
    routes: [],
    settings: {
        enabled: false,
        createdOn: '',
    }
};

export interface PathContextProps {
    isLoading: boolean;
    selectedApi: IApiInstance | any;
    getOneApi (apiId: string): void;
    reloadSelectedApi (): any
    routesToDisplay: IPath[] | any;
    setRoutesToDisplay(routes): any;
    numberOfRoutesToDisplay: number;
    setNumberOfRoutesToDisplay(num): void;
}

const PathContext = createContext<PathContextProps>({
    isLoading: false,
    selectedApi: defaultApi,
    getOneApi,
    reloadSelectedApi: () => {},
    routesToDisplay: [],
    setRoutesToDisplay: (routes) => {},
    numberOfRoutesToDisplay: 10,
    setNumberOfRoutesToDisplay: (num) => {},
});

const _PathProvider = ({ match, children }: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApi, setSelectedApi] = useState(defaultApi);
    const [routesToDisplay, setRoutesToDisplay] = useState([]);
    const [numberOfRoutesToDisplay, setNumberOfRoutesToDisplay] = useState(10);

    const reloadSelectedApi = () => {
        setIsLoading(true);
        getOneApi(match.params.apiId)
          .then(res => {
              setSelectedApi(res);
              setRoutesToDisplay(res.routes.slice(0, numberOfRoutesToDisplay))
              setIsLoading(false);
          })
          .catch(error => handlerError(error));
    };

    useEffect(() => {
        reloadSelectedApi();
    }, [])

    return (
      <PathContext.Provider
        value={ {
            isLoading,
            selectedApi,
            reloadSelectedApi,
            getOneApi,
            routesToDisplay,
            setRoutesToDisplay,
            numberOfRoutesToDisplay,
            setNumberOfRoutesToDisplay
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
      </PathConsumer>
    )
};

