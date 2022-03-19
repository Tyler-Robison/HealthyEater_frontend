import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import SignupForm from './SignupForm';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../testContext'


// ability to sign-in is tested in app.test.js
it("renders without crashing", function () {
    <MemoryRouter>
        <ContextProvider userData={null}>
            <SignupForm />
        </ContextProvider>
    </MemoryRouter>
});

it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider userData={null}>
                <SignupForm />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("displays correct error msg on invalid password", async function () {

    render(
        <MemoryRouter>
            <ContextProvider userData={null}>
                <SignupForm />
            </ContextProvider>
        </MemoryRouter>
    );

    const signupBtn = screen.getByText('Sign-up');
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
    fireEvent.change(passwordInput, { target: { value: 'pwd' } });
    fireEvent.click(signupBtn);

    // registration failure, correct error msg displayed
    await waitFor(() => {
        expect(screen.getByText('Password must be between 5 to 30 characters')).toBeInTheDocument();
    });

});

it("displays correct error msg on missing password", async function () {

    render(
        <MemoryRouter>
            <ContextProvider userData={null}>
                <SignupForm />
            </ContextProvider>
        </MemoryRouter>
    );

    const signupBtn = screen.getByText('Sign-up');
    const usernameInput = screen.getByLabelText('Username');

    fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
    fireEvent.click(signupBtn);

    // registration failure, correct error msg displayed
    await waitFor(() => {
        expect(screen.getByText('Password Required')).toBeInTheDocument();
    });

});

it("displays correct error msg on missing username", async function () {

    render(
        <MemoryRouter>
            <ContextProvider userData={null}>
                <SignupForm />
            </ContextProvider>
        </MemoryRouter>
    );

    const signupBtn = screen.getByText('Sign-up');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signupBtn);

    // registration failure, correct error msg displayed
    await waitFor(() => {
        expect(screen.getByText('Username Required')).toBeInTheDocument();
    });

});