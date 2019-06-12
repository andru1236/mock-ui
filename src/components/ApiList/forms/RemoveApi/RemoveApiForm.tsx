import React from 'react';
import {Button, Header, Modal, Icon} from "semantic-ui-react";

interface IViewProps {
    isOpenModal: boolean;
    removeApi(apiId: string): void;
    closeForm(): void;
}

const RemoveApiForm = (props: IViewProps) => (
    <Modal open={props.isOpenModal} basic size='small'>
        <Header icon='archive' content='Are you sure to remove this api' />
        <Modal.Content>
            <p>
                Your inbox is getting full, would you like us to enable automatic archiving of old messages?
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color='red' inverted onClick={props.closeForm}>
                <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted>
                <Icon name='checkmark' /> Yes
            </Button>
        </Modal.Actions>
    </Modal>
);

export default RemoveApiForm;