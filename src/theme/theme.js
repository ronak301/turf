import { theme, Text, Button } from '@chakra-ui/core';
import { rem } from 'polished';

Text.defaultProps = {
  fontFamily: 'Averta',
  color: 'white'
};

Button.defaultProps = {
  fontFamily: 'Averta'
};

export default {
  ...theme,
  fonts: {
    heading: 'Averta',
    mono: 'Averta'
  },
  colors: {
    ...theme.colors,
    primary: '#0ea852',
    primaryHover: "#046e32",
    darkColor: "#141414",
    darkColorHover: "#333",
    lightColor: "#f4f4f4",
    secondary: '#bdd4d6',
    lightBackground: '#003238',
    darkBackground: '#001315',
    semiDarkBackground: '#35595d',
    formControlBackground: '#075E69',
    formValue: '#f9f9f9cc',
    text: '#ffffff',
    lightGrey: '#979797',
    tableRowPrimary: '#2e4d50',
    tableRowSecondary: '#35595d'
  },
  fontSize: {
    11: rem('11px'),
    12: rem('12px'),
    14: rem('14px'),
    15: rem('15px'),
    16: rem('16px'),
    18: rem('18px'),
    20: rem('20px'),
    22: rem('22px'),
    26: rem('26px'),
    27: rem('27px'),
    28: rem('28px'),
    30: rem('30px'),
    32: rem('32px'),
    36: rem('36px'),
    40: rem('40px')
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 500,
    bold: 700
  },
  lineHeights: {
    normal: 'normal',
    none: '1',
    shorter: '1.25',
    short: '1.375',
    base: '1.5',
    tall: '1.625',
    taller: '2'
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  },
  breakpoints: ['30em', '48em', '62em', '80em']
};
