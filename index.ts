import * as Koa from 'koa'
import router from './router'
import * as mongoose from 'mongoose'
import * as cors from 'koa2-cors'
import * as body from 'koa-better-body'
import serve = require('koa-static')
import * as path from 'path'
const staticPath: string = './static'
const app: any = new Koa()
mongoose.connect('mongodb://localhost/blog')

app.use(
    cors({
        origin: function(ctx) {
            return '*'
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    })
)

app.use(serve(path.join(`${__dirname}`, '../', staticPath)))
app.use(body())
app.use(router.routes())

app.listen(3030)
