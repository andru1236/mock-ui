import React from 'react';
import { Table } from 'semantic-ui-react';

const HeaderApiTable = () => (
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell/>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Number of paths</Table.HeaderCell>
            <Table.HeaderCell>Api actions</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
);

export default HeaderApiTable;