import React, { useEffect, useState } from 'react'
import {Table, Pagination, Label} from 'semantic-ui-react'
// Utils
import { calculatePageNumber, getStartAndEndIndex } from "../../../common/pagination_utils";

// HOCs
import { withPathConsumer, PathContextProps } from "../PathContext";

// Components
import ButtonRestMethod from "./ButtonRestMethod";


const TableRoutes = ({ selectedApi, routesToDisplay, numberOfRoutesToDisplay, setRoutesToDisplay, reloadSelectedApi }: PathContextProps) => {
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRoutes, setTotalRoutes] = useState(0);

  const onPageChange = (e, pageInfo) => {
    e.preventDefault();
    if (typeof(pageInfo.activePage) === "number") {
        setActivePage(pageInfo.activePage);
        const [start, end] = getStartAndEndIndex(pageInfo.activePage, numberOfRoutesToDisplay);
        setRoutesToDisplay(selectedApi.routes.slice(start,end));
    }
  };

  useEffect(() => {
      setTotalPages(calculatePageNumber(selectedApi.routes.length, numberOfRoutesToDisplay));
  }, [selectedApi, numberOfRoutesToDisplay]);

  useEffect(() => {
      setTotalRoutes(selectedApi.routes.length);
  }, [selectedApi]);

  const renderPaginationContent = () => {
    return (
    <Table.Row>
      <Table.HeaderCell colSpan='5' style={{textAlign:"center"}}>
        <Pagination
          activePage={activePage}
          onPageChange={onPageChange}
          firstItem={null}
          lastItem={null}
          secundary
          totalPages={totalPages}
          style={{marginTop:"20px"}}
        />
      </Table.HeaderCell>
    </Table.Row>
    )
  };

  return (
    <Table compact={ 'very' } basic={ 'very' } celled collaping={ 'true' }>  
      <Table.Header>
          <Table.Row>
              <Table.HeaderCell>
                  Path
                  <Label circular={true} color={"green"} style={{margin: "4px"}}> Total </Label>
                  <Label circular={true} color={"green"}>{totalRoutes}</Label>
              </Table.HeaderCell>
              <Table.HeaderCell>Methods</Table.HeaderCell>
          </Table.Row>
      </Table.Header>

      <Table.Body>
          { routesToDisplay.map((path) => {
              return (
                <Table.Row verticalAlign='top' key={ path.path }>
                    <Table.Cell> { path.path }</Table.Cell>
                    <Table.Cell>
                        { path.resources.map((resource) => {
                            return (
                              <ButtonRestMethod
                                key={ resource.method }
                                path={ path }
                                resource={ resource }
                              />
                            );
                        }) }
                    </Table.Cell>
                </Table.Row>
              );
          }) }
          {renderPaginationContent()}
      </Table.Body>
    </Table>
  );
}

export default withPathConsumer(TableRoutes);