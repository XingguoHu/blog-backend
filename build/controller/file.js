"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("../utils/file");
class FileController {
    constructor() {
        this.staticFilePath = './static/files/';
        this.add = this.add.bind(this);
        this.mergeFile = this.mergeFile.bind(this);
    }
    add(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = ctx.request.fields;
            const file = ctx.request.files[0];
            //不分片
            if (ctx.request.fields.total == 1) {
                const des_file = this.staticFilePath + fields.fileName;
                let data = yield file_1.default.readFile(file.path);
                yield file_1.default.writeFile(des_file, data);
                ctx.body = {
                    code: 0,
                    message: 'sucess',
                    data: {
                        name: fields.fileName,
                        path: `files/${fields.fileName}`
                    }
                };
            }
            else {
                let dir = `${this.staticFilePath}d${fields.fileName}/`;
                // 最后一个分片处理
                if (Number(fields.total) === Number(fields.index) + 1) {
                    const des_file = this.staticFilePath + fields.fileName;
                    let filePathList = yield file_1.default.readDir(dir);
                    filePathList = filePathList.map(i => {
                        i = dir + i;
                        return i;
                    });
                    filePathList.push(file.path);
                    //合并文件
                    const data = yield this.mergeFile(filePathList, dir);
                    yield file_1.default.writeFile(des_file, data);
                    ctx.body = {
                        code: 0,
                        message: 'sucess',
                        data: {
                            name: fields.fileName,
                            path: `files/${fields.fileName}`
                        }
                    };
                }
                else {
                    try {
                        yield file_1.default.mkDir(dir);
                    }
                    catch (e) { }
                    const des_file = dir + fields.index;
                    yield file_1.default.writeFile(des_file, yield file_1.default.readFile(file.path));
                    ctx.body = {
                        code: 0,
                        message: 'sucess'
                    };
                }
            }
        });
    }
    mergeFile(filePathList, dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffers = [];
            for (let i = 0; i < filePathList.length; i++) {
                buffers.push(yield file_1.default.readFile(filePathList[i]));
                if (i !== filePathList.length - 1) {
                    yield file_1.default.unLink(filePathList[i]);
                }
                else {
                    yield file_1.default.rmDir(dir);
                }
            }
            return Buffer.concat(buffers);
        });
    }
}
exports.default = new FileController();
