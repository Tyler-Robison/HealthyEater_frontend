import { render } from '@testing-library/react';
import Message from './Message';
import { MemoryRouter } from "react-router-dom";


it("renders without crashing", function () {
  <MemoryRouter>
    <Message />
  </MemoryRouter>
});

it("matches snapshot", function () {
  const container = render(
      <MemoryRouter>
          <Message />
      </MemoryRouter>
  );
  expect(container.asFragment()).toMatchSnapshot();
});