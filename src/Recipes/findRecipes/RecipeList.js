import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from "react-router-dom";
import './RecipeList.css'

const RecipeList = () => {
    const { recipes } = useContext(GlobalContext)
    const navigate = useNavigate()
    const displayIngredients = recipe => recipe.usedIngredients.map((ingredient, idx) => {
        // makes sure no comma after last item
        return (idx === recipe.usedIngredients.length - 1 ? `${ingredient.name}` : `${ingredient.name}, `);
    })

    console.log('recipes', recipes)

    return (
        <div className='RecipeList-container'>
            <button className='general-btn-red' onClick={() => navigate('/find_recipes')}>Go Back</button>
            {recipes.map(recipe => {
                return <div key={recipe.id} className='RecipeList-div'>
                    <Link to={`/${recipe.id}/detail`} className='RecipeList-para'><b>{recipe.title}</b></Link>
                    <p>Uses {recipe.usedIngredients.length} of your ingredients ( {displayIngredients(recipe)} )</p>
                    <img className='RecipeList-img' src={recipe.image} alt={`Picture of the recipe ${recipe.title}`}></img>
                </div>
            })}
            <button className='general-btn-red' onClick={() => navigate('/find_recipes')}>Go Back</button>
            {recipes.length === 0 && <p>Search for Recipes first</p>}
        </div>
    )
}

export default RecipeList;