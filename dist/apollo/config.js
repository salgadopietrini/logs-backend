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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const handleToken_1 = require("../auth/handleToken");
const apolloServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginInlineTrace)()],
        csrfPrevention: true,
        cache: "bounded",
        context: handleToken_1.verifyTokenFromRequest,
    });
    yield server.start();
    server.applyMiddleware({ app });
});
exports.apolloServer = apolloServer;
//# sourceMappingURL=config.js.map