import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MealPlanner from './MealPlanner';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';
import mockedAxios from 'axios';


const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

it("renders without crashing", function () {
   <MemoryRouter>
      <MealPlanner days={days} />
   </MemoryRouter>
});


it("matches snapshot, correct displaying 2 meals Monday and 1 Tuesday", function () {

   const container = render(
      <MemoryRouter>
         <ContextProvider >
            <MealPlanner days={days} />
         </ContextProvider>
      </MemoryRouter>
   );
   expect(container.asFragment()).toMatchSnapshot();
});

test('Can remove individual meals from mealplan', async function () {

   const mockData = {
      data: { id: 1 }
   }

   mockedAxios.delete.mockResolvedValueOnce(mockData);

   render(
      <MemoryRouter>
         <ContextProvider >
            <MealPlanner days={days} />
         </ContextProvider>
      </MemoryRouter>
   );

   const baconDeleteButton = screen.getByTestId(1)
   expect(screen.getByText('(20 points)')).toBeInTheDocument()
   fireEvent.click(baconDeleteButton)

   // mock function has been called 1 time 
   // bacon had been removed from calendar
   // meal that wasn't deleted is still displayed
   await waitFor(() => {
      expect(mockedAxios.delete.mockResolvedValueOnce(mockData)).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('(20 points)')).not.toBeInTheDocument()
      expect(screen.getByText('(10 points)')).toBeInTheDocument()
   })
})

test('can empty calendar', async function () {

   // route returns empty object because its a 204 response
   const mockData = {
      data: {}
   }

   mockedAxios.delete.mockResolvedValueOnce(mockData);

   render(
      <MemoryRouter>
         <ContextProvider >
            <MealPlanner days={days} />
         </ContextProvider>
      </MemoryRouter>
   );

   expect(screen.getAllByText('Total Points:')[0]).toBeInTheDocument()

   const clearCalendarBtn = screen.getByText('Clear Calendar');
   fireEvent.click(clearCalendarBtn);

   // mock function has been called 1 time 
   // all meals have been removed from calendar
   await waitFor(() => {
      expect(mockedAxios.delete.mockResolvedValueOnce(mockData)).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('Total Points:')).not.toBeInTheDocument()
   })
})

test('can add meals to calendar', async function () {

   // route returns empty object because its a 204 response
   const mockData = {
      data: {
         mealplannerRow: {
            day: "Thurs",
            id: 4,
            name: "eggs",
            recipe_id: 2222,
            ww_points: 10
         }
      }
   }

   mockedAxios.post.mockResolvedValueOnce(mockData);

   render(
      <MemoryRouter>
         <ContextProvider >
            <MealPlanner days={days} />
         </ContextProvider>
      </MemoryRouter>
   );

   const addMealBtn = screen.getByText('Add to Calendar')
   const dayInput = screen.getByLabelText('Select Day')
   const mealInput = screen.getByLabelText('Select Meal')

   const stringifiedObj = '{"name":"eggs","recipe_id":2222,"ww_points":10}'
   fireEvent.change(dayInput, { target: { value: 'Thurs' } })
   fireEvent.change(mealInput, { target: { value: stringifiedObj } })
   fireEvent.click(addMealBtn)

   // meal has been added to Thurs with correct values
   await waitFor(() => {
      expect(mockedAxios.post.mockResolvedValueOnce(mockData)).toHaveBeenCalledTimes(1);

      // btn to delete newly added meal is present
      expect(screen.getByTestId(4)).toBeInTheDocument();

      // correct point value
      expect(screen.getByText('(10 points)')).toBeInTheDocument();

      // 'eggs' text exists in the form, but there is now a second instance of it in the calendar
      expect(screen.getAllByText('eggs')).toHaveLength(2)
   })
})






