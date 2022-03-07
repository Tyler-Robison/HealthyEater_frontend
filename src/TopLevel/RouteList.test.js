import { render, screen } from '@testing-library/react';
import RouteList from './RouteList';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'


it("renders without crashing", function () {
    <MemoryRouter>
        <RouteList />
    </MemoryRouter>
});

it("matches snapshot", function () {
    const container = render(
        <MemoryRouter>
            <ContextProvider>
                <RouteList />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});