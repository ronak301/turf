import React from 'react';
import { Box, Text } from '@chakra-ui/core';

export function ListItemTitle(props) {
  return (
    <Box d="flex" flex={1} mx={8} overflow="hidden" isTruncated>
      <Text
        isTruncated
        py={2}
        d="flex"
        flex={1}
        color="white"
        fontSize={14}
        fontWeight="600"
        {...props}
      />
    </Box>
  );
}

export function ListItemText(props) {
  return (
    <Box d="flex" flex={1} mx={8} overflow="hidden" isTruncated>
      <Text
        isTruncated
        py={2}
        d="flex"
        flex={1}
        color="white"
        fontSize={14}
        fontWeight={400}
        {...props}
      />
    </Box>
  );
}
