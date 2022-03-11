import React, { useState, useEffect, useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'
import jwt from 'jsonwebtoken'
import GlobalContext from "../context/GlobalContext";
import App from '../TopLevel/App'



const logout = () => setToken(null);

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

// need to create fake version of App component
const DummyApp = () => {
    // const [token, setToken] = useState('token')
    // const [currentUser, setCurrentUser] = useState(null);
    const { setCurrentUser, token } = useContext(GlobalContext);
    const logout = () => setToken(null);

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

    return (

        <NavBar logout={logout} />

    );
}


// test('logged in users can log out', function () {
//     const app = render(
//         <MemoryRouter>
//             <ContextProvider>
//                 <DummyApp />
//             </ContextProvider>
//         </MemoryRouter>
//     );

    // const logoutBtn = app.getByText('Log Out Tyler')
    // expect(logoutBtn).toBeInTheDocument();
    // fireEvent.click(logoutBtn)
    // expect(logoutBtn).not.toBeInTheDocument();
// });