import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import SignupForm from './SignupForm';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'


// ability to sign-in is tested in app.test.js
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