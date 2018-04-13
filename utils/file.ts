import * as fs from 'fs'

class PromiseFile {
    constructor() {}
    readFile(path: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    writeFile(path: string, data: Buffer): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    readDir(path: string): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    unLink(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.unlink(path, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    mkDir(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    rmDir(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.rmdir(path, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}

export default new PromiseFile()
