import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpoonacularAPI from '../../APIs/spoonAPI';
import RecipeAPI from '../../APIs/recipeAPI';
import NutrientTable from './NutrientTable';
import StepsList from './StepsList';
import GlobalContext from '../../context/GlobalContext';
import './RecipeDetail.css'

const RecipeDetail = () => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext)
    const { recipeID } = useParams()
    const navigate = useNavigate();
    const [recipeDetail, setRecipeDetail] = useState(null)
    const [nutritionDetail, setNutritionDetail] = useState(null)
    const goBack = () => navigate('/recipes');


    useEffect(() => {
        const getRecipeDetail = async () => {
            const res = await SpoonacularAPI.getRecipeDetail(recipeID, token, currentUser.id);
            setNutritionDetail(res.nutrition)
            setRecipeDetail(res.recipe)
        }
        getRecipeDetail();
    }, [])

    // console.log('recipe detail', recipeDetail)
    // console.log('nutri detail', nutritionDetail)
    // console.log('curr user', currentUser)

    const displayNutrition = () => {
        return <div>
            <h5>Bad Stuff!</h5>
            <NutrientTable nutritionDetail={nutritionDetail.bad} />
            <br></br>
            <h5>Good Stuff!</h5>
            <NutrientTable nutritionDetail={nutritionDetail.good} />
        </div>
    }

    // only care recipe detail, nutri detail can be obtained based on recipe_id
    const saveRecipe = async () => {
        const recipeRes = await RecipeAPI.saveRecipe(recipeDetail, currentUser.id, token)
        currentUser.recipes.push(recipeRes.savedRecipe)
        setCurrentUser({...currentUser, currentUser})
    }

    if (!recipeDetail) return <p>Loading...</p>

    return (
        <div className='RecipeDetail'>
            <div className='RecipeDetail-summary'>
                <h1>{recipeDetail.title}</h1>

                <h3>Preparation Time: {recipeDetail.readyInMinutes} Minutes</h3>
                <h3>Serves: {recipeDetail.servings}</h3>
                <h3>Weight Watcher's Smart Points: {recipeDetail.weightWatcherSmartPoints}</h3>
            </div>
            <button className='general-btn' onClick={saveRecipe}>Save Recipe</button>
                <button className='general-btn-red' onClick={goBack}>Back</button>
            <div className='steps-container'>
                <StepsList recipeDetail={recipeDetail} />
            </div>
            <div className='nutrition-div'>{displayNutrition()}</div>
            <br></br>
            <button className='general-btn-red' onClick={goBack}>Back</button>
        </div>
    )

}

export default RecipeDetail;