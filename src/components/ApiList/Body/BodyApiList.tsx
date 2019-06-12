import React from "react";
import {Table, Checkbox, Button} from "semantic-ui-react";
import {IApiInstance} from "../../../domain/IApiInstance";

interface IViewProps {
    apis: IApiInstance[];
    openRemoveModal(apiId: string): void;
}


const BodyApiList = (props: IViewProps) => (
    <Table.Body>
        {props.apis.map((api: IApiInstance) => (
            <Table.Row key={api._id}>
                <Table.Cell collapsing>
                    <Checkbox slider/>
                </Table.Cell>
                <Table.Cell>{api.name}</Table.Cell>
                <Table.Cell>{api.port}</Table.Cell>
                <Table.Cell>{api.routes.length} </Table.Cell>
                <Table.Cell>
                    <Button api_id={api._id} basic size={'tiny'} color={'green'}>
                        {"Rotes"}
                    </Button>
                    <Button basic size={'tiny'} color={'blue'}>
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
