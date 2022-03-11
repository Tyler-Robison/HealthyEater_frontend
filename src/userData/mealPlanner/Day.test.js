import { render, screen } from '@testing-library/react';
import Day from './Day';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';


it("renders without crashing", function () {
    <MemoryRouter>
        <Day day='Mon' />
    </MemoryRouter>
});


it("matches snapshot on day with meals", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <Day day='Mon' />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("matches snapshot on day with no meals", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <Day day='Wed' />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});