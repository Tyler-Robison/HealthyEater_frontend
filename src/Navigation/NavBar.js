import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import GlobalContext from "../context/GlobalContext";
import { Navbar, Container } from "react-bootstrap";
import lettuce from '../Images/lettuce.png'
import './NavBar.css'

const NavBar = ({ logout }) => {
    const { currentUser } = useContext(GlobalContext)

    const loggedInView = <>

        <NavLink className="nav-link" to="/find_recipes">
            Find Recipes
        </NavLink>

        <NavLink className="nav-link" to="/recipes/saved-recipes">
            Saved Recipes
        </NavLink>

        <NavLink className="nav-link" to="/mealplan">
            Mealplan
        </NavLink>

        <NavLink className="nav-link" to="/points">
            Calculate Points
        </NavLink>


        {currentUser && <button className="general-btn-red logout-btn" onClick={logout}> Log Out {currentUser.username}</button>}

    </>

    const loggedOutView = <>

        <NavLink className="nav-link signup" to="/users/signup">
            Signup
        </NavLink>
    
        <NavLink className="nav-link login" to="/users/login">
            Login
        </NavLink>

    </>

    // carrot icon next to healthy eater
    return (
        <Navbar className="NavBar" expand="lg">

            <Navbar.Brand className="NavBar-Brand">
                <NavLink className="nav-link" to="/healthy-eater">
                    Healthy-Eater<img className="brand-img" src={lettuce} height='28px' width='28px'></img>
                </NavLink>
            </Navbar.Brand>

            <Container className="NavBar-Container">

                {currentUser ? loggedInView : loggedOutView}

            </Container>
        </Navbar>
    )
}

export default NavBar;