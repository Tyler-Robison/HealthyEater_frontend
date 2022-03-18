import React, { useState } from "react";
import GlobalContext from "./context/GlobalContext";
import { testUser, testRecipes } from "./testHelpers";

/** mock version of GlobabContext, used in many tests 
 * 
 * Allows manual setting of currentUser and recipes without having to register
 * 
 * Prevents app from trying to get token out of localStorage*/
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