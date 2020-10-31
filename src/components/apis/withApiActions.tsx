import React from 'react';
// Actions
import * as ApiActions from '../../reducers/apiActions';
import { IStoreState } from '../../reducers/domain/IStoreState';
import { connect } from "react-redux";
import { compose } from 'redux';
import emmitToastMessage from '../common/emmitToastMessage';
import { HandlerError } from '../utils/HandlerError';
import { IApiInstance } from '../../domain/IApiInstance';
import { apiService } from '../../services';

// Redux operations
const mapStateToProps = (state: IStoreState) => {
    return {
        selectedApi: state.selectedApi,
        apis: state.apis
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            load: (apis: IApiInstance[]) => {
                dispatch(ApiActions.load(apis))
            },
            selectApi: (api: IApiInstance) => {
                dispatch(ApiActions.selectApi(api))
            }
        }
    }
};

interface incomingProps {
    apis: IApiInstance[],
    selectedApi: IApiInstance;
    actions:{
        load(apis: IApiInstance[]): void;
        selectApi(api: IApiInstance): void;
    }
}

interface injectingProps {
    getApis?(): void;
    selectApi?(apiId: string): void;
    reloadApis?(): void;
    createApi?(name: string, port: number): void;
    updateApi?(name?: string, port?: number): void;
    deleteApi?(): void;
}

export interface withApiActionsProps extends incomingProps, injectingProps{};

const apiActions = Component => (props: incomingProps) => {

    const selectApi = async(apiId: string) => {
        const selectedApi = props.apis.find((api) => api._id === apiId);
        props.actions.selectApi(selectedApi);
    };

    const reloadApis = async () => {
        try {
            const result = await apiService.getApis();
            props.actions.load(result.data.data.apis);
        } catch (error) {
            HandlerError.handler(error);
        }
    }

    const getApis = async () => {
        try {
            const response = await apiService.getApis();
            props.actions.load(response.data.data.apis);
        } catch (error) {
            emmitToastMessage.error('Service unavailable', 'problem with get apis')
        }
    }

    const createApi = async (name: string, port: number) => {
        const newApiInstance: IApiInstance = {name: name, port: port};
        try {
            await apiService.postApis(newApiInstance);
            await reloadApis();

        } catch (error) {
            HandlerError.handler(error);
        }
    }

    const updateApi = async (name: string, port: number) => {
        const apiWillBeUpdated: IApiInstance = {
            _id: props.selectedApi._id,
            name: name,
            port: port
        };
        try {
            await apiService.putApi(apiWillBeUpdated);
            await reloadApis();
        } catch (error) {
            HandlerError.handler(error);
        }
    }

    const deleteApi = async() => {
        try{
            await apiService.deleteApi(props.selectedApi._id);
            reloadApis();
        } catch (error) {
            HandlerError.handler(error);
        }
    }

    const newProps: injectingProps = {
        getApis,
        selectApi,
        reloadApis,
        createApi,
        updateApi,
        deleteApi
    }
    
    return (<Component {...props} {...newProps}/>);
};

const withApiActions = compose(
    connect(mapStateToProps, mapDispatchToProps), 
    apiActions
);

export default withApiActions;