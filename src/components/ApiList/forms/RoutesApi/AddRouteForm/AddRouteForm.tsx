import * as React from 'react';
import {Button, Form, Icon} from "semantic-ui-react";

const options = [
    {key: 'GET', text: 'GET', value: 'GET'},
    {key: 'POST', text: 'POST', value: 'POST'},
    {key: 'PUT', text: 'PUT', value: 'PUT'},
    {key: 'DELETE', text: 'DELETE', value: 'DELETE'},
];

interface IViewProps {
    reloadApis(): void;
}

interface IViewState {
    path: string
    method: string;
    response: any;
}

class AddRouteForm extends React.Component<IViewProps, IViewState> {

    constructor(props: IViewProps) {
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

    handlerPath(event: any) {
        this.setState({
            path: event.target.value
        });
    }

    handlerResponse(file: any) {
        const reader = new FileReader();
        reader.onload = (event:any ) => {
            this.setState({response: JSON.parse(event.target.result)});
            console.log(this.state);
        };
        reader.readAsText(file);
    }

    handlerMethod(event: any) {
        this.setState({
            method: event.target.value
        });
    }

    addNewRoute() {

        console.log(this.state);
    }

    render() {
        return (
            <Form size={'tiny'}>
                <Form.Group widths='equal'>
                    <Form.Select required fluid label='Method' placeholder='Http method'
                                 options={options}
                                 onChange={this.handlerMethod}
                    />
                    <Form.Input fluid required label='Path' placeholder='/path'
                                onChange={this.handlerPath}
                    />
                    <Form.Input fluid required label='Response' placeholder='Response' type={'file'}
                                onChange={(event) => this.handlerResponse(event.target.files[0])}
                    />
                </Form.Group>
                <Form.Group widths={'5'}>
                    <Form.Field/>
                    <Form.Field/>
                    <Form.Field/>
                    <Form.Field/>
                    <Form.Field/>
                    <Form.Field inline>
                        <Button icon primary circular labelPosition={'left'}
                                onClick={this.addNewRoute}
                        >
                            <Icon name={"add"}/>
                            Add new route
                        </Button>
                    </Form.Field>
                </Form.Group>

            </Form>
        );
    }
}

export default AddRouteForm;
