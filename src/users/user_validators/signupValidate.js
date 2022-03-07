const signupValidate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Username Required';
    } else if (values.username.length > 25) {
        errors.username = 'username be 25 characters or less';
    }

    if (!values.password) {
        errors.password = 'Password Required';
    } else if (values.password.length > 30) {
        errors.password = 'Password be between 5 to 30 characters';
    } else if (values.password.length < 5) {
        errors.password = 'Password be between 5 to 30 characters';
    }

    return errors;
};

export default signupValidate