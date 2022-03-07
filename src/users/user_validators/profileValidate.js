const profileValidate = values => {
    const errors = {};

    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    } 
    
    else if (values.email.length > 60) {
        errors.email = 'Max 60 characters';
    }

    if (!values.password) {
        errors.password = 'Password Required';
    }

    return errors;
};

export default profileValidate