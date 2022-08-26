let userName = document.querySelector('#username')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let confirmPassword = document.querySelector('#confirm-password')
let form = document.querySelector('form')

function showError(input, message) {
    let parent = input.parentElement
    let small  = parent.querySelector('small')
    parent.classList.add('error')
    small.innerText = message 
}

function showSuccess(input) {
    let parent = input.parentElement
    let small  = parent.querySelector('small')
    parent.classList.remove('error')
    small.innerText = '' 
}

function checkEmptyError(listInput) {
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim()

        if(!input.value) {
            isEmptyError = true
            showError(input, 'Không được bỏ trống')
        } else {
            showSuccess(input)
        }
    });

    return isEmptyError
}

function checkEmailError(input) {
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    input.value = input.value.trim()
    
    let isEmailError = regexEmail.test(input.value)
    if(regexEmail.test(input.value)) {
        showSuccess()
    } else {
        showError(input, 'Email Invalid')
    }

    return isEmailError
}

function checkLengthError(input, min, max) {
    input.value = input.value.trim()

    if(input.value.length < min) {
        showError(input, ` Vui lòng nhập ít nhất ${min} ký tự `)
        return true
    }
    if(input.value.length > max) {
        showError(input, ` Vui lòng nhập không quá ${max} ký tự `)
        return true
    }

    return false
}

function checkMatchPassword(passwordInput, cfPasswordInput) {
    if(passwordInput.value !== cfPasswordInput.value) {
        showError(cfPasswordInput, 'Mật khẩu không trùng khớp')
        return true
    }
    return false
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let isEmptyError = checkEmptyError([userName, email, password, confirmPassword])
    let isEmailError = checkEmailError(email)
    let isUserNameLengthError = checkLengthError(userName, 3, 20)
    let isPasswordLengthError = checkLengthError(password, 6, 30)
    let isCheckMatchPassword = checkMatchPassword(password, confirmPassword)
})