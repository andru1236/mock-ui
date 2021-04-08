import React, { useEffect, useState } from "react";
import { Breadcrumb, Input, Segment, Table, Pagination } from "semantic-ui-react";
import { IPath } from "../../../domain/api";
import { withResponseConsumer, ResponseContextProps } from "../ResponseContext";

const SPECIFIC_ROUTE_DEFAULT: IPath = { path: "", resources: [] };
const { REACT_APP_PAGE_LIMIT, REACT_APP_MAX_LIMIT } = process.env;
const PAGE_LIMIT = parseInt(REACT_APP_PAGE_LIMIT);
const MAX_NUM_LIMIT = parseInt(REACT_APP_MAX_LIMIT);

const TableApis = ({ apis, selectedApi, selectApi, unSelectApi, selectedRouteToUpdate, selectRouteToUpdate, reloadApis, configPage, apisLength, setConfigPage }: ResponseContextProps) => {
  const [foundApis, filterApis] = useState([]);
  const [foundRoutes, filterRoutes] = useState([]);
  const [specificRoute, setSpecificRoute] = useState(SPECIFIC_ROUTE_DEFAULT);
  const [search, setSearch] = useState("");

  const [apiActive, setApiActive] = useState(true);
  const [routeAtive, setRouteActive] = useState(false);
  const [resourceActive, setResourceActive] = useState(false);
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
        console.log(configPage);
        setLastActivePage(configPage.active);
        reloadApis();
    }

    return configPage.active;
  }

  useEffect(() => {
      let numPages = ((apisLength % PAGE_LIMIT) == 0) ? 
          apisLength / PAGE_LIMIT : 
          Math.round(apisLength / PAGE_LIMIT) + 1;
      setNumberPages(numPages);
      getActivePage();
  });

  useEffect(() => {
    if (apiActive) {
      if (search === "") {
        filterApis(apis);
      } else {
        filterApis(apis.filter(api => api.name.includes(search)))
      }
    }
  }, [apis, search]);

  useEffect(() => {
    if (routeAtive) {
      if (search === "") {
        filterRoutes(selectedApi.routes);
      } else {
        filterRoutes(selectedApi.routes.filter(route => route.path.includes(search)))
      }
    }

  }, [selectedApi, search]);

  // TODO: refactor
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
      return (<Breadcrumb icon="right angle" sections={[{ key: "api", content: "Api", active: true }]} />)
    }
    if (routeAtive) {
      return (<Breadcrumb icon="right angle" sections={
        [
          { key: "api", content: "Api", link: true, onClick: () => { unSelectApi(); setApiActive(true); setRouteActive(false) } },
          { key: "route", content: "Route", active: true }
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

    if (routeAtive) {
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
    if (numberPages > 0) {
      return (
        <Segment style={{display:"flex", justifyContent:"center"}}>
          <Pagination 
            defaultActivePage={getActivePage()}
            onPageChange={onPageChange}
            firstItem={null}
            lastItem={null}
            secundary
            totalPages={numberPages}
          />
        </Segment>
      );
    }
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
