import React, { useState } from 'react'
import { Form, Button, Modal, Divider, Label } from 'semantic-ui-react'
// Components
import UpdateResponseForm from './forms/UpdateResponseForm';
import AddParamsFormInLine from './forms/AddParamsFormInLine';
import { IApiInstance, IPath, IResource } from "../../../domain/api";

interface IViewProps {
    selectedApi: IApiInstance
    path: IPath;
    resource: IResource;
    isOpen: boolean;
    close (): void;
    reloadSelectedApi (): void;
    submitUpdateResponseOfARoute (response: any): any;
    submitDeleteResponseOfARoute (): void;
    submitAddParamToRoute (param): any;
    submitUpdateResponseOfParam (response): any;
    submitDeleteResponseOfParam (param): any;
}

const QueryParamsFeature = (props: IViewProps) => {
    const [open, setOpen] = useState(false);
    return (
      <Modal open={ props.isOpen }>
          <Modal.Header>{ `Resource ${ props.path.path }` } </Modal.Header>
          <Modal.Content>

              <Form>
                  <Form.Group>
                      <div>{ `Method ${ props.resource.method }` }</div>
                      <Label as={ 'a' } color={ 'grey' } onClick={ () => setOpen(true) }> Response </Label>
                      <UpdateResponseForm
                        isOpen={ open }
                        path={ props.path.path }
                        currentResource={ props.resource }
                        updateResponse={ props.submitUpdateResponseOfARoute }
                        deleteResponse={ props.submitDeleteResponseOfARoute }
                        close={ () => setOpen(false) }
                      />
                  </Form.Group>
              </Form>


              <h3>{ `Add Query Params` } </h3>
              <Divider/>
              <AddParamsFormInLine
                addNewParam={ (param) => {
                    props.submitAddParamToRoute(param);
                    props.close();
                } }
              />
              <Divider/>


              {/* <ParamsTable reloadApis={this.props.reloadApis} apiId={this.props.selectedApi._id} selectedResource={this.props.resource} route={this.props.route} /> */ }
          </Modal.Content>
          <Modal.Actions>
              <Button content='Delete route' color={ 'red' } floated={ 'left' }
                      onClick={ props.submitDeleteResponseOfARoute }/>
              <Button content='Close' onClick={ props.close }/>
          </Modal.Actions>
      </Modal>

    )
      ;
};

export default QueryParamsFeature;
