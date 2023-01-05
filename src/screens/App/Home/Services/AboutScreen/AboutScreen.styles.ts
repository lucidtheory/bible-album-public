import { StyleSheet } from 'react-native';
import { white } from 'lib/palette';
import {
  GUTTER,
  TITLE_TEXT_FONT_SIZE,
  Fonts,
} from 'lib/styleConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  scroll: {
    padding: GUTTER,
    alignItems: 'center',
    flexGrow: 1,
  },
  text: {
    fontSize: TITLE_TEXT_FONT_SIZE,
    fontFamily: Fonts.JOSEFIN_LIGHT,
    marginBottom: GUTTER,
  },
});
