import React, { useContext } from "react";
import UserRecipe from "./UserRecipe";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import './UserRecipeList.css'

/** UserRecipeList displays all recipes saved by currentUser
 * 
 * recipes deleted here will cascade to the mealplanner*/
const UserRecipeList = () => {
    const { currentUser } = useContext(GlobalContext)

    if (currentUser.recipes.length === 0) return (
        <p className="no-recipe-para">You have no saved recipes, go to <Link to={`/findrecipes`} className='RecipeList-para'><b>Find Recipes</b></Link></p>
    )

    return (
        <div className="UserRecipeList">
         
            <div className="UserRecipeList-div">
            <h3 className="UserRecipeList-header">{currentUser.username}'s saved recipes</h3>
                <div className="saved-recipe-container">
                    {currentUser.recipes.map(recipe => {
                        return <UserRecipe key={recipe.recipe_id} recipe={recipe} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserRecipeList;