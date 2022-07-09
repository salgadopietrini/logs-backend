import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    surname: String!
    country: String!
    birthday: String!
  }
  type Country {
    name: String!
    code: String!
  }

  type Query {
    users: [User]
    countries: [Country]
  }

  type Mutation {
    createUser(
      name: String!
      surname: String!
      country: String!
      birthday: String!
    ): User!
    deleteUser(id: ID!): Int!
  }
`;
