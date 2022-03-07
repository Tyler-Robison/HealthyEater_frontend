import { render, screen } from '@testing-library/react';
import UserRecipeList from './UserRecipeList';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'


it("renders without crashing", function () {
    <MemoryRouter>
        <UserRecipeList />
    </MemoryRouter>
});

it("matches snapshot when logged out", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <UserRecipeList />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});