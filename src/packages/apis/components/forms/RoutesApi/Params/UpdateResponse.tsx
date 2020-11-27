import React, { Component } from 'react'
import { Form, Button, Label, Modal } from 'semantic-ui-react'
import ReactJson from 'react-json-view';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

interface IViewProps {
    path: string;
    color: SemanticCOLORS;
    oldResponse: any;
    updateResponse (response: any): any;
}

interface IViewState {
    open: boolean
    response: any;
}

class ActionOneRoute extends Component<IViewProps, IViewState> {

    constructor (props: IViewProps) {
        super(props);
        this.state = {
            open: false,
            response: {}
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handlerResponse = this.handlerResponse.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
    }

    open () {
        this.setState({ open: true });
    }

    close () {
        this.setState({ open: false });
    }

    handlerResponse (file: any) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.setState({ response: JSON.parse(event.target.result) });
        };
        reader.readAsText(file);
    }

    updateResponse (event: any) {
        event.preventDefault();
        this.props.updateResponse(this.state.response)
        this.close();
    }

    renderButton () {
        return (
            <Label as={ 'a' } color={ this.props.color }>
                Response
            </Label>);
    }

    render () {
        const { open } = this.state;

        return (
            <Modal
                open={ open }
                onOpen={ this.open }
                onClose={ this.close }
                size='small'
                trigger={ this.renderButton() }
            >
                <Modal.Header>
                    { `Resource ` }
                    <Label>
                        { `${ this.props.path }` }
                    </Label>
                </Modal.Header>
                <Modal.Content>
                    <Form.Input fluid required label='Response' placeholder='Response' type={ 'file' }
                                onChange={ (event) => this.handlerResponse(event.target.files[0]) }
                    />
                    <ReactJson src={ this.props.oldResponse }/>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon='check' content='Update Response' color={ 'green' } onClick={ this.updateResponse }/>
                    <Button content='Close' onClick={ this.close }/>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActionOneRoute;
