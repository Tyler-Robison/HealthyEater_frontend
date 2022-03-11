import React, { useState, useEffect } from "react";
import './App.css';
// App.css contains a few universal styles that are used throughout app
import UserAPI from "../APIs/userAPI";
import RouteList from './RouteList';
import NavBar from '../Navigation/NavBar';
import jwt from 'jsonwebtoken'
import useLocalStorage from "../customHooks/useLocalStorage";
import GlobalContext from "../context/GlobalContext";

// Top Level Component of the application
// currentUserState exists for testing purposes only
function App({ currentUserState = null }) {
  const [token, setToken] = useLocalStorage('token')
  const [currentUser, setCurrentUser] = useState(currentUserState);
  const [msg, setMsg] = useState('');
  const [recipes, setRecipes] = useState([])

  const clearMsg = () => setMsg('');

  const logout = () => setToken(null);
  const login = token => setToken(token);

  useEffect(() => {
    const loginLogout = async () => {
      if (token && token.length !== 0) {
        
        // token contains id, iat (issued at)
        const id = jwt.decode(token).id

        // userInfo contains:
        // Auth information (id)
        // user's calculated points
        // user's saved recipes
        // user's mealplan
        const userInfo = await UserAPI.getUserInfo(id, token)
        setCurrentUser(userInfo);
      }
      else {
        setCurrentUser(null)
      }
    }
    loginLogout()
  }, [token])

  // state where each var is being used
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
    <div className="App">
      <GlobalContext.Provider value={providerObj}>
        <NavBar logout={logout} />
        <RouteList />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
