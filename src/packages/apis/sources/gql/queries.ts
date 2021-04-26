import { gql } from '@apollo/client';

const getApis = gql`
  query getApis($limit: Int, $next: Int) {
    apis(limit: $limit, next: $next) {
      id
      name
      port
      settings {
        enabled
        createdOn
      }
      routes {
        id
      }
    }
  }
`;

const searchOneApi = gql`
  query searchOneApi($apiId: String!){
    api(id: $apiId){
      id
      name
      port
      routes{
        id
        path
        resources{
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

const getAllApisByName = gql`
  query getAllApisByName {
    apis {
      id
      name
    }
  }
`;

const listApis = gql`
  query listApis {
    apis {
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

const countAllApis = gql`
  query countAllApis {
    countApis
  }
`;

export const queries = {
  getApis,
  listApis,
  searchOneApi,
  countAllApis,
  getAllApisByName
};