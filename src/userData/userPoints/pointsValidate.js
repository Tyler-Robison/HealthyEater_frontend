const pointsValidate = values => {
    const errors = {};

    if (!values.age) errors.age = 'Age Required';
    if (values.age < 1) errors.age = 'Age must be at least 1';
    

    if (!values.height) errors.height = 'Height Required';
    if (values.height < 1) errors.height = 'Height must be at least 1';

    if (!values.weight) errors.weight = 'Weight Required';
    if (values.weight < 1) errors.weight = 'Weight must be at least 1';

    return errors;
};

export default pointsValidate