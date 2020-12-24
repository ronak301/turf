import { Flex } from '@chakra-ui/core';
import React from 'react';

import { Typography } from '../index';

const Loader: React.FC = () => (
  <Flex flex={1} pb={700} justifyContent="center" alignItems="center">
    <Typography>Loading...</Typography>
  </Flex>
);

export default Loader;
