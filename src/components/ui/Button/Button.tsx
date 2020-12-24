import React from 'react';

const VARIANTS = {
  primary: 'primary',
  outline: 'outline',
  ghost: 'ghost',
  link: 'link'
};

type Variant = keyof typeof VARIANTS;

type ButtonProps = {
  variant: Variant;
};

const ButtonWrapper: React.FC<ButtonProps> = (props) => {
  return null;
};

export default ButtonWrapper;
