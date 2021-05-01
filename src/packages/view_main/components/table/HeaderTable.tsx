import React from 'react';
import { Table } from 'semantic-ui-react';

const HeaderTable = () => (
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>NAME</Table.HeaderCell>
            <Table.HeaderCell>PORT</Table.HeaderCell>
            <Table.HeaderCell>Routes/Agent DB</Table.HeaderCell>
            <Table.HeaderCell>ACTIONS</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
);

export default HeaderTable;