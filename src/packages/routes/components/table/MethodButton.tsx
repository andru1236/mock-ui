import React, { useState, Fragment } from 'react'
import { Label } from 'semantic-ui-react'

// Components
import UpdateResponseForm from '../forms/UpdateResponseForm'
import QueryParamsFeature from '../QueryParamsFeature';
import { IParam, IPath, IResource, IRoute } from "../../../../domain/api";
import { withPathConsumer, PathContextProps } from "../PathContext";


interface IMethodButtonProps extends PathContextProps {
    path: IPath
    resource: IResource;
}

const MethodButton = ({ path, resource, reloadSelectedApi, selectedApi, updateRoute, removeRoute, addParamToRoute, updateParamFromRoute, removeParamFromRoute }: IMethodButtonProps) => {

    const [open, setOpen] = useState(false);

    // FOR ROUTES
    const _updateResponseOfARoute = (_path: IPath, _resource: IResource) => {
        const currentRoute: IRoute = { path: _path.path, method: _resource.method }
        return (response: any) => {
            const currentRouteWithNewResponse: IRoute = { ...currentRoute, response }
            updateRoute(selectedApi._id, currentRouteWithNewResponse)
              .then(r => reloadSelectedApi());
        }
    }

    const _removeResponseOfARoute = (_path: IPath, _resource: IResource) => {
        return () => {
            removeRoute(selectedApi._id, { path: _path.path, method: _resource.method })
              .then(r => reloadSelectedApi())
        }
    }
    // FOR PARAMS
    const _addNewParam = (param: IParam) => {
        addParamToRoute(selectedApi._id, path._id, param)
          .then(r => reloadSelectedApi())
    };
    const _updateParam = (param: IParam) => {
        updateParamFromRoute(selectedApi._id, path._id, param)
          .then(r => reloadSelectedApi())
    };

    const _removeParam = ({ param }: IParam) => {
        removeParamFromRoute(selectedApi._id, path._id, param)
          .then(r => reloadSelectedApi())
    };


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
                  isOpen={ open }
                  resource={ resource }
                  path={ path }
                  selectedApi={ { name: '', port: 0 } }
                  reloadSelectedApi={ reloadSelectedApi }
                  submitUpdateResponseOfARoute={ _updateResponseOfARoute(path, resource) }
                  submitDeleteResponseOfARoute={ _removeResponseOfARoute(path, resource) }
                  submitAddParamToRoute={ _addNewParam }
                  submitUpdateResponseOfParam={ _updateParam }
                  submitDeleteParam={ _removeParam }
                  close={ () => setOpen(false) }
                /> :

                <UpdateResponseForm
                  isOpen={ open }
                  currentResource={ resource }
                  path={ path.path }
                  close={ () => setOpen(false) }
                  updateResponse={ _updateResponseOfARoute(path, resource) }
                  deleteResponse={ _removeResponseOfARoute(path, resource) }
                />

          }
      </Fragment>
    )


}

export default withPathConsumer(MethodButton);