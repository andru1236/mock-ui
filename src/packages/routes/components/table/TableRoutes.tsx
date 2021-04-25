import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'semantic-ui-react'

// HOCs
import { withPathConsumer, PathContextProps } from "../PathContext";

// Components
import ButtonRestMethod from "./ButtonRestMethod";


// Env vars
const { REACT_APP_PAGE_LIMIT, REACT_APP_MAX_LIMIT } = process.env;
const PAGE_LIMIT = parseInt(REACT_APP_PAGE_LIMIT);
const MAX_NUM_LIMIT = parseInt(REACT_APP_MAX_LIMIT);


const TableRoutes = ({ selectedApi, reloadSelectedApi, configPage, routesLength, setConfigPage }: PathContextProps) => {
  const [lastActivePage, setLastActivePage] = useState(configPage.active);
  const [numberPages, setNumberPages] = useState(configPage.active);

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
        //reloadSelectedApi();
    }

    return configPage.active;
  }

  useEffect(() => {
      let numPages = ((routesLength % PAGE_LIMIT) == 0) ? 
          routesLength / PAGE_LIMIT : 
          (routesLength / PAGE_LIMIT) - ((routesLength % PAGE_LIMIT)/PAGE_LIMIT) + 1;
      setNumberPages(numPages);
      getActivePage();
  });

  const renderPaginationContent = () => {
    if (numberPages > 0) {
      return (
        <Table.Row>
          <Table.HeaderCell colSpan='5' style={{textAlign:"center"}}>
            <Pagination 
              activePage={getActivePage()}
              onPageChange={onPageChange}
              firstItem={null}
              lastItem={null}
              secundary
              totalPages={numberPages}
              style={{marginTop:"20px"}}
            />
          </Table.HeaderCell>
        </Table.Row>
      );
    }
  };

  return (
    <Table compact={ 'very' } basic={ 'very' } celled collaping={ 'true' }>  
      <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Path</Table.HeaderCell>
              <Table.HeaderCell>Methods</Table.HeaderCell>
          </Table.Row>
      </Table.Header>

      <Table.Body>
          { selectedApi.routes.map((path) => {
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