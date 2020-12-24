import React from 'react';
import { Flex } from '@chakra-ui/core';

import { StepIndicator, Box as BoxContainer, Typography } from 'components/ui';

export type Button = {
  text: string;
  onClick?: () => void;
  dataCy?: string;
  variant?: any;
  backgroundColor?: string;
  disabled?: boolean;
};

type Props = {
  title?: string;
  subTitle?: string;
  description?: string;
  buttons?: React.ComponentProps<typeof BoxContainer>['primaryButtons'];
  children: React.ReactNode;
  loading?: boolean;
  currentStep?: number;
};

const ContentBox = ({
  title,
  currentStep,
  description,
  children,
  buttons: primaryButtons,
  ...restProps
}: Props) => {
  return (
    <BoxContainer
      titleElement={
        currentStep ? (
          <StepIndicator currentStep={currentStep} stepCount={3} width={220} />
        ) : null
      }
      primaryButtons={primaryButtons}
      flex={1}
      {...restProps}
    >
      <Flex flexDirection="row">
        <BoxContainer.Title mb={0}>Step {currentStep}:</BoxContainer.Title>
        <BoxContainer.Title color="White" ml={2} mb={0}>
          {title}
        </BoxContainer.Title>
      </Flex>
      {description ? <Typography>{description}</Typography> : null}
      {children}
    </BoxContainer>
  );
};

export default ContentBox;
