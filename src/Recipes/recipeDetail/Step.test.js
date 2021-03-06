import React from 'react';
import { render, screen } from '@testing-library/react';
import Step from './Step';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';

const step = {
    number: 1,
    step: 'Do the first step',
    equipment: [{ name: 'mock equipment' }, { name: 'other equipment' }],
    ingredients: [{ name: 'mock ingredient' }, { name: 'other ingredient' }]
}

it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider >
            <Step step={step} />
        </ContextProvider>
    </MemoryRouter>
});

it("matches snapshot.", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <Step step={step} />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("correctly renders step", function () {

    render(
        <MemoryRouter>
            <ContextProvider >
                <Step step={step} />
            </ContextProvider>
        </MemoryRouter>
    );

    expect(screen.getByText('mock equipment, other equipment')).toBeInTheDocument();
    expect(screen.getByText('mock ingredient, other ingredient')).toBeInTheDocument();
    expect(screen.getByText('Do the first step')).toBeInTheDocument();
});