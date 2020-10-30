import * as React from 'react';
import {Modal, Form, Button} from "semantic-ui-react";
import {IApiInstance} from "../../../../domain/IApiInstance";


interface IViewProps {
    selectedApi: IApiInstance;
    name: string;
    port: number;
    isModalOpen: boolean;
    closeForm(): void;
    handleName(event: any): void;
    handlePort(event: any): void;
    updateApi(): void;
}

const UpdateApiForm = (props: IViewProps) => (
    <Modal open={props.isModalOpen}>
        <Modal.Header>Update api</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input
                        placeholder='Name'
                        value={props.name}
                        onChange={props.handleName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Port</label>
                    <input
                        placeholder='Port'
                        type='number'
                        value={props.port}
                        onChange={props.handlePort}
                    />
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={props.closeForm} negative>
                Close
            </Button>
            <Button
                onClick={() => props.updateApi()}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Update'
            />
        </Modal.Actions>
    </Modal>
);

export default UpdateApiForm
