import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UserPoints from './UserPoints';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';
import { testUser, testRecipes } from '../../testHelpers';
import mockedAxios from 'axios';


it("renders without crashing", function () {
    <MemoryRouter>
        <UserPoints />
    </MemoryRouter>
});


it("matches snapshot", function () {

    const container = render(
        <MemoryRouter>
            <ContextProvider >
                <UserPoints />
            </ContextProvider>
        </MemoryRouter>
    );
    expect(container.asFragment()).toMatchSnapshot();
});



it("Can calculate points", async function () {

    const mockData = {
        data: {
            points: 15
        }
    }

    mockedAxios.patch.mockResolvedValueOnce(mockData);

    render(
        <MemoryRouter>
            <ContextProvider >
                <UserPoints />
            </ContextProvider>
        </MemoryRouter>
    );

    const calcPointsBtn = screen.getByText('Calculate Points');
    const ageInput = screen.getByLabelText('Age');
    const heightInput = screen.getByLabelText('Height (inches)');
    const weightInput = screen.getByLabelText('Weight (lbs)');

    fireEvent.change(ageInput, { target: { value: 20 } });
    fireEvent.change(heightInput, { target: { value: 60 } });
    fireEvent.change(weightInput, { target: { value: 150 } });
    fireEvent.click(calcPointsBtn)

    await waitFor(() => {
        expect(mockedAxios.patch.mockResolvedValueOnce(mockData)).toHaveBeenCalledTimes(1)
        expect(screen.getByText('Daily Points set to 15')).toBeInTheDocument();
    })
});

it("Formik will produce errors on invalid data", async function () {

    const mockData = {
        data: {
            points: 15
        }
    }

    mockedAxios.patch.mockResolvedValueOnce(mockData);

    render(
        <MemoryRouter>
            <ContextProvider >
                <UserPoints />
            </ContextProvider>
        </MemoryRouter>
    );

    const calcPointsBtn = screen.getByText('Calculate Points');
    const ageInput = screen.getByLabelText('Age');
    const heightInput = screen.getByLabelText('Height (inches)');
    const weightInput = screen.getByLabelText('Weight (lbs)');

    fireEvent.change(ageInput, { target: { value: -1 } });
    fireEvent.change(heightInput, { target: { value: -1 } });
    fireEvent.change(weightInput, { target: { value: -1 } });
    fireEvent.click(calcPointsBtn)


    await waitFor(() => {
        // expect formik to prevent form submission
        expect(mockedAxios.patch.mockResolvedValueOnce(mockData)).toHaveBeenCalledTimes(0)
        expect(screen.getByText('Age must be at least 1')).toBeInTheDocument();
        expect(screen.getByText('Height must be at least 1')).toBeInTheDocument();
        expect(screen.getByText('Weight must be at least 1')).toBeInTheDocument();
    })

});

it("Can replace old point value with a new one", async function () {

    const mockData = {
        data: {
            points: 15
        }
    }

    const mockData2 = {
        data: {
            points: 20
        }
    }

    // make 2 patch calls, each one time
    mockedAxios.patch.mockResolvedValueOnce(mockData);
    mockedAxios.patch.mockResolvedValueOnce(mockData2);

    render(
        <MemoryRouter>
            <ContextProvider >
                <UserPoints />
            </ContextProvider>
        </MemoryRouter>
    );

    const calcPointsBtn = screen.getByText('Calculate Points');
    const ageInput = screen.getByLabelText('Age');
    const heightInput = screen.getByLabelText('Height (inches)');
    const weightInput = screen.getByLabelText('Weight (lbs)');



    fireEvent.change(ageInput, { target: { value: 20 } });
    fireEvent.change(heightInput, { target: { value: 60 } });
    fireEvent.change(weightInput, { target: { value: 150 } });
    fireEvent.click(calcPointsBtn)

    await waitFor(() => {
        expect(mockedAxios.patch.mockResolvedValueOnce(mockData)).toHaveBeenCalledTimes(1)
        expect(screen.getByText('Daily Points set to 15')).toBeInTheDocument();
    })

    fireEvent.change(ageInput, { target: { value: 40 } });
    fireEvent.change(heightInput, { target: { value: 70 } });
    fireEvent.change(weightInput, { target: { value: 300 } });
    fireEvent.click(calcPointsBtn)


    await waitFor(() => {
        expect(mockedAxios.patch.mockResolvedValueOnce(mockData)).toHaveBeenCalledTimes(2)
        expect(screen.getByText('Daily Points set to 20')).toBeInTheDocument();
    })

});
