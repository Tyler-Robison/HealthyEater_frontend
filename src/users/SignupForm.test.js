import { render } from '@testing-library/react';
import SignupForm from './SignupForm';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'


it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider>
            <SignupForm />
        </ContextProvider>
    </MemoryRouter>
});

it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider>
                <SignupForm />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});