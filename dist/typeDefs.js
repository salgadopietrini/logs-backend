"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
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
//# sourceMappingURL=typeDefs.js.map