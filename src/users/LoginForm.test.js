import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'

// ability to login is tested in app.test.js
it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider userData={null}>
            <LoginForm />
        </ContextProvider>
    </MemoryRouter>
});

it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider userData={null}>
                <LoginForm />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("displays correct error msg on missing password", async function () {

    render(
        <MemoryRouter>
            <ContextProvider userData={null}>
                <LoginForm />
            </ContextProvider>
        </MemoryRouter>
    );

    const loginBtn = screen.getByText('Login');
    const usernameInput = screen.getByLabelText('Username');

    fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
    fireEvent.click(loginBtn);

    // login failure, correct error msg displayed
    await waitFor(() => {
        expect(screen.getByText('Password Required')).toBeInTheDocument();
    });

});

it("displays correct error msg on missing username", async function () {

    render(
        <MemoryRouter>
            <ContextProvider userData={null}>
                <LoginForm />
            </ContextProvider>
        </MemoryRouter>
    );

    const loginBtn = screen.getByText('Login');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginBtn);

    // login failure, correct error msg displayed
    await waitFor(() => {
        expect(screen.getByText('Username Required')).toBeInTheDocument();
    });

});







