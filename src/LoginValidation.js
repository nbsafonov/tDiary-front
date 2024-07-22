function Validation(values) {
    let error = {}

    const password_pattern = /^.{5,}$/

    if (values.username === "") {
        error.username = 'Логин не должен быть пустым'
    }
    else {
        error.username = ""
    }
    if (values.password === "") {
        error.password = 'Пароль не должен быть пустым'
    }

    else if (!password_pattern.test(values.password)){
        error.password = 'Пароль от 5 символов'
    }

    else {
        error.password = ""
    }

    return error
}

export default Validation;