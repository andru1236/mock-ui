import React, { useState } from 'react';
import { Button, Form, Grid, Icon } from "semantic-ui-react";
import { toast } from 'react-semantic-toasts';
import { apiService } from "../../../services";
import { HandlerError } from "../../utils/HandlerError";
import {IApiInstance} from "../../../domain/api";

const options = [
    { key: 'GET', text: 'GET', value: 'GET' },
    { key: 'POST', text: 'POST', value: 'POST' },
    { key: 'PUT', text: 'PUT', value: 'PUT' },
    { key: 'DELETE', text: 'DELETE', value: 'DELETE' },
];


interface IContainerProps {
    selectecApi: IApiInstance;
    reloadApis(): void;
}

const AddRouteFormInLine = (props: IContainerProps) => {
    const [path, setPath] = useState('');
    const [method, setMethod] = useState('');
    const [response, setResponse] = useState({});

    // FORM handles
    const handlerPath = (path: string) => setPath(path);
    const handlerMethod = (method: any) => setMethod(method);

    const handlerResponse = (file: any) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setResponse({ response: JSON.parse(event.target.result) });
        };
        reader.readAsText(file);
    }

    const clearForm = () => {
        setPath('');
        setMethod('');
        setResponse({});
    }

    const validatedFields = () => {
        let isValidPath: boolean = true;
        let isValidResponse: boolean = true;

        if (!path.startsWith('/')) {
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
        if (response === {}) {
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

    const addNewRoute = () => {
        if (validatedFields()) {
            apiService.postRoute(props.selectecApi._id, {
                path: path,
                method: method,
                response: response
            })
                .then(() => {
                    clearForm()
                    props.reloadApis();
                })
                .catch((error) => {
                    HandlerError.handler(error);
                });
        }
    }
    return (
        <View 
            method={method}
            path={path}
            handlerMethod={handlerMethod}
            handlerPath={handlerPath}
            handlerResponse={handlerResponse}
            addNewRoute={addNewRoute}
        />
    );

};


interface IViewProps {
    method: string;
    path: string;
    handlerMethod(method: any): void;
    handlerPath(path: string): void;
    handlerResponse(response: any): void;
    addNewRoute(): void;
}

const View = (props: IViewProps) => {
    return (
        <Form size={'tiny'}>
            <Form.Group widths='equal'>
                <Form.Select required fluid label='Method' placeholder='Http method'
                    options={options}
                    value={props.method}
                    onChange={(e, { value }) => props.handlerMethod(value)}
                />
                <Form.Input fluid required label='Path' placeholder='/path'
                    value={props.path}
                    onChange={(e) => props.handlerPath(e.target.value)}
                />
                {/* To DO */}
                <Form.Input fluid required label='Response' placeholder='Response' type={'file'}
                    onChange={(event) => props.handlerResponse(event.target.files[0])}
                />
            </Form.Group>
            <Grid>
                <Grid.Column textAlign="right">
                    <Button icon primary circular labelPosition={'left'}
                        onClick={props.addNewRoute}
                    >
                        <Icon name={"add"} />
                        Add new route
                    </Button>
                </Grid.Column>
            </Grid>

        </Form>
    );
}

export default AddRouteFormInLine;
