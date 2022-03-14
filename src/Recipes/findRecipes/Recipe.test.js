import React from 'react';
import { render, screen } from '@testing-library/react';
import Recipe from './Recipe';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext'
import { testRecipes } from '../../testHelpers';

// using listState to set 
const DummyComponent = () => {

    return (
        <Recipe recipe={testRecipes[0]} />
    )
}

it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider >
            <DummyComponent />
        </ContextProvider>
    </MemoryRouter>
});

it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
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

    // name
    expect(screen.getByText('Scrambled Eggs')).toBeInTheDocument()
    
    // ingredient count
    expect(screen.getByText('Uses 2 of your ingredients ( eggs, otherIngredient )')).toBeInTheDocument()
})