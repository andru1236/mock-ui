import React, { Fragment, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { toast } from 'react-semantic-toasts';
import { Header } from "semantic-ui-react";
// Redux
import { connect } from "react-redux";
import * as ApiActions from '../../../reducers/apiActions';
// Domain

import { apiServiceRest } from "../../../services";
// Components
import AddPathFormInLine from './forms/AddPathFormInLine';
import PathsTable from './table/PathsTable';
import { IApiInstance } from "../../../domain/api";
import { IStoreState } from "../../../domain/reducer";


const mapStateToProps = (state: IStoreState) => {
    return {
        selectedApi: state.selectedApi,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            apis: {
                loadApi: (api: IApiInstance) => {
                    dispatch(ApiActions.loadApi(api))
                }
            },
        }
    }
};

interface IContainerProps {
    selectedApi: IApiInstance;
    history: any;
    match: any;
    actions: {
        apis: {
            loadApi (api: IApiInstance): void;
        },
    }
}

const GetApiResource = (props: IContainerProps) => {
    const getApiId = () => {
        return props.match.params.apiId
    }

    const reloadApis = async () => {
        try {
            const response = await apiServiceRest.getApi(getApiId());
            props.actions.apis.loadApi(response.data.data)
        } catch (error) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Service unavailable',
                description: `problem with get api`,
                animation: 'bounce',
                time: 5000,
            });
        }
    }

    useEffect(() => {
        reloadApis();
    });

    return (
        <View
            selectedApi={ props.selectedApi }
            reloadApis={ reloadApis }
            history={ props.history }
        />
    );
}


// View

interface IViewProps {
    selectedApi: IApiInstance;
    reloadApis (): void;
    history: any;
}

const View = (props: IViewProps) => {
    return (
        <Fragment>
            {/*<Grid>*/}
            {/*    <Grid.Row>*/}
            {/*        <Button labelPosition='left' icon='left chevron' size='mini'*/}
            {/*                content={ `API: ${ props.selectedApi.name }   |  PORT:  ${ props.selectedApi.port }` }*/}
            {/*                onClick={ () => props.history.push('/') }*/}
            {/*        />*/}
            {/*    </Grid.Row>*/}
            {/*</Grid>*/}
            <Header as={ "h3" }> Add route </Header>

            <AddPathFormInLine selectecApi={ props.selectedApi } reloadApis={ props.reloadApis }/>
            <PathsTable selectedApi={ props.selectedApi } reloadApis={ props.reloadApis }/>

        </Fragment>
    );
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GetApiResource));
