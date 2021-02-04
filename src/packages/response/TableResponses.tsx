import React from "react";
import { Input, Segment, Table } from "semantic-ui-react";

const TableResponse = (params) => {
  return (
    <Segment>
      <Input icon='search' placeholder='Search...' />
      <Table selectable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Responses</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>Testing</Table.Cell></Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default TableResponse;
