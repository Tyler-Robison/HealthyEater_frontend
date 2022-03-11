import { render, screen } from '@testing-library/react';
import MealPlanner from './MealPlanner';
import { MemoryRouter } from "react-router-dom";
import ContextProvider from '../../testContext';

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




