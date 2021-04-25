import { gql } from '@apollo/client';

const createRoute = gql`
  mutation createRoute($apiId: String!, $path: String!, $method: String!, $response: JSON!) {
    createRoute(apiId: $apiId, path: $path, method: $method, response: $response)
  }
`;

const updateRoute = gql`
  mutation updateRoute($apiId: String!, $path: String!, $method: String!, $response: JSON!) {
    updateRoute(apiId: $apiId, path: $path, method: $method, response: $response)
  }
`;

const removeRoute = gql`
  mutation removeRoute($apiId: String!, $path: String!, $method: String!) {
    removeRoute(apiId: $apiId, path: $path, method: $method)
  }
`;

const createParams = gql`
  mutation createParams($apiId: String!, $routeId: String!, $method: String!, $param: String!, $response: JSON!) {
    createRouteParams(apiId: $apiId, routeId: $routeId, method: $method, param: $param, response: $response)
  }
`;

const updateParams = gql`
  mutation updateParams($apiId: String!, $routeId: String!, $method: String!, $param: String!, $response: JSON!) {
    updateRouteParams(apiId: $apiId, routeId: $routeId, method: $method, param: $param, response: $response)
  }
`;

const removeParams = gql`
  mutation removeParams($apiId: String!, $routeId: String!, $method: String!, $param: String!) {
    removeRouteParams(apiId: $apiId, routeId: $routeId, method: $method, param: $param)
  }
`;


export const mutations ={
  createRoute,
  updateRoute,
  removeRoute,
  createParams,
  updateParams,
  removeParams
};