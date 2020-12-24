import { Box } from '@chakra-ui/core';
import React from 'react';

type FullPageBackgroundProps = {
  children: JSX.Element;
};

export default function FullPageBackGround({
  children
}: FullPageBackgroundProps) {
  return (
    <Box
      background="linear-gradient(#003238, #001315)"
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      {children}
    </Box>
  );
}
