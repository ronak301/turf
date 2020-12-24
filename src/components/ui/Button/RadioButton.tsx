import { Radio, RadioGroup, Stack } from '@chakra-ui/core';
import { map } from 'lodash';
import React, { useState } from 'react';

import theme from 'theme';

export default function RadioButton({ options, onChange }) {
  const [selectedVal, setSelectedVal] = useState<String | null>(null);

  return (
    <RadioGroup
      defaultValue="2"
      spacing={20}
      onChange={({ target }) => {
        setSelectedVal(target?.value);
        onChange(target?.value);
      }}
    >
      <Stack flexDirection="row">
        {map(options, (option) => {
          const isSelected = selectedVal === option?.id;
          return (
            <Radio
              h={10}
              w={32}
              borderRadius={4}
              background={
                isSelected
                  ? theme.colors.formControlBackground
                  : theme.colors.black
              }
              pl={4}
              value={option?.id}
              mr={4}
            >
              {option?.label}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
}
