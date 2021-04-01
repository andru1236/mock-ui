import { gql } from '@apollo/client';

const createRoute = gql`
  mutation createRoute($apiId: String!, $path: String!, $method: String!, $response: String!) {
    createRoute(apiId: $apiId, path: $path, method: $method, response: $response) {
      apiId
      path
      method
      response
    }
  }
`;

export const mutations ={
  createRoute
};