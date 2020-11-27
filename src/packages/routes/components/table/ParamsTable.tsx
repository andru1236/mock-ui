import React from 'react';
import { IParam, IPath, IResource } from "../../../../domain/api";
import { Table } from 'semantic-ui-react';
import ParamActionButtons from "./ParamActionButtons";

interface IViewProps {
    selectedResource: IResource;
    route: IPath;
    updateResponse (param: IParam): any;
    deleteParam (param: IParam): any;
}

const ParamsTable = (props: IViewProps) => (
  <Table compact={ 'very' } basic={ 'very' } celled collaping={ 'true' }>
      <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Query Params</Table.HeaderCell>
              <Table.HeaderCell>Response</Table.HeaderCell>
          </Table.Row>
      </Table.Header>

      <Table.Body>
          { props.selectedResource.params.map((param: IParam) => {
              return (
                <Table.Row verticalAlign='top' key={ param.param }>

                    <Table.Cell> { param.param }</Table.Cell>
                    <Table.Cell>
                        <ParamActionButtons
                          currentParam={param}
                          submitUpdateResponse={ () => {
                              return (response) =>{
                                  props.updateResponse({
                                      param: param.param,
                                      response
                                  })
                              }
                          } }
                          deleteParam={ () => {
                              return () => {
                                  props.deleteParam(param);
                              }
                          }}
                        />
                    </Table.Cell>
                </Table.Row>
              );
          }) }
      </Table.Body>
  </Table>
);

export default ParamsTable
