import { Box, ModalCloseButton } from '@chakra-ui/core';
import React from 'react';

const MODAL_MAX_HEIGHT = 560;
const BORDER_WIDTH = 4;

const BaseContentModal = ({ children, onClose }) => {
  return (
    <Box
      borderRadius={8}
      borderWidth={4}
      borderColor="white"
      borderStyle="solid"
      height={MODAL_MAX_HEIGHT}
      maxHeight={MODAL_MAX_HEIGHT}
      overflow="hidden"
    >
      {children}
      <ModalCloseButton
        background="white"
        borderRadius={20}
        mt={-12}
        _hover={{ background: 'white' }}
        onClick={() => {
          onClose();
        }}
      />
    </Box>
  );
};

export default BaseContentModal;
