import React, { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from "react-router-dom";
import Recipe from './Recipe';
import './RecipeList.css'

const RecipeList = () => {
    const { recipes } = useContext(GlobalContext)
    const navigate = useNavigate()

    console.log('recipes', recipes)

    return (
        <div className='RecipeList-container'>
            <button className='general-btn-red' onClick={() => navigate('/find_recipes')}>Go Back</button>
            {recipes.map(recipe => <Recipe recipe={recipe} />)}
            <button className='general-btn-red' onClick={() => navigate('/find_recipes')}>Go Back</button>
            {recipes.length === 0 && <p>Search for Recipes first</p>}
        </div>
    )
}

export default RecipeList;