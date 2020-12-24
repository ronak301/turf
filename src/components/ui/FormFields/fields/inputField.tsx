import React from 'react';
import { Box } from '@chakra-ui/core';
import { isEmpty } from 'lodash';

import { Typography } from 'components/ui';
import theme from 'theme';
import { FormInput } from 'components/ui/forms';
import {
  FieldRendererArgsType,
  FormFieldMode,
  InputFieldParams
} from '../types';

type FieldParams = FieldRendererArgsType<InputFieldParams, string>;

const HINT = ({ required = false } = {}) => (required ? ` (Required)` : '');

const renderInput = ({ field, context, boxParams, params }: FieldParams) => {
  return (
    <FormInput
      as={field.type as 'input' | 'textarea'}
      boxProps={boxParams}
      flex={1}
      ref={context.register}
      name={field.name}
      label={field.label}
      data-cy={field.dataCy}
      onChange={context.onChange}
      hint={HINT}
      {...params}
    />
  );
};

const renderInputViewMode = ({
  field,
  value,
  params,
  boxParams
}: FieldParams) => {
  const label = field.label;
  return (
    <Box flexDirection="column" mb={6} {...boxParams} {...params}>
      {label ? <Typography variant="label">{label}</Typography> : null}
      <Typography variant="body" color={theme.colors.formValue}>
        {isEmpty(value) ? '-' : value}
      </Typography>
    </Box>
  );
};

export const inputField = {
  renderField(mode: FormFieldMode, params: FieldParams) {
    switch (mode) {
      case 'view':
        return renderInputViewMode(params);
      default:
        return renderInput(params);
    }
  }
};
