import fs from '../utils/file'
import { resolve } from 'path'
import file from '../utils/file'

class FileController {
    private readonly staticFilePath: string
    constructor() {
        this.staticFilePath = './static/files/'
        this.add = this.add.bind(this)
        this.mergeFile = this.mergeFile.bind(this)
    }
    async add(ctx: any, next: any): Promise<void> {
        const fields: any = ctx.request.fields
        const file: any = ctx.request.files[0]
        //不分片
        if (ctx.request.fields.total == 1) {
            const des_file: string = this.staticFilePath + fields.fileName
            let data: any = await fs.readFile(file.path)
            await fs.writeFile(des_file, data)
            ctx.body = {
                code: 0,
                message: 'sucess',
                data: {
                    name: fields.fileName,
                    path: `files/${fields.fileName}`
                }
            }
        } else {
            let dir: string = `${this.staticFilePath}d${fields.fileName}/`
            // 最后一个分片处理
            if (Number(fields.total) === Number(fields.index) + 1) {
                const des_file: string = this.staticFilePath + fields.fileName
                let filePathList: Array<string> = await fs.readDir(dir)
                filePathList = filePathList.map(i => {
                    i = dir + i
                    return i
                })
                filePathList.push(file.path)
                //合并文件
                const data: Buffer = await this.mergeFile(filePathList, dir)
                await fs.writeFile(des_file, data)
                ctx.body = {
                    code: 0,
                    message: 'sucess',
                    data: {
                        name: fields.fileName,
                        path: `files/${fields.fileName}`
                    }
                }
            } else {
                try {
                    await fs.mkDir(dir)
                } catch (e) {}
                const des_file: string = dir + fields.index
                await fs.writeFile(des_file, await fs.readFile(file.path))
                ctx.body = {
                    code: 0,
                    message: 'sucess'
                }
            }
        }
    }
    private async mergeFile(
        filePathList: Array<string>,
        dir: string
    ): Promise<Buffer> {
        const buffers: Array<Buffer> = []
        for (let i: number = 0; i < filePathList.length; i++) {
            buffers.push(await fs.readFile(filePathList[i]))
            if (i !== filePathList.length - 1) {
                await fs.unLink(filePathList[i])
            } else {
                await fs.rmDir(dir)
            }
        }
        return Buffer.concat(buffers)
    }
}

export default new FileController()
