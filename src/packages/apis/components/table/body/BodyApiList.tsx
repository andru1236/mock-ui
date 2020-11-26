import React, { useState } from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";

import RemoveApiForm from '../../forms/RemoveApiForm';
import ApiForm from '../../forms/ApiForm';
import {IApiInstance} from "../../../../../domain/api";

interface IViewProps {
    apis: IApiInstance[];
    selectedApi: IApiInstance;
    goPathPage(apiId: string): void;
    startOrStopApi(data: any, apiId: string, port: number): void;
    selectApi(apiId: string): void;
    removeApi(): void;
    updateApi(): void
}


const BodyApiList = (props: IViewProps) => {
    const [isOpenDeleteApi, setIsOpenDeleteApi] = useState(false);
    const [isOpenUpdateApi, setIsOpenUpdateApi] = useState(false);

    const openUpdateApi = (apiId:string) => {
        props.selectApi(apiId);
        setIsOpenUpdateApi(true);
    }

    const openDeleteApi = (apiId: string) => {
        props.selectApi(apiId);
        setIsOpenDeleteApi(true);
    }

    return (
        <Table.Body>
            {props.apis.map((api: IApiInstance) => (
                <Table.Row key={api._id}>
                    <Table.Cell collapsing>
                        <Checkbox checked={api.settings.enabled} slider
                            onClick={(event, data) => props.startOrStopApi(data, api._id, api.port)}
                        />
                    </Table.Cell>
                    <Table.Cell>{api.name}</Table.Cell>
                    <Table.Cell>{api.port}</Table.Cell>
                    <Table.Cell>{api.routes.length} </Table.Cell>
                    <Table.Cell>
                        <Button basic size={'tiny'} color={'green'} onClick={() => props.goPathPage(api._id)}>
                            {"Rotes"}
                        </Button>
                        <Button basic size={'tiny'} color={'blue'} onClick={() => openUpdateApi(api._id)}>
                            {"Update Api"}
                        </Button>
                        <Button basic size={'tiny'} color={'red'} onClick={() => openDeleteApi(api._id)}>
                            {"Remove"}
                        </Button>

                    </Table.Cell>
                </Table.Row>
            ))}
            <RemoveApiForm
                selectedApi={props.selectedApi}
                isOpenModal={isOpenDeleteApi}
                removeApi={props.removeApi}
                closeForm={() => setIsOpenDeleteApi(false)}
            />
            <ApiForm
                isOpenModal={isOpenUpdateApi}
                closeForm={() => setIsOpenUpdateApi(false)}
                submitFunction={props.updateApi}
                action={'Update'}
                name={props.selectedApi.name}
                port={props.selectedApi.port}
            />
        </Table.Body>
    )
};

export default BodyApiList;
