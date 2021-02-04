import React from "react";
import { Table } from "semantic-ui-react";

const TableApis = (params) => {
  return (
    <Table basic="very" celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Employee</Table.HeaderCell>
          <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );
};

export default TableApis;
