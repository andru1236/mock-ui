import React, { useState } from 'react'
import { Form, Button, Modal, Divider, Label } from 'semantic-ui-react'
import { IApiInstance, IParam, IPath, IResource } from "../../../../domain/api";

// Components
import FormUpdateResponse from '../forms/FormUpdateResponse';
import FormInLineAddParams from './FormInLineAddParams';
import TableParams from "./TableParams";

interface IViewProps {
    selectedApi: IApiInstance
    path: IPath;
    resource: IResource;
    isOpen: boolean;
    close (): void;
    reloadSelectedApi (): void;
    // PATHS
    submitUpdateResponseOfARoute (response: any): any;
    submitDeleteResponseOfARoute (): void;
    // PARAMS
    submitAddParamToRoute (param: IParam): any;
    submitUpdateResponseOfParam (param: IParam): any;
    submitDeleteParam (param: IParam): any;
}

const FormQueryParamsFeature = (props: IViewProps) => {
    const [open, setOpen] = useState(false);
    return (
      <Modal open={ props.isOpen }>
          <Modal.Header>{ `Resource ${ props.path.path }` } </Modal.Header>
          <Modal.Content>

              <Form>
                  <Form.Group>
                      <div>{ `Method ${ props.resource.method }` }</div>
                      <Label as={ 'a' } color={ 'grey' } onClick={ () => setOpen(true) }> Response </Label>
                      <FormUpdateResponse
                        isOpen={ open }
                        title={ props.path.path }
                        response={ props.resource.response }
                        updateResponse={ props.submitUpdateResponseOfARoute }
                        deleteResponse={ props.submitDeleteResponseOfARoute }
                        close={ () => setOpen(false) }
                      />
                  </Form.Group>
              </Form>


              <h3>{ `Add Query Params` } </h3>
              <Divider/>
              <FormInLineAddParams addNewParam={ props.submitAddParamToRoute }/>
              <Divider/>

              <TableParams
                route={ props.path }
                selectedResource={ props.resource }
                updateResponse={ props.submitUpdateResponseOfParam }
                deleteParam={ props.submitDeleteParam }
              />

          </Modal.Content>
          <Modal.Actions>
              <Button content='Delete route' color={ 'red' } floated={ 'left' }
                      onClick={ () => {
                          props.submitDeleteResponseOfARoute();
                          props.close();
                      } }/>
              <Button content='Close' onClick={ props.close }/>
          </Modal.Actions>
      </Modal>

    )
      ;
};

export default FormQueryParamsFeature;
