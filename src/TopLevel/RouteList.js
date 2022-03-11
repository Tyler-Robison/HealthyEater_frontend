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

const RouteList = () => {
    // routes which require user to be logged in are wrapped in RequireAuth component
    // which checks for logged-in user and re-directs to login if needed

    return (
        <Routes>

            {/* homepage */}
            <Route path="/healthy-eater" element={<Home />} />


            {/* recipe routes */}
            <Route path="/find_recipes"
                element={<RequireAuth redirectTo="/login"><GetRecipes /></RequireAuth>} />

            <Route path="/recipes"
                element={<RequireAuth redirectTo="/login"><RecipeList /></RequireAuth>} />

            <Route path="/:recipeID/detail"
                element={<RequireAuth redirectTo="/login"><RecipeDetail /></RequireAuth>} />

            <Route path="/recipes/saved-recipes"
                element={<RequireAuth redirectTo="/login"><UserRecipeList /></RequireAuth>} />


            {/* user auth routes */}
            <Route path="/users/signup" element={<SignupForm />} />

            <Route path="/users/login" element={<LoginForm />} />


            {/* mealplan routes */}
            <Route path="/mealplan"
                element={<RequireAuth redirectTo="/login"><MealPlanner /></RequireAuth>} />


            <Route path="/points"
                element={<RequireAuth redirectTo="/login"><UserPoints /></RequireAuth>} />


            {/* re-direct routes */}
            <Route path="/" element={<Navigate replace to="/healthy-eater" />} />
            <Route path='*' element={<Navigate replace to="/healthy-eater" />} />
        </Routes>
    )
}

export default RouteList;