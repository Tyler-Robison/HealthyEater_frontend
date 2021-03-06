import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import App from './App'
import { MemoryRouter } from "react-router-dom";
import { testUser, testGuest, testRecipes } from '../testHelpers'
import mockedAxios from 'axios';

const mockUserData = {
  data: { user: testUser }
}

const mockTokenData = {
  data:
    { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld1VzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEyLCJpYXQiOjE2NDY4NjIzMDF9.JJqdcVY4iUqVA3dkNTvSTImGQQbetu0p8pQ7cXHgSd0' }
}

it("renders without crashing", function () {
  <MemoryRouter>
    <App />
  </MemoryRouter>
});

it("matches snapshot", function () {

  const container = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(container.asFragment()).toMatchSnapshot();
});




test("Sign-up fails with invalid password, correct message displays", async function () {
  // mock of the token value returned by UserAPI.register
  mockedAxios.post.mockResolvedValueOnce(mockTokenData);

  // mock of currentUser by returned by UserAPI.getUserInfo
  mockedAxios.get.mockResolvedValueOnce(mockUserData);

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const signupAnchor = screen.getByText('Signup')
  fireEvent.click(signupAnchor)

  const signupBtn = screen.getByText('Sign-up');
  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
  fireEvent.change(passwordInput, { target: { value: 'pwd' } });
  fireEvent.click(signupBtn);

  // registration failure, correct error msg displayed
  await waitFor(() => {
    expect(screen.queryByText('Welcome back Tyler!')).not.toBeInTheDocument();
    expect(screen.getByText('Password must be between 5 to 30 characters')).toBeInTheDocument();
  });
});


const registerNewUser = async (password = 'password') => {
  mockedAxios.post.mockResolvedValueOnce(mockTokenData);
  mockedAxios.get.mockResolvedValueOnce(mockUserData);

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const signupAnchor = screen.getByText('Signup')
  fireEvent.click(signupAnchor)

  const signupBtn = screen.getByText('Sign-up');
  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(signupBtn);
}

test("user denied site access on failed sign-up", async function () {
  const mockedUsedNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));


  // password must be 5 characters minimum
  registerNewUser('bad')

  // registerNewUser failed because bad password
  await waitFor(() => {
    expect(screen.getByText('Password must be between 5 to 30 characters')).toBeInTheDocument();
  });

  // Because registration failed, find recipes link isn't showing on screen
  // We can still attempt to manually navigate to that URL
  // User will be re-directed back to homepage. 
  mockedUsedNavigate('/find_recipes')

  // Didn't get to GetRecipes component because user isn't logged in
  expect(screen.queryByText('Ingredients')).not.toBeInTheDocument()
});

test("can register new user, starting from homepage", async function () {
  // mock of the token value returned by UserApi.register
  mockedAxios.post.mockResolvedValueOnce(mockTokenData);

  // mock of currentUser by returned by UserAPI.getUserInfo
  mockedAxios.get.mockResolvedValueOnce(mockUserData);

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // proves we're on homepage
  expect(screen.getByText('Welcome to Healthy-Eater!')).toBeInTheDocument();

  const signupAnchor = screen.getByText('Signup')
  fireEvent.click(signupAnchor)

  // moved from homepage to sign-in page
  expect(screen.queryByText('Welcome to Healthy-Eater!')).not.toBeInTheDocument();
  expect(screen.getByText('Enter Username/Password')).toBeInTheDocument();

  const signupBtn = screen.getByText('Sign-up');
  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(signupBtn);

  // navigated back to homepage, showing user-specific welcome back msg
  await waitFor(() => {
    expect(mockedAxios.post.mockResolvedValueOnce(mockTokenData)).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get.mockResolvedValueOnce(mockUserData)).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Welcome back Tyler!')).toBeInTheDocument();
  });
});

