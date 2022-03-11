import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeDetail from './RecipeDetail';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';
import { waitFor, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import mockedAxios from 'axios';


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

const data = {
    data: {
        nutrition: {
            good: goodNutrients,
            bad: badNutrients
        },
        recipe: {
            title: 'mocked recipe title',
            readyInMinutes: 45,
            weightWatcherSmartPoints: 4,
            servings: 5,
            analyzedInstructions: [mockInstructions]
        }
    }
};

// getting correct value back from mockAxios, but not waiting
// if (!recipeDetail) return <p>Loading...</p>

afterEach(cleanup);

it("renders without crashing", function () {
    mockedAxios.get.mockResolvedValueOnce(data);

        <MemoryRouter>
            <ContextProvider >
                <RecipeDetail />
            </ContextProvider>
        </MemoryRouter>
});


it('Matches snapshot', async () => {
    mockedAxios.get.mockResolvedValueOnce(data);

    const { asFragment } = render(
        <MemoryRouter>
            <ContextProvider >
                <RecipeDetail />
            </ContextProvider>
        </MemoryRouter>
    );

    // will get screenshot of the loading text unless we wait
    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
})

// test('recipeDetail', async () => {

//     mockedAxios.get.mockResolvedValueOnce(data);

//     const detailComponent = render(
//         <MemoryRouter>
//             <ContextProvider >
//                 <RecipeDetail />
//             </ContextProvider>
//         </MemoryRouter>
//     );

//     await waitFor(() => {

//         expect(mockedAxios.get.mockResolvedValueOnce(data)).toHaveBeenCalledTimes(1)
//         expect(detailComponent.getByText('mocked recipe title'));
//     });
// });

