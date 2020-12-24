import { Box, Icon, IconProps } from '@chakra-ui/core';
import React from 'react';

import theme from 'theme';

const SIZE = '16px';

export default function AddIcon(props: IconProps) {
  return (
    <Box
      mr={2}
      width={SIZE}
      height={SIZE}
      backgroundColor="white"
      d="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={8}
    >
      <Icon name="small-add" color={theme.colors.primary} size="4" {...props} />
    </Box>
  );
}
