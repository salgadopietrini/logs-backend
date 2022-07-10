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
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret_key = process.env.SECRET_KEY;
const username = process.env.LOGIN_USER;
const password = process.env.LOGIN_PASS;
const apolloServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginInlineTrace)()],
        csrfPrevention: true,
        cache: "bounded",
        context: ({ req }) => {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            const operation = req.body.operationName;
            if (!token) {
                if (operation === "LogIn") {
                    console.log("checking credentials...");
                    if (req.body.variables.username === username &&
                        req.body.variables.password === password) {
                        return;
                    }
                    else {
                        throw new Error("User or password wrong");
                    }
                }
                throw new Error("Missing authorization header");
            }
            const decoded = jsonwebtoken_1.default.verify(token, secret_key);
            if (decoded.name !== username || decoded.password !== password) {
                throw new Error("Invalid token");
            }
        },
    });
    yield server.start();
    server.applyMiddleware({ app });
});
exports.apolloServer = apolloServer;
//# sourceMappingURL=config.js.map