import * as Router from 'koa-router'
import article from './controller/article'
import file from './controller/file'
const router: any = new Router()

router.post('/article', article.add)
router.get('/article/all', article.all)
router.post('/upload', file.add)

export default router
