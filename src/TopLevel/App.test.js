import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import App from './App'
import { MemoryRouter } from "react-router-dom";
import { testUser, testRecipes } from '../testHelpers'
import mockedAxios from 'axios';

const mockUserData = {
  data: { user: testUser }
}

// token contains:
// password = password
// {
//   "username": "newUser",
//   "isAdmin": false,
//   "id": 12,
//   "iat": 1646862301
// }
const mockTokenData = {
  data:
    { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld1VzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEyLCJpYXQiOjE2NDY4NjIzMDF9.JJqdcVY4iUqVA3dkNTvSTImGQQbetu0p8pQ7cXHgSd0' }
}

const registerNewUser = async () => {
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
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(signupBtn);

  // navigated back to homepage, showing user-specific welcome back msg
  await waitFor(() => {
    expect(mockedAxios.post.mockResolvedValueOnce(mockTokenData)).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get.mockResolvedValueOnce(mockUserData)).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Welcome back Tyler!')).toBeInTheDocument();
  });
}

// get an error when trying to invoke this inside functions
// const addIngredients = async () => {
//   registerNewUser()

//   // Don't proceed until registration complete. 
//   await waitFor(() => {
//     expect(screen.getByText('Welcome back Tyler!')).toBeInTheDocument();
//   });

//   const recipeAnchor = screen.getAllByText('Find Recipes')[0]
//   fireEvent.click(recipeAnchor)

//   const addIngredientBtn = screen.getByText('Add Ingredient')
//   const ingredientInput = screen.getByPlaceholderText('Enter Ingredient')

//   fireEvent.change(ingredientInput, { target: { value: 'Cheese' } });
//   fireEvent.click(addIngredientBtn)

//   await waitFor(() => {
//     expect(screen.getByText('Cheese')).toBeInTheDocument();
//   });

//   fireEvent.change(ingredientInput, { target: { value: 'Olives' } });
//   fireEvent.click(addIngredientBtn)

//   await waitFor(() => {
//     expect(screen.getByText('Cheese')).toBeInTheDocument();
//     expect(screen.getByText('Olives')).toBeInTheDocument();
//   });
// }


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

// test("Sign-up works", async function () {
//   // mock of the token value returned by UserApi.register
//   mockedAxios.post.mockResolvedValueOnce(mockTokenData);

//   // mock of currentUser by returned by UserAPI.getUserInfo
//   mockedAxios.get.mockResolvedValueOnce(mockUserData);

//   render(
//     <MemoryRouter initialEntries={['/']}>
//       <App />
//     </MemoryRouter>
//   );

//   // proves we're on homepage
//   expect(screen.getByText('Welcome to Healthy-Eater!')).toBeInTheDocument();

//   const signupAnchor = screen.getByText('Signup')
//   fireEvent.click(signupAnchor)

//   // moved from homepage to sign-in page
//   expect(screen.queryByText('Welcome to Healthy-Eater!')).not.toBeInTheDocument();
//   expect(screen.getByText('Enter Username/Password')).toBeInTheDocument();

//   const signupBtn = screen.getByText('Sign-up');
//   const usernameInput = screen.getByLabelText('Username');
//   const passwordInput = screen.getByLabelText('Password');

//   fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
//   fireEvent.change(passwordInput, { target: { value: 'password' } });
//   fireEvent.click(signupBtn);

//   // navigated back to homepage, showing user-specific welcome back msg
//   await waitFor(() => {
//     expect(mockedAxios.post.mockResolvedValueOnce(mockTokenData)).toHaveBeenCalledTimes(1)
//     expect(mockedAxios.get.mockResolvedValueOnce(mockUserData)).toHaveBeenCalledTimes(1)
//     expect(screen.getByText('Welcome back Tyler!')).toBeInTheDocument();
//   });
// });

// test("Sign-up fails with invalid password, correct message displays", async function () {
//   // mock of the token value returned by UserAPI.register
//   mockedAxios.post.mockResolvedValueOnce(mockTokenData);

//   // mock of currentUser by returned by UserAPI.getUserInfo
//   mockedAxios.get.mockResolvedValueOnce(mockUserData);

//   render(
//     <MemoryRouter initialEntries={['/']}>
//       <App />
//     </MemoryRouter>
//   );

//   const signupAnchor = screen.getByText('Signup')
//   fireEvent.click(signupAnchor)

//   const signupBtn = screen.getByText('Sign-up');
//   const usernameInput = screen.getByLabelText('Username');
//   const passwordInput = screen.getByLabelText('Password');

