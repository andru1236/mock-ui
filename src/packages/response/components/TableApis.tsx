import React, { useEffect, useState } from "react";
import { Breadcrumb, Input, Segment, Table, BreadcrumbDividerProps } from "semantic-ui-react";
import { withResponseConsumer, ResponseContextProps } from "../ResponseContext";

const TableApis = ({ apis, selectedApi, selectApi, unSelectApi }: ResponseContextProps) => {
  const [foundApis, filterApis] = useState([]);
  const [foundRoutes, filterRoutes] = useState([]);
  const [specificRoute, setSpecificRoute] = useState({resources: []});
  const [search, setSearch] = useState("");

  const [apiActive, setApiActive] = useState(true);
  const [routeAtive, setRouteActive] = useState(false);
  const [resourceActive, setResourceActive] = useState(false);


  const searchHandler = (event: any) => {
    setSearch(event.target.value);
  };

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
            { key: "api", content: "Api", link: true, 
              onClick: () => { unSelectApi(); setApiActive(true); setRouteActive(false) } },
            { key: "route", content: "Route", link: true, 
              onClick: () => { setSpecificRoute({resources: []}); setApiActive(false); setRouteActive(true); setResourceActive(false);}},
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
            onClick = { () => {
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
          <Table.Cell>
            {resource.method}
          </Table.Cell>
        </Table.Row>
      ))
    }

  };

  return (
    <Segment.Group>
      <Segment>
        {renderMiniTabs()}
      </Segment>
      <Segment>
        <Input icon="search" placeholder="Search..." value={search} onChange={searchHandler} />
      </Segment>
      <Table celled selectable>
        <Table.Body>
          {renderTableContent()}
        </Table.Body>
      </Table>
    </Segment.Group>
  );
};

export default withResponseConsumer(TableApis);
