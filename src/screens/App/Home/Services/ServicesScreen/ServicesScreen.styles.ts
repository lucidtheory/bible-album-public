import { StyleSheet } from 'react-native';
import { white, blue600 } from 'lib/palette';
import {
  GUTTER,
  BODY_TEXT_FONT_SIZE,
  Fonts,
} from 'lib/styleConstants';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: GUTTER,
    backgroundColor: white,
  },
  bottomTextContainer: {
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: GUTTER,
  },
  button: {
    marginBottom: GUTTER,
  },
  smallText: {
    fontFamily: Fonts.JOSEFIN_LIGHT,
    fontSize: BODY_TEXT_FONT_SIZE,
    marginBottom: 5,
  },
  email: {
    fontFamily: Fonts.JOSEFIN_LIGHT,
    fontSize: BODY_TEXT_FONT_SIZE,
    textDecorationLine: 'underline',
    color: blue600,
  },
  copyMessage: {
    fontFamily: Fonts.JOSEFIN_LIGHT,
    fontSize: BODY_TEXT_FONT_SIZE,
    marginBottom: 5,
    color: blue600,
  },
});
