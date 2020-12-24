import React from 'react';
import { Box, BoxProps, Select, SelectProps, Text } from '@chakra-ui/core';
import { map } from 'lodash';

import { GenericFormProps } from '../const';

export type Option = {
  id: number | string;
  label: string;
};

type Props = SelectProps & {
  name?: string | undefined;
  onChange?: (orgId: any) => void;
  options: Option[];
  placeholder?: string;
  label?: string;
  value?: string;
  required?: boolean;
  errors?: any;
  disabled?: boolean;
  boxProps?: BoxProps;
  dataCy?: string | undefined;
};

const SelectBox = React.forwardRef(
  (
    {
      onChange,
      options,
      placeholder,
      label,
      value,
      name,
      backgroundColor,
      errors = {},
      required = false,
      disabled = false,
      defaultValue,
      boxProps = {},
      dataCy = undefined
    }: Props,
    ref: any
  ): JSX.Element => {
    const requiredFieldMark = required ? '*' : '';
    const hasErrors = Object.keys(errors[name as string] || {}).length > 0;

    return (
      <Box mb={hasErrors ? 0 : 6} {...boxProps}>
        {label && (
          <Text pb={1} color="white" fontSize={14} fontWeight="bold">
            {`${label}${requiredFieldMark}`}
          </Text>
        )}
        <Select
          as="select"
          ref={ref}
          placeholder={placeholder}
          onChange={(event) => {
            event.persist();
            onChange?.(event.target.value);
          }}
          name={name}
          isDisabled={disabled}
          defaultValue={defaultValue}
          {...GenericFormProps}
          backgroundColor={backgroundColor || GenericFormProps.backgroundColor}
          color="rgba(249, 249, 249, 0.8)"
          data-cy={dataCy || undefined}
          mb={0}
          value={value}
        >
          {map(options, (option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
        {name !== undefined && (
          <>
            {errors?.[name]?.type === 'required' ? (
              <Text fontSize={12} lineHeight={2} color="primary">
                This is a required field
              </Text>
            ) : (
              <Box />
            )}
          </>
        )}
      </Box>
    );
  }
);

export default SelectBox;
