import React, { useState, useEffect } from "react";
import './App.css';
// App.css contains a few universal styles that are used throughout app
import UserAPI from "../APIs/userAPI";
import RouteList from './RouteList';
import NavBar from '../Navigation/NavBar';
import jwt from 'jsonwebtoken'
import useLocalStorage from "../customHooks/useLocalStorage";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from 'react-router-dom';

/** App is the top-level component 
 * 
 * All state relating to user auth is declared here and passed down to child components
 * 
 * sets up Global context to pass state to other components
 * 
 * Renders NavBar and RouteList which collectively contain all other components of the app*/
function App() {
  const [token, setToken] = useLocalStorage('token')
  const [currentUser, setCurrentUser] = useState(null);
  const [recipes, setRecipes] = useState([])

  const logout = () => setToken(null);
  const login = token => setToken(token);
  const navigate = useNavigate();
  /** logs user into pre-made guest account
   * 
   * username: 'guest'
   * 
   * password: 'password' */
  const guestLogin = async () => {
    const res = await UserAPI.login({ password: 'password', username: 'guest' })
    login(res.token);
    navigate('/')
  }

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


  const providerObj = {
    currentUser,
    setCurrentUser,
    token,
    login,
    recipes,
    setRecipes
  }


  return (
    <div className="App">
      <GlobalContext.Provider value={providerObj}>
        <div className="main-container d-flex h-100 flex-column">
          <NavBar logout={logout} guestLogin={guestLogin} />
          <RouteList />
        </div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
