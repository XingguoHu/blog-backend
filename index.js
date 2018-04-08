"use strict";
exports.__esModule = true;
var Koa = require("koa");
var router_1 = require("./router");
var mongoose = require("mongoose");
var app = new Koa();
mongoose.connect('mongodb://localhost/blog');
app.use(router_1["default"].routes());
app.listen(3030);
