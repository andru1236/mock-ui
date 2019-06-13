import React from 'react'
import {Table} from 'semantic-ui-react'
import ActionOneRoute from "./ActionOneRoute";
import {IApiInstance} from "../../../../../domain/IApiInstance";

interface IViewProps {
    selectedApi: IApiInstance;
    reloadApis(): void;
    closeForm(): void;
}

const TableExampleVerticalAlign = (props: IViewProps) => (
    <Table compact={'very'} basic={'very'} celled collaping={'true'}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Path</Table.HeaderCell>
                <Table.HeaderCell>methods</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {props.selectedApi.routes.map((route) => {
                return (
                    <Table.Row verticalAlign='top' key={route.path}>

                        <Table.Cell> {route.path}</Table.Cell>

                        <Table.Cell>
                            {route.resources.map((resource) => {
                                return (
                                    <ActionOneRoute
                                        resource={resource}
                                        path={route.path}
                                        apiId={props.selectedApi._id}
                                        reloadApis={props.reloadApis}
                                        closeForm={props.closeForm}
                                        key={resource.method}
                                    />
                                );
                            })}
                        </Table.Cell>
                    </Table.Row>
                );
            })}
        </Table.Body>
    </Table>
);

export default TableExampleVerticalAlign
