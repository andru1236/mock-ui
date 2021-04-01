import { gql } from '@apollo/client';

const getApis = gql`
  query getApis {
    apis {
      id
      name
      port
      settings {
        enabled
        createdOn
      }
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

const getApiById = gql`
  query getApi($apiId: String!) {
    api(id: $apiId) {
      id
      name
      port
      settings {
        enabled
        createdOn
      }
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
  getApis,
  getApiById
};