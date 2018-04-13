"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const article_1 = require("./controller/article");
const file_1 = require("./controller/file");
const router = new Router();
router.post('/article', article_1.default.add);
router.get('/article/all', article_1.default.all);
router.post('/upload', file_1.default.add);
exports.default = router;
