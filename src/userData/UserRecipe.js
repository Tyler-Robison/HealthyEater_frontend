import React, { useContext } from "react";
import UserAPI from "../APIs/userAPI";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";
import './UserRecipe.css'

const UserRecipe = ({ recipe }) => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext);

    const deleteRecipe = async () => {
        await UserAPI.removeRecipe(currentUser.id, recipe.recipe_id, token);
        const user = await UserAPI.getUserInfo(currentUser.id, token)
        setCurrentUser(user)
    }
    return (
        <div> 
                <div><Link to={`/${recipe.recipe_id}/detail`} className='RecipeList-para'><b>{recipe.name}</b></Link> ({recipe.ww_points ? recipe.ww_points : 'Not Available'} points)
                <button style={{marginLeft: '0.4rem'}} className="general-btn-red small-btn" onClick={deleteRecipe}>X</button></div>
        </div>
    )
}

export default UserRecipe;