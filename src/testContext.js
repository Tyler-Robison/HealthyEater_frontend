import React, { useState } from "react";
import GlobalContext from "./context/GlobalContext";

const mealplanArr = [
  { id: 1, day: 'Mon', recipe_id: 1111, name: 'bacon', ww_points: 20 },
  { id: 2, day: 'Mon', recipe_id: 2222, name: 'eggs', ww_points: 10 },
  { id: 3, day: 'Tues', recipe_id: 3333, name: 'salad', ww_points: 5 }
];

const recipeArr = [
  { name: 'bacon', recipe_id: 1111, ww_points: 20 },
  { name: 'eggs', recipe_id: 2222, ww_points: 10 },
  { name: 'salad', recipe_id: 3333, ww_points: 5 },
  { name: 'bread', recipe_id: 4444, ww_points: 7 },
];

const testUser = {
  id: 1,
  username: "Tyler",
  isAdmin: false,
  points: null,
  mealplan: mealplanArr,
  recipes: recipeArr
};

const ContextProvider = ({ children, userData = testUser }) => {

  const [token, setToken] = useState('fake token')
  const [currentUser, setCurrentUser] = useState(userData);
  const [msg, setMsg] = useState('');
  const [recipes, setRecipes] = useState([])

  const clearMsg = () => setMsg(null);
  const login = token => setToken(token);

  const providerObj = {
    currentUser,
    setCurrentUser,
    token,
    login,
    msg,
    setMsg,
    clearMsg,
    recipes,
    setRecipes
  }

  return (
    <GlobalContext.Provider value={providerObj}>
      {children}
    </GlobalContext.Provider>
  )
};

export default ContextProvider;