function Validation(values) {
    let error = {}
    //const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^[a-zA-Z]{6}$/;
    if(values.uname === "") {
        error.uname = "Username should not be empty"
    }
    else {
        error.uname = ""
    }
    if (values.password =="") {
        error.password = "Password should not be empty"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    } else {
        error.password= ""
    }
    return error;
}

export default Validation;