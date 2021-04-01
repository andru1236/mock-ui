import { gql } from '@apollo/client';

const createResponse = gql`
  mutation createResponse($name: String!, $response: JSON) {
    createResponse(name: $name, response: $response) {
      name
      response
    }
  }
`;

const updateResponse = gql`
  mutation updateResponse($responseId: String!, $name: String!, $response: JSON) {
    updateResponse(responseId: $responseId, name: $name, response: $response) {
      responseId
      name
      response
    }
  }
`;

const removeResponse = gql`
  mutation removeResponse($responseId: String!) {
    removeResponse(responseId: $responseId) {
      responseId
    }
  }
`;

const assignResponseToApi = gql`
  mutation assignResponseToApi($responseId: String!, $apiId: String!, $path: String!, $method: String!) {
    assignResponseToApi(responseId: $responseId, apiId: $apiId, path: $path, method: $method) {
      responseId
      apiId
      path
      method
    }
  }
`;


export const mutations = {
  createResponse,
  updateResponse,
  removeResponse,
  assignResponseToApi
};