"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const mongoose = require("mongoose");
const cors = require("koa2-cors");
const body = require("koa-better-body");
const app = new Koa();
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
app.use(router_1.default.routes());
app.listen(3030);
