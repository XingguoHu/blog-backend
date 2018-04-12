import articleModel from '../model/article'

interface nextFunc {
    (ctx: any, next: nextFunc): Promise<any>
}

class Article {
    async add(ctx: any, next: nextFunc): Promise<void> {
        await articleModel.add(ctx.request.fields)
        ctx.body = {
            code: 0,
            message: 'success'
        }
    }

    async all(ctx: any, next: any): Promise<void> {
        ctx.body = await articleModel.all()
    }
}

export default new Article()

