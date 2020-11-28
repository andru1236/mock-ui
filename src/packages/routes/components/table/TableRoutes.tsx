import React from 'react'
import { Table } from 'semantic-ui-react'

import ButtonRestMethod from "./ButtonRestMethod";

import { withPathConsumer, PathContextProps } from "../PathContext";


const TableRoutes = ({ selectedApi }: PathContextProps) => (
  <Table compact={ 'very' } basic={ 'very' } celled collaping={ 'true' }>

      <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Path</Table.HeaderCell>
              <Table.HeaderCell>methods</Table.HeaderCell>
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
      </Table.Body>

  </Table>
);

export default withPathConsumer(TableRoutes);