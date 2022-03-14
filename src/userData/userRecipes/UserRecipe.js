import React, { useContext } from "react";
import RecipeAPI from "../../APIs/recipeAPI";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import './UserRecipe.css'

const UserRecipe = ({ recipe }) => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext);

    const deleteRecipe = async () => {
        const res = await RecipeAPI.removeRecipe(currentUser.id, recipe.recipe_id, token);
        console.log('res', res)
        // returns id of deleted recipe 
        // recipe has to be removed from recipes and mealplan

        currentUser.recipes = currentUser.recipes.filter(r => {
            return r.recipe_id !== res.deletedRecipe.recipe_id
        })

        currentUser.mealplan = currentUser.mealplan.filter(m => {
            return m.recipe_id !== res.deletedRecipe.recipe_id
        })
        
        setCurrentUser({...currentUser, currentUser})
    }

    return (
        <div> 
                <div><Link to={`/${recipe.recipe_id}/detail`} className='RecipeList-para'><b>{recipe.name}</b></Link> ({recipe.ww_points ? recipe.ww_points : 'Not Available'} points)
                <button data-testid={recipe.recipe_id} style={{marginLeft: '0.4rem'}} className="general-btn-red small-btn" onClick={deleteRecipe}>X</button></div>
        </div>
    )
}

export default UserRecipe;