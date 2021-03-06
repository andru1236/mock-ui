import { gql } from '@apollo/client';

const getApiById = gql`
  query getApi($apiId: String!) {
    api(id: $apiId) {
      id
      name
      port
      routes {
        id
        path
        resources {
          method
          response
          params {
            param
            response
          }
        }
      }
    }
  }
`;

export const queries ={
  getApiById
};