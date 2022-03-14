import { render } from '@testing-library/react';
import LoginForm from './LoginForm';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'

// ability to login is tested in app.test.js
it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider>
            <LoginForm />
        </ContextProvider>
    </MemoryRouter>
});

it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider>
                <LoginForm />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});





