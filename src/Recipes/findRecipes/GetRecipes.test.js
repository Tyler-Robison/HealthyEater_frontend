import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import GetRecipes from './GetRecipes';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext'
import mockedAxios from 'axios';
import { testRecipes } from '../../testHelpers'

// Ability to get recipes is tested in App.test, under:
// new user can sign-up then access site functionality

it("renders without crashing", function () {
    <MemoryRouter>
        <GetRecipes />
    </MemoryRouter>
});


it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <GetRecipes />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

test("can add ingredients", async function () {

    render(
        <MemoryRouter>
            <ContextProvider >
                <GetRecipes />
            </ContextProvider>
        </MemoryRouter>
    );

    const addIngredientBtn = screen.getByText('Add Ingredient')
    const ingredientInput = screen.getByPlaceholderText('Enter Ingredient')

    fireEvent.change(ingredientInput, { target: { value: 'Cheese' } });
    fireEvent.click(addIngredientBtn)

    await waitFor(() => {
        expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    fireEvent.change(ingredientInput, { target: { value: 'Olives' } });
    fireEvent.click(addIngredientBtn)

    await waitFor(() => {
        expect(screen.getByText('Cheese')).toBeInTheDocument();
        expect(screen.getByText('Olives')).toBeInTheDocument();
    });
})

test("Can't add multiple ingredients at once", async function () {

    render(
        <MemoryRouter>
            <ContextProvider >
                <GetRecipes />
            </ContextProvider>
        </MemoryRouter>
    );

    const addIngredientBtn = screen.getByText('Add Ingredient')
    const ingredientInput = screen.getByPlaceholderText('Enter Ingredient')

    fireEvent.change(ingredientInput, { target: { value: 'Cheese, Olives' } });
    fireEvent.click(addIngredientBtn)

    await waitFor(() => {
        expect(screen.getByText('Enter one ingredient at a time!')).toBeInTheDocument();
    });

})