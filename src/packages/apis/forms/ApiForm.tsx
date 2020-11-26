import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "semantic-ui-react";

import emmitToastMessage from '../../common/emmitToastMessage';

interface IViewProps {
    isOpenModal: boolean;
    closeForm(): void
    submitFunction(name: string, port: number): void;
    action?: string;
    name?: string;
    port?: number;
}

const ApiForm = (props: IViewProps) => {
    const [name, setName] = useState("");
    const [port, setPort] = useState(0);

    const handlerName = (event: any) => setName(event.target.value);
    const handlerPort = (event: any) => setPort(parseInt(event.target.value));

    const cleanFields = () => {
        setName('');
        setPort(0);
    };

    const guardClause = () => {
        if (name === '' && port === 0) {
            emmitToastMessage.error('Error on Fields', 'name should be a strings and port should be a number');
            return false;
        }
        return true;
    };

    const submitForm = () => {
        if (guardClause()) {
            props.submitFunction(name, port);
            cleanFields();
            props.closeForm();
        }
    };

    useEffect( () => {
        console.log(props);
        setName(props.name);
        setPort(props.port);
    }, [props]);

    return (
        <Modal
         open={props.isOpenModal}
        >
            <Modal.Header>Create new api</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            placeholder='Name'
                            onChange={handlerName}
                            value={name}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Port</label>
                        <input
                            placeholder='Port'
                            type='number'
                            onChange={handlerPort}
                            value={port}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.closeForm} negative>
                    Close
                </Button>
                <Button
                    onClick={submitForm}
                    positive
                    labelPosition='right'
                    icon='checkmark'
                    content={props.action || 'Create/Update'}
                />
            </Modal.Actions>
        </Modal>);
};

export default ApiForm;