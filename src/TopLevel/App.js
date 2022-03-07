import React, { useState, useEffect } from "react";
import './App.css';
import UserAPI from "../APIs/userAPI";
import RouteList from './RouteList';
import NavBar from '../Navigation/NavBar';
import jwt from 'jsonwebtoken'
import useLocalStorage from "../customHooks/useLocalStorage";
import GlobalContext from "../context/GlobalContext";
import Message from "./Message";

function App() {

  const [token, setToken] = useLocalStorage('token')
  const [currentUser, setCurrentUser] = useState(null);
  const [msg, setMsg] = useState('');
  const [recipes, setRecipes] = useState([])

  // const displayMsg = message => setMsg(message);
  const clearMsg = () => setMsg(null);

  const logout = () => setToken(null);
  const login = token => setToken(token);

  // changed to id instead of username
  useEffect(() => {
    const loginLogout = async () => {
      if (token && token.length !== 0) {
        // token only contains id, username, isAdmin
        // createToken function determines what it contains
        const id = jwt.decode(token).id
        // this is where login is failing
        // middle-ware protection on .get /:id
        const res = await UserAPI.getUserInfo(id, token)
        setCurrentUser(res);
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
