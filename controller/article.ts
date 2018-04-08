import articleModel from '../model/article'

class Article {
    async add(ctx, context) {
        await articleModel.add({desc: ''})
        ctx.body = 'sucess'
    }

    async all(ctx, context){
        ctx.body = await articleModel.all()
    }
}

export default new Article()
