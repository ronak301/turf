import React from 'react';
import { render } from '@testing-library/react';

import ServiceWorker from './ServiceWorker';

describe('Service worker', () => {
  test('Renders and contains string "New content is available"', () => {
    const { getByText } = render(<ServiceWorker onUpdate={() => null} />);
    expect(getByText('New content is available')).toBeInTheDocument();
  });
});
