import React, { useEffect, useState } from "react";
import { Input, Segment, Table, Pagination } from "semantic-ui-react";
import { withResponseConsumer, ResponseContextProps } from '../ResponseContext'

const { REACT_APP_PAGE_LIMIT, REACT_APP_MAX_LIMIT } = process.env;


const PAGE_LIMIT = parseInt(REACT_APP_PAGE_LIMIT);
const MAX_NUM_LIMIT = parseInt(REACT_APP_MAX_LIMIT);

const TableResponse = ({ responses, selectResponse, reloadResponses, configPage, responsesLength, setConfigPage }: ResponseContextProps) => {
  const [foundResponses, filterResponses] = useState([]);
  const [search, setSearch] = useState("");
  const [lastActivePage, setLastActivePage] = useState(configPage.active);
  const [numberPages, setNumberPages] = useState(configPage.active);

  const searchHandler = (event: any) => {
    setSearch(event.target.value);
  };

  const onPageChange = (e, pageInfo) => {
    e.preventDefault();
    if (typeof(pageInfo.activePage) === "number") {
      let next = ((pageInfo.activePage - 1) * PAGE_LIMIT);
      next = (next >= 0 && next < MAX_NUM_LIMIT) ? next : configPage.next;
      setConfigPage({ active:pageInfo.activePage, next:next });
    }
  };

  const getActivePage = () => {
    if (lastActivePage != configPage.active) {
        setLastActivePage(configPage.active);
        reloadResponses();
    }

    return configPage.active;
  }

  useEffect(() => {
      let numPages = ((responsesLength % PAGE_LIMIT) == 0) ? 
          responsesLength / PAGE_LIMIT : 
          (responsesLength / PAGE_LIMIT) - ((responsesLength % PAGE_LIMIT)/PAGE_LIMIT) + 1;
      setNumberPages(numPages);
      getActivePage();
  });

  useEffect(() => {
    if (search === "") {
      filterResponses(responses);
    } else {
      filterResponses(responses.filter(res => res.name.includes(search)))
    }

  }, [responses, search]);

  const renderPaginationContent = () => {
    if (numberPages > 1) {
      return (
        <Segment style={{display:"flex", justifyContent:"center"}}>
          <Pagination 
            defaultActivePage={getActivePage()}
            onPageChange={onPageChange}
            firstItem={null}
            lastItem={null}
            secundary
            totalPages={numberPages}
            className="pagination"
          />
        </Segment>
      );
    }
  };

  return (
    <Segment.Group>
    <Segment style={{display:"flex", justifyContent:"center"}}>
      <Input icon="search" placeholder="Search..." value={search} onChange={searchHandler} />
    </Segment>
    <Segment>
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
                <Table.Cell onClick={() => selectResponse(response._id)}>{response.name}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </Segment>
    {renderPaginationContent()}
    </Segment.Group>
  );
};

export default withResponseConsumer(TableResponse);
