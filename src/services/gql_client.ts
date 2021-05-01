import {ApolloClient, InMemoryCache} from "@apollo/client";

const {REACT_APP_GQL_SERVER_URL} = process.env;

const gqlClient = new ApolloClient({
    uri: `${REACT_APP_GQL_SERVER_URL}`,
    cache: new InMemoryCache(),
});

// TODO: DEPRECATED
export const executeQuery = async (
    options: any,
    successCallback: any = null,
    errorCallback: any = null,
    withCache: boolean = false
) => {
    if (!withCache) {
        options.fetchPolicy = "no-cache";
    }

    return await gqlClient
        .query(options)
        .then((res) => {
            if (successCallback) {
                return successCallback(res);
            }

            return res;
        })
        .catch((error) => {
            if (errorCallback) {
                return errorCallback(error);
            }

            return error;
        });
};

export const executeMutation = async (
    options: any,
    successCallback: any = null,
    errorCallback: any = null
) => {
    return await gqlClient
        .mutate(options)
        .then((res) => {
            if (successCallback) {
                return successCallback(res);
            }

            return res;
        })
        .catch((error) => {
            if (errorCallback) {
                return errorCallback(error);
            }

            return error;
        });
};

export const executeMutationV2 = async (mutation: any, variables: any): Promise<any> => {
    const options = {mutation, variables};

    return new Promise((resolve, reject) => {
        gqlClient.mutate(options)
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
};

// TODO: THERE IS ERROR ON THIS I am not sure why
export const executeQueryV2 = async (query: any, variables: any): Promise<any> => {
    const options = {query, variables};
    return new Promise(((resolve, reject) => {
        gqlClient.query(options)
            .then(res => resolve(res))
            .catch(err => reject(err))
    }))
};

export const gql_client = {
    executeQuery,
    executeMutation,
};
