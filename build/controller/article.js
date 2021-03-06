"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../model/article");
class Article {
    add(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield article_1.default.add(ctx.request.fields);
            ctx.body = {
                code: 0,
                message: 'success'
            };
        });
    }
    all(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = yield article_1.default.all();
        });
    }
}
exports.default = new Article();
