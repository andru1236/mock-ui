import React from "react";
import {Modal, Form, Button} from "semantic-ui-react";

interface IViewProps {
    isOpenModal: boolean;
    closeForm(): void
    handleName(event: any): void;
    handlePort(event: any): void;
    createApi(): void;
}


const CreateApiForm = (props: IViewProps) => (
    <Modal open={props.isOpenModal}>
        <Modal.Header>Create new api</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input
                        placeholder='Name'
                        onChange={props.handleName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Port</label>
                    <input
                        placeholder='Port'
                        type='number'
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
                onClick={() => props.createApi()}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Create'
            />
        </Modal.Actions>
    </Modal>
);

export default CreateApiForm;