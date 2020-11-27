import React from 'react';
import { IPath, IResource } from "../../../../domain/api";
import { Table } from 'semantic-ui-react';
import ParamActionButtons from "./ParamActionButtons";

interface IViewProps {
    selectedResource: IResource;
    route: IPath;
    updateResponse (resposne): any;
    deleteParam (param): any;
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
          { props.selectedResource.params.map((param) => {
              return (
                <Table.Row verticalAlign='top' key={ param.param }>

                    <Table.Cell> { param.param }</Table.Cell>
                    <Table.Cell>
                        <ParamActionButtons
                          path={ props.route }
                          resource={ props.selectedResource }
                          submitUpdateResponse={ props.updateResponse }
                          deleteParam={ () => props.deleteParam(param.param) }
                        />
                    </Table.Cell>
                </Table.Row>
              );
          }) }
      </Table.Body>
  </Table>
);

export default ParamsTable
