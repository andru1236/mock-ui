import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface IViewProps {
    open: boolean;
    closeForm(): void;
    callback(): any;
    title?: string;
    content?: string;
}

const AlertConfirmation = ({ open, closeForm, callback, title, content }: IViewProps) => {
    return (
        <Modal
            size={'tiny'}
            open={open}
            onClose={() => closeForm()}
        >
            <Modal.Header>{title || "Are your sure to do the action"}</Modal.Header>
            <Modal.Content>
                <p>{content}</p>
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
        </Modal >
    )
}

export default AlertConfirmation;