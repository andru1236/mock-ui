import React, { createContext, Fragment, useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

import { IApiInstance } from "../../domain/api";
import { IDevice } from "../../domain/device";

import { withDeviceConsumer, DeviceContextProps } from "../devices/components/DeviceContext";
import { withApiConsumer, ApiContextProps } from "../apis/components/ApiContext";

const nullFn = (...args) => { };

// PROPS TO PASS
export interface SearchContextProps {
    isLoading: boolean;
    entities: IApiInstance[] | IDevice[] | any;
    setEntities(entities: IApiInstance[] | IDevice[]): void;
    entitiesToDisplay: IApiInstance[] | IDevice[] | any;
    setEntitiesToDisplay(entities: IApiInstance[] | IDevice[]): void;
    numberOfEntitiesToDisplay: number;
    setNumberOfEntitiesToDisplay(num: number): void;
    reloadEntities(): void;
}

// CONTEXT
const SearchContext = createContext<SearchContextProps>({
    isLoading: false,
    entities: [] as IApiInstance[] | IDevice[],
    setEntities: nullFn,
    entitiesToDisplay: [] as IApiInstance[] | IDevice[],
    setEntitiesToDisplay: (entities: IApiInstance[]) => { },
    numberOfEntitiesToDisplay: 15,
    setNumberOfEntitiesToDisplay: (num) => { },
    reloadEntities: nullFn
});

interface externalProps extends DeviceContextProps, ApiContextProps {
    children: any;
};


const _SearchProvider = (props: externalProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [entities, setEntities] = useState([]);
    const [entitiesToDisplay, setEntitiesToDisplay] = useState([]);
    const [numberOfEntitiesToDisplay, setNumberOfEntitiesToDisplay] = useState(15);

    const getOrderedEntitiesByName = (apis, devices) => {
        let orderedList: IApiInstance[] | IDevice[] = [...apis, ...devices].sort(
            (first, second) => (first.name > second.name) ? 1 : -1
        )
        return orderedList
    }

    const reloadEntities = () => {
        props.reloadApis();
        props.reloadDevices();
    }

    useEffect(() => {
        setIsLoading(true);
        const mixEntities = getOrderedEntitiesByName(props.apis, props.devices);
        setEntities(mixEntities);
        setEntitiesToDisplay(mixEntities.slice(0, numberOfEntitiesToDisplay));
        setIsLoading(false);
    }, [props.devices, props.apis])

    return (
        <SearchContext.Provider
            value={{
                isLoading,
                entities,
                setEntities,
                entitiesToDisplay,
                setEntitiesToDisplay,
                numberOfEntitiesToDisplay,
                setNumberOfEntitiesToDisplay,
                reloadEntities
            }}
        >
            { props.children}
        </SearchContext.Provider>
    )
}

// Note: this component depends of the ApiProvider and DeviceProvider to work
export const SearchProvider = withApiConsumer(withDeviceConsumer(_SearchProvider))

export const SearchConsumer = SearchContext.Consumer;

export const withSearchConsumer = WrappedComponent => props => {
    return (
        <SearchConsumer>
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
        </SearchConsumer>
    )
}