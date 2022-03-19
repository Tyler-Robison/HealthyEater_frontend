import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import IngredientList from './IngredientList';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext'

// using listState to set 
const DummyComponent = ({ initialState = [] }) => {
    const [ingredientsList, setIngredientsList] = useState(initialState)

    return (
        <IngredientList ingredientsList={ingredientsList}
            setIngredientsList={setIngredientsList} />
    )
}

it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider >
            <DummyComponent />
        </ContextProvider>
    </MemoryRouter>
});


it("matches snapshot with blank ingredientList", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});


it("matches snapshot with filled ingredientList", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent initialState={['cheese', 'eggs']} />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("correctly renders IngredientList", function () {
    render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent initialState={['cheese', 'eggs', 'ham']} />
            </ContextProvider>
        </MemoryRouter>
    );

    // name of first recipe
    expect(screen.getByText('cheese')).toBeInTheDocument()
    expect(screen.getByText('eggs')).toBeInTheDocument()
    expect(screen.getByText('ham')).toBeInTheDocument()
})