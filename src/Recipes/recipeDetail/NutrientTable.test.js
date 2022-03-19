import React from 'react';
import { render, screen } from '@testing-library/react';
import NutrientTable from './NutrientTable';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext'

// mocked versions of good/bad nutrients associated with a search returned recipe
const goodNutrients = [
    { title: 'Protein', amount: '68g', indented: false, percentOfDailyNeeds: 137.37 },
    { title: 'Selenium', amount: '105µg', indented: false, percentOfDailyNeeds: 150.87 },
    { title: 'Vitamin B3', amount: '28mg', indented: false, percentOfDailyNeeds: 143.89 },
    { title: 'Vitamin B6', amount: '1mg', indented: false, percentOfDailyNeeds: 97.74 },
    { title: 'Phosphorus', amount: '758mg', indented: false, percentOfDailyNeeds: 75.9 },
    { title: 'Vitamin B1', amount: '0.85mg', indented: false, percentOfDailyNeeds: 56.5 },
    { title: 'Vitamin B2', amount: '0.77mg', indented: false, percentOfDailyNeeds: 45.51 },
    { title: 'Manganese', amount: '0.83mg', indented: false, percentOfDailyNeeds: 41.55 },
    { title: 'Vitamin B5', amount: '4mg', indented: false, percentOfDailyNeeds: 40.63 },
    { title: 'Vitamin K', amount: '42µg', indented: false, percentOfDailyNeeds: 40.47 },
    { title: 'Iron', amount: '6mg', indented: false, percentOfDailyNeeds: 37.35 },
    { title: 'Potassium', amount: '1143mg', indented: false, percentOfDailyNeeds: 32.67 },
    { title: 'Folate', amount: '121µg', indented: false, percentOfDailyNeeds: 30.38 },
    { title: 'Calcium', amount: '277mg', indented: false, percentOfDailyNeeds: 27.78 },
    { title: 'Magnesium', amount: '107mg', indented: false, percentOfDailyNeeds: 26.77 },
    { title: 'Zinc', amount: '3mg', indented: false, percentOfDailyNeeds: 23.98 },
    { title: 'Vitamin B12', amount: '1µg', indented: false, percentOfDailyNeeds: 17.71 },
    { title: 'Fiber', amount: '3g', indented: false, percentOfDailyNeeds: 15.3 },
    { title: 'Copper', amount: '0.26mg', indented: false, percentOfDailyNeeds: 13.16 },
    { title: 'Vitamin A', amount: '588IU', indented: false, percentOfDailyNeeds: 11.77 },
    { title: 'Vitamin C', amount: '6mg', indented: false, percentOfDailyNeeds: 8.31 },
    { title: 'Vitamin E', amount: '1mg', indented: false, percentOfDailyNeeds: 7.09 },
    { title: 'Vitamin D', amount: '0.96µg', indented: false, percentOfDailyNeeds: 6.43 }
]

const badNutrients = [
    { title: 'Calories', amount: '660k', indented: false, percentOfDailyNeeds: 33.03 },
    { title: 'Fat', amount: '20g', indented: false, percentOfDailyNeeds: 31.41 },
    { title: 'Saturated Fat', amount: '7g', indented: true, percentOfDailyNeeds: 48.21 },
    { title: 'Carbohydrates', amount: '46g', indented: false, percentOfDailyNeeds: 15.51 },
    { title: 'Sugar', amount: '2g', indented: true, percentOfDailyNeeds: 2.39 },
    { title: 'Cholesterol', amount: '261mg', indented: false, percentOfDailyNeeds: 87.23 },
    { title: 'Sodium', amount: '1134mg', indented: false, percentOfDailyNeeds: 49.32 }
]

const DummyComponent = ({ nutrientArr }) => {

    return (
        <NutrientTable nutritionDetail={nutrientArr} />
    )
}

it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider >
            <DummyComponent nutrientArr={goodNutrients} />
        </ContextProvider>
    </MemoryRouter>
});

it("matches snapshot with good nutrients", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent nutrientArr={goodNutrients} />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("matches snapshot with bad nutrients", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <DummyComponent nutrientArr={badNutrients} />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("correctly renders NutrientTable", function () {

    render(
        <MemoryRouter>
            <ContextProvider >
            <DummyComponent nutrientArr={goodNutrients} />
            </ContextProvider>
        </MemoryRouter>
    );

    expect(screen.getByText('Vitamin B12')).toBeInTheDocument();
    expect(screen.getByText('1µg')).toBeInTheDocument();
    expect(screen.getByText('17.71')).toBeInTheDocument();
    expect(screen.getByText('Copper')).toBeInTheDocument();
    expect(screen.getByText('0.26mg')).toBeInTheDocument();
    expect(screen.getByText('13.16')).toBeInTheDocument();
 
});