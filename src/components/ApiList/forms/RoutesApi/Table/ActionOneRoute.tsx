import React, {Component} from 'react'
import {Form, Button, Label, Modal} from 'semantic-ui-react'
import {toast} from 'react-semantic-toasts';
import {IResource} from "../../../../../domain/IResource";
import {apiService} from "../../../../../services";

interface IViewProps {
    resource: IResource;
    path: string;
    apiId: string;
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
        this.setState({open: true});
    }

    close() {
        this.setState({open: false});
    }

    handlerResponse(file: any) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.setState({response: JSON.parse(event.target.result)});
        };
        reader.readAsText(file);
    }

    updateResponse(event: any) {
        event.preventDefault();
        if (this.state.response === {}) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error response',
                description: `Error on load json file `,
                animation: 'bounce',
                time: 5000,
            });
        } else {
            apiService.putRoute(this.props.apiId, {
                    path: this.props.path,
                    method: this.props.resource.method,
                    response: this.state.response
                }
            )
                .then((response) => {
                    this.close();
                    this.props.reloadApis();
                    this.props.closeForm();
                })
                .catch((error) => {
                    toast({
                        type: 'error',
                        icon: 'bullhorn',
                        title: 'Problem with update this route',
                        description: `Can't update route`,
                        animation: 'bounce',
                        time: 5000,
                    });
                })
        }
    }

    removeRoute() {
        apiService.deleteRoute(
            this.props.apiId,
            {path: this.props.path, method: this.props.resource.method, response: {}}
        )
            .then(() => {
                this.props.reloadApis();
                this.close();
                this.props.closeForm();
            })
            .catch((error) => {
                toast({
                    type: 'error',
                    icon: 'bullhorn',
                    title: 'Problem with remove route',
                    description: `Problem with this route`,
                    animation: 'bounce',
                    time: 5000,
                });
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
        const {open} = this.state;

        return (
            <Modal
                open={open}
                onOpen={this.open}
                onClose={this.close}
                size='small'
                trigger={
                    this.renderMethod(this.props.resource)
                }
            >
                <Modal.Header>{`Resource ${this.props.path}`} </Modal.Header>
                <Modal.Content>
                    <p>{`Method: ${this.props.resource.method}`}</p>
                    <Form.Input fluid required label='Response' placeholder='Response' type={'file'}
                                onChange={(event) => this.handlerResponse(event.target.files[0])}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Delete route' color={'red'} floated={'left'} onClick={this.removeRoute}/>
                    <Button icon='check' content='Update Response' color={'green'} onClick={this.updateResponse}/>
                    <Button content='Close' onClick={this.close}/>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActionOneRoute;
