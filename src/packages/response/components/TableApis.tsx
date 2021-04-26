import React, { useEffect, useState } from "react";
import { Breadcrumb, Input, Segment, Table, Pagination } from "semantic-ui-react";
import { calculatePageNumber, getStartAndEndIndex } from "../../common/pagination_utils";
import { IPath } from "../../../domain/api";
import { withResponseConsumer, ResponseContextProps } from "../ResponseContext";

const SPECIFIC_ROUTE_DEFAULT: IPath = { path: "", resources: [] };


const TableApis = ({ apis, selectedApi, selectApi, unSelectApi, selectedRouteToUpdate, selectRouteToUpdate, numberItemsToShow }: ResponseContextProps) => {
  const [foundApis, filterApis] = useState([]);
  const [foundRoutes, filterRoutes] = useState([]);
  const [specificRoute, setSpecificRoute] = useState(SPECIFIC_ROUTE_DEFAULT);
  const [search, setSearch] = useState("");

  const [apiActive, setApiActive] = useState(true);
  const [routeActive, setRouteActive] = useState(false);
  const [resourceActive, setResourceActive] = useState(false);

  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItemsFound, setTotalItemsFound] = useState(0);

  const searchHandler = (event: any) => {
    setSearch(event.target.value);
  };

  const onPageChange = (e, pageInfo) => {
    e.preventDefault();
    if (typeof(pageInfo.activePage) === "number") {
        setActivePage(pageInfo.activePage);
    }
  };


  useEffect(() => {
    if (apiActive) {
      if (search === "") {
        const [start, end] = getStartAndEndIndex(activePage, numberItemsToShow);
        filterApis(apis.slice(start,end));
        setTotalPages(calculatePageNumber(apis.length, numberItemsToShow));
        setTotalItemsFound(apis.length);
      } else {
        const filteredApis = apis.filter(api => api.name.includes(search));
        const [start, end] = getStartAndEndIndex(activePage, numberItemsToShow);
        filterApis(filteredApis.slice(start, end));
        setTotalPages(calculatePageNumber(filteredApis.length, numberItemsToShow));
        setTotalItemsFound(filteredApis.length);
      }
    }
  }, [apis, search, numberItemsToShow, activePage, apiActive]);

  useEffect(() => {
    if (routeActive) {
      if (search === "") {
        const [start, end] = getStartAndEndIndex(activePage, numberItemsToShow);
        filterRoutes(selectedApi.routes.slice(start, end));
        setTotalPages(calculatePageNumber(selectedApi.routes.length, numberItemsToShow));
        setTotalItemsFound(selectedApi.routes.length);
      } else {
        const filteredRoutes = selectedApi.routes.filter(route => route.path.includes(search));
        const [start, end] = getStartAndEndIndex(activePage, numberItemsToShow);
        filterRoutes(filteredRoutes.slice(start, end));
        setTotalPages(calculatePageNumber(filteredRoutes.length, numberItemsToShow));
        setTotalItemsFound(filteredRoutes.length);
      }
    }

  }, [selectedApi, search, numberItemsToShow, activePage, routeActive]);

  // TODO: refactor, I am not sure what this do
  useEffect(() => {
    if (resourceActive) {
      if (selectedApi._id === "") {
        setApiActive(true);
        setRouteActive(false);
        selectRouteToUpdate({ path: "", method: "" });
      }
    }
  }, [selectedApi]);

  const renderMiniTabs = () => {
    if (apiActive) {
      return (<Breadcrumb icon="right angle" sections={[{ key: "api", content: `Api: ${totalItemsFound}`, active: true }]} />)
    }

    if (routeActive) {
      return (<Breadcrumb icon="right angle" sections={
        [
          { key: "api",
            content: "Api",
            link: true,
            onClick: () => {
              setRouteActive(false);
              unSelectApi();
              setApiActive(true);
              setSearch("");
          } },
          { key: "route", content: `Route: ${totalItemsFound}`, active: true }
        ]} />)
    }

    if (resourceActive) {
      return (
        <Breadcrumb icon="right angle" sections={
          [
            {
              key: "api", content: "Api", link: true,
              onClick: () => {
                unSelectApi();
                setApiActive(true);
                setRouteActive(false);
                selectRouteToUpdate({ path: "", method: "" });
              }
            },
            {
              key: "route", content: "Route", link: true,
              onClick: () => {
                setSpecificRoute(SPECIFIC_ROUTE_DEFAULT);
                setApiActive(false);
                setRouteActive(true);
                setResourceActive(false);
                selectRouteToUpdate({ path: "", method: "" })
              }
            },
            { key: "resource", content: "Resource", active: true }
          ]
        } />
      )
    }
  };

  const renderTableContent = () => {
    if (apiActive) {
      return foundApis.map((api) => (
        <Table.Row key={api._id}>
          <Table.Cell
            onClick={() => {
              selectApi(api._id);
              setApiActive(false);
              setRouteActive(true);
              setSearch("");
              filterApis(apis);
            }}
          >
            {api.name}
          </Table.Cell>
        </Table.Row>
      ))
    }

    if (routeActive) {
      return foundRoutes.map((route) => (
        <Table.Row key={route._id}>
          <Table.Cell
            onClick={() => {
              setSpecificRoute(route);
              setApiActive(false);
              setRouteActive(false);
              setResourceActive(true);
              setSearch("");
              filterRoutes(selectedApi.routes)
            }}
          >
            {route.path}
          </Table.Cell>
        </Table.Row>
      ))
    }

    if (resourceActive) {
      return specificRoute.resources.map((resource) => (
        <Table.Row key={resource.method}>
          {
            resource.method === selectedRouteToUpdate.method && specificRoute.path === selectedRouteToUpdate.path
              ?
              <Table.Cell positive>
                {resource.method}
              </Table.Cell>
              :
              <Table.Cell
                onClick={() => { selectRouteToUpdate({ path: specificRoute.path, method: resource.method }) }}
              >
                {resource.method}
              </Table.Cell>
          }

        </Table.Row>
      ))
    }

  };

  const renderPaginationContent = () => {
    if (!resourceActive){
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
      )}
    return null;
  };

  return (
    <Segment.Group>
      <Segment>
        {renderMiniTabs()}
      </Segment>
      <Segment style={{display:"flex", justifyContent:"center"}}>
        <Input icon="search" placeholder="Search..." value={search} onChange={searchHandler} />
      </Segment>
      <Table celled selectable>
        <Table.Body>
          {renderTableContent()}
        </Table.Body>
      </Table>
      {renderPaginationContent()}
    </Segment.Group>
  );
};

export default withResponseConsumer(TableApis);
