import React, { useState } from 'react';
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