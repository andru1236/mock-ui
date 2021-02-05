import React, { useEffect, useState } from "react";
import { Breadcrumb, Input, Segment, Table } from "semantic-ui-react";
import { withResponseConsumer, ResponseContextProps } from "./ResponseContext";

const TableApis = ({ apis }: ResponseContextProps) => {
  const [foundApis, filterApis] = useState([]);
  const [search, setSearch] = useState("");

  const searchHandler = (event: any) => {
    setSearch(event.target.value);
  };

  const sections = [
    { key: "api", content: "Api", link: true },
    { key: "route", content: "Route", link: true },
    { key: "resource", content: "Resource", active: true },
  ];

  useEffect(() => {
    if(apis.length === 0){
      filterApis(apis);
    } else {
      filterApis(apis.filter(api => api.name.includes(search)))
    }

  }, [apis, search]);


  return (
    <Segment.Group>
      <Segment>
        <Breadcrumb icon="right angle" sections={sections} />
      </Segment>
      <Segment>
        <Input icon="search" placeholder="Search..." value={search} onChange={searchHandler}/>
      </Segment>
      <Table celled selectable>
        <Table.Body>
          {foundApis.map((api) => (
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
