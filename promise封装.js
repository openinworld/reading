function Promise(executor) {
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
        self.callbacks.forEach(item => {
            item.onResolved(data);
        });
    };

    function reject(data) {
        //加一个判断就可以让状态只能修改一次
        if (self.PromiseState !== 'pending') return;
        self.PromiseState = 'rejected';
        self.PromiseResult = data;
        if (self.callbacks.onRejected) {
            self.callbacks.onRejected(data);
        }
    };
    try {
        //调用执行器函数
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
Promise.prototype.then = function(onResolved, onRejected) {
    return new Promise((resolve, reject) => {
        //将then方法的功能修复，没有判断不会成功
        if (this.PromiseState === 'fulfilled') {
            try {
                let result = onResolved(this.PromiseResult) //回调函数
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
        if (this.PromiseState === 'rejected') {
            onRejected(this.PromiseResult)
        }
        if (this.PromiseState === 'pending') {
            //将回调函数保存起来到状态函数里面去实现
            this.callbacks.push({
                onResolved: function() {
                    try {
                        let result = onResolved(self.PromiseResult);
                        if (result instanceof Promise) {
                            result.then(v => { resolve(v) }, r => { reject(r); })
                        } else {
                            resolve(result);
                        }
                    } catch (e) {
                        reject(e);
                    }
                },
                onRejected: function() {
                    try {
                        let result = onRejected(self.PromiseResult);
                        if (result instanceof Promise) {
                            result.then(v => { resolve(v) }, r => { reject(r); })
                        } else {
                            resolve(result);
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        }
    })

}