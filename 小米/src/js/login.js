// const xhr = new XMLHttpRequest()

// xhr.open('GET', '/dt?include_fields=like_count%2Csender%2Calbum%2Cmsg%2Creply_count%2Ctop_comments&kw=%E7%BE%8E%E9%A3%9F&start=48&_=1680160592899')

// xhr.send()

// xhr.onload = function() {
//     console.log(JSON.parse(xhr.responseText));
// }

const xhr2 = new XMLHttpRequest()

xhr2.open('GET', '/my')

xhr2.send()

xhr2.onload = function() {
    console.log((xhr2.responseText));
}

const xhr3 = new XMLHttpRequest()

xhr3.open('GET', '/half/abc.php')

xhr3.send()

xhr3.onload = function() {
    console.log((xhr3.responseText));
}