import React from "react";
import { Breadcrumb, Input, Segment, Table } from "semantic-ui-react";

const TableApis = (params) => {
  const sections = [
    { key: "api", content: "Api", link: true },
    { key: "route", content: "Route", link: true },
    { key: "resource", content: "Resource", active: true },
  ];
  return (
    <Segment.Group>
      <Segment>
        <Breadcrumb icon="right angle" sections={sections} />
      </Segment>
      <Segment>
        <Input icon="search" placeholder="Search..." />
      </Segment>
      <Table celled selectable>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Employee</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Employee</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment.Group>
  );
};

export default TableApis;
