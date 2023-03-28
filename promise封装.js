class Pormise {
    constructor(executor) {
            //添加属性
            this.PromiseState = 'pending';
            this.PromiseResult = null;
            this.callbacks = []; //异步执行回调
            const self = this;

            function resolve(data) {
                if (self.PromiseState !== 'pending') return;
                //修改对象的状态
                self.PromiseState = 'fulfilled';
                self.PromiseResult = data;
                //异步还会执行这样的函数吗？
                // if (self.callback.onResolved) {
                //     self.callback.onResolved(data);
                // }
                setTimeout(() => {
                    self.callbacks.forEach(item => {
                        item.onResolved(data);
                    });
                });
            };

            function reject(data) {
                //加一个判断就可以让状态只能修改一次
                if (self.PromiseState !== 'pending') return;
                self.PromiseState = 'rejected';
                self.PromiseResult = data;
                setTimeout(() => {
                    if (self.callbacks.onRejected) {
                        self.callbacks.onRejected(data);
                    }
                });
            };
            try {
                //调用执行器函数
                executor(resolve, reject);
            } catch (e) {
                reject(e);
            }
        }
        //then
    then(onResolved, onRejected) {
            const self = this;
            if (typeof onRejected !== 'function') {
                onRejected = reason => {
                    throw reason;
                }
            }
            if (typeof onResolved !== 'function') {
                onResolved = value => value;
            }
            return new Promise((resolve, reject) => {
                //将then方法的功能修复，没有判断不会成功
                function callback(type) {
                    try {
                        let result = type(self.PromiseResult) //回调函数
                        if (result instanceof Promise) {
                            result.then(v => {
                                resolve(v);
                            }, r => {
                                reject(r);
                            })
                        } else {
                            resolve(result);
                        }
                    } catch (e) {
                        reject(e)
                    }
                }
                if (this.PromiseState === 'fulfilled') {
                    setTimeout(() => {
                        callback(onResolved);
                    }, );
                }
                if (this.PromiseState === 'rejected') {
                    setTimeout(() => {
                        callback(onRejected);
                    });
                }
                if (this.PromiseState === 'pending') {
                    //将回调函数保存起来到状态函数里面去实现
                    this.callbacks.push({
                        onResolved: function() {
                            callback(onResolved);
                        },
                        onRejected: function() {
                            callback(onRejected);
                        }
                    });
                }
            })

        }
        //catch
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }
    //resolve
    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v);
                }, r => {
                    reject(r);
                })
            } else {
                resolve(value);
            }
        });
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }
    static all(promises) {
        return new Promise((resolve, reject) => {
            let count = 0;
            let arr = [];
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    count++;
                    arr[i] = v;
                    if (count === promises.length) {
                        resolve(arr);
                    }
                }, r => {
                    reject(r);
                });
            }
        })
    }
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    resolve(v);
                }, r => {
                    reject(r);
                })
            }
        });
    }
}



// =======================================
// const fs = require('fs');
// 回调函数的方法
/* fs.readFile('./hello.txt', (err, data1) => {
    if (err) throw err;
    fs.readFile('./hello.txt', (err, data2) => {
        if (err) throw err;
        fs.readFile('./hello.txt', (err, data3) => {
            if (err) throw err;
            console.log(data1 + data2 + data3);
        })
    })
});
 */
/* const util = require('util');
const mineReadFile = util.promisify(fs.readFile);
async function main() {
    try {
        let data1 = await mineReadFile('./hello.txt');
        let data2 = await mineReadFile('./dev1/hjahkd.txt');
        let data3 = await mineReadFile('./dev1/iron.txt');
        console.log(data1 + data2 + data3);
    } catch (e) {
        console.log(e.code);
    }
}
main(); */