import React, { useState } from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";

// Domain
import { IApiInstance } from "../../../../domain/api";
import { withApiConsumer } from "../ApiContext";
import { withRouter } from "react-router-dom";

// Components
import RemoveApiForm from '../forms/RemoveApiForm';
import ApiForm from '../forms/ApiForm';

interface IViewProps {
    apis: IApiInstance[];
    selectedApi: IApiInstance;
    selectApi (apiId: string): void;
    removeApi (apiId: string): void;
    updateApi (apiId: string, name: string, port: string): void;
    reloadApis (): void;
    history: any;
}


const BodyApiList = (props: IViewProps) => {
    const [isOpenDeleteApi, setIsOpenDeleteApi] = useState(false);
    const [isOpenUpdateApi, setIsOpenUpdateApi] = useState(false);

    return (
        <Table.Body>
            { props.apis.map((api: IApiInstance) => (
                <Table.Row key={ api._id }>
                    <Table.Cell collapsing>
                        <Checkbox checked={ api.settings.enabled } slider

                        />
                    </Table.Cell>
                    <Table.Cell>{ api.name }</Table.Cell>
                    <Table.Cell>{ api.port }</Table.Cell>
                    <Table.Cell>{ api.routes.length } </Table.Cell>
                    <Table.Cell>
                        <Button basic size={ 'tiny' } color={ 'green' } onClick={ () => {
                            props.selectApi(api._id);
                            props.history.push(`/apis/${ api._id }/routes`);
                        } }>
                            { "Rotes" }
                        </Button>
                        <Button basic size={ 'tiny' } color={ 'blue' } onClick={ () => {
                            props.selectApi(api._id);
                            setIsOpenUpdateApi(true);
                        } }>
                            { "Update Api" }
                        </Button>
                        <Button basic size={ 'tiny' } color={ 'red' } onClick={ () => {
                            props.selectApi(api._id);
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
