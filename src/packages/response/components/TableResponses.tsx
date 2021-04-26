import React, { useEffect, useState } from "react";
import { Input, Segment, Table, Pagination, Label } from "semantic-ui-react";
import { calculatePageNumber, getStartAndEndIndex } from "../../common/pagination_utils";
import { withResponseConsumer, ResponseContextProps } from '../ResponseContext'


const TableResponse = ({ responses, selectResponse, numberItemsToShow, responsesToDisplay, setResponsesToDisplay, reloadResponses, setResponses }: ResponseContextProps) => {
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchHandler = (event: any) => {
    setSearch(event.target.value);
  };

  const onPageChange = (e, pageInfo) => {
    e.preventDefault();
    if (typeof(pageInfo.activePage) === "number") {
      setActivePage(pageInfo.activePage);
      const [start, end] = getStartAndEndIndex(pageInfo.activePage, numberItemsToShow);
      setResponsesToDisplay(responses.slice(start, end));
    }
  };

  useEffect(() =>{
    setTotalPages(calculatePageNumber(responses.length, numberItemsToShow));
  }, [responses]);

  useEffect(() => {
    const [start, end] = getStartAndEndIndex(activePage, numberItemsToShow);
    if (search === "") {
      reloadResponses();
      setResponsesToDisplay(responses.slice(start,end));
    } else {
      const filteredResponses = responses.filter(res => res.name.includes(search));
      setResponses(filteredResponses);
      setResponsesToDisplay(filteredResponses.slice(start,end));
    }

  }, [search]);

  const renderPaginationContent = () => {
    return (
      <Segment style={{display:"flex", justifyContent:"center"}}>
        <Pagination
          defaultActivePage={activePage}
          onPageChange={onPageChange}
          firstItem={null}
          lastItem={null}
          secundary
          totalPages={totalPages}
          className="pagination"
        />
      </Segment>
    )
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
            <Table.HeaderCell>
              Responses

              <Label circular={true} color={'green'} style={{margin: "3px"}}>Total</Label>
              <Label circular={true} color={'green'} >{responses.length}</Label>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            responsesToDisplay.map((response) => (
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
