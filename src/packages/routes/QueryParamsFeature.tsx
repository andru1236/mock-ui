import React, { useState, Fragment } from 'react'
import { Form, Button, Modal, Divider, Label } from 'semantic-ui-react'
// Components
import UpdateResponseForm from './forms/UpdateResponseForm';
import AddParamsFormInLine from './forms/AddParamsFormInLine';
import {IApiInstance, IPath, IResource} from "../../domain/api";

interface IViewProps {
    selectedApi: IApiInstance
    reloadApis():void;
    path: IPath;
    resource: IResource;
    updateResponse(response: any): any;
    close(): void;
}

const QueryParamsFeature = (props: IViewProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Fragment>
            <Modal.Header>{`Resource ${props.path.path}`} </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group>
                        <div>{`Method ${props.resource.method}`}</div>
                        <Modal
                            open={open}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            size='large'
                            trigger={
                                <Label as={'a'} color={'grey'}> Response </Label>
                            }
                        >
                            <UpdateResponseForm
                                path={props.path.path}
                                currentResource={props.resource}
                                updateResponse={() => ''}
                                deleteResponse={() => {}}
                                close={() => setOpen(false)}
                            />
                        </Modal>
                        
                    </Form.Group>
                </Form>
                <h3>{`Add Query Params`} </h3>
                <Divider />
                <AddParamsFormInLine
                    apiId={props.selectedApi._id}
                    routeId={props.path._id}
                    method={props.resource.method}
                    reloadApis={props.reloadApis}
                />
                <Divider />
                {/* <ParamsTable reloadApis={this.props.reloadApis} apiId={this.props.selectedApi._id} selectedResource={this.props.resource} route={this.props.route} /> */}
            </Modal.Content>
            <Modal.Actions>
                <Button content='Delete route' color={'red'} floated={'left'} />
                <Button content='Close' onClick={props.close} />
            </Modal.Actions>
        </Fragment>
    );
};

export default QueryParamsFeature;
