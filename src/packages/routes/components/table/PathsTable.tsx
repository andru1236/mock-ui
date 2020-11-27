import React from 'react'
import { Table } from 'semantic-ui-react'

import MethodButton from "./MethodButton";

import { withPathConsumer, PathContextProps } from "../PathContext";


const PathsTable = ({ selectedApi, reloadSelectedApi }: PathContextProps) => (
  <Table compact={ 'very' } basic={ 'very' } celled collaping={ 'true' }>

      <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Path</Table.HeaderCell>
              <Table.HeaderCell>methods</Table.HeaderCell>
          </Table.Row>
      </Table.Header>

      <Table.Body>
          { selectedApi.routes.map((route) => {
              return (
                <Table.Row verticalAlign='top' key={ route.path }>
                    <Table.Cell> { route.path }</Table.Cell>
                    <Table.Cell>
                        { route.resources.map((resource) => {
                            return (
                              <MethodButton
                                resource={ resource }
                                key={ resource.method }
                                path={ route }
                                reloadSelectedApi={ reloadSelectedApi }
                              />
                            );
                        }) }
                    </Table.Cell>
                </Table.Row>
              );
          }) }
      </Table.Body>

  </Table>
);

export default withPathConsumer(PathsTable);