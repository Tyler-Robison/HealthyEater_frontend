import React, { useState, useContext, useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'
import GlobalContext from '../context/GlobalContext'




it("renders without crashing", function () {
    <MemoryRouter>
        <NavBar />
    </MemoryRouter>
});

it("matches snapshot when logged in", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider>
                <NavBar />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider userData={null} >
                <NavBar />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

// Have to create a dummy version of App so that logout can be passed into NavBar
const DummyComponent = () => {

    const { token, setToken, setCurrentUser } = useContext(GlobalContext)

    const logout = () => setToken(null);

    useEffect(() => {
        const loginLogout = async () => {
            // currentUser being truthy/falsy is what determines
            // if logout button will be present
            if (token === null) setCurrentUser(null);
        }
        loginLogout()
    }, [token])

    return (
        <NavBar logout={logout} />
    )
}

it("logged in users can logout", function () {
    render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent />
            </ContextProvider>
        </MemoryRouter>
    )

    // prior to logout, logout btn and find recipes are present
    // signup is absent
    const logoutBtn = screen.getByText('Log Out Tyler')
    let findRecipes = screen.queryByText('Find Recipes')
    let signup = screen.queryByText('Signup')
    expect(logoutBtn).toBeInTheDocument();
    expect(signup).not.toBeInTheDocument()
    expect(findRecipes).toBeInTheDocument();

    fireEvent.click(logoutBtn)

    // after logout, logout btn and find recipes are absent
    // signup is present
    signup = screen.queryByText('Signup')
    findRecipes = screen.queryByText('Find Recipes')
    expect(logoutBtn).not.toBeInTheDocument();
    expect(signup).toBeInTheDocument()
    expect(findRecipes).not.toBeInTheDocument();
});


