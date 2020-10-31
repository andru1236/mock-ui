import React, { useState, Fragment } from 'react'
import { Form, Button, Label, Modal } from 'semantic-ui-react'
import ReactJson from 'react-json-view';
import { IResource } from '../../../domain/IResource';


interface IViewProps {
    path: string;
    currentResource: IResource;
    updateResponse(response: any): void;
    deleteResponse(): void;
    close(): void;
}

const UpdateResponseForm = (props: IViewProps) => {
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
        <Fragment>
            <Modal.Header>
                {`Resource `}
                <Label>
                    {`${props.path}`}
                </Label>
            </Modal.Header>
            <Modal.Content>
                <Form.Input fluid required label='Response' placeholder='Response' type={'file'}
                    onChange={(event) => handlerResponse(event.target.files[0])}
                />
                <ReactJson src={props.currentResource.response} />
            </Modal.Content>
            <Modal.Actions>
                <Button content='Delete route' color={'red'} floated={'left'} onClick={deleteResponse}/> 
                <Button icon='check' content='Update Response' color={'green'} onClick={submitForm} />
                <Button content='Close' onClick={props.close} />
            </Modal.Actions>
        </Fragment>
    );
};

export default UpdateResponseForm;
