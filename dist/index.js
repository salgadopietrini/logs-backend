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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
dotenv_1.default.config();
const port = process.env.PORT;
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    yield server.start();
    server.applyMiddleware({ app });
    try {
        yield mongoose_1.default.connect("mongodb+srv://admin:admin@cluster0.hizvx.mongodb.net/?retryWrites=true&w=majority");
        console.log("connected to MongoDB");
    }
    catch (err) {
        console.log(err);
    }
    app.listen({ port: port }, () => {
        console.log("Running in port", port);
    });
});
server();
//# sourceMappingURL=index.js.map