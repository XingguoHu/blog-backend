import * as fs from 'fs'
class file {
    constructor() {}
    async add(ctx, next) {
        console.log(ctx.request.files[0])
        const file: any = ctx.request.files[0]
        const des_file: string = './files/' + file.name
        let data: any = await fs.readFile(file.path, null)
        await fs.writeFile(des_file, data)
        ctx.body = {
            code: 0,
            message: 'sucess'
        }
    }
}

export default new file()
