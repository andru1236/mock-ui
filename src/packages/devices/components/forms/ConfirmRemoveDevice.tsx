import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import emmitToastMessage from "../../../common/emmitToastMessage";
import { withDeviceConsumer, DeviceContextProps } from "../../../devices/components/DeviceContext";
import { removeDevice } from "../../sources/gql";
import { IDevice } from "../../../../domain/device";

interface IViewProps extends DeviceContextProps {
    open: boolean;
    closeForm(): void;
    device: IDevice;
}

const ConfirmRemoveDevice = ({ open, closeForm, device, reloadDevices }: IViewProps) => {

    const removeAction = async () => {
        const response = await removeDevice(device.id);
        if (response) {
            emmitToastMessage.success("Sucessfull action", "Device was removed");
            await reloadDevices();
        } else {
            emmitToastMessage.error("Something wrong in the reponse", "Probably the device was not removed")
        }
    }

    return (
        <Modal
            size={'tiny'}
            open={open}
            onClose={() => closeForm()}
        >
            <Modal.Header>{"Are your sure to do remove the device"}</Modal.Header>
            <Modal.Content>
                <p>{`if you remove the device: [${device.name}] you will not able to restore the device \n Device id [${device.id}]`}</p>
            </Modal.Content>
            <Modal.Actions>

                <Button negative onClick={() => closeForm()}>
                    No
                </Button>

                <Button positive onClick={async () => {
                    await removeAction();
                    closeForm();
                }}>
                    Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default withDeviceConsumer(ConfirmRemoveDevice);