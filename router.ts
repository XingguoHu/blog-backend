import * as Router from 'koa-router'
import article from './controller/article'
const router: any = new Router()

router.post('/article', article.add)
router.get('/article/all', article.all)

export default router
