import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "semantic-ui-react";

import emmitToastMessage from '../../../common/emmitToastMessage';
import { IApiInstance } from "../../../../domain/api";
import { withApiConsumer } from "../ApiContext";

interface IViewProps {
    isOpenModal: boolean;
    action?: string;
    selectedApi: IApiInstance;
    closeForm (): void;
    reloadApis (): void;
    createApi (api): void;
    updateApi (api): void;
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

    const ensureValidFields = () => {
        if ( name === '' && port === 0 ) {
            emmitToastMessage.error('Error on Fields', 'name should be a strings and port should be a number');
            return false;
        }
        return true;
    };

    const submitForm = async () => {
        if ( ensureValidFields() ) {
            switch (props.action.toUpperCase()) {
                case 'CREATE':
                    await props.createApi({ name: name, port: port });
                    break;
                case 'UPDATE':
                    const apiToUpdate = { ...props.selectedApi };
                    apiToUpdate.name = name;
                    apiToUpdate.port = port;
                    await props.updateApi(apiToUpdate);
                    break;
                default:
                    emmitToastMessage.error('UI error', 'Something wrong happened, call to Developers to fix it')
            }
            cleanFields();
            props.closeForm();
            props.reloadApis();
        }
    };

    useEffect(() => {
        setName(props.selectedApi.name);
        setPort(props.selectedApi.port);
    }, [props]);

    return (
        <Modal
            open={ props.isOpenModal }
        >
            <Modal.Header>Create new api</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            placeholder='Name'
                            onChange={ handlerName }
                            value={ name }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Port</label>
                        <input
                            placeholder='Port'
                            type='number'
                            onChange={ handlerPort }
                            value={ port }
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={ props.closeForm } negative>
                    Close
                </Button>
                <Button
                    onClick={ submitForm }
                    positive
                    labelPosition='right'
                    icon='checkmark'
                    content={ props.action || 'Create/Update' }
                />
            </Modal.Actions>
        </Modal>);
};

export default withApiConsumer(ApiForm);