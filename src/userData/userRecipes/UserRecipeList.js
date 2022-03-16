import React, { useContext } from "react";
import UserRecipe from "./UserRecipe";
import GlobalContext from "../../context/GlobalContext";
import './UserRecipeList.css'

const UserRecipeList = () => {
    const { currentUser } = useContext(GlobalContext)

    if (currentUser.recipes.length === 0) return (
        <p>You haven't saved any recipes yet</p>
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