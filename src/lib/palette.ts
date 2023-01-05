import hexRgb from 'hex-rgb';
/*
  Color palette used throughout the app. Each color name is on a 0 - 1000 scale.
  The close to 0 the brighter the color, the farther from 0 the darker the color.

  i.e.:
    purple100 = light purple
    purple900 = dark purple
*/

// Red
export const red100: string = '#FFA88E';
export const red500: string = '#FF0000';

// Green
export const green200: string = '#46F289';

// Blue
export const blue200: string = '#9fd4f1';
export const blue600: string = '#1D84FB';

// Grayscale
export const white: string = '#FFFFFF';
export const gray500: string = '#808080';
export const gray700: string = '#646464';
export const black: string = '#000';

/*
  Takes a hex and alpha and converts to rgba
*/
export const rgba = (hex: string, alpha: number): string => {
  const { red, green, blue } = hexRgb(hex);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
