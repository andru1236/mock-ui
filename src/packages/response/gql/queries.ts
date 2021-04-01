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

const getResponses = gql`
  query getResponses {
    responses {
      id
      name
      createdOn
      trackingAssignation {
        api {
          name
        }
      }
    }
  }
`;

export const queries = {
  getApis,
  getResponses
};