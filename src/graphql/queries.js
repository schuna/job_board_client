// noinspection GraphQLUnresolvedReference

import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache()
});

const JOB_DETAIL_FRAGMENT = gql`
    fragment JobDetail on Job {
        id
        title
        company {
            id
            name
        }
        description
    }
`;

export const JOB_QUERY = gql`
    query JobQuery($id: ID!){
        job(id: $id) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export const JOBS_QUERY = gql`
    query {
        jobs {
            id
            title
            company {
                id
                name
            }
            description
        }
    }
`;

export const COMPANY_QUERY = gql`
    query CompanyQuery($id: ID!){
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
    }
`;

export const CREATE_JOB_MUTATION = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export async function createUser(input) {
    const mutation = gql`
        mutation createUserMutation($input: CreateUserInput!) {
            user: createUser(input: $input ) {
                id
                email
            }
        }
    `;
    const variables = {input};
    const {data: {user}} = await client.mutate({mutation, variables})
    return user;
}
