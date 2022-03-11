import { render, screen } from '@testing-library/react';
import PlanForm from './PlanForm';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';

const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

it("renders without crashing", function () {
    <MemoryRouter>
        <PlanForm days={days} />
    </MemoryRouter>
});


// daySelect must correctly display values in days array
// mealSelect must correctly display recipe values from currentUser.recipes
it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <PlanForm days={days} />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});