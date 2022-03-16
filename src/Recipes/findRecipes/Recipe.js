import React from "react";
import { Link } from 'react-router-dom';
import './Recipe.css'

const Recipe = ({ recipe }) => {

    const displayIngredients = recipe => recipe.usedIngredients.map((ingredient, idx) => {
        // makes sure no comma after last item
        return (idx === recipe.usedIngredients.length - 1 ? `${ingredient.name}` : `${ingredient.name}, `);
    })

    return (
        <div className="row">
            <div key={recipe.id} className='Recipe col-12'>
                <Link to={`/${recipe.id}/detail`} className='RecipeList-para'><b>{recipe.title}</b></Link>
                <p>Uses {recipe.usedIngredients.length} of your ingredients ( {displayIngredients(recipe)} )</p>
                <img className='Recipe-img' src={recipe.image} alt={`Picture of the recipe ${recipe.title}`}></img>
            </div>
        </div>
    )
}

export default Recipe;