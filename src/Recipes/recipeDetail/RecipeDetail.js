import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpoonacularAPI from '../../APIs/spoonAPI';
import RecipeAPI from '../../APIs/recipeAPI';
import NutrientTable from './NutrientTable';
import StepsList from './StepsList';
import GlobalContext from '../../context/GlobalContext';
import Spinner from '../../Spinner';
import useTimedMessage from '../../customHooks/useTimedMessage';
import './RecipeDetail.css'

/** RecipeDetail displays the detailed information for an individual recipe, detail comes from /recipes/detail
 * 
 * users can save recipes which will allow them to be used in their mealplanner
 * 
 * renders StepsList component which displays the detail recipe steps
  */
const RecipeDetail = () => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext)
    const { recipeID } = useParams()
    const navigate = useNavigate();
    const [recipeDetail, setRecipeDetail] = useState(null)
    const [nutritionDetail, setNutritionDetail] = useState(null)
    const [savedMsg, setSavedMsg] = useTimedMessage(2500)
    const [alreadySavedMsg, setAlreadySavedMsg] = useTimedMessage(2500)

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

   /** saves recipe name, id and points value in back-end
    * 
    * Updates front-end upon succes response from back-end*/
    const saveRecipe = async () => {
        try {
            const recipeRes = await RecipeAPI.saveRecipe(recipeDetail, currentUser.id, token)

            currentUser.recipes.push(recipeRes.savedRecipe)
           
            setCurrentUser({ ...currentUser, currentUser });
            setSavedMsg(true)
        } catch (err) {
           setAlreadySavedMsg(true)
        }
    }

    // display spinner until done loading
    if (!recipeDetail) return <Spinner />

    return (
        <div className='RecipeDetail'>
            <div className='row mt-3'>
                <div className='RecipeDetail-summary col-12'>
                    <h1 className='RecipeDetail-header'>{recipeDetail.title}</h1>

                    <p>Preparation Time: {recipeDetail.readyInMinutes} Minutes</p>
                    <p>Serves: {recipeDetail.servings}</p>
                    <p>Weight Watcher's Smart Points: {recipeDetail.weightWatcherSmartPoints}</p>
                    {savedMsg && <p>Recipe Saved</p>}
                    {alreadySavedMsg && <p>You already saved that recipe!</p>}
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