import React, { Component } from 'react'
import { Form, Button, Label, Modal, Divider } from 'semantic-ui-react'
import ReactJson from 'react-json-view';
import { toast } from 'react-semantic-toasts';
import { IResource } from "../../../../../domain/IResource";
import { apiService } from "../../../../../services";
import { HandlerError } from "../../../../utils/HandlerError";
import ParamsTable from "../Params/ParamsTable";
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

interface IViewProps {
    resource: IResource;
    path: string;
    color: SemanticCOLORS;
    // updateResponse(): void;
    // removeElement(): void;
    // reloadApis(): void;
    // closeForm(): void;
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
        this.renderButton = this.renderButton.bind(this);
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

    updateResponse(event: any) {
        event.preventDefault();
        // this.props.updateResponse()
    }

    removeRoute() {
        // this.props.removeElement()
    }

    renderButton() {
        return (
            <Label as={'a'} color={this.props.color}>
                Response
            </Label>);
    }

    render() {
        const { open } = this.state;

        return (
            <Modal
                open={open}
                onOpen={this.open}
                onClose={this.close}
                size='small'
                trigger={this.renderButton()}
            >
                <Modal.Header>
                    {`Resource `}
                    <Label>
                        {`${this.props.resource.method}:  ${this.props.path}`}
                    </Label>
                </Modal.Header>
                <Modal.Content>
                    <Form.Input fluid required label='Response' placeholder='Response' type={'file'}
                        onChange={(event) => this.handlerResponse(event.target.files[0])}
                    />
                    <ReactJson src={this.props.resource.response} />
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Delete resource' color={'red'} floated={'left'} onClick={this.removeRoute} />
                    <Button icon='check' content='Update Response' color={'green'} onClick={this.updateResponse} />
                    <Button content='Close' onClick={this.close} />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActionOneRoute;
