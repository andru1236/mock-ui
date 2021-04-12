import React, { useState } from 'react'
import { Form, Button, Label, Modal } from 'semantic-ui-react'
import ReactJson from 'react-json-view';
import emmitToastMessage from "../../../common/emmitToastMessage";

interface IViewProps {
  title: string;
  response: any;
  exportResponseAsJson (fileName:any): void;
  close (): void;
  isOpen: boolean;
}

const FormExportResponseJson = (props: IViewProps) => {
  const [filePathName, setfilePathName] = useState(null);
  const onFileNameChange = (value:any) => setfilePathName(value);

  const submitForm = (e: any) => {
    e.preventDefault();
    if (typeof props.response === "object" && props.response !== null && props.response !== undefined) {
      const filePath = filePathName;

      if (filePath != "" && filePath != null && filePath != undefined) {
        if (filePath.toLowerCase().endsWith('.json')) {
          props.exportResponseAsJson(filePath);
          props.close();
        }
        else {
          emmitToastMessage.error('Error on file name', `The file name should have a JSON extension.`);
        }
      }
      else {
        emmitToastMessage.error('Error on file name', `The file name is empty, enter a file name.`);
      }
    }
    else {
      emmitToastMessage.error('Error Json Content', 'Json content is invalid.')
    }
  };

  return (
    <Modal open={ props.isOpen }>
      <Modal.Header>
        { `Export Resource as JSON` }
        <Label>
            { `${ props.title }` }
        </Label>
      </Modal.Header>
      <Modal.Content>
        <Form.Input fluid required label='JSON File Name' name='fileName' placeholder='JSON File Name' type={ 'text' }
          onChange={ (e) => onFileNameChange(e.target.value) } />
        <Form.Field label='Response' placeholder='Response' />
        <ReactJson src={ props.response }/>
      </Modal.Content>
      <Modal.Actions>
        <Button icon='check' content='Export Response' color={ 'green' } onClick={ submitForm }/>
        <Button content='Close' onClick={ props.close }/>
      </Modal.Actions>
    </Modal>
  );
};

export default FormExportResponseJson;
