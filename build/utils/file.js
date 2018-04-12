"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class PromiseFile {
    constructor() { }
    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    writeFile(path, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    readDir(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    unLink(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    mkDir(path) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    rmDir(path) {
        return new Promise((resolve, reject) => {
            fs.rmdir(path, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = new PromiseFile();
