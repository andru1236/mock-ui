import React, {Component} from 'react'
import {Button, Label, Modal} from 'semantic-ui-react'
import {IResource} from "../../../../../domain/IResource";

interface IViewProps {
    resource: IResource;
    path: string;
    apiId: string;
    reloadApis(): void;
}

interface IViewState {
    open: boolean
}

class ActionOneRoute extends Component<IViewProps, IViewState> {

    constructor(props: IViewProps) {
        super(props);
        this.state = {open: false};
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.renderMethod = this.renderMethod.bind(this);
    }

    open() {
        this.setState({open: true});
    }

    close() {
        this.setState({open: false});
    }

    updateResponse(event: any) {
        // TODO: consume api for update response and  reload apis list
    }

    removeRoute(){
        //TODO: consume api for remove route with (apiId, path, method) and reload api list
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
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Delete route' color={'red'} floated={'left'} onClick={this.close}/>
                    <Button icon='check' content='Update Response' color={'green'} onClick={this.close}/>
                    <Button content='Close' onClick={this.close}/>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActionOneRoute;
