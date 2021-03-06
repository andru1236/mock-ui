import React, { useState } from 'react'
import { Form, Button, Label, Modal } from 'semantic-ui-react'
import ReactJson from 'react-json-view';


interface IViewProps {
    title: string;
    response: any;
    updateResponse (response: any): void;
    deleteResponse (): void;
    close (): void;
    isOpen: boolean;
}

const FormUpdateResponse = (props: IViewProps) => {
    const [response, setResponse] = useState({});

    const handlerResponse = (file: any) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setResponse(JSON.parse(event.target.result));
        }
        reader.readAsText(file);
    };

    const submitForm = (event: any) => {
        event.preventDefault();
        props.updateResponse(response);
        props.close();
    };

    const deleteResponse = (event: any) => {
        event.preventDefault();
        props.deleteResponse();
        props.close();
    }

    return (
      <Modal open={ props.isOpen }>
          <Modal.Header>
              { `Resource ` }
              <Label>
                  { `${ props.title }` }
              </Label>
          </Modal.Header>
          <Modal.Content>
              <Form.Input fluid required label='Response' placeholder='Response' type={ 'file' }
                          onChange={ (event) => handlerResponse(event.target.files[0]) }
              />
              <ReactJson src={ props.response }/>
          </Modal.Content>
          <Modal.Actions>
              <Button content='Delete route' color={ 'red' } floated={ 'left' } onClick={ deleteResponse }/>
              <Button icon='check' content='Update Response' color={ 'green' } onClick={ submitForm }/>
              <Button content='Close' onClick={ props.close }/>
          </Modal.Actions>
      </Modal>
    );
};

export default FormUpdateResponse;
