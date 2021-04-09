import { ApolloClient, InMemoryCache } from "@apollo/client";

const { REACT_APP_GQL_SERVER_URL } = process.env;

const gqlClient = new ApolloClient({
  uri: `${REACT_APP_GQL_SERVER_URL}`,
  cache: new InMemoryCache()
});

// execute GQL Query
const executeQuery = async (options: any, successCallback: any = null, errorCallback: any = null, withCache: boolean = false) => {
  if (!withCache) {
    options.fetchPolicy = "no-cache";
  }

  return await gqlClient.query(options)
    .then(res => {
      if (successCallback) {
        return successCallback(res);
      }

      return res;
    })
    .catch(error => {
      if (errorCallback) {
        return errorCallback(error);
      }

      return error;
    });
};

// execute GQL Mutation
const executeMutation = async (options: any, successCallback: any = null, errorCallback: any = null) => {
  return await gqlClient.mutate(options)
    .then(res => {
      if (successCallback) {
        return successCallback(res);
      }

      return res;
    })
    .catch(error => {
      if (errorCallback) {
        return errorCallback(error);
      }

      return error;
    });
};

export const gqlService = {
  executeQuery,
  executeMutation
};
