import React from 'react';
import { render } from '@testing-library/react';

import Portal from './Portal';

describe('Portal', () => {
  test('Children renders', () => {
    let portalElement = document.getElementById('portal');
    if (!portalElement) {
      portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'portal');
      document.body.appendChild(portalElement);
    }
    const { getByText } = render(<Portal>1337</Portal>);
    expect(getByText('1337')).toBeInTheDocument();
  });
});
