import * as mongoose from 'mongoose'
class Article {
    Article: any
    constructor(mongoose) {
        const articleSchema = new mongoose.Schema({
            desc: '',
            title: '',
            content: ''
        })
        this.Article = mongoose.model('article', articleSchema)
    }

    async add(params: any = {}) {
        const article: any = new this.Article(params)
        await article.save()
    }

    async all() {
        return await this.Article.find()
    }
}

export default new Article(mongoose)

