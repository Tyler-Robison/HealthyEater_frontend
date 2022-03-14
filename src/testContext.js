import React, { useState, useEffect } from "react";
import GlobalContext from "./context/GlobalContext";
import jwt from 'jsonwebtoken'
import { testUser, testRecipes } from "./testHelpers";


const ContextProvider = ({ children, userData = testUser, initRecipes = testRecipes }) => {

  const [token, setToken] = useState('fake token')
  const [currentUser, setCurrentUser] = useState(userData);
  const [recipes, setRecipes] = useState(initRecipes)

  const login = token => setToken(token);


  const providerObj = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
    login,
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