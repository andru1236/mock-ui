import React from 'react';
import {Modal, Button} from 'semantic-ui-react';

interface IViewProps {
    open: boolean;
    closeForm(): void;
    deviceName: String;
    callback(): void;
}

const ConfirmRemoveDevice = ({open, closeForm, deviceName, callback}: IViewProps) => {
    return (
        <Modal
            size={'tiny'}
            open={open}
            onClose={() => closeForm()}
        >
            <Modal.Header>{"Are your sure to do remove the device"}</Modal.Header>
            <Modal.Content>
                <p>{`if you remove the device: ${deviceName}, you will not able to restore the device`}</p>
            </Modal.Content>
            <Modal.Actions>

                <Button negative onClick={() => closeForm()}>
                    No
                </Button>

                <Button positive onClick={() => {
                    callback();
                    closeForm();
                }}>
                    Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConfirmRemoveDevice;