window.onload = function() {
    var sub = document.querySelector('#submitBtn');
    sub.addEventListener('click', function() {
        alert('12313')
    })
    var reg = new RegExp()
    var uname = document.querySelector('#username');
    var usernameError = document.querySelector('#usernameError');
    reg = /^\d{1,6}$/;
    uname.addEventListener('blur', function() {
        if (reg.test(this.value)) {
            usernameError.innerHTML = '输入正确';
            usernameError.setAttribute("style", "color:green")
        } else {
            usernameError.innerHTML = '请输入1-6位的数字';
            usernameError.setAttribute('style', 'color:red')
        }
    })
    var telnumber = document.querySelector('#telnumber');
    var telnumberError = document.querySelector('#telnumberError');
    var regtel = new RegExp()
    regtel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var num = '13699514800';
    console.log(regtel.test(num));
    telnumber.addEventListener('blur', function() {
        if (regtel.test(this.value)) {
            telnumberError.innerHTML = '输入正确';
            telnumberError.setAttribute("style", "color:green")
        } else {
            telnumberError.innerHTML = '请输入正确的手机号';
            telnumberError.setAttribute('style', 'color:red')
        }
    })
    var password = document.querySelector('#password');
    var passwordError = document.querySelector('#passwordError');
    var regpsw = new RegExp();
    regpsw = /^\w{6,8}$/;
    password.addEventListener('blur', function() {
        if (regpsw.test(this.value)) {
            passwordError.innerHTML = '输入正确';
            passwordError.setAttribute('style', 'color:green')
        } else {
            passwordError.innerHTML = '6到8位的字母+数字组成的密码';
            passwordError.setAttribute('style', 'color:red')

        }
    })
    var confirmPwd = document.querySelector('#confirmPwd');
    var confirmPwdError = document.querySelector('#confirmPwdError');
    confirmPwd.addEventListener('blur', function() {
        if (this.value == password.value) {
            confirmPwdError.innerHTML = '密码正确';
            confirmPwdError.setAttribute('style', 'color:green')

        } else {
            confirmPwdError.innerHTML = '密码错误，请确认密码';
            confirmPwdError.setAttribute('style', 'color:red')
        }
    })
    var email = document.querySelector('#email');
    var emailError = document.querySelector('#emailError');
    var regemail = new RegExp();
    // regemail = /^((\d){4,10})+([@qq.com|@163.com])$/
    regemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    var mail = '1561107560@qq.com';
    console.log(regemail.test(mail));
    email.addEventListener('blur', function() {
            if (regemail.test(this.value)) {
                emailError.innerHTML = '邮箱正确';
                emailError.setAttribute('style', 'color:green')

            } else {
                emailError.innerHTML = '邮箱错误，请确认邮箱';
                emailError.setAttribute('style', 'color:red')

            }
        })
        // function vaid(obj) {
        //     console.log(obj.id);
        //     obj.addEventListener('blur', function() {
        //         console.log(this);
        //         if (!reg.test(this.value)) {
        //             console.log(this.id);
        //             var obj = this.id + 'Error'
        //             console.log(obj);
        //             // console.log(obj.id);
        //             // obj.innerHTML = '请输入1-6位的数字';
        //             obj.innerHTML = '请输入1-6位的数字';
        //         } else {
        //             obj.innerHTML = '输入正确'
        //         }
        //     })
        // }
        // vaid(uname);

}