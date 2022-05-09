import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import GlobalContext from "../context/GlobalContext";
import { Navbar, Container } from "react-bootstrap";
import lettuce from '../Images/lettuce.png'
import './NavBar.css'

/** NavBar is always visible, allows quick navigation between the site's main features
 * 
 * loggedOutView - dispays login/sign-up and continue as guest button
 * 
 * loggedInView - displays the four main features of the site (Find Recipes, Saved Recipes, Mealplan, Calculate Points) and logout button
  */
const NavBar = ({ logout, guestLogin }) => {
    const { currentUser } = useContext(GlobalContext)

    const loggedInView = <>

        <NavLink className="nav-link" to="/findrecipes">
            Find Recipes
        </NavLink>

        <NavLink className="nav-link" to="/savedrecipes">
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

   

            <NavLink className="nav-link signup " to="/signup">
                Signup
            </NavLink>

            <button onClick={guestLogin} className="general-btn mt-2">Continue as Guest</button>

            <NavLink className="nav-link login" to="/login">
                Login
            </NavLink>
   

    </>

    return (
        <Navbar className="NavBar" expand="lg">

            <Navbar.Brand className="NavBar-Brand">
                <NavLink className="nav-link" to="/healthyeater">
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