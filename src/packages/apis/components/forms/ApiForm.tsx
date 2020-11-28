import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "semantic-ui-react";

import emmitToastMessage from '../../../common/emmitToastMessage';
import { withApiConsumer, ApiContextProps } from "../ApiContext";

interface IViewProps extends ApiContextProps {
    isOpenModal: boolean;
    action?: string;
    closeForm (): void;
}

const ApiForm = ({ isOpenModal, action, closeForm, reloadApis, createApi, updateApi, selectedApi }: IViewProps) => {
    const [name, setName] = useState("");
    const [port, setPort] = useState(0);

    const handlerName = (event: any) => setName(event.target.value);
    const handlerPort = (event: any) => setPort(parseInt(event.target.value));

    const cleanFields = () => {
        setName('');
        setPort(0);
    };

    const ensureValidFields = () => {
        if ( name === '' && port === 0 ) {
            emmitToastMessage.error('Error on Fields', 'name should be a strings and port should be a number');
            return false;
        }
        return true;
    };

    const submitForm = async () => {
        if ( ensureValidFields() ) {
            switch (action.toUpperCase()) {
                case 'CREATE':
                    await createApi({ name: name, port: port });
                    break;
                case 'UPDATE':
                    const apiToUpdate = { ...selectedApi };
                    apiToUpdate.name = name;
                    apiToUpdate.port = port;
                    await updateApi(apiToUpdate);
                    break;
                default:
                    emmitToastMessage.error('UI error', 'Something wrong happened, call to Developers to fix it')
            }
            cleanFields();
            closeForm();
            reloadApis();
        }
    };

    useEffect(() => {
        setName(selectedApi.name);
        setPort(selectedApi.port);
    }, [selectedApi]);

    return (
      <Modal
        open={ isOpenModal }
      >
          <Modal.Header>Create new api</Modal.Header>
          <Modal.Content>
              <Form>
                  <Form.Field>
                      <label>Name</label>
                      <input
                        placeholder='Name'
                        onChange={ handlerName }
                        value={ name }
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Port</label>
                      <input
                        placeholder='Port'
                        type='number'
                        onChange={ handlerPort }
                        value={ port }
                      />
                  </Form.Field>
              </Form>
          </Modal.Content>
          <Modal.Actions>
              <Button onClick={ closeForm } negative>
                  Close
              </Button>
              <Button
                onClick={ submitForm }
                positive
                labelPosition='right'
                icon='checkmark'
                content={ action || 'Create/Update' }
              />
          </Modal.Actions>
      </Modal>);
};

export default withApiConsumer(ApiForm);