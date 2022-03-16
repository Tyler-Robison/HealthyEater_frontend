import React, { useContext, useState } from "react";
import SpoonacularAPI from "../../APIs/spoonAPI";
import IngredientForm from "./IngredientForm";
import NutrientForm from "./NutrientForm";
import IngredientList from "./IngredientList";
import useTimedMessage from "../../customHooks/useTimedMessage";
import GlobalContext from "../../context/GlobalContext";
import './GetRecipes.css'
import { useNavigate } from "react-router-dom";

const GetRecipes = () => {
    const { setRecipes, token, currentUser } = useContext(GlobalContext)
    const [isMsgActive, setIsMsgActive] = useTimedMessage()
    const [isMsg2Active, setIsMsg2Active] = useTimedMessage()

    const navigate = useNavigate();
    const [ingredientsList, setIngredientsList] = useState([])

    const [fat, setFat] = useState(null)
    const [satFat, setSatFat] = useState(null)
    const [calories, setCalories] = useState(null)
    const [carbs, setCarbs] = useState(null)
    const [sugar, setSugar] = useState(null)
    const [sodium, setSodium] = useState(null)
    const [cholesterol, setCholesterol] = useState(null)
    const [protein, setProtein] = useState(null)

    // contains min/max values all recipes must fall within
    const nutrientObj = {
        maxFat: fat,
        maxSaturatedFat: satFat,
        maxCalories: calories,
        maxCarbs: carbs,
        maxCholesterol: cholesterol,
        maxSugar: sugar,
        maxSodium: sodium,
        maxProtein: protein
    }

    const getRecipesFunc = async () => {
        if (ingredientsList.length === 0) {
            setIsMsg2Active(true)
        }
        const res = await SpoonacularAPI.getRecipes(ingredientsList, nutrientObj, token, currentUser.id)
        
        if (res.results.length === 0) {
            setIsMsgActive(true)
            return
        } else {
            setIsMsgActive(false)
        }
        setRecipes(res.results);
        navigate('/recipes');
    }

    return (
        <div className="GetRecipes">
            <div className="GetRecipes-explainer-div">
                <h2>Recipe Search</h2>
                <p className="GetRecipes-explainer-para">1) Enter ingredients one at a time</p>
                <p className="GetRecipes-explainer-para">2) Optionally, add nutrient requirements</p>
                <p className="GetRecipes-explainer-para">3) Click "Get Recipes"</p>
            </div>
            <div className="GetRecipes-container container">
                <div className="row">
                    <div className="GetRecipes-ingredient-div col-md-6">

                        <div className="GetRecipes-IngForm-container content-box d-flex flex-column">
                            <h3 className="GetRecipes-header">Ingredients</h3>

                            <div className="flex-grow-1 d-flex flex-column justify-content-between">
                                <div>
                                    {isMsgActive ? <p>Recipe search failed. Try removing ingredients. If you have nutritional constraints, try relaxing them.</p> : null}
                                    {isMsg2Active ? <p>Must add at least one ingredient!</p> : null}
                                    <IngredientForm ingredientsList={ingredientsList} setIngredientsList={setIngredientsList} />
                                    <IngredientList ingredientsList={ingredientsList} setIngredientsList={setIngredientsList} />

                                </div>
                                <div className="row d-flex flex-column align-items-center">
                                    <button className="general-btn GetRecipes-btn col-6" onClick={getRecipesFunc}>Get Recipes</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="GetRecipes-nutrient-div col-md-6">

                        <div className="GetRecipes-NutForm-container content-box">
                            <h3 className="GetRecipes-header">Nutrients</h3>

                            <NutrientForm
                                setFat={setFat}
                                setSatFat={setSatFat}
                                setSugar={setSugar}
                                setSodium={setSodium}
                                setCholesterol={setCholesterol}
                                setCalories={setCalories}
                                setCarbs={setCarbs}
                                setProtein={setProtein}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetRecipes;