"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var article_1 = require("./controller/article");
var router = new Router();
router.post('/article', article_1["default"].add);
router.get('/article/all', article_1["default"].all);
exports["default"] = router;
