
import React from 'react';
import { render, screen } from '@testing-library/react';
import StepsList from './StepsList';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';

const mockInstructions = {
    steps: [
        {
            number: 1,
            step: 'Do the first step',
            equipment: [{ name: 'mock equipment' }, { name: 'other equipment' }],
            ingredients: [{ name: 'mock ingredient' }, { name: 'other ingredient' }]
        },
        {
            number: 2,
            step: 'Do the second step',
            equipment: [],
            ingredients: []
        },
        {
            number: 3,
            step: 'Do the third step',
            equipment: [{ name: 'mock equipment' }],
            ingredients: [{ name: 'mock ingredient' }]
        }
    ]
}

const recipeDetail = {
    analyzedInstructions: [mockInstructions]
}

it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider >
            <StepsList recipeDetail={recipeDetail} />
        </ContextProvider>
    </MemoryRouter>
});

it("matches snapshot.", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <StepsList recipeDetail={recipeDetail} />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("correctly renders steps", function () {

    render(
        <MemoryRouter>
            <ContextProvider >
            <StepsList recipeDetail={recipeDetail} />
            </ContextProvider>
        </MemoryRouter>
    );

    expect(screen.getByText('mock equipment, other equipment')).toBeInTheDocument();
    expect(screen.getByText('mock ingredient, other ingredient')).toBeInTheDocument();
    expect(screen.getByText('Do the first step')).toBeInTheDocument();
    expect(screen.getByText('Do the second step')).toBeInTheDocument();
    expect(screen.getByText('Do the third step')).toBeInTheDocument();
});