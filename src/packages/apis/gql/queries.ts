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

export const queries = {
  getApis
};