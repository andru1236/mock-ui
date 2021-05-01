import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import emmitToastMessage from "../../../common/emmitToastMessage";
import { createDevice } from "../../sources/gql";
import { withDeviceConsumer, DeviceContextProps } from "../DeviceContext";


interface IViewProps extends DeviceContextProps {
    floated?: "right" | "left";
}

const ButtonCreateDevice = ({ reloadDevices, floated }: IViewProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [port, setPort] = useState(0);

    const handlerName = (event: any) => setName(event.target.value);
    const handlerPort = (event: any) => setPort(parseInt(event.target.value));

    const cleanFields = () => {
        setName('');
        setPort(0);
    };


    const ensureValidFields = () => {
        if (name === '' && port === 0) {
            emmitToastMessage.error('Error on Fields', 'name should be a strings and port should be a number');
            return false;
        }
        return true;
    };

    const submitForm = async (event) => {
        event.preventDefault();
        if (ensureValidFields()) {
            await createDevice(name, port);
            await reloadDevices();
            cleanFields();
            setIsOpen(false);
        }
    };

    return (
        <>
            <Button
                color={"orange"}
                onClick={() => setIsOpen(true)}
                floated={floated}
                size={"small"}
            >
                Create Device
            </Button>
            <Modal
                open={isOpen}
            >
                <Modal.Header>Create device</Modal.Header>
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
                    <Button onClick={() => setIsOpen(false)} negative>
                        Close
              </Button>
                    <Button
                        onClick={submitForm}
                        positive
                        labelPosition='right'
                        icon='checkmark'
                        content={'Create'}
                    />
                </Modal.Actions>

            </Modal>
        </>
    );
};

export default withDeviceConsumer(ButtonCreateDevice);
