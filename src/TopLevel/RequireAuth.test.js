import { render, screen } from '@testing-library/react';
import RequireAuth from './RequireAuth';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'


it("renders without crashing", function () {
    <MemoryRouter>
        <RequireAuth />
    </MemoryRouter>
});

it("matches snapshot", function () {
    const container = render(
        <MemoryRouter>
            <ContextProvider>
                <RequireAuth><p>dummy para</p></RequireAuth>
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

// ability of RequireAuth to prevent authorized access is tested in App.test