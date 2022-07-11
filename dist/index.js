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
const env_1 = require("./env/env");
const config_1 = __importDefault(require("./db/config"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_2 = require("./apollo/config");
const chalk_1 = __importDefault(require("chalk"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)("dev"));
    app.use((0, helmet_1.default)({
        crossOriginEmbedderPolicy: !env_1.isDevelopment,
        contentSecurityPolicy: !env_1.isDevelopment,
    }));
    app.use((0, cors_1.default)());
    yield (0, config_2.apolloServer)(app);
    app.get("/", (_, res) => {
        res.send("Express/GraphQL and Typescript Server, made by Manuel Salgado Pietrini");
    });
    yield (0, config_1.default)();
    app.listen({ port: env_1.port }, () => {
        console.log(chalk_1.default.blue("Express/GraphQL and Typescript Server, made by Manuel Salgado Pietrini"));
        console.log(chalk_1.default.green(`Server is running at http://localhost:${env_1.port}`));
        console.log(chalk_1.default.yellow(`To experiment the queries and mutations at http://localhost:${env_1.port}/graphql
    you must comment line 15 on /apollo/config.ts, disabling token auth`));
    });
}))();
//# sourceMappingURL=index.js.map