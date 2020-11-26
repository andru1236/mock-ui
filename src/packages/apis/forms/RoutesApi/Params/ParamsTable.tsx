import React from 'react'
import { Table } from 'semantic-ui-react'
import UpdateParam from './UpdateParam';
import {IPath, IResource} from "../../../../../domain/api";

interface IViewProps {
    selectedResource: IResource;
    apiId: string;
    route: IPath;
    reloadApis(): void;
}


const ParamsTable = (props: IViewProps) => (
    <Table compact={'very'} basic={'very'} celled collaping={'true'}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Query Params</Table.HeaderCell>
                <Table.HeaderCell>Response</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {props.selectedResource.params.map((param) => {
                return (
                    <Table.Row verticalAlign='top' key={param.param}>

                        <Table.Cell> {param.param}</Table.Cell>

                        <Table.Cell>
                            <UpdateParam
                                selectedResource={props.selectedResource}
                                apiId={props.apiId}
                                route={props.route}
                                param={param}
                                reloadApis={props.reloadApis}
                            />
                        </Table.Cell>
                    </Table.Row>
                );
            })}
        </Table.Body>
    </Table>
);

export default ParamsTable
