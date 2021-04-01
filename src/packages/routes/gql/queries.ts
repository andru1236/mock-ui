import { gql } from '@apollo/client';

const getApiById = gql`
  query getApi($apiId: String!) {
    api(id: $apiId) {
      id
      name
      port
      settings {
        enabled
        created_on
      }
      routes {
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