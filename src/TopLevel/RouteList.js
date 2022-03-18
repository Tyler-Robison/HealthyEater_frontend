import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import GetRecipes from "../Recipes/findRecipes/GetRecipes";
import RecipeDetail from "../Recipes/recipeDetail/RecipeDetail";
import RequireAuth from "./RequireAuth";
import MealPlanner from "../userData/mealPlanner/MealPlanner";
import Home from "../home/Home";
import UserPoints from "../userData/userPoints/UserPoints";
import LoginForm from "../users/LoginForm";
import SignupForm from "../users/SignupForm";
import RecipeList from "../Recipes/findRecipes/RecipeList";
import UserRecipeList from "../userData/userRecipes/UserRecipeList";

/** RouteList Contains all routes used by Healthy-Eater app
 * 
 * routes wrapped in <RequireAuth> require user to be logged in
 * 
 * unrecognized routes re-direct to homepage*/
const RouteList = () => {

    return (
        <Routes>

            {/* homepage */}
            <Route path="/healthyeater" element={<Home />} />


            {/* recipe routes */}
            <Route path="/findrecipes"
                element={<RequireAuth redirectTo="/login"><GetRecipes /></RequireAuth>} />

            <Route path="/recipes"
                element={<RequireAuth redirectTo="/login"><RecipeList /></RequireAuth>} />

            <Route path="/recipes/:recipeID"
                element={<RequireAuth redirectTo="/login"><RecipeDetail /></RequireAuth>} />

            <Route path="/savedrecipes"
                element={<RequireAuth redirectTo="/login"><UserRecipeList /></RequireAuth>} />


            {/* user auth routes */}
            <Route path="/signup" element={<SignupForm />} />

            <Route path="/login" element={<LoginForm />} />


            {/* mealplan routes */}
            <Route path="/mealplan"
                element={<RequireAuth redirectTo="/login"><MealPlanner /></RequireAuth>} />


            <Route path="/points"
                element={<RequireAuth redirectTo="/login"><UserPoints /></RequireAuth>} />


            {/* re-direct routes */}
            <Route path="/" element={<Navigate replace to="/healthyeater" />} />
            <Route path='*' element={<Navigate replace to="/healthyeater" />} />
        </Routes>
    )
}

export default RouteList;