import React from 'react';
import {Button, Header, Modal, Icon} from "semantic-ui-react";
import {IApiInstance} from "../../../../domain/IApiInstance";

interface IViewProps {
    selectedApi: IApiInstance
    isOpenModal: boolean;
    removeApi(apiId: string): void;
    closeForm(): void;
}

const RemoveApiForm = (props: IViewProps) => (
    <Modal open={props.isOpenModal} basic size='small'>
        <Header icon='archive' content={`Are you sure to remove this api ${props.selectedApi.name}`}/>
        <Modal.Content>
            <p>
                This API has {props.selectedApi.routes.length} paths and run in {props.selectedApi.port}
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color='red' inverted onClick={props.closeForm}>
                <Icon name='remove'/> No
            </Button>
            <Button color='green' inverted onClick={() => props.removeApi(props.selectedApi._id)}>
                <Icon name='checkmark'/> Yes
            </Button>
        </Modal.Actions>
    </Modal>
);

export default RemoveApiForm;