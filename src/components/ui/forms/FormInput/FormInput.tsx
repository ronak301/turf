import { Box, BoxProps, Input, InputProps, Text } from '@chakra-ui/core';
import React from 'react';

import theme from 'theme';
import { capitalizeFirst } from 'utils/string';
import { creatFormInputProps } from '../const';

type FormInputProps = InputProps & {
  label?: string;
  labelColor?: string;
  width?: number | string | any;
  onChange?: (val: any) => any;
  errors?: any;
  required?: boolean;
  boxProps?: BoxProps;
  autocomplete?: string;
  hint?: (props: Partial<FormInputProps>) => React.ReactNode;
};

const DEFAULT_HINT = ({ required = false } = {}) => {
  const requiredFieldMark = required ? '*' : '';
  return requiredFieldMark;
};

const FormInput = React.forwardRef(
  (
    {
      label,
      placeholder,
      labelColor,
      onChange,
      name = '',
      errors = {},
      required = false,
      boxProps = {},
      as = 'input',
      hint = DEFAULT_HINT,
      ...rest
    }: FormInputProps,
    ref: any
  ) => {
    const hasErrors = Object.keys(errors[name] || {}).length > 0;

    return (
      <Box flexDirection="column" mb={hasErrors ? 0 : 6} {...boxProps}>
        {label ? (
          <Text
            pb={1}
            color={labelColor || 'white'}
            fontSize={14}
            fontWeight="bold"
          >
            {`${label}${hint({ required })}`}
          </Text>
        ) : null}
        <Box
          backgroundColor={theme.colors.semiDarkBackground}
          borderRadius={4}
          width="100%"
        >
          <Input
            as={as}
            autoComplete="no"
            spellCheck="false"
            ref={ref}
            borderRadius={4}
            focusBorderColor="white"
            onChange={(event: any) => {
              event.persist();
              onChange?.(event?.target?.value);
            }}
            width="100%"
            autoCorrect="off"
            name={name}
            placeholder={capitalizeFirst(placeholder || '')}
            borderWidth={1}
            {...creatFormInputProps(as)}
            {...rest}
            mb={0}
          />
        </Box>
        {errors?.[name]?.type === 'required' && (
          <Text fontSize={12} lineHeight={2} color="primary">
            This is a required field
          </Text>
        )}

        {errors?.[name]?.type === 'minLength' && (
          <Text fontSize={12} lineHeight={2} color="primary">
            Minimum length required is 6
          </Text>
        )}

        {errors?.[name]?.type === 'manual' && (
          <Text fontSize={12} lineHeight={2} color="primary">
            {errors?.[name].message}
          </Text>
        )}

        {errors?.[name]?.type === 'validate' && (
          <Text fontSize={12} lineHeight={2} color="primary">
            {errors?.[name].message}
          </Text>
        )}
      </Box>
    );
  }
);

export default FormInput;
