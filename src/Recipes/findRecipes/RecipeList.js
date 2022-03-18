import React, { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from "react-router-dom";
import Recipe from './Recipe';
import './RecipeList.css'

/** RecipeList contains the list of returned Recipes from /recipes/complex
 * 
 * Each individual returned recipe corresponds to a Recipe component in the list
 * 
 * User can only reach this point if the search returned valid results
  */
const RecipeList = () => {
    const { recipes } = useContext(GlobalContext)
    const navigate = useNavigate()

    return (
        <div className='RecipeList d-flex flex-column'>
            <div className='RecipeList-container'>
                <button className='general-btn-red' onClick={() => navigate('/findrecipes')}>Go Back</button>
                {recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe} />)}
                <button className='general-btn-red' onClick={() => navigate('/findrecipes')}>Go Back</button>
                {/* this navigate will only invoke if user manually enters the URL, search with 0 results won't bring them here */}
                {recipes.length === 0 && navigate('/')}
            </div>
        </div>
    )
}

export default RecipeList;