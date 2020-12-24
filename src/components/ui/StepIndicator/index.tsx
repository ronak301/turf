import React from 'react';
import { Box, Grid, Flex } from '@chakra-ui/core';
import _times from 'lodash/times';

import { Typography } from 'components/ui';
import theme from 'theme';

function repeatItems<T>(repeat: number, functor: (index: number) => T[]) {
  return _times(repeat, functor)
    .flat()
    .slice(0, repeat * 2 - 1);
}

type StepIndicatorProps = {
  currentStep?: number;
  stepCount: number;
  stepKnobSize?: number;
  width?: number;
};

const DEFAULT_KNOB_SIZE = 12;
const DEFAULT_WIDTH = 220;

export default function StepIndicator({
  currentStep = 1,
  stepCount,
  stepKnobSize = DEFAULT_KNOB_SIZE,
  width = DEFAULT_WIDTH
}: StepIndicatorProps) {
  const gridTemplateColumns = repeatItems(stepCount, () => [
    `${stepKnobSize}px`,
    `auto`
  ]).join(' ');
  const gridColumn = 2 * (currentStep - 1) + 1;

  return (
    <Grid
      alignItems="center"
      gridTemplateColumns={gridTemplateColumns}
      gap={1}
      width={width}
    >
      {repeatItems(stepCount, (index) => {
        const activeColor = theme.colors.primary;
        const defaultColor = theme.colors.lightGrey;
        const color = index < currentStep - 1 ? activeColor : 'transparent';
        const lineColor = index < currentStep - 1 ? activeColor : defaultColor;
        const borderColor =
          currentStep >= index + 1 ? activeColor : defaultColor;

        const size = Math.floor(stepKnobSize / 3);
        return [
          <Box
            w={size}
            h={size}
            bg={color}
            rounded={999}
            borderColor={borderColor}
            borderWidth={2}
            key={`box-${index}`}
          />,
          <Flex
            w="auto"
            h={0}
            bg={color}
            borderWidth={1}
            borderColor={lineColor}
            rounded={999}
            key={`flex-${index}`}
          />
        ];
      })}
      <Typography
        width={12}
        gridColumn={gridColumn}
        fontSize={12}
        fontWeight={700}
      >
        Step {currentStep}
      </Typography>
    </Grid>
  );
}
