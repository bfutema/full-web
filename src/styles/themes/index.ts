import { borders } from '@components/bosons/borders';
import { colors } from '@components/bosons/colors';

import { dark } from './dark';
import { light } from './light';

export const theme = {
  colors,
  borders,
};

export const themes = {
  light: { ...theme, ...light },
  dark: { ...theme, ...dark },
};
