import React, { Component } from 'react'
import { Form, Button, Label, Modal, Divider } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts';
import { apiServiceRest } from "../../../../../../services";
import { HandlerError } from "../../../../../common/HandlerError";
import AddParamsForm from "../AddRouteForm/AddParamsForm";
import ParamsTable from "../Params/ParamsTable";
import UpdateResponse from '../Params/UpdateResponse';
import {IApiInstance, IPath, IResource} from "../../../../../../domain/api";
interface IViewProps {
    resource: IResource;
    route: IPath;
    selectedApi: IApiInstance;
    reloadApis(): void;
    closeForm(): void;
}

interface IViewState {
    open: boolean
    response: any;
}

class ActionOneRoute extends Component<IViewProps, IViewState> {

    constructor(props: IViewProps) {
        super(props);
        this.state = {
            open: false,
            response: {}
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handlerResponse = this.handlerResponse.bind(this);
        this.renderMethod = this.renderMethod.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
        this.removeRoute = this.removeRoute.bind(this);
    }

    open() {
        this.setState({ open: true });
    }

    close() {
        this.setState({ open: false });
    }

    handlerResponse(file: any) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.setState({ response: JSON.parse(event.target.result) });
        };
        reader.readAsText(file);
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
            apiServiceRest.putRoute(this.props.selectedApi._id, {
                path: this.props.route.path,
                method: this.props.resource.method,
                response: response
            }
            )
                .then(() => {
                    this.close();
                    this.props.reloadApis();
                    this.props.closeForm();
                })
                .catch((error) => {
                    HandlerError.handler(error);
                })
        }
    }

    removeRoute() {
        apiServiceRest.deleteRoute(
            this.props.selectedApi._id,
            { path: this.props.route.path, method: this.props.resource.method, response: {} }
        )
            .then(() => {
                this.props.reloadApis();
                this.close();
                this.props.closeForm();
            })
            .catch((error) => {
                HandlerError.handler(error);
            })
    }

    renderMethod(resource: IResource) {
        switch (resource.method) {
            case 'GET':
                return (<Label as={'a'} color={'green'}>GET</Label>);
            case 'POST':
                return (<Label as={'a'} color={'blue'}>POST</Label>);
            case 'PUT':
                return (<Label as={'a'} color={'violet'}>PUT</Label>);
            case 'DELETE':
                return (<Label as={'a'} color={'red'}>DELETE</Label>);
            default:
                return;

        }
    }

    render() {
        const { open } = this.state;

        return (
            <Modal
                open={open}
                onOpen={this.open}
                onClose={this.close}
                size='large'
                trigger={
                    this.renderMethod(this.props.resource)
                }
            >
                <Modal.Header>{`Resource ${this.props.route.path}`} </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group>

                            <div>
                                {`Method ${this.props.resource.method}`}
                            </div>
                            <UpdateResponse
                                path={`${this.props.resource.method}:  ${this.props.route.path}`}
                                oldResponse={this.props.resource.response}
                                color={'grey'}
                                updateResponse={this.updateResponse}
                            />
                        </Form.Group>
                    </Form>
                    <h3>{`Add Query Params`} </h3>
                    <Divider />
                    <AddParamsForm
                        apiId={this.props.selectedApi._id}
                        routeId={this.props.route._id}
                        method={this.props.resource.method}
                        reloadApis={this.props.reloadApis}
                        closeForm={this.props.closeForm} />
                    <Divider />
                    <ParamsTable reloadApis={this.props.reloadApis} apiId={this.props.selectedApi._id} selectedResource={this.props.resource} route={this.props.route} />
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Delete route' color={'red'} floated={'left'} onClick={this.removeRoute} />
                    <Button content='Close' onClick={this.close} />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActionOneRoute;
