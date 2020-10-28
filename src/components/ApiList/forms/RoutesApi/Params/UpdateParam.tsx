import React from 'react'
import { IParam } from '../../../../../domain/IParam';
import { IPath } from "../../../../../domain/IPath";
import { IResource } from "../../../../../domain/IResource";
import UpdateResponse from './UpdateResponse';
import { toast } from 'react-semantic-toasts';
import { apiService } from "../../../../../services";
import { HandlerError } from '../../../../utils/HandlerError';
import { Button, Grid } from 'semantic-ui-react';



interface IViewProps {
    selectedResource: IResource;
    apiId: string;
    route: IPath;
    param: IParam;
    reloadApis(): void;
}

interface IViewState {
    open: boolean;
}

class UpdateParam extends React.Component<IViewProps, IViewState> {
    constructor(props: IViewProps) {
        super(props);
        this.state = {
            open: true
        }
        this.updateResponse = this.updateResponse.bind(this)
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({ open: false })
    }

    updateResponse(response: any) {
        if (response === {}) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error response',
                description: `Error on load json file `,
                animation: 'bounce',
                time: 5000,
            });
        } else {
            apiService.putParams(this.props.apiId, this.props.route._id, this.props.selectedResource.method, {
                param: this.props.param.param,
                response: response
            })
                .then(() => {
                    this.props.reloadApis();
                    this.close();
                })
                .catch((error) => {
                    HandlerError.handler(error);
                    toast({
                        type: 'error',
                        icon: 'bullhorn',
                        title: 'Problem with update this param',
                        description: `Can't update the param`,
                        animation: 'bounce',
                        time: 5000,
                    });
                });
        }
    }

    deleteParam() {
        apiService.deleteParams(this.props.apiId, this.props.route._id,
            this.props.selectedResource.method, this.props.param.param)
            .then(() => {

            })
            .catch((error) => {
                HandlerError.handler(error);
                toast({
                    type: 'error',
                    icon: 'bullhorn',
                    title: 'Problem with delete this param',
                    description: `Can't delete this param`,
                    animation: 'bounce',
                    time: 5000,
                });
            });
    }

    render() {
        return (
            <Grid>
                <Grid.Column textAlign="left">
                    <UpdateResponse
                        oldResponse={this.props.param.response}
                        path={`${this.props.selectedResource.method}:  ${this.props.route.path}?${this.props.param.param}`}
                        color={'green'}
                        updateResponse={this.updateResponse}
                    />
                    <Button
                        color={'red'} floated={'right'}
                        circular icon='delete' size='mini'
                        onClick={this.deleteParam}
                    />
                </Grid.Column>
            </Grid>

        );
    }
}

export default UpdateParam
