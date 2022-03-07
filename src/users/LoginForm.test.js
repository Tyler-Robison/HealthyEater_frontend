import { getByLabelText, render, screen, fireEvent, act } from '@testing-library/react';
import LoginForm from './LoginForm';
import { MemoryRouter } from "react-router-dom";
import UserProvider from '../testUtils'
import App from '../Top_level/App'
import { env } from 'process';
import { Html } from '@mui/icons-material';

it("renders without crashing", function () {
    <MemoryRouter>
        <LoginForm />
    </MemoryRouter>
});

it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <UserProvider>
                <LoginForm />
            </UserProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

// rendering top-level component not <LoginForm />
// it("Can succesfully login", function () {
//     const app = render(
//         <MemoryRouter initialEntries={['/jobly']}>
//             <UserProvider currentUser={null}>
//                 <App />
//             </UserProvider>
//         </MemoryRouter>,
//     );

//     // start on homepage
//     const homepageText = app.getByText('All the jobs in one convenient place');
//     expect(homepageText).toBeInTheDocument();

//     // navigate to loginForm
//     const link = app.getByText('Login')
//     fireEvent.click(link)

//     expect(homepageText).not.toBeInTheDocument();

//     const loginPageText = app.getByText('Login Form');
//     expect(loginPageText).toBeInTheDocument();

//     // proves all the inputs/buttons we need exist on current page
//     const userInput = app.getByLabelText('Username')
//     const pwdInput = app.getByLabelText('Password')
//     const btn = app.queryByTestId('login-btn')
//     expect(userInput).toBeInTheDocument();
//     expect(pwdInput).toBeInTheDocument();
//     expect(btn).toBeInTheDocument();

//     fireEvent.change(userInput, { target: { value: 'testuser1' } })
//     fireEvent.change(pwdInput, { target: { value: 'testpwd1' } })
   
//     fireEvent.click(btn)


//     // const valuesObj = {username: 'testuser1', password: 'testpwd1'}

//     // this link succesfully takes us back to homepage
//     // but we want to get there when re-directed after btn click
//     const homepageLink = app.getByText('Jobly')
//     fireEvent.click(homepageLink)
//     expect(homepageLink).toBeInTheDocument();
//     console.log('*********', Html)
//     // expect(homepageText).toBeInTheDocument();


//     // THIS DOESN"T WORK B/C NEED TO REGISTER FIRST

//     // const invalidText = app.getByLabelText('Invalid Username/Password')
//     // expect(invalidText).toBeInTheDocument();
//     // expect(screen.getByText(`Welcome Back, testuser1`)).toBeInTheDocument()

// });