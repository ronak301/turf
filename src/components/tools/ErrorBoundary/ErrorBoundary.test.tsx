import React from 'react';
import { render } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

describe('Error boundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('Renders fallback when thrown error', () => {
    const Throw = () => {
      throw new Error('1337');
    };

    const { getByText } = render(
      <ErrorBoundary fallback={<>Something went wrong...</>}>
        <Throw />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong...')).toBeDefined();
  });
});