test("existing user can login", async function () {

  // mock of the token value returned by UserApi.login
  mockedAxios.post.mockResolvedValueOnce(mockTokenData);

  // mock of currentUser by returned by UserAPI.getUserInfo
  mockedAxios.get.mockResolvedValueOnce(mockUserData);

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // proves we're on homepage
  expect(screen.getByText('Welcome to Healthy-Eater!')).toBeInTheDocument();

  const loginAnchor = screen.getAllByText('Login')[0]
  fireEvent.click(loginAnchor)

  const usernameInput = screen.getByPlaceholderText('Username')
  const passwordInput = screen.getByPlaceholderText('Password')
  const loginBtn = screen.getByTestId('login-btn')

  fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
  fireEvent.change(passwordInput, { target: { value: 'Password' } });
  fireEvent.click(loginBtn)

  await waitFor(() => {
    expect(mockedAxios.post.mockResolvedValueOnce(mockTokenData)).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get.mockResolvedValueOnce(mockUserData)).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Welcome back Tyler!')).toBeInTheDocument();
  });
})

test("new user can sign-up then access site functionality", async function () {
  registerNewUser()

  const mockedRecipes = {
    data: {
      results: testRecipes
    }
  }

  // after registration there is a second GET request that we'll have to mock
  mockedAxios.get.mockResolvedValueOnce(mockedRecipes);

  // Don't proceed until registration complete. 
  await waitFor(() => {
    expect(screen.getByText('Welcome back Tyler!')).toBeInTheDocument();
  });

  const recipeAnchor = screen.getAllByText('Find Recipes')[0]
  expect(recipeAnchor).toBeInTheDocument
  fireEvent.click(recipeAnchor)

  const addIngredientBtn = screen.getByText('Add Ingredient')
  const ingredientInput = screen.getByPlaceholderText('Enter Ingredient')
  expect(addIngredientBtn).toBeInTheDocument()
  expect(ingredientInput).toBeInTheDocument()

  fireEvent.change(ingredientInput, { target: { value: 'Cheese' } });
  fireEvent.click(addIngredientBtn)

  // only signed-in users can access this page and add ingredients
  await waitFor(() => {
    expect(screen.getByText('Cheese')).toBeInTheDocument();
  });

  fireEvent.change(ingredientInput, { target: { value: 'Olives' } });
  fireEvent.click(addIngredientBtn)

  await waitFor(() => {
    expect(screen.getByText('Cheese')).toBeInTheDocument();
    expect(screen.getByText('Olives')).toBeInTheDocument();
  });

  const getRecipesBtn = screen.getByText('Get Recipes')
  fireEvent.click(getRecipesBtn)

  await waitFor(() => {
    // counts total num times mockedAxios.GET has been called 
    // it was also called in registerNewUser function - so 2 is correct
    expect(mockedAxios.get.mockResolvedValueOnce(mockedRecipes)).toHaveBeenCalledTimes(2)
    expect(screen.getByText('BLT')).toBeInTheDocument()
    expect(screen.getByText('Uses 3 of your ingredients ( bacon, lettuce, tomato )')).toBeInTheDocument()
  })
});

test("guest users can sign-in via 'Continue as Guest' Button", async function () {

  const mockGuestData = {
    data: { user: testGuest }
  }
  // mock of the token value returned by UserApi.register
  mockedAxios.post.mockResolvedValueOnce(mockTokenData);

  // mock of currentUser by returned by UserAPI.getUserInfo
  mockedAxios.get.mockResolvedValueOnce(mockGuestData);

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const guestLoginBtn = screen.getByText('Continue as Guest')
  expect(screen.queryByText('Welcome back guest!')).not.toBeInTheDocument();
  fireEvent.click(guestLoginBtn)

  // guest has been logged in and re-directed to homepage
  await waitFor(() => {
    expect(mockedAxios.get.mockResolvedValueOnce(mockGuestData)).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Welcome back guest!')).toBeInTheDocument();
  });
})


