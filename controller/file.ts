import fs from '../utils/file'
import { resolve } from 'path'
import file from '../utils/file'

class FileController {
    constructor() {
        this.add = this.add.bind(this)
    }
    async add(ctx: any, next: any): Promise<void> {
        const fields = ctx.request.fields
        const file: any = ctx.request.files[0]
        if (ctx.request.fields.total == 1) {
            const des_file: string = './files/' + fields.fileName
            let data: any = await fs.readFile(file.path)
            await fs.writeFile(des_file, data)
            ctx.body = {
                code: 0,
                message: 'sucess'
            }
        } else {
            let dir = `./files/d${fields.fileName}/`
            if (Number(fields.total) === Number(fields.index) + 1) {
                console.log(1)
                const des_file: string = './files/' + fields.fileName
                let filePathList = await fs.readDir(dir)
                filePathList = filePathList.map(i => {
                    i = dir + i
                    return i
                })
                filePathList.push(file.path)
                const data = await this.mergeFile(filePathList, dir)
                await fs.writeFile(des_file, data)
                ctx.body = {
                    code: 0,
                    message: 'sucess'
                }
            } else {
                if (fields.index == 0) {
                    await fs.mkDir(dir)
                }
                const des_file: string = dir + fields.index
                await fs.writeFile(des_file, await fs.readFile(file.path))
                ctx.body = {
                    code: 0,
                    message: 'sucess'
                }
            }
        }
    }
    async mergeFile(filePathList: Array<string>, dir: string): Promise<Buffer> {
        const buffers: Array<Buffer> = []
        for (let i: number = 0; i < filePathList.length; i++) {
            buffers.push(await fs.readFile(filePathList[i]))
            if (i !== filePathList.length - 1) {
                await fs.unLink(filePathList[i])
            }else{
                await fs.rmDir(dir)
            }
        }

        return Buffer.concat(buffers)
    }
}

export default new FileController()
