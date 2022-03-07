import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'


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