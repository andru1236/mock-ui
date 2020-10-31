import React, { useEffect } from 'react';
// Actions
import * as ApiActions from '../../reducers/apiActions';
import { connect } from "react-redux";

import { IApiInstance } from '../../domain/IApiInstance';
import { IStoreState } from '../../reducers/domain/IStoreState';
import { apiService } from '../../services';
import { HandlerError } from '../utils/HandlerError';
import { compose } from 'redux';


interface IActionsProps {
    selectedApi: IApiInstance;
    actions: {
        load(apis: IApiInstance[]): void
        selectApi(api: IApiInstance): void
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        selectedApi: state.selectedApi
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

const apiActions = ( Component ) => (props: IActionsProps) => {
    const reloadApis = async () => {
        try {
            const result = await apiService.getApis();
            props.actions.load(result.data.data.apis);
        } catch (error) {
            HandlerError.handler(error);
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

    const newProps = {
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