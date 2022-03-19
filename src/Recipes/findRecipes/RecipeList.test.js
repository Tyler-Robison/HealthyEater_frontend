import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeList from './RecipeList';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext'

// using listState to set 
const DummyComponent = () => {

    return (
        <RecipeList />
    )
}

it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider >
            <DummyComponent />
        </ContextProvider>
    </MemoryRouter>
});

// recipeList provided in testContext as testRecipes
it("matches snapshot with filled recipeList", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});


it("matches snapshot with blank recipeList", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider initRecipes={[]}>
                <DummyComponent />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("correctly displays recipe values", function () {
    render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent />
            </ContextProvider>
        </MemoryRouter>
    );

    // name of first recipe
    expect(screen.getByText('Scrambled Eggs')).toBeInTheDocument()
    
    // ingredient count of first recipe
    expect(screen.getByText('Uses 2 of your ingredients ( eggs, otherIngredient )')).toBeInTheDocument()

    // second recipe
    expect(screen.getByText('BLT')).toBeInTheDocument()

    // second recipe
    expect(screen.getByText('Uses 3 of your ingredients ( bacon, lettuce, tomato )')).toBeInTheDocument()
})