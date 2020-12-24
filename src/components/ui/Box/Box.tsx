import React from 'react';
import { Box, BoxProps, Spinner, Stack, Text } from '@chakra-ui/core';
import { map } from 'lodash';

import { Typography } from 'components/ui';
import theme from 'theme';
import { Button } from '../forms';
import { IconType } from '../forms/Button/Button';

export type PrimaryButton = React.ComponentProps<typeof Button> & {
  iconName?: IconType;
  text: string;
  onClick?: () => void;
  dataCy?: string;
  container?: React.ComponentType<any>;
  backgroundColor?: string;
  containerProps?: {};
};

interface Props extends BoxProps {
  title?: string;
  titleElement?: React.ReactNode;
  subTitle?: string;
  primaryButtons?: PrimaryButton[];
  children: React.ReactNode;
  loading?: boolean;
}

const BoxComponentTitle: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Typography
      mb={4}
      variant="heading1"
      color={theme.colors.primary}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default function BoxComponent({
  title = '',
  titleElement,
  subTitle = '',
  primaryButtons = [],
  children,
  loading,
  ...rest
}: Props) {
  function renderButtons() {
    return map(primaryButtons, (item) => {
      const ButtonContainer = item?.container;
      const button = (
        <Button
          {...item}
          key={item.text}
          iconName={item.iconName}
          text={item.text}
          onClick={item.onClick}
          data-cy={item.dataCy || undefined}
          ml="14px"
        />
      );
      return ButtonContainer ? (
        <ButtonContainer {...item.containerProps}>{button}</ButtonContainer>
      ) : (
        button
      );
    });
  }

  return (
    <Box mx={80} boxShadow="0px 3px 6px rgba(0, 0, 0, 0.160784);" {...rest}>
      <Box my={80} d="flex" flex={1}>
        <Stack d="flex" flex={1}>
          {subTitle ? (
            <Text color="primary" fontSize={14}>
              {subTitle}
            </Text>
          ) : null}
          <Box
            mt="4px"
            backgroundColor="#001F24"
            py={44}
            px={50}
            borderRadius={8}
            d="flex"
            flex={1}
          >
            <Stack d="flex" flex={1}>
              <Box
                d="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                {!titleElement ? (
                  <BoxComponentTitle>{title}</BoxComponentTitle>
                ) : (
                  titleElement
                )}
                <Box>{renderButtons()}</Box>
              </Box>
              {loading ? (
                <Spinner alignSelf="center" my={80} size="lg" color="white" />
              ) : (
                children
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

BoxComponent.Title = BoxComponentTitle;

BoxComponent.defaultProps = {
  title: '',
  subTitle: '',
  primaryButtons: []
};
