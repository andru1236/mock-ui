import React from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";
import { IApiInstance } from "../../../../domain/IApiInstance";

interface IViewProps {
    apis: IApiInstance[];
    openApiRoutesModal(apiId: string): void;
    openUpdateModal(apiId: string): void;
    openRemoveModal(apiId: string): void;
    startOrStopApi(data: any, apiId: string, port: number): void;
}


const BodyApiList = (props: IViewProps) => (
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
                    <Button basic size={'tiny'} color={'green'} onClick={() => props.openApiRoutesModal(api._id)}>
                        {"Rotes"}
                    </Button>
                    <Button basic size={'tiny'} color={'blue'} onClick={() => props.openUpdateModal(api._id)}>
                        {"Update Api"}
                    </Button>
                    <Button basic size={'tiny'} color={'red'} onClick={() => props.openRemoveModal(api._id)}>
                        {"Remove"}
                    </Button>
                </Table.Cell>
            </Table.Row>
        ))}
    </Table.Body>
);

export default BodyApiList;
