function add() {
    console.log('ok');
};
add();

function es() {
    let a = 10;
}

const p = new Promise((resolve, reject) => {
    reject('err')
})

if (true) {
    let num = 0;
    console.log(num);
}

let num = 100
console.log(num);

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}