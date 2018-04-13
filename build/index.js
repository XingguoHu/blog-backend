"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const mongoose = require("mongoose");
const cors = require("koa2-cors");
const body = require("koa-better-body");
const serve = require("koa-static");
const path = require("path");
const staticPath = './static';
const app = new Koa();
mongoose.connect('mongodb://localhost/blog');
app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(serve(path.join(`${__dirname}`, '../', staticPath)));
app.use(body());
app.use(router_1.default.routes());
app.listen(3030);
