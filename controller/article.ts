import articleModel from '../model/article'

class Article {
    async add(ctx, context) {
        console.log(ctx.request.fields, '-----')
        await articleModel.add(ctx.request.fields)
        ctx.body = {
            code: 0,
            message: 'success'
        }
    }

    async all(ctx, context) {
        ctx.body = await articleModel.all()
    }
}

export default new Article()
