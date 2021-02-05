import React, { useEffect, useState } from "react";
import { Input, Segment, Table } from "semantic-ui-react";
import { withResponseConsumer, ResponseContextProps } from './ResponseContext'


const TableResponse = ({ responses }: ResponseContextProps) => {
  const [foundResponses, filterResponses] = useState([]);
  const [search, setSearch] = useState("");

  const searchHandler = (event: any) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search === "") {
      filterResponses(responses);
    } else {
      filterResponses(responses.filter(res => res.name.includes(search)))
    }

  }, [responses, search])

  return (
    <Segment>
      <Input icon="search" placeholder="Search..." value={search} onChange={searchHandler} />
      <Table selectable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Responses</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            foundResponses.map((response) => (
              <Table.Row key={response._id}>
                <Table.Cell>{response.name}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default withResponseConsumer(TableResponse);
