import React from 'react';
import { Box } from '@chakra-ui/core';
import { keyBy } from 'lodash';

import theme from 'theme';
import {
  FieldRendererArgsType,
  FormFieldMode,
  SelectFieldParams
} from '../types';
import { Select as SelectBox } from 'components/ui/forms';
import { Typography } from 'components/ui';

type FieldParams = FieldRendererArgsType<SelectFieldParams>;

const renderSelect = ({ field, context, boxParams, params }: FieldParams) => {
  return (
    <SelectBox
      boxProps={boxParams}
      name={field.name}
      defaultValue=""
      label={field.label}
      onChange={context.onChange}
      dataCy={field.dataCy}
      ref={context.register}
      {...params}
    />
  );
};

const renderSelectViewMode = ({
  field,
  value,
  params,
  boxParams
}: FieldParams) => {
  const label = field.label;
  const optionById = keyBy(params.options ?? [], (item) => item.id);

  return (
    <Box flexDirection="column" mb={6} {...boxParams}>
      {label ? <Typography variant="label">{label}</Typography> : null}
      <Typography variant="body" color={theme.colors.formValue}>
        {optionById[value]?.label ?? '-'}
      </Typography>
    </Box>
  );
};

export const selectField = {
  renderField(mode: FormFieldMode, params: FieldParams) {
    switch (mode) {
      case 'view':
        return renderSelectViewMode(params);
      default:
        return renderSelect(params);
    }
  }
};
