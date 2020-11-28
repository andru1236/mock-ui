import React, { useState } from 'react';
import { Button, Form, Grid, Icon } from "semantic-ui-react";
import emmitToastMessage from "../../../common/emmitToastMessage";
import { IParam } from "../../../../domain/api";

interface IViewProps {
    addNewParam (param: IParam): void;
}

const FormInLineAddParams = ({ addNewParam }: IViewProps) => {
    const [param, setParams] = useState('');
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

    const validFields = () => {
        let isValidPath: boolean = true;
        let isValidResponse: boolean = true;

        if ( param.length === 0 ) {
            emmitToastMessage.error('Error on Params', `The param can't be empty `);
            isValidPath = false;
        }
        if ( response === {} ) {
            emmitToastMessage.error('Error response', `Error on load json file `);
            isValidResponse = false;
        }
        return isValidPath && isValidResponse;
    };

    const submitForm = (event: any) => {
        event.preventDefault();
        if ( validFields() ) {
            const newParam: IParam = { param: param, response: response }
            addNewParam(newParam);
            clearForm();
        }
    };

    return (
      <Form size={ 'tiny' }>
          <Form.Group widths='equal'>
              <Form.Input fluid required label='Params' placeholder='page=1&limit=10'
                          value={ param }
                          onChange={ (e) => handlerParams(e.target.value) }
              />
              <Form.Input fluid required label='Response' placeholder='Response' type={ 'file' }
                          onChange={ (event) => handlerResponse(event.target.files[0]) }
              />
          </Form.Group>
          <Grid>
              <Grid.Column textAlign="right">
                  <Button icon primary circular labelPosition={ 'left' }
                          onClick={ submitForm }
                  >
                      <Icon name={ "add" }/>
                      Add Params
                  </Button>
              </Grid.Column>
          </Grid>

      </Form>
    );
}


export default FormInLineAddParams;
