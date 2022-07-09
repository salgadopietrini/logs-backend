"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
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
//# sourceMappingURL=typeDefs.js.map