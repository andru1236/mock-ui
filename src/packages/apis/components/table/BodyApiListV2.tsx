import React, { useState } from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";

// Domain
import { IApiInstance } from "../../../../domain/api";
// HOCs
import { withApiConsumer, ApiContextProps } from "../ApiContext";
import { withRouter } from "react-router-dom";

// Components
import RemoveApiForm from '../forms/RemoveApiForm';
import ApiForm from '../forms/ApiForm';
import emmitToastMessage from "../../../common/emmitToastMessage";

interface IViewProps extends ApiContextProps {
    history: any;
}


const BodyApiList = ({ apis, startApi, stopApi, reloadApis, selectApi, history }: IViewProps) => {
    const [isOpenDeleteApi, setIsOpenDeleteApi] = useState(false);
    const [isOpenUpdateApi, setIsOpenUpdateApi] = useState(false);

    const startOrStopApi = async (isNotRunning, api) => {
        if ( isNotRunning ) {
            await startApi(api._id);
            emmitToastMessage.success('Launch Api instance', `Exist new api that is executing on port ${ api.port }`);

        } else {
            await stopApi(api._id);
            emmitToastMessage.warning('Stop api instance', `The api instance with port ${ api.port } was stopped`);
        }
        await reloadApis();
    }

    return (
      <Table.Body>
          { apis.map((api: IApiInstance) => (
            <Table.Row key={ api._id }>
                <Table.Cell collapsing>
                    <Checkbox checked={ api.settings.enabled } slider
                              onClick={ (event, data) => startOrStopApi(data.checked, api) }
                    />
                </Table.Cell>
                <Table.Cell>{ api.name }</Table.Cell>
                <Table.Cell>{ api.port }</Table.Cell>
                <Table.Cell>{ api.routes.length } </Table.Cell>

                <Table.Cell>
                    <Button basic size={ 'tiny' } color={ 'green' } onClick={ () => {
                        selectApi(api._id);
                        history.push(`/apis/${ api._id }/routes`);
                    } }>
                        { "Rotes" }
                    </Button>
                    <Button basic size={ 'tiny' } color={ 'blue' } onClick={ () => {
                        selectApi(api._id);
                        setIsOpenUpdateApi(true);
                    } }>
                        { "Update Api" }
                    </Button>
                    <Button basic size={ 'tiny' } color={ 'red' } onClick={ () => {
                        selectApi(api._id);
                        setIsOpenDeleteApi(true);
                    } }>
                        { "Remove" }
                    </Button>

                </Table.Cell>
            </Table.Row>
          )) }

          <RemoveApiForm
            isOpenModal={ isOpenDeleteApi }
            closeForm={ () => setIsOpenDeleteApi(false) }
          />

          <ApiForm
            isOpenModal={ isOpenUpdateApi }
            closeForm={ () => setIsOpenUpdateApi(false) }
            action={ 'Update' }
          />

      </Table.Body>
    )
};

export default withApiConsumer(withRouter(BodyApiList));
