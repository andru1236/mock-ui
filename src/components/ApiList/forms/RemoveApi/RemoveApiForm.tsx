import React from 'react';
import {Button, Header, Modal, Icon} from "semantic-ui-react";


const RemoveApiForm = (props: any) => (
    <Modal trigger={props.showRemoveApiModal} basic size='small'>
        <Header icon='archive' content='Are you sure to remove this api' />
        <Modal.Content>
            <p>
                Your inbox is getting full, would you like us to enable automatic archiving of old messages?
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color='red' inverted>
                <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted>
                <Icon name='checkmark' /> Yes
            </Button>
        </Modal.Actions>
    </Modal>
);

export default RemoveApiForm;