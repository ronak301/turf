import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  global.scrollTo = jest.fn();

  test('Full app rendering and navigating', async () => {
    const { getByText, findByText } = render(<App />);
    const routeHome = await findByText(/Home/i);
    expect(routeHome).toBeInTheDocument();

    fireEvent.click(getByText(/Grid/i));
    const routeGrid = await findByText(/Grid/i);
    expect(routeGrid).toBeInTheDocument();
  });

  test('Landing on a bad page shows 404 page', async () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText(/404/i));
    const lazyElement = await screen.findByText(/Not found/i);
    expect(lazyElement).toBeInTheDocument();
  });
});
