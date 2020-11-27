import * as React from 'react';
import { Button, Form, Grid, Icon } from "semantic-ui-react";
import { toast } from 'react-semantic-toasts';
import { apiServiceRest } from "../../../../../../services";
import { HandlerError } from "../../../../../common/HandlerError";
import { IApiInstance } from "../../../../../../domain/api";

const options = [
    { key: 'GET', text: 'GET', value: 'GET' },
    { key: 'POST', text: 'POST', value: 'POST' },
    { key: 'PUT', text: 'PUT', value: 'PUT' },
    { key: 'DELETE', text: 'DELETE', value: 'DELETE' },
];

interface IViewProps {
    selectecApi: IApiInstance;
    reloadApis (): void;
    closeForm (): void;
}

interface IViewState {
    path: string
    method: string;
    response: any;
}

class AddRouteForm extends React.Component<IViewProps, IViewState> {

    constructor (props: IViewProps) {
        super(props);
        this.state = {
            path: '',
            method: '',
            response: {}
        };
        this.handlerPath = this.handlerPath.bind(this);
        this.handlerMethod = this.handlerMethod.bind(this);
        this.handlerResponse = this.handlerResponse.bind(this);
        this.addNewRoute = this.addNewRoute.bind(this);
    }

    handlerPath (path: string) {
        this.setState({
            path: path
        });
    }

    handlerResponse (file: any) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.setState({ response: JSON.parse(event.target.result) });
        };
        reader.readAsText(file);
    }

    handlerMethod (method: any) {
        this.setState({
            method: method
        });
    }

    addNewRoute () {
        if ( this.validatedFields() ) {
            apiServiceRest.postRoute(this.props.selectecApi._id, {
                path: this.state.path,
                method: this.state.method,
                response: this.state.response
            })
            .then(() => {
                this.clearForm()
                this.props.reloadApis();
            })
            .catch((error) => {
                HandlerError.handler(error);
            });
        }
    }

    clearForm () {
        this.setState({ path: '', method: '', response: {} })
    }

    private validatedFields () {
        let isValidPath: boolean = true;
        let isValidResponse: boolean = true;

        if ( !this.state.path.startsWith('/') ) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error on path',
                description: `The path should started with / `,
                animation: 'bounce',
                time: 5000,
            });
            isValidPath = false;
        }
        if ( this.state.response === {} ) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error response',
                description: `Error on load json file `,
                animation: 'bounce',
                time: 5000,
            });
            isValidResponse = false;
        }
        return isValidPath && isValidResponse;
    }

    render () {
        return (
            <Form size={ 'tiny' }>
                <Form.Group widths='equal'>
                    <Form.Select required fluid label='Method' placeholder='Http method'
                                 options={ options }
                                 value={ this.state.method }
                                 onChange={ (e, { value }) => this.handlerMethod(value) }
                    />
                    <Form.Input fluid required label='Path' placeholder='/path'
                                value={ this.state.path }
                                onChange={ (e) => this.handlerPath(e.target.value) }
                    />
                    {/* To DO */ }
                    <Form.Input fluid required label='Response' placeholder='Response' type={ 'file' }
                                onChange={ (event) => this.handlerResponse(event.target.files[0]) }
                    />
                </Form.Group>
                <Grid>
                    <Grid.Column textAlign="right">
                        <Button icon primary circular labelPosition={ 'left' }
                                onClick={ this.addNewRoute }
                        >
                            <Icon name={ "add" }/>
                            Add new route
                        </Button>
                    </Grid.Column>
                </Grid>

            </Form>
        );
    }
}

export default AddRouteForm;
