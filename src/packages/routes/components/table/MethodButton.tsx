import React, { useState, Fragment } from 'react'
import { Label, Modal } from 'semantic-ui-react'

// Components
import UpdateResponseForm from '../forms/UpdateResponseForm'
import QueryParamsFeature from '../QueryParamsFeature';
import { IPath, IResource, IRoute } from "../../../../domain/api";
import { withPathConsumer, PathContextProps } from "../PathContext";


interface IMethodbuttonProps extends PathContextProps {
    path: IPath
    resource: IResource;
}

const MethodButton = ({ path, resource, reloadSelectedApi, selectedApi, updateRoute, removeRoute }: IMethodbuttonProps) => {

    const [open, setOpen] = useState(false);

    const updateResponseOfARoute = (_path: IPath, _resource: IResource) => {
        const currentRoute: IRoute = { path: _path.path, method: _resource.method }
        return (response: any) => {
            const currentRouteWithNewResponse: IRoute = { ...currentRoute, response }
            updateRoute(selectedApi._id, currentRouteWithNewResponse)
              .then(r => reloadSelectedApi());
        }
    }

    const removeResponseOfARoute = (_path: IPath, _resource: IResource) => {
        return () => {
            removeRoute(selectedApi._id, { path: _path.path, method: _resource.method })
              .then(r => reloadSelectedApi())
        }
    }

    const renderMethod = (resource: IResource) => {
        switch (resource.method) {
            case 'GET':
                return (<Label as={ 'a' } color={ 'green' } onClick={ () => setOpen(true) }>GET</Label>);
            case 'POST':
                return (<Label as={ 'a' } color={ 'blue' } onClick={ () => setOpen(true) }>POST</Label>);
            case 'PUT':
                return (<Label as={ 'a' } color={ 'violet' } onClick={ () => setOpen(true) }>PUT</Label>);
            case 'DELETE':
                return (<Label as={ 'a' } color={ 'red' } onClick={ () => setOpen(true) }>DELETE</Label>);
            default:
                return;
        }
    };

    return (
      <Fragment>
          { renderMethod(resource) }
          {
              resource.method === 'GET' ?
                <QueryParamsFeature
                  isOpen={open}
                  selectedApi={ { name: '', port: 0 } }
                  reloadApis={ reloadSelectedApi }
                  resource={ resource }
                  path={ path }
                  updateResponse={ () => '' }
                  close={ () => setOpen(false) }
                /> :

                <UpdateResponseForm
                  isOpen={ open }
                  updateResponse={ updateResponseOfARoute(path, resource) }
                  currentResource={ resource }
                  path={ path.path }
                  close={ () => setOpen(false) }
                  deleteResponse={ removeResponseOfARoute(path, resource) }
                />

          }
      </Fragment>
    )


}

export default withPathConsumer(MethodButton);