import React from 'react';
import { Table } from 'semantic-ui-react';

const HeaderApiTable = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell />
      <Table.HeaderCell>NAME</Table.HeaderCell>
      <Table.HeaderCell>PORT</Table.HeaderCell>
      <Table.HeaderCell>NUMBER OR ROUTES</Table.HeaderCell>
      <Table.HeaderCell>API ACTIONS</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export default HeaderApiTable;