import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpoonacularAPI from '../../APIs/spoonAPI';
import RecipeAPI from '../../APIs/recipeAPI';
import NutrientTable from './NutrientTable';
import StepsList from './StepsList';
import GlobalContext from '../../context/GlobalContext';
import Spinner from '../../Spinner';
import './RecipeDetail.css'

const RecipeDetail = () => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext)
    const { recipeID } = useParams()
    const navigate = useNavigate();
    const [recipeDetail, setRecipeDetail] = useState(null)
    const [nutritionDetail, setNutritionDetail] = useState(null)

    // Needs to direct user to page they came from
    // can be recipeList, Mealplan or savedRecipes
    const goBack = () => navigate(-1)

    useEffect(() => {
        const getRecipeDetail = async () => {
            const res = await SpoonacularAPI.getRecipeDetail(recipeID, token, currentUser.id);
            setNutritionDetail(res.nutrition)
            setRecipeDetail(res.recipe)
        }
        getRecipeDetail();
    }, [])

    // only care recipe detail, nutri detail can be obtained based on recipe_id
    const saveRecipe = async () => {
        const recipeRes = await RecipeAPI.saveRecipe(recipeDetail, currentUser.id, token)

        currentUser.recipes.push(recipeRes.savedRecipe)

        setCurrentUser({ ...currentUser, currentUser })
    }

    if (!recipeDetail) return <Spinner />

    return (
        <div className='RecipeDetail'>
            <div className='row mt-3'>
                <div className='RecipeDetail-summary col-12'>
                    <h1 className='RecipeDetail-header'>{recipeDetail.title}</h1>

                    <p>Preparation Time: {recipeDetail.readyInMinutes} Minutes</p>
                    <p>Serves: {recipeDetail.servings}</p>
                    <p>Weight Watcher's Smart Points: {recipeDetail.weightWatcherSmartPoints}</p>
                </div>
            </div>
            <button className='general-btn save-recipe-btn' onClick={saveRecipe}>Save Recipe</button>
            <button className='general-btn-red' onClick={goBack}>Back</button>
            <div className='steps-container'>
                <StepsList recipeDetail={recipeDetail} />
            </div>

            <div className='nutrition-div'>
                <div className='header-backer'><h2>Bad Stuff!</h2></div>
                <NutrientTable nutritionDetail={nutritionDetail.bad} />

                <div className='header-backer'><h2>Good Stuff!</h2></div>
                <NutrientTable nutritionDetail={nutritionDetail.good} />
            </div>

            <button className='general-btn-red' onClick={goBack}>Back</button>
        </div>
    )

}

export default RecipeDetail;