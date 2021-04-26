import React from 'react';
import { Button, Header, Modal, Icon } from "semantic-ui-react";

// sources
import { cloneApi } from "../../sources/gql";

// HOCs
import { withApiConsumer, ApiContextProps } from "../ApiContext";
import emmitToastMessage from "../../../common/emmitToastMessage";

interface IViewProps extends ApiContextProps {
  isOpenModal: boolean;
  closeForm (): void;
}

const ConfirmCloneApi = ({ isOpenModal, closeForm, selectedApi, reloadApis }: IViewProps) => {
  const cloneSelectedApi = async () => {
    await cloneApi(selectedApi);
    closeForm();
    emmitToastMessage.success('Clone Api', `Clone Api ${selectedApi.name} successfully.`);
    reloadApis();
  };

  return (
    <Modal open={ isOpenModal } basic size='small'>
    <Header icon='clone' content={ `Are you sure to clone this api ${ selectedApi.name }?` }/>

    <Modal.Content>
      <p>This API has { selectedApi.routes.length } paths and run in { selectedApi.port }</p>
    </Modal.Content>

    <Modal.Actions>
      <Button basic color='red' inverted onClick={ closeForm }>
        <Icon name='remove'/> No
      </Button>
      <Button color='red' inverted onClick={ cloneSelectedApi }>
        <Icon name='checkmark'/> Yes
      </Button>
    </Modal.Actions>
  </Modal>
  )
};

export default withApiConsumer(ConfirmCloneApi);
