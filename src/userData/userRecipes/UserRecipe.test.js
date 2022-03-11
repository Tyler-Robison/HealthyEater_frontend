import { render, screen } from '@testing-library/react';
import UserRecipe from './UserRecipe';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';


const fakeRecipe = { name: 'bacon', recipe_id: 1111, ww_points: 20 };

it("renders without crashing", function () {
    <MemoryRouter>
        <UserRecipe recipe={fakeRecipe} />
    </MemoryRouter>
});


it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <UserRecipe recipe={fakeRecipe} />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});