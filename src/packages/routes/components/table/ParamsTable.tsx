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

const ParamsTable = ({ selectedResource, updateResponse, deleteParam }: IViewProps) => {

    return (
      <Table compact={ 'very' } basic={ 'very' } celled collaping={ 'true' }>
          <Table.Header>
              <Table.Row>
                  <Table.HeaderCell>Query Params</Table.HeaderCell>
                  <Table.HeaderCell>Response</Table.HeaderCell>
              </Table.Row>
          </Table.Header>

          <Table.Body>
              { selectedResource.params.map((param: IParam) => {
                  return (
                    <Table.Row verticalAlign='top' key={ param.param }>

                        <Table.Cell> { param.param }</Table.Cell>
                        <Table.Cell>
                            <ParamActionButtons
                              currentParam={ param }
                              submitUpdateResponse={ (response) => {
                                  updateResponse({
                                      param: param.param,
                                      response
                                  })
                              } }
                              deleteParam={ () => {
                                  deleteParam(param);
                              } }
                            />
                        </Table.Cell>
                    </Table.Row>
                  );
              }) }
          </Table.Body>
      </Table>
    )
};

export default ParamsTable
