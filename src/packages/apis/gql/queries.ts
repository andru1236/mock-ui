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

const listApis = gql`
  query listApis {
    apis {
      id
      name
    }
  }
`;

export const queries = {
  getApis,
  listApis
};