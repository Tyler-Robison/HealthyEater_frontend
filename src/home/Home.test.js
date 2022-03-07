import { render } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'

it("renders without crashing", function () {
    <MemoryRouter>
        <Home />
    </MemoryRouter>
});

it("matches snapshot", function () {
    const container = render(
        <MemoryRouter>
            <ContextProvider>
                <Home />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});