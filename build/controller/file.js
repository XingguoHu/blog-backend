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
const fs = require("fs");
class file {
    constructor() { }
    add(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.request.fields);
            const file = ctx.request.files[0];
            const des_file = './files/' + file.name;
            let data = yield fs.readFile(file.path, null);
            yield fs.writeFile(des_file, data);
            ctx.body = {
                code: 0,
                message: 'sucess'
            };
        });
    }
}
exports.default = new file();
