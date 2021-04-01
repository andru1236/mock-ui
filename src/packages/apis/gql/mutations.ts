import { gql } from '@apollo/client';

const createAPI = gql`
  mutation createAPI($name: String!, $port: Int!) {
    createAPI(name: $name, port: $port) {
      name 
      port
    }
 }
`;

export const mutations ={
  createAPI
};