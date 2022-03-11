import { render, screen } from '@testing-library/react';
import GetRecipes from './GetRecipes';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext'


it("renders without crashing", function () {
    <MemoryRouter>
        <GetRecipes />
    </MemoryRouter>
});


it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <GetRecipes />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});