"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type User {
    id: ID!
    name: String!
    surname: String!
    country: String!
    birthday: String!
  }

  type CountryName {
    en: String!
    pt: String!
  }

  type Country {
    name: CountryName!
    code: String!
  }

  type LogIn {
    token: String!
    logged: Boolean!
  }

  type Query {
    users: [User]!
    countries: [Country]!
    logIn(username: String!, password: String!): LogIn!
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
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map