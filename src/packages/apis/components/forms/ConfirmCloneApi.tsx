import React from 'react';
import { Button, Header, Modal, Icon } from "semantic-ui-react";
import { withApiConsumer, ApiContextProps } from "../ApiContext";
import emmitToastMessage from "../../../common/emmitToastMessage";

interface IViewProps extends ApiContextProps {
  isOpenModal: boolean;
  closeForm (): void;
}

const ConfirmCloneApi = ({ isOpenModal, closeForm, selectedApi, reloadApis, cloneApi }: IViewProps) => {
  const onCloneApi = async () => {
    await cloneApi(selectedApi);
    await reloadApis();
    closeForm();
    emmitToastMessage.success('Clone Api', `Clone Api ${selectedApi.name} successfully.`);
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
      <Button color='red' inverted onClick={ onCloneApi }>
        <Icon name='checkmark'/> Yes
      </Button>
    </Modal.Actions>
  </Modal>
  )
};

export default withApiConsumer(ConfirmCloneApi);
