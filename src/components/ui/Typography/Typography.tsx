import React from 'react';
import { Text } from '@chakra-ui/core';
import _ from 'lodash';

const VARIANTS = {
  label: 'label',
  body: 'body',
  heading1: 'heading1',
  heading2: 'heading2',
  heading3: 'heading3',
  xsTitle: 'xsTitle',
  xxsTitle: 'xxsTitle',
  /** TODO: verify variant from designs **/
  tabs: 'tabs',
  tableHeader: 'tableHeader'
};

type Variant = keyof typeof VARIANTS;

type TypographyProps = {
  variant?: Variant;
};

const DEFAULT_FONT_PARAMS = { fontFamily: 'averta' };

const createStyleProps = _.memoize((variant: Variant) => {
  switch (variant) {
    case 'tabs': {
      return {
        fontSize: 14,
        fontWeight: 700,
        lineHeight: '17px',
        ...DEFAULT_FONT_PARAMS
      };
    }
    case 'heading1': {
      return {
        fontSize: 26,
        fontWeight: 700,
        textTransform: 'uppercase' as 'uppercase',
        ...DEFAULT_FONT_PARAMS
      };
    }
    case 'heading2': {
      return {
        fontSize: 22,
        fontWeight: 700,
        ...DEFAULT_FONT_PARAMS
      };
    }
    case 'heading3': {
      return {
        fontSize: 16,
        fontWeight: 700,
        ...DEFAULT_FONT_PARAMS
      };
    }
    case 'label': {
      return {
        fontWeight: 600,
        fontSize: 14,
        ...DEFAULT_FONT_PARAMS
      };
    }
    case 'xsTitle':
      return {
        fontWeight: 600,
        fontSize: 12,
        ...DEFAULT_FONT_PARAMS
      };
    case 'xxsTitle':
      return {
        fontWeight: 700,
        fontSize: 12,
        ...DEFAULT_FONT_PARAMS
      };
    case 'tableHeader':
      return {
        fontWeight: 700,
        fontSize: 14,
        ...DEFAULT_FONT_PARAMS
      };
    case 'body':
    default:
      return {
        fontWeight: 400,
        fontSize: 14,
        ...DEFAULT_FONT_PARAMS
      };
  }
});

/**
 * TODO: after v1.0 upgrade change it to custom variant props via chakra styling
 * @param variant
 * @param children
 * @constructor
 */
const Typography: React.FC<
  TypographyProps & React.ComponentProps<typeof Text>
> = ({ variant = 'body', children, ...props }) => {
  const styleProps = createStyleProps(variant);
  return (
    <Text {...styleProps} {...props}>
      {children}
    </Text>
  );
};

export default Typography;
