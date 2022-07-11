import { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { verifyTokenFromRequest } from "../auth/handleToken";

export const apolloServer = async (app: Express) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginInlineTrace()],
    csrfPrevention: true,
    cache: "bounded",
    context: verifyTokenFromRequest,
  });
  await server.start();
  server.applyMiddleware({ app });
};
