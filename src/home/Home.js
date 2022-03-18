import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
    const { currentUser } = useContext(GlobalContext)

    return (
        <div className="Home">
            <div className="row mt-3">
                <div className="Home-div col-12">
                    {currentUser ? <h1>Welcome back {currentUser.username}!</h1> : <h1 className="Home-h1">Welcome to Healthy-Eater!</h1>}
                    {!currentUser && <p className="Home-para"> You aren't logged in, <Link to='/users/login'><b>Login</b></Link> or <Link to='/users/signup'><b>Sign-up</b></Link> to access site</p>}
                    <p className="Home-para"><b>Find Recipes:</b> Search for recipes based on ingredients and nutrients</p>
                    <p className="Home-para"><b>Saved Recipes:</b> View or delete your saved recipes</p>
                    <p className="Home-para"><b>Mealplan:</b> Create your mealplan using saved recipes</p>
                    <p className="Home-para"><b>Calculate Points:</b> Determine your weekly allotment of Weight Watcher Smart Points</p>
                </div>
            </div>
        </div>
    )
}

export default Home;