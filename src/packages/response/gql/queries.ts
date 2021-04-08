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

const getResponses = gql`
  query getResponses($limit: Int, $next: Int) {
    responses(limit: $limit, next: $next) {
      id
      name
      createdOn
      trackingAssignation {
        api {
          id
          name
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

const listResponses = gql`
  query listResponses {
    responses {
      id
      name
    }
  }
`;

export const queries = {
  getApis,
  getResponses,
  listApis,
  listResponses
};