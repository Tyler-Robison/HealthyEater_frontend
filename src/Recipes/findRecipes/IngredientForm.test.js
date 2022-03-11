import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import IngredientForm from './IngredientForm';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext'

// 
const DummyComponent = (listState = []) => {
    const [ingredientsList, setIngredientsList] = useState(listState)

    return (
        <IngredientForm ingredientsList={ingredientsList}
            setIngredientsList={setIngredientsList} />
    )
}

it("renders without crashing", function () {
    <MemoryRouter>
        <DummyComponent />
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

// will have identical HTML structure 
// making sure it still renders correctly with list items. 
it("matches snapshot with filled ingredientList", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent listState={['cheese', 'eggs']} />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});