const mealplanArr = [
    { id: 1, day: 'Mon', recipe_id: 1111, name: 'bacon', ww_points: 20 },
    { id: 2, day: 'Mon', recipe_id: 2222, name: 'eggs', ww_points: 10 },
    { id: 3, day: 'Tues', recipe_id: 3333, name: 'salad', ww_points: 5 }
];

const recipeArr = [
    { name: 'bacon', recipe_id: 1111, ww_points: 20 },
    { name: 'eggs', recipe_id: 2222, ww_points: 10 },
    { name: 'salad', recipe_id: 3333, ww_points: 5 },
    { name: 'bread', recipe_id: 4444, ww_points: 7 },
];

// mock currentUser
const testUser = {
    id: 1,
    username: "Tyler",
    isAdmin: false,
    points: null,
    mealplan: mealplanArr,
    recipes: recipeArr
};

// mock recipe search results
const testRecipes = [
    {
        id: 1234,
        title: 'Scrambled Eggs',
        usedIngredients: [{ name: 'eggs' }, { name: 'otherIngredient' }],
        image: 'https://spoonacular.com/recipeImages/716426-312x231.jpg'
    },
    {
        id: 5678,
        title: 'BLT',
        usedIngredients: [{ name: 'bacon' }, { name: 'lettuce' }, { name: 'tomato' }],
        image: 'https://spoonacular.com/recipeImages/716426-312x231.jpg'
    }
];

export {
    testUser,
    testRecipes
}