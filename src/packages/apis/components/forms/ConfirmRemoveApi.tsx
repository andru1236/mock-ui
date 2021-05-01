import React from 'react';
import { Button, Header, Modal, Icon } from "semantic-ui-react";

// sources
import { removeApi } from "../../sources/gql";

// HOCs
import { withApiConsumer, ApiContextProps } from "../ApiContext";

interface IViewProps extends ApiContextProps {
    isOpenModal: boolean;
    closeForm(): void;
}

const ConfirmRemoveApi = ({ isOpenModal, closeForm, selectedApi, reloadApis }: IViewProps) => (
    <Modal open={isOpenModal} basic size='small'>
        <Header icon='archive' content={`Are you sure to remove this api ${selectedApi.name}`} />

        <Modal.Content>
            <p>This API has {selectedApi.routes.length} paths and run in {selectedApi.port}</p>
        </Modal.Content>

        <Modal.Actions>
            <Button basic color='red' inverted onClick={closeForm}>
                <Icon name='remove' /> No
          </Button>

            <Button color='red' inverted onClick={
                async () => {
                    closeForm();
                    await removeApi(selectedApi._id);
                    await reloadApis();
                }
            }>
                <Icon name='checkmark' /> Yes
          </Button>

        </Modal.Actions>
    </Modal>
);
export default withApiConsumer(ConfirmRemoveApi);
