import React from 'react';
import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import Text from './Text';

const TextRegister = () => {
  const { register } = useForm();
  return <Text name="text" register={register} />;
};

describe('Text', () => {
  test('Renders', () => {
    const { container } = render(<TextRegister />);
    expect(container).toBeInTheDocument();
  });
});
