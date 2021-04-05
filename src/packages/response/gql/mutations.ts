import { gql } from '@apollo/client';

const createResponse = gql`
  mutation createResponse($name: String!, $response: JSON) {
    createResponse(name: $name, response: $response)
  }
`;

const updateResponse = gql`
  mutation updateResponse($responseId: String!, $name: String!, $response: JSON) {
    updateResponse(responseId: $responseId, name: $name, response: $response)
  }
`;

const removeResponse = gql`
  mutation removeResponse($responseId: String!) {
    removeResponse(responseId: $responseId)
  }
`;

const assignResponseToApi = gql`
  mutation assignResponseToApi($responseId: String!, $apiId: String!, $path: String!, $method: String!) {
    assignResponseToApi(responseId: $responseId, apiId: $apiId, path: $path, method: $method)
  }
`;


export const mutations = {
  createResponse,
  updateResponse,
  removeResponse,
  assignResponseToApi
};