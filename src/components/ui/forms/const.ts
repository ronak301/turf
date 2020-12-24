import { InputProps } from '@chakra-ui/core';
import { memoize } from 'lodash';

import theme from 'theme';

export const GenericFormProps = {
  fontSize: 16,
  fontFamily: 'Averta',
  color: 'white',
  borderColor: 'transparent',
  backgroundColor: theme.colors.lightBackground,
  height: '32px',
  mb: 0,

  _placeholder: {
    color: 'rgba(249, 249, 249, 0.8)'
  },

  _focus: {
    borderColor: 'white'
  }
};

export const creatFormInputProps = memoize((type: InputProps['as']) => {
  return {
    ...GenericFormProps,
    height: type === 'textarea' ? '140px' : '32px'
  };
});
