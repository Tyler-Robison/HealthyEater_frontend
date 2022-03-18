import React from "react";
import { Link } from 'react-router-dom';
import './Recipe.css'

/** Recipe item inside RecipeList
 * 
 * displays the recipe's title, ingredients and image
 * 
 * Link to /recipes/:recipeId allows user to see additional recipe information
  */
const Recipe = ({ recipe }) => {

    const displayIngredients = recipe => recipe.usedIngredients.map((ingredient, idx) => {
        // ensures no comma after last item
        return (idx === recipe.usedIngredients.length - 1 ? `${ingredient.name}` : `${ingredient.name}, `);
    })

    return (
        <div className="row">
            <div key={recipe.id} className='Recipe col-12'>
                <Link to={`/recipes/${recipe.id}`} className='RecipeList-para'><b>{recipe.title}</b></Link>
                <p>Uses {recipe.usedIngredients.length} of your ingredients ( {displayIngredients(recipe)} )</p>
                <img className='Recipe-img' src={recipe.image} alt={`Picture of the recipe ${recipe.title}`}></img>
            </div>
        </div>
    )
}

export default Recipe;