//   fireEvent.change(usernameInput, { target: { value: 'Tyler' } });
//   fireEvent.change(passwordInput, { target: { value: 'pwd' } });
//   fireEvent.click(signupBtn);

//   // registration failure, correct error msg displayed
//   await waitFor(() => {
//     expect(screen.queryByText('Welcome back Tyler!')).not.toBeInTheDocument();
//     expect(screen.getByText('Password must be between 5 to 30 characters')).toBeInTheDocument();
//   });
// });

// same procedure as register user, unit test



// Don't proceed until registration complete. 
// await waitFor(() => {
//   expect(screen.getByText('Welcome back Tyler!')).toBeInTheDocument();
// });

// test("Can add ingredients", async function () {
//   render(
//     <MemoryRouter initialEntries={['/']}>
//       <App currentUserState={testUser} />
//     </MemoryRouter>
//   );

//   const recipeAnchor = screen.getAllByText('Find Recipes')[0]
//   expect(recipeAnchor).toBeInTheDocument
//   fireEvent.click(recipeAnchor)
  
//   const addIngredientBtn = screen.getByText('Add Ingredient')
//   const ingredientInput = screen.getByPlaceholderText('Enter Ingredient')
//   expect(addIngredientBtn).toBeInTheDocument()
//   expect(ingredientInput).toBeInTheDocument()
//   // expect(screen.getByText('********')).toBeInTheDocument()
  
//   // fireEvent.change(ingredientInput, { target: { value: 'Cheese' } });
//   // fireEvent.click(addIngredientBtn)
  
//   // await waitFor(() => {
//   // expect(screen.getByText('Cheese')).toBeInTheDocument();
//   // });

//   // fireEvent.change(ingredientInput, { target: { value: 'Olives' } });
//   // fireEvent.click(addIngredientBtn)

//   // await waitFor(() => {
//   //   expect(screen.getByText('Cheese')).toBeInTheDocument();
//   //   expect(screen.getByText('Olives')).toBeInTheDocument();
//   // });
// });





test("Can add ingredients", async function () {
  registerNewUser()

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

  await waitFor(() => {
    expect(screen.getByText('Cheese')).toBeInTheDocument();
  });

  fireEvent.change(ingredientInput, { target: { value: 'Olives' } });
  fireEvent.click(addIngredientBtn)

  await waitFor(() => {
    expect(screen.getByText('Cheese')).toBeInTheDocument();
    expect(screen.getByText('Olives')).toBeInTheDocument();
  });
});





// test("Can get recipe list based on ingredients", async function () {
//   const mockListData = {
//     data: {
//       results: testRecipes
//     }
//   }

//   mockedAxios.get.mockResolvedValueOnce(mockListData);
//   registerNewUser()

//   // Don't proceed until registration complete. 
//   await waitFor(() => {
//     expect(screen.getByText('Welcome back Tyler!')).toBeInTheDocument();
//   });

//   const recipeAnchor = screen.getAllByText('Find Recipes')[0]
//   fireEvent.click(recipeAnchor)

//   const addIngredientBtn = screen.getByText('Add Ingredient')
//   const ingredientInput = screen.getByPlaceholderText('Enter Ingredient')

//   fireEvent.change(ingredientInput, { target: { value: 'Cheese' } });
//   fireEvent.click(addIngredientBtn)

//   await waitFor(() => {
//     expect(screen.getByText('Cheese')).toBeInTheDocument();
//   });

//   fireEvent.change(ingredientInput, { target: { value: 'Olives' } });
//   fireEvent.click(addIngredientBtn)

//   await waitFor(() => {
//     expect(screen.getByText('Cheese')).toBeInTheDocument();
//     expect(screen.getByText('Olives')).toBeInTheDocument();
//   });

//   const getRecipeButton = screen.getByText('Get Recipes')
//   expect(getRecipeButton).toBeInTheDocument()

//   // mocking SpoonAPI.getRecipes which leads to an axios.get request
//   // testRecipes is a mocked array of recipe objects


//   // fireEvent fails because of:
//   // "TypeError: Cannot read properties of undefined (reading 'length')".] {

//   // recipe res is receiving the mocked currentUser value from that mock
//   // recipe res {
//   //   user: {
//   //     id: 1,
//   //     username: 'Tyler',
//   //     isAdmin: false,
//   //     points: null,
//   //     mealplan: [ [Object], [Object], [Object] ],
//   //     recipes: [ [Object], [Object], [Object], [Object] ]
//   //   }
//   // }
//   fireEvent.click(getRecipeButton)

//   // expect(screen.getByText('Uses')).toBeInTheDocument();
// });



