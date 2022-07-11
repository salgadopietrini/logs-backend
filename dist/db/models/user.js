"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const countries_json_1 = __importDefault(require("../../assets/countries.json"));
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, maxlength: 20 },
    surname: { type: String, required: true, maxlength: 20 },
    country: {
        type: String,
        required: true,
        maxlength: 20,
        enum: countries_json_1.default.map((country) => country.code),
    },
    birthday: { type: String, required: true, maxlength: 20 },
});
exports.User = (0, mongoose_1.model)("User", schema);
//# sourceMappingURL=user.js.map