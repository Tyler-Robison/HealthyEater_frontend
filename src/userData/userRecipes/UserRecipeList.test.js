import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserRecipeList from './UserRecipeList';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';
import mockedAxios from 'axios';



it("renders without crashing", function () {
    <MemoryRouter>
        <UserRecipeList />
    </MemoryRouter>
});

it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <UserRecipeList />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});

it("correctly displays users's saved recipes", function () {

    render(
        <MemoryRouter>
            <ContextProvider >
                <UserRecipeList />
            </ContextProvider>
        </MemoryRouter>
    );

    expect(screen.getByText('bacon')).toBeInTheDocument();
    expect(screen.getByText('(20 points)')).toBeInTheDocument();
    expect(screen.getByText('eggs')).toBeInTheDocument();
    expect(screen.getByText('(10 points)')).toBeInTheDocument();
});

it("Can remove user saved recipes", async function () {

    const mockData = {
        data: {
            deletedRecipe: { recipe_id: 1111 }
        }
    }

    mockedAxios.delete.mockResolvedValueOnce(mockData);

    render(
        <MemoryRouter>
            <ContextProvider >
                <UserRecipeList />
            </ContextProvider>
        </MemoryRouter>
    );

    expect(screen.getByText('bacon')).toBeInTheDocument();
    expect(screen.getByText('(20 points)')).toBeInTheDocument();
    expect(screen.getByText('eggs')).toBeInTheDocument();
    expect(screen.getByText('(10 points)')).toBeInTheDocument();

    const removeBaconBtn = screen.getByTestId(1111)
    fireEvent.click(removeBaconBtn)

    await waitFor(() => {
        expect( mockedAxios.delete.mockResolvedValueOnce(mockData)).toHaveBeenCalledTimes(1)
        expect(screen.queryByText('bacon')).not.toBeInTheDocument();
        expect(screen.queryByText('(20 points)')).not.toBeInTheDocument();
        expect(screen.getByText('eggs')).toBeInTheDocument();
        expect(screen.getByText('(10 points)')).toBeInTheDocument();
    })

});