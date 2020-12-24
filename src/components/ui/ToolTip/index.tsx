import React from 'react';
import { Tooltip, Icon } from '@chakra-ui/core';

import theme from 'theme';

type ToolTipProps = {
  label: string;
  placement?: string;
};

export default function ToolTip({ label }: ToolTipProps) {
  return (
    <Tooltip
      label={label}
      aria-label={label}
      placement="auto"
      color="black"
      background="white"
      p={6}
      borderRadius={8}
      fontWeight={400}
      fontSize={14}
    >
      <Icon name="info-outline" color={theme.colors.primary} />
    </Tooltip>
  );
}
