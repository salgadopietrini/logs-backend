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
exports.resolvers = void 0;
const user_1 = require("../db/models/user");
const countries_json_1 = __importDefault(require("../assets/countries.json"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret_key = process.env.SECRET_KEY;
const username = process.env.LOGIN_USER;
const password = process.env.LOGIN_PASS;
exports.resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const profile = yield user_1.User.find();
                return profile;
            }
            catch (err) {
                console.log(err);
            }
        }),
        countries: () => countries_json_1.default,
        logIn: (_, args) => {
            if (args.username === username && args.password === password) {
                const newToken = jsonwebtoken_1.default.sign({ name: args.username, password: args.password }, secret_key);
                return {
                    token: newToken,
                    logged: true,
                };
            }
            else {
                return {
                    token: "",
                    logged: false,
                };
            }
        },
    },
    Mutation: {
        createUser: (_, { name, surname, country, birthday }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const profile = new user_1.User({ name, surname, country, birthday });
                yield profile.save();
                return profile;
            }
            catch (err) {
                console.log(err);
            }
        }),
        deleteUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield user_1.User.deleteOne({ _id: id });
                return yield user_1.User.countDocuments({ _id: id });
            }
            catch (err) {
                console.log(err);
            }
        }),
    },
};
//# sourceMappingURL=resolvers.js.map