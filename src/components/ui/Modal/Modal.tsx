import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Button as ChakraButton,
  BoxProps,
  ModalSizes
} from '@chakra-ui/core';
import React from 'react';

import { Button } from '../forms';

export type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  body?: string | React.ReactNode;
  content?: React.ReactNode | undefined;
  primaryActionText?: string;
  primaryActionLoading?: boolean;
  primaryButtonOnClick?: () => void;
  secondaryActionText?: string;
  secondaryButtonOnClick?: () => void;
  size?: ModalSizes | BoxProps['maxWidth'];
  contentBoxProps?: any;
};

export default function ModalComponent(props: ModalProps) {
  const {
    isOpen,
    onClose,
    title,
    body,
    content,
    primaryActionText,
    primaryButtonOnClick,
    secondaryActionText = 'Cancel',
    secondaryButtonOnClick = onClose,
    primaryActionLoading,
    size,
    contentBoxProps
  } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick
      size={size}
    >
      <ModalOverlay />
      <ModalContent borderRadius={4} p={5} {...contentBoxProps}>
        {content || (
          <>
            <ModalHeader>
              <Text color="primary">{title}</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {typeof body === 'string' ? (
                <Text fontSize={16} color="black">
                  {body}
                </Text>
              ) : (
                body
              )}
            </ModalBody>

            <ModalFooter d="flex" alignSelf="flex-start">
              <Button
                isLoading={primaryActionLoading}
                text={primaryActionText || ''}
                onClick={primaryButtonOnClick}
                data-cy="modal.primary"
              />
              <ChakraButton
                onClick={secondaryButtonOnClick}
                variant="ghost"
                h="32px"
                data-cy="modal.secondary"
                ml={2}
              >
                <Text fontWeight="400" color="black" as="span">
                  {secondaryActionText}
                </Text>
              </ChakraButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
