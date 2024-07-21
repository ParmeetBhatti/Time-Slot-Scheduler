function Validation(values) {
    let errors = {};
    //const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^[a-zA-Z]{6}$/;
  
    if (values.uname === "") {
      errors.uname = "Username should not be empty";
    }
  
    if (values.email === "") {
      errors.email = "Email should not be empty";
    } 
  
    if (values.password === "") {
      errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password must be exactly 6 letters";
    }
  
    return errors;
  }
  
  export default Validation;
  