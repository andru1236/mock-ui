import * as React from 'react';
import { Button, Form, Grid, Icon } from "semantic-ui-react";
import { toast } from 'react-semantic-toasts';
import { apiService } from "../../../../../services";
import { HandlerError } from "../../../../utils/HandlerError";

interface IViewProps {
    apiId: string;
    routeId: string;
    method: string;
    reloadApis(): void;
    closeForm(): void;
}

interface IViewState {
    params: string;
    response: any;
}

class AddRouteForm extends React.Component<IViewProps, IViewState> {

    constructor(props: IViewProps) {
        super(props);
        this.state = {
            params: '',
            response: {}
        };
        this.handlerParams = this.handlerParams.bind(this);
        this.handlerResponse = this.handlerResponse.bind(this);
        this.addNewRoute = this.addNewRoute.bind(this);
    }

    handlerParams(value: string) {
        this.setState({
            params: value
        });
    }

    handlerResponse(file: any) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.setState({ response: JSON.parse(event.target.result) });
        };
        reader.readAsText(file);
    }

    addNewRoute() {
        if (this.validatedFields()) {
            apiService.postParams(this.props.apiId, this.props.routeId, this.props.method, {
                param: this.state.params,
                response: this.state.response
            })
                .then(() => {
                    this.clearForm();
                    this.props.reloadApis();
                })
                .catch((error) => {
                    console.log(error)
                    HandlerError.handler(error);
                    toast({
                        type: 'error',
                        icon: 'bullhorn',
                        title: 'Problem with register path',
                        description: `This params is already exist`,
                        animation: 'bounce',
                        time: 5000,
                    })
                });
        }
    }

    clearForm() {
        this.setState({ params: '', response: {} });
    }

    private validatedFields() {
        let isValidPath: boolean = true;
        let isValidResponse: boolean = true;

        if (this.state.params.length === 0) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error on Params',
                description: `The param can't be empty `,
                animation: 'bounce',
                time: 5000,
            });
            isValidPath = false;
        }
        if (this.state.response === {}) {
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

    render() {
        return (
            <Form size={'tiny'}>
                <Form.Group widths='equal'>
                    <Form.Input fluid required label='Params' placeholder='page=1&limit=10'
                        value={this.state.params}
                        onChange={(e) => this.handlerParams(e.target.value)}
                    />
                    <Form.Input fluid required label='Response' placeholder='Response' type={'file'}
                        onChange={(event) => this.handlerResponse(event.target.files[0])}
                    />
                </Form.Group>
                <Grid>
                    <Grid.Column textAlign="right">
                        <Button icon primary circular labelPosition={'left'}
                            onClick={this.addNewRoute}
                        >
                            <Icon name={"add"} />
                            Add Params
                        </Button>
                    </Grid.Column>
                </Grid>

            </Form>
        );
    }
}

export default AddRouteForm;
