import React from 'react'
import { Table } from 'semantic-ui-react'
import { IResource } from '../../../../../domain/IResource';
import UpdateResponse from './UpdateResponse';

interface IViewProps {
    selectedResource: IResource;
    path: string;
    // reloadApis(): void;
    // closeForm(): void;
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
                            <UpdateResponse
                                resource={props.selectedResource}
                                path={`${props.path}?${param.param}`}
                                color={'green'}
                            // apiId={props.selectedApi._id}
                            // reloadApis={props.reloadApis}
                            // closeForm={props.closeForm}
                            // key={resource.method}
                            />
                        </Table.Cell>
                    </Table.Row>
                );
            })}
        </Table.Body>
    </Table>
);

export default ParamsTable
