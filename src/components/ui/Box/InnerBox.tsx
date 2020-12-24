import React from 'react';
import { Box, BoxProps, Heading } from '@chakra-ui/core';

import theme from 'theme';

interface Props extends BoxProps {
  title: string;
  children: JSX.Element;
  loading?: boolean;
}

export default function InnerBox({
  title = '',
  children,
  loading,
  ...rest
}: Props) {
  return (
    <Box
      backgroundColor={theme.colors.lightBackground}
      p={5}
      borderRadius={5}
      boxShadow="0px 3px 6px rgba(0, 0, 0, 0.160784)"
      {...rest}
    >
      <Heading color={theme.colors.primary} fontSize={22} lineHeight={1.1}>
        {title}
      </Heading>
      {children}
    </Box>
  );
}
