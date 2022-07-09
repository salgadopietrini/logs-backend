import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    name: String!
    surname: String!
    country: String!
  }

  type Mutation {
    createUser(name: String!, surname: String!, country: String!): User!
  }
`;
