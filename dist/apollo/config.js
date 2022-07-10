"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
const apolloServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginInlineTrace)()],
        /*     csrfPrevention: true,
        cache: "bounded", */
        /*    context: ({ req }) => {
          const token = req.headers.authorization?.replace("Bearer ", "");
          if (!token) throw new Error("Missing authorization header");
          const decoded = jwt.verify(token, "HFvwsdh2#KU-zWl");
          console.log(decoded);
        
          console.log({ decoded, newToken });  */
        /*       const user = getUser(token);
          if (!user) throw new AuthenticationError("Yu must be logged in");
          return { loggedIn: true }; */
        /*   }, */
    });
    yield server.start();
    server.applyMiddleware({ app });
});
exports.apolloServer = apolloServer;
//# sourceMappingURL=config.js.map