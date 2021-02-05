import React, { useEffect, useState } from "react";
import { Breadcrumb, Input, Segment, Table } from "semantic-ui-react";
import { withResponseConsumer } from "./ResponseContext";
import { getApis } from "./sources";

const TableApis = ({apis}) => {
  // const [apis, setApis] = useState([]);

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
          {apis.map((api) => (
            <Table.Row key={api._id}>
              <Table.Cell>{api.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment.Group>
  );
};

export default withResponseConsumer(TableApis);
