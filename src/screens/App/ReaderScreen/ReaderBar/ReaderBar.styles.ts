import { StyleSheet } from 'react-native';
import { black, white } from 'lib/palette';
import {
  GUTTER,
  TITLE_TEXT_FONT_SIZE,
  BODY_TEXT_FONT_SIZE,
  Fonts,
} from 'lib/styleConstants';

export default StyleSheet.create({
  container: {
    backgroundColor: black,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: GUTTER,
  },
  pageIndicator: {
    color: white,
    fontSize: BODY_TEXT_FONT_SIZE,
    fontFamily: Fonts.CINZEL,
  },
  hidden: {
    display: 'none',
  },
  slideIndicator: {
    color: white,
    position: 'absolute',
    top: -25,
    fontSize: TITLE_TEXT_FONT_SIZE,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: Fonts.CINZEL_DECORACTIVE,
  },
  slider: {
    width: 200,
    height: 40,
  },
});
