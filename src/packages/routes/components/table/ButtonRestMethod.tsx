import React, { useState, Fragment } from 'react'
import { Label } from 'semantic-ui-react'

import { IParam, IPath, IResource, IRoute } from "../../../../domain/api";
import { withPathConsumer, PathContextProps } from "../PathContext";

// Sources
import { updateRoute, removeRoute, addParamToRoute, updateParamFromRoute, removeParamFromRoute } from "../../sources/gql";

// Components
import FormUpdateResponse from '../forms/FormUpdateResponse'
import FormQueryParamsFeature from '../feat_query_params/FormQueryParamsFeature';


interface IMethodButtonProps extends PathContextProps {
    path: IPath
    resource: IResource;
}

const ButtonRestMethod = ({path, resource, reloadSelectedApi, selectedApi }: IMethodButtonProps) => {

    const [open, setOpen] = useState(false);

    const __updateResponseOfARoute = (response: any) => {
        const currentRoute: IRoute = { path: path.path, method: resource.method }
        const currentRouteWithNewResponse: IRoute = { ...currentRoute, response }
        updateRoute(selectedApi._id, currentRouteWithNewResponse)
          .then(r => reloadSelectedApi());
    }
    const __removeResponseOfARoute = () => {
        removeRoute(selectedApi._id, { path: path.path, method: resource.method })
          .then(r => reloadSelectedApi())
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
                <FormQueryParamsFeature
                  isOpen={ open }
                  resource={ resource }
                  path={ path }
                  selectedApi={ { name: '', port: 0 } }
                  reloadSelectedApi={ reloadSelectedApi }
                  submitUpdateResponseOfARoute={ __updateResponseOfARoute }
                  submitDeleteResponseOfARoute={ __removeResponseOfARoute }
                  submitAddParamToRoute={ _addNewParam }
                  submitUpdateResponseOfParam={ _updateParam }
                  submitDeleteParam={ _removeParam }
                  close={ () => setOpen(false) }
                /> :

                <FormUpdateResponse
                  isOpen={ open }
                  response={ resource.response }
                  title={ path.path }
                  close={ () => setOpen(false) }
                  updateResponse={ __updateResponseOfARoute }
                  deleteResponse={ __removeResponseOfARoute }
                />

          }
      </Fragment>
    )


}

export default withPathConsumer(ButtonRestMethod);