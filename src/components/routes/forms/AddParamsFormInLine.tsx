import React, { useState } from 'react';
import { Button, Form, Grid, Icon } from "semantic-ui-react";
import { toast } from 'react-semantic-toasts';
import { apiService } from "../../../services";
import { HandlerError } from "../../utils/HandlerError";

interface IViewProps {
    apiId: string;
    routeId: string;
    method: string;
    reloadApis(): void;
}

interface IViewState {
    params: string;
    response: any;
}

const AddParamsFormInLine = (props: IViewProps) => {
    const [params, setParams] = useState('');
    const [response, setResponse] = useState({});

    const handlerParams = (value: string) => setParams(value);
    const handlerResponse = (file: any) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setResponse(JSON.parse(event.target.result));
        };
        reader.readAsText(file);
    };

    const clearForm = () => {
        setParams('');
        setResponse({});
    };

    const validatedFields = () => {
        let isValidPath: boolean = true;
        let isValidResponse: boolean = true;

        if (params.length === 0) {
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
    };

    const addNewParam = () => {
        if (validatedFields()) {
            apiService.postParams(props.apiId, props.routeId, props.method, {
                param: params,
                response: response
            })
                .then(() => {
                    clearForm();
                    props.reloadApis();
                })
                .catch((error) => {
                    HandlerError.handler(error);
                });
        }
    };

    return (
        <Form size={'tiny'}>
            <Form.Group widths='equal'>
                <Form.Input fluid required label='Params' placeholder='page=1&limit=10'
                    value={params}
                    onChange={(e) => handlerParams(e.target.value)}
                />
                <Form.Input fluid required label='Response' placeholder='Response' type={'file'}
                    onChange={(event) => handlerResponse(event.target.files[0])}
                />
            </Form.Group>
            <Grid>
                <Grid.Column textAlign="right">
                    <Button icon primary circular labelPosition={'left'}
                        onClick={addNewParam}
                    >
                        <Icon name={"add"} />
                        Add Params
                    </Button>
                </Grid.Column>
            </Grid>

        </Form>
    );
}


export default AddParamsFormInLine;
