import * as Koa from 'koa'
import router from './router'
import * as mongoose from 'mongoose'
const app = new Koa()
mongoose.connect('mongodb://localhost/blog')

app.use(router.routes())

app.listen(3030)
