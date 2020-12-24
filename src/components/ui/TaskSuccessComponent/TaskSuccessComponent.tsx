import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';

import { Box as BoxContainer, Typography } from 'components/ui';
import { RightIcon } from 'assets/icons';
import theme from 'theme';

const TaskSuccessComponent = ({ children, description }) => {
  return (
    <BoxContainer d="flex" flexDirection="column" flex={1}>
      <Box
        d="flex"
        flexDirection="column"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="80px"
          h="80px"
          borderRadius="40px"
          borderColor={theme.colors.primary}
          borderWidth={1}
          d="flex"
          justifyContent="center"
          alignItems="center"
        >
          <RightIcon />
        </Box>
        <Text pt={8} color="white" letterSpacing="4px" fontSize={20}>
          Success!
        </Text>
        <Typography variant="body" w="412px" textAlign="center">
          {description}
        </Typography>

        <Flex mt={8} flexDirection="column">
          {children}
        </Flex>
      </Box>
    </BoxContainer>
  );
};

export default TaskSuccessComponent;
