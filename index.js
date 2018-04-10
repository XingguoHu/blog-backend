"use strict";
exports.__esModule = true;
var Koa = require("koa");
var router_1 = require("./router");
var mongoose = require("mongoose");
var cors = require("koa2-cors");
var body = require("koa-better-body");
var app = new Koa();
mongoose.connect('mongodb://localhost/blog');
app.use(cors({
    origin: function (ctx) {
        console.log(ctx.url, ctx.origin);
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(body({}));
app.use(router_1["default"].routes());
app.listen(3030);
