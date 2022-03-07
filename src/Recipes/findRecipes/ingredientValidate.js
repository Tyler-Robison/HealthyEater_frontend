const ingredientValidate = values => {
    const errors = {};

    if (values.ingredient.includes(',')) errors.ingredient = 'Enter one ingredient at a time!';

    return errors;
};

export default ingredientValidate