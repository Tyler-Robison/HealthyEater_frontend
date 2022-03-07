import React, { useContext } from "react";
import UserRecipe from "./UserRecipe";
import GlobalContext from "../context/GlobalContext";
import './UserRecipeList.css'

const UserRecipeList = () => {
    const { currentUser } = useContext(GlobalContext)

    return (
        <div className="UserRecipeList">
            <div className="UserRecipeList-div">
                <h3 className="UserRecipeList-header">{currentUser.username}'s saved recipes</h3>
                {currentUser.recipes.map(recipe => {
                    return <UserRecipe key={recipe.recipe_id} recipe={recipe} />
                })}
            </div>
        </div>
    )
}

export default UserRecipeList;