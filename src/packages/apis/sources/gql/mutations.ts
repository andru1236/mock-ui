import { gql } from '@apollo/client';

const createAPI = gql`
  mutation createAPI($name: String!, $port: Int!) {
    createAPI(name: $name, port: $port)
 }
`;

const updateAPI = gql`
  mutation updateAPI($apiId: String!, $name: String!, $port: Int!) {
    updateAPI(apiId: $apiId, name: $name, port: $port)
 }
`;

const removeAPI = gql`
  mutation removeAPI($apiId: String!) {
    removeAPI(apiId: $apiId)
 }
`;

const startAPI = gql`
  mutation startAPI($apiId: String!) {
    startAPI(apiId: $apiId)
 }
`;

const stopAPI = gql`
  mutation stopAPI($apiId: String!) {
    stopAPI(apiId: $apiId)
 }
`;

export const mutations ={
  createAPI,
  updateAPI,
  removeAPI,
  startAPI,
  stopAPI
};