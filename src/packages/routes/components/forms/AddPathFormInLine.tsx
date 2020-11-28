import React, { useState } from 'react';
import { Button, Form, Grid, Icon } from "semantic-ui-react";
import emmitToastMessage from "../../../common/emmitToastMessage";
import { withPathConsumer, PathContextProps } from "../PathContext";
import { IRoute } from "../../../../domain/api";

const options = [
    { key: 'GET', text: 'GET', value: 'GET' },
    { key: 'POST', text: 'POST', value: 'POST' },
    { key: 'PUT', text: 'PUT', value: 'PUT' },
    { key: 'DELETE', text: 'DELETE', value: 'DELETE' },
];

const AddRouteFormInLine = ({ selectedApi, reloadSelectedApi, addNewRoute }: PathContextProps) => {

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

    const validFields = () => {
        let isValidPath: boolean = true;
        let isValidResponse: boolean = true;

        if ( !path.startsWith('/') ) {
            emmitToastMessage.error('Error on path', `The path should started with / `);
            isValidPath = false;
        }
        if ( response === {} ) {
            emmitToastMessage.error('Error response', `Error on load json file `);
            isValidResponse = false;
        }
        return isValidPath && isValidResponse;
    }

    const SubmitAddNewRoute = async () => {
        if ( validFields() ) {
            const newRoute: IRoute = { path, method, response };
            await addNewRoute(selectedApi._id, newRoute);
            clearForm();
            reloadSelectedApi();
        }
    }
    return (
      <View
        method={ method }
        path={ path }
        handlerMethod={ handlerMethod }
        handlerPath={ handlerPath }
        handlerResponse={ handlerResponse }
        submitForm={ SubmitAddNewRoute }
      />
    );

};


interface IViewProps {
    method: string;
    path: string;
    handlerMethod (method: any): void;
    handlerPath (path: string): void;
    handlerResponse (response: any): void;
    submitForm (): void;
}

const View = (props: IViewProps) => {
    return (
      <Form size={ 'tiny' }>
          <Form.Group widths='equal'>
              <Form.Select required fluid label='Method' placeholder='Http method'
                           options={ options }
                           value={ props.method }
                           onChange={ (e, { value }) => props.handlerMethod(value) }
              />
              <Form.Input fluid required label='Path' placeholder='/path'
                          value={ props.path }
                          onChange={ (e) => props.handlerPath(e.target.value) }
              />
              {/* To DO */ }
              <Form.Input fluid required label='Response' placeholder='Response' type={ 'file' }
                          onChange={ (event) => props.handlerResponse(event.target.files[0]) }
              />
          </Form.Group>
          <Grid>
              <Grid.Column textAlign="right">
                  <Button icon primary circular labelPosition={ 'left' }
                          onClick={ props.submitForm }
                  >
                      <Icon name={ "add" }/>
                      Add new route
                  </Button>
              </Grid.Column>
          </Grid>

      </Form>
    );
}

export default withPathConsumer(AddRouteFormInLine);
