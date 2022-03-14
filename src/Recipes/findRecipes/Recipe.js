import React from "react";
import { Link } from 'react-router-dom';

const Recipe = ({ recipe }) => {

    const displayIngredients = recipe => recipe.usedIngredients.map((ingredient, idx) => {
        // makes sure no comma after last item
        return (idx === recipe.usedIngredients.length - 1 ? `${ingredient.name}` : `${ingredient.name}, `);
    })

    return (
        <div key={recipe.id} className='RecipeList-div'>
            <Link to={`/${recipe.id}/detail`} className='RecipeList-para'><b>{recipe.title}</b></Link>
            <p>Uses {recipe.usedIngredients.length} of your ingredients ( {displayIngredients(recipe)} )</p>
            <img className='RecipeList-img' src={recipe.image} alt={`Picture of the recipe ${recipe.title}`}></img>
        </div>
    )
}

export default Recipe;