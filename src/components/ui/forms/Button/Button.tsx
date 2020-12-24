import React from 'react';
import { Box, Button as CButton, Text } from '@chakra-ui/core';

import AddIcon from './AddIcon';
import theme from 'theme';
import { DeleteIcon, EditIcon } from 'assets/icons';

export enum IconType {
  ADD,
  DELETE,
  EDIT
}

type FormButtonProps = {
  onClick?: (e: any) => void;
  iconName?: IconType;
  text: string;
  ml?: string;
  width?: number | string | any;
  disabled?: boolean;
  isLoading?: boolean;
  rightIcon?: any;
  type?: 'submit' | 'reset' | 'button';
  backgroundColor?: string;
  dataCy?: string;
  px?: number;
  mt?: number;
  variant?: any;
  iconColor?: string;
};

interface IconProps {
  iconName?: IconType;
  iconColor?: string;
}

const Icon = ({ iconName, iconColor }: IconProps) => {
  switch (iconName) {
    case IconType.ADD:
      return <AddIcon />;
    case IconType.DELETE:
      return <DeleteIcon width={12} height={12} fill={iconColor} />;
    case IconType.EDIT:
      return <EditIcon fill={iconColor} />;
    default:
      return null;
  }
};

export default function Button({
  onClick,
  iconName,
  iconColor,
  text,
  disabled,
  rightIcon,
  backgroundColor,
  dataCy,
  px,
  mt,
  variant,
  ...rest
}: FormButtonProps) {
  return (
    <CButton
      fontSize="12px"
      fontFamily="averta"
      size="sm"
      backgroundColor={backgroundColor || theme.colors.primary}
      borderRadius={20}
      onClick={onClick}
      isDisabled={disabled}
      _hover={{
        boxShadow: 'lg',
        transform: 'scale(1.05)'
      }}
      px={px || 4}
      mt={mt}
      _active={{ background: backgroundColor || theme.colors.primary }}
      data-cy={dataCy || undefined}
      variant={variant}
      minWidth="144px"
      {...rest}
    >
      <Icon iconName={iconName} iconColor={iconColor} />
      <Text alignSelf="center" color="white">
        {text.toUpperCase()}
      </Text>
      {rightIcon ? (
        <Box position="absolute" right={3} top={2}>
          {rightIcon}
        </Box>
      ) : (
        <></>
      )}
    </CButton>
  );
}
