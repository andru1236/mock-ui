import React, {Component} from 'react'
import {Button, Label, Modal} from 'semantic-ui-react'
import {IResource} from "../../../../domain/IResource";

interface IViewProps {
    resource: IResource;
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

    renderMethod(resource: IResource) {
        switch (resource.method) {
            case 'GET':
                return (<Label as={'a'} color={'blue'}>GET</Label>);
            case 'POST':
                return (<Label as={'a'} color={'green'}>POST</Label>);
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
                <Modal.Header>Resource</Modal.Header>
                <Modal.Content>
                    <p>{this.props.resource.reponse}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon='check' content='All Done' onClick={this.close}/>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActionOneRoute;
