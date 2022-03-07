const nutrientValidate = values => {
    const errors = {};
    if (values.maxFat < 0) errors.maxFat = 'Fat must be blank or positive number';

    if (values.maxSatFat < 0) errors.maxSatFat = 'Sat fat must be blank or positive number';
    // if (values.maxSatFat && (values.maxSatFat <= 10 || typeof values.maxSatFat !== 'number')) {
    //     errors.maxSatFat = 'Field must be blank or number higher than 0';
    // }

    if (values.maxCarbs < 0) errors.maxCarbs = 'Carbs must be blank or positive number';
    // if (values.maxCarbs && (values.maxCarbs <= 0 || typeof values.maxCarbs !== 'number')) {
    //     errors.maxCarbs = 'Field must be blank or number higher than 0';
    // }

    if (values.maxCalories < 0) errors.maxCalories = 'Cals must be blank or positive number';
    // if (values.maxCalories && (values.maxCalories <= 250 || typeof values.maxCalories !== 'number')) {
    //     errors.maxCalories = 'Field must be blank or number higher than 250';
    // }

    if (values.maxCholesterol < 0) errors.maxCholesterol = 'Cholesterol must be blank or positive number';
    // if (values.maxCholesterol && (values.maxCholesterol <= 0 || typeof values.maxCholesterol !== 'number')) {
    //     errors.maxCholesterol = 'Field must be blank or number higher than 0';
    // }

    if (values.maxSugar < 0) errors.maxSugar = 'Sugar must be blank or positive number';
    // if (values.maxSugar && (values.maxSugar <= 0 || typeof values.maxSugar !== 'number')) {
    //     errors.maxSugar = 'Field must be blank or number higher than 0';
    // }

    if (values.maxSodium < 0) errors.maxSodium = 'Sodium must be blank or positive number';
    // if (values.maxSodium && (values.maxSodium <= 0 || typeof values.maxSodium !== 'number')) {
    //     errors.maxSodium = 'Field must be blank or number higher than 0';
    // }

    if (values.minProtein < 0) errors.minProtein = 'Protein must be blank or positive number';
    // if (values.minProtein && (values.minProtein < 1 || typeof values.minProtein !== 'number')) {
    //     errors.minProtein = 'Field must be blank or number higher than 0';
    // }

    return errors;
};

export default nutrientValidate

