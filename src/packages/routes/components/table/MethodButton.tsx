import React, { useState } from 'react'
import { Label, Modal } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts';
// Domain
// Services
import { apiServiceRest } from '../../../../services';
import { HandlerError } from '../../../common/HandlerError';
// Components
import UpdateResponseForm from '../forms/UpdateResponseForm'
import QueryParamsFeature from '../QueryParamsFeature';
import {IApiInstance, IPath, IResource} from "../../../../domain/api";


interface IMethodbuttonProps {
    path: IPath
    resource: IResource;
    reloadApis(): void;
}

const MethodButton = (props: IMethodbuttonProps) => {

    const [open, setOpen] = useState(false);

/*     const updateMainResponse = (response: any) => {
        if (response === {}) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error response',
                description: `Error on load json file `,
                animation: 'bounce',
                time: 5000,
            });
        } else {
            apiService.putRoute(props.selectedApi._id, {
                path: props.path.path,
                method: props.resource.method,
                response: response
            })
                .then(() => {
                    setOpen(false);
                    props.reloadApis();
                })
                .catch((error) => {
                    HandlerError.handler(error);
                })
        }
    };
 */
/*     const updateParamResponse = (response: any) => {
        if (response === {}) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error response',
                description: `Error on load json file `,
                animation: 'bounce',
                time: 5000,
            });
        } else {
            apiService.putParams(props.selectedApi._id, props.path._id, props.resource.method, {
                param: this.props.param.param,
                response: response
            })
                .then(() => {
                    this.props.reloadApis();
                    this.close();
                })
                .catch((error) => {
                    HandlerError.handler(error);
                });
        }
    } */

    const renderMethod = (resource: IResource) => {
        switch (resource.method) {
            case 'GET':
                return (<Label as={'a'} color={'green'}>GET</Label>);
            case 'POST':
                return (<Label as={'a'} color={'blue'}>POST</Label>);
            case 'PUT':
                return (<Label as={'a'} color={'violet'}>PUT</Label>);
            case 'DELETE':
                return (<Label as={'a'} color={'red'}>DELETE</Label>);
            default:
                return;
        }
    };

    return (
        <Modal
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            size='large'
            trigger={
                renderMethod(props.resource)
            }
        >
            {
                props.resource.method == 'GET' ?
                    <QueryParamsFeature
                        selectedApi={{name:'', port:0}}
                        reloadApis={props.reloadApis}
                        resource={props.resource}
                        path={props.path}
                        updateResponse={() => ''}
                        close={() => setOpen(false)}
                    /> :
                    <UpdateResponseForm
                        updateResponse={()=>{}}
                        currentResource={props.resource}
                        path={props.path.path}
                        close={() => setOpen(false)}
                        deleteResponse={() => {}}
                    />
            }
        </Modal>
    )
}

export default MethodButton;