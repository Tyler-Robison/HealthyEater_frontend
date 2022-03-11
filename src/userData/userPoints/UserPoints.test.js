import { render, screen } from '@testing-library/react';
import UserPoints from './UserPoints';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';


it("renders without crashing", function () {
    <MemoryRouter>
        <UserPoints />
    </MemoryRouter>
});


it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <UserPoints />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});