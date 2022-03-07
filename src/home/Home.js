import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import './Home.css'

const Home = () => {
    const { currentUser } = useContext(GlobalContext)

    return (
        <div className="Home">
            <div className="Home-div">
                {currentUser ? <h1>Welcome back {currentUser.username}!</h1> : <h1 className="Home-h1">Welcome to Healthy-Eater!</h1>}
                {!currentUser && <p className="Home-para"> You aren't logged in, click <b>login</b> or <b>signup</b> buttons to access site</p>}
                <p className="Home-para"><b>Find Recipes</b> allows you to search for recipes based on ingredients and nutrients</p>
                <p className="Home-para"><b>Saved Recipes</b> is where you view or delete your saved recipes</p>
                <p className="Home-para"><b>Mealplan</b> is where you create your mealplan using saved recipes</p>
                <p className="Home-para"><b>Calculate Points</b> determines your weekly allotment of Weight Watcher Smart Points</p>
            </div>
        </div>
    )
}

export default Home;