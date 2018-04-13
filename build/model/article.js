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
const mongoose = require("mongoose");
class Article {
    constructor(mongoose) {
        const articleSchema = new mongoose.Schema({
            desc: '',
            title: '',
            content: ''
        });
        this.Article = mongoose.model('article', articleSchema);
    }
    add(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = new this.Article(params);
            yield article.save();
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Article.find();
        });
    }
}
exports.default = new Article(mongoose);